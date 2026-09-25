import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Experience from "@/models/Experience";
import { isAuthorized } from "@/lib/requireAuth";

export async function PUT(request, { params }) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const body = await request.json();
  await connectDB();
  const experience = await Experience.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  if (!experience) {
    return NextResponse.json({ error: "Introuvable." }, { status: 404 });
  }
  return NextResponse.json(experience);
}

export async function DELETE(request, { params }) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  await connectDB();
  await Experience.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
