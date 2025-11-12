import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";

const router = Router();
const prisma = new PrismaClient();

// Validation schemas
const createConversationSchema = Joi.object({
  title: Joi.string().optional().default("New Conversation"),
  model: Joi.string().required(),
});

// Create conversation
router.post("/", async (req: Request, res: Response) => {
  try {
    const { error, value } = createConversationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const uid = (req as any).uid;

    // Get or create user
    let user = await prisma.user.findUnique({ where: { uid } });
    if (!user) {
      user = await prisma.user.create({ data: { uid, email: "unknown@example.com" } });
    }

    // Check tier limits
    if (user.tier === "free") {
      const conversationCount = await prisma.conversation.count({
        where: { userId: user.id },
      });
      if (conversationCount >= 5) {
        return res.status(403).json({ error: "Free tier limit reached (5 conversations)" });
      }
    }

    const conversation = await prisma.conversation.create({
      data: {
        title: value.title,
        model: value.model,
        userId: user.id,
      },
    });

    res.status(201).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create conversation" });
  }
});

// Get all conversations for user
router.get("/", async (req: Request, res: Response) => {
  try {
    const uid = (req as any).uid;

    const user = await prisma.user.findUnique({
      where: { uid },
      include: {
        conversations: {
          orderBy: { createdAt: "desc" },
          include: { _count: { select: { messages: true } } },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
});

// Get conversation by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const uid = (req as any).uid;
    const { id } = req.params;

    const conversation = await prisma.conversation.findFirst({
      where: { id, user: { uid } },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    res.json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch conversation" });
  }
});

// Update conversation
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const uid = (req as any).uid;
    const { id } = req.params;
    const { title } = req.body;

    const conversation = await prisma.conversation.findFirst({
      where: { id, user: { uid } },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const updated = await prisma.conversation.update({
      where: { id },
      data: { title: title || conversation.title },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update conversation" });
  }
});

// Delete conversation
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const uid = (req as any).uid;
    const { id } = req.params;

    const conversation = await prisma.conversation.findFirst({
      where: { id, user: { uid } },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    await prisma.conversation.delete({ where: { id } });

    res.json({ message: "Conversation deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete conversation" });
  }
});

export default router;
