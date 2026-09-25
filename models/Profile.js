import mongoose, { Schema } from "mongoose";

/**
 * Le profil est un document unique (singleton) contenant toutes les
 * informations personnelles modifiables depuis le dashboard :
 * identité, accroche, bio, coordonnées, liens et formation.
 */
const EducationSchema = new Schema(
  {
    diplome: { type: String, required: true },
    etablissement: { type: String, required: true },
    periode: { type: String, required: true },
  },
  { _id: false }
);

const ProfileSchema = new Schema(
  {
    nomComplet: { type: String, required: true, default: "Jonathan Okana" },
    titre: {
      type: String,
      required: true,
      default: "Développeur Web Fullstack",
    },
    sousTitre: {
      type: String,
      default: "Alternance — 3 jours entreprise / 2 jours école",
    },
    accrocheHero: {
      type: String,
      default:
        "Je conçois des applications web rapides et j'intègre des automatisations IA au service du métier.",
    },
    bio: {
      type: String,
      default: "",
    },
    localisation: { type: String, default: "Île-de-France" },
    email: { type: String, default: "" },
    telephone: { type: String, default: "" },
    disponibilite: { type: String, default: "" },
    liens: {
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      portfolio: { type: String, default: "" },
    },
    avatarUrl: { type: String, default: "" },
    cvUrl: { type: String, default: "" },
    formations: { type: [EducationSchema], default: [] },
    langues: { type: [String], default: [] },
    interets: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Profile ||
  mongoose.model("Profile", ProfileSchema);
