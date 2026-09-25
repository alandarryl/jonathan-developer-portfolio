import mongoose, { Schema } from "mongoose";

const SkillSchema = new Schema(
  {
    nom: { type: String, required: true },
    categorie: {
      type: String,
      required: true,
      enum: [
        "Frontend",
        "Backend",
        "Data & IA",
        "Outils & Méthodologie",
        "Autre",
      ],
      default: "Autre",
    },
    niveau: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    },
    ordre: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
