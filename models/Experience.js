import mongoose, { Schema } from "mongoose";

const ExperienceSchema = new Schema(
  {
    poste: { type: String, required: true },
    entreprise: { type: String, required: true },
    periode: { type: String, required: true },
    type: {
      type: String,
      enum: ["Freelance", "Stage", "Alternance", "CDI", "Autre"],
      default: "Autre",
    },
    lieu: { type: String, default: "" },
    points: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    ordre: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Experience ||
  mongoose.model("Experience", ExperienceSchema);
