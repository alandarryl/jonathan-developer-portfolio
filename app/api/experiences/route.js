import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Experience from "@/models/Experience";
import { isAuthorized } from "@/lib/requireAuth";

export async function GET() {
  await connectDB();
  const experiences = await Experience.find().sort({ ordre: 1 });
  return NextResponse.json(experiences);
}

export async function POST(request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const body = await request.json();
  await connectDB();
  const experience = await Experience.create(body);
  return NextResponse.json(experience, { status: 201 });
}
