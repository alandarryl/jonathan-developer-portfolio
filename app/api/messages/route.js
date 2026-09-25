import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Message from "@/models/Message";
import { isAuthorized } from "@/lib/requireAuth";

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  await connectDB();
  const messages = await Message.find().sort({ createdAt: -1 });
  return NextResponse.json(messages);
}

export async function POST(request) {
  const body = await request.json();

  if (!body.nom || !body.email || !body.message) {
    return NextResponse.json(
      { error: "Nom, email et message sont obligatoires." },
      { status: 400 }
    );
  }

  await connectDB();
  const message = await Message.create(body);
  return NextResponse.json(message, { status: 201 });
}
