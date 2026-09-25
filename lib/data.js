import { connectDB } from "@/lib/db";
import Profile from "@/models/Profile";
import Skill from "@/models/Skill";
import Experience from "@/models/Experience";
import Project from "@/models/Project";

/**
 * Ces fonctions sont appelées directement depuis les Server Components des
 * pages publiques : pas besoin de passer par /api, on interroge Mongo
 * directement, ce qui est plus rapide et plus simple.
 */

export async function getProfile() {
  await connectDB();
  const profile = await Profile.findOne().lean();
  return profile ? JSON.parse(JSON.stringify(profile)) : null;
}

export async function getSkills() {
  await connectDB();
  const skills = await Skill.find().sort({ categorie: 1, ordre: 1 }).lean();
  return JSON.parse(JSON.stringify(skills));
}

export async function getExperiences() {
  await connectDB();
  const experiences = await Experience.find().sort({ ordre: 1 }).lean();
  return JSON.parse(JSON.stringify(experiences));
}

export async function getProjects() {
  await connectDB();
  const projects = await Project.find()
    .sort({ ordre: 1, createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(projects));
}

export async function getProjectBySlug(slug) {
  await connectDB();
  const project = await Project.findOne({ slug }).lean();
  return project ? JSON.parse(JSON.stringify(project)) : null;
}

export async function getProjectById(id) {
  await connectDB();
  try {
    const project = await Project.findById(id).lean();
    return project ? JSON.parse(JSON.stringify(project)) : null;
  } catch {
    return null;
  }
}
