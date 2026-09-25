import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { isAuthorized } from "@/lib/requireAuth";

function slugify(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET(request, { params }) {
  await connectDB();
  const project = await Project.findById(params.id);
  if (!project) {
    return NextResponse.json({ error: "Introuvable." }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PUT(request, { params }) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const body = await request.json();
  if (!body.slug && body.titre) {
    body.slug = slugify(body.titre);
  }
  await connectDB();
  const project = await Project.findByIdAndUpdate(params.id, body, {
    new: true,
    runValidators: true,
  });
  if (!project) {
    return NextResponse.json({ error: "Introuvable." }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function DELETE(request, { params }) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  await connectDB();
  await Project.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
