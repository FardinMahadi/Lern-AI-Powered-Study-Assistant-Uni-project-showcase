import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";

const router = Router();
const prisma = new PrismaClient();

// Validation schemas
const createMessageSchema = Joi.object({
  conversationId: Joi.string().required(),
  role: Joi.string().valid("user", "assistant").required(),
  content: Joi.string().required(),
  metadata: Joi.object().optional(),
});

// Add message to conversation
router.post("/", async (req: Request, res: Response) => {
  try {
    const { error, value } = createMessageSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const uid = (req as any).uid;

    // Verify conversation belongs to user
    const conversation = await prisma.conversation.findFirst({
      where: { id: value.conversationId, user: { uid } },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const message = await prisma.message.create({
      data: {
        role: value.role,
        content: value.content,
        conversationId: value.conversationId,
        metadata: value.metadata || {},
      },
    });

    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add message" });
  }
});

// Get messages in conversation
router.get("/conversation/:conversationId", async (req: Request, res: Response) => {
  try {
    const uid = (req as any).uid;
    const { conversationId } = req.params;

    const conversation = await prisma.conversation.findFirst({
      where: { id: conversationId, user: { uid } },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Delete message
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const uid = (req as any).uid;
    const { id } = req.params;

    const message = await prisma.message.findFirst({
      where: { id, conversation: { user: { uid } } },
    });

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    await prisma.message.delete({ where: { id } });

    res.json({ message: "Message deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete message" });
  }
});

export default router;
