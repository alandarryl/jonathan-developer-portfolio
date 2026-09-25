import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Skill from "@/models/Skill";
import { isAuthorized } from "@/lib/requireAuth";

export async function PUT(request, { params }) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const body = await request.json();
  await connectDB();
  const skill = await Skill.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  if (!skill) {
    return NextResponse.json({ error: "Introuvable." }, { status: 404 });
  }
  return NextResponse.json(skill);
}

export async function DELETE(request, { params }) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  await connectDB();
  await Skill.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
