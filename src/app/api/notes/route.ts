import { NextRequest, NextResponse } from "next/server";
import { Note } from "@/types";

// GET /api/notes
export async function GET(request: NextRequest) {
  try {
    // TODO: Implement database query
    // const notes = await db.collection('notes').where('userId', '==', userId).get();

    // Simulated response
    const notes: Note[] = [];

    return NextResponse.json({ notes });
  } catch (error) {
    console.error("Notes API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

// POST /api/notes
export async function POST(request: NextRequest) {
  try {
    const { title, content, category } = await request.json();

    // TODO: Implement database insert
    // const note = await db.collection('notes').add({
    //   title,
    //   content,
    //   category,
    //   userId,
    //   createdAt: new Date(),
    // });

    // Simulated response
    const note = {
      id: Date.now().toString(),
      title,
      content,
      category,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ note }, { status: 201 });
  } catch (error) {
    console.error("Notes API Error:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}
