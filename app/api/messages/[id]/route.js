import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Message from "@/models/Message";
import { isAuthorized } from "@/lib/requireAuth";

export async function PATCH(request, { params }) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const body = await request.json();
  await connectDB();
  const message = await Message.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  if (!message) {
    return NextResponse.json({ error: "Introuvable." }, { status: 404 });
  }
  return NextResponse.json(message);
}

export async function DELETE(request, { params }) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  await connectDB();
  await Message.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
