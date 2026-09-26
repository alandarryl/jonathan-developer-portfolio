import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { isAuthorized } from "@/lib/requireAuth";

export const dynamic = "force-dynamic";

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

export async function GET() {
  await connectDB();
  const projects = await Project.find().sort({ ordre: 1, createdAt: -1 });
  return NextResponse.json(projects);
}

export async function POST(request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const body = await request.json();
  await connectDB();

  if (!body.slug && body.titre) {
    body.slug = slugify(body.titre);
  }

  const project = await Project.create(body);
  return NextResponse.json(project, { status: 201 });
}
