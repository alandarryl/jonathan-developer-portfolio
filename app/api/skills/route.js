import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Skill from "@/models/Skill";
import { isAuthorized } from "@/lib/requireAuth";

export async function GET() {
  await connectDB();
  const skills = await Skill.find().sort({ categorie: 1, ordre: 1 });
  return NextResponse.json(skills);
}

export async function POST(request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const body = await request.json();
  await connectDB();
  const skill = await Skill.create(body);
  return NextResponse.json(skill, { status: 201 });
}
