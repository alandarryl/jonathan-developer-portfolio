import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Profile from "@/models/Profile";
import { isAuthorized } from "@/lib/requireAuth";

export async function GET() {
  await connectDB();
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create({});
  }
  return NextResponse.json(profile);
}

export async function PUT(request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = await request.json();
  await connectDB();

  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create(body);
  } else {
    Object.assign(profile, body);
    await profile.save();
  }

  return NextResponse.json(profile);
}
