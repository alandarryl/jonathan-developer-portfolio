import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema(
  {
    titre: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    resume: {
      type: String,
      required: true,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    imageUrl: { type: String, default: "" },
    galerie: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    points: { type: [String], default: [] },
    lienGithub: { type: String, default: "" },
    lienDemo: { type: String, default: "" },
    enVedette: { type: Boolean, default: false },
    statut: {
      type: String,
      enum: ["Terminé", "En cours", "Archivé"],
      default: "Terminé",
    },
    ordre: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
