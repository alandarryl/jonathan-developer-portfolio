// Script de peuplement initial de la base de données à partir du CV.
// Lancer avec : npm run seed
// Nécessite MONGODB_URI dans .env.local

import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

// --- Charge .env.local manuellement (pas de dépendance dotenv nécessaire) ---
function loadEnvLocal() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, "utf-8");
  content.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) return;
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    value = value.replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  });
}
loadEnvLocal();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI manquant. Ajoute-le dans .env.local avant de lancer le seed.");
  process.exit(1);
}

const ProfileSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const SkillSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const ExperienceSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const ProjectSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

const Profile = mongoose.model("Profile", ProfileSchema);
const Skill = mongoose.model("Skill", SkillSchema);
const Experience = mongoose.model("Experience", ExperienceSchema);
const Project = mongoose.model("Project", ProjectSchema);

const profileData = {
  nomComplet: "Jonathan Okana",
  titre: "Développeur Web Fullstack",
  sousTitre: "Alternance — 3 jours entreprise / 2 jours école",
  accrocheHero:
    "Étudiant en 3e année de Bachelor Développement Web, je conçois des applications fullstack performantes et j'intègre des automatisations IA au service du métier.",
  bio:
    "Actuellement en 3e année de Bachelor Développement Web, Application & IA à Digital Campus Paris, je recherche une alternance en développement Fullstack / IA. " +
    "Axé sur le Clean Code et les architectures modernes (React, Next.js, .NET, Python), je conçois des applications web performantes et j'intègre des solutions d'automatisation métier. " +
    "Depuis 2024, j'accompagne en freelance des clients sur Malt, Upwork et Fiverr : sites sur mesure, dashboards de gestion, agents IA et automatisations n8n.",
  localisation: "Île-de-France",
  email: "okanajonathan2@gmail.com",
  telephone: "+33 7 59 21 46 66",
  disponibilite: "Disponible pour une alternance (rythme 3j/2j)",
  liens: {
    linkedin: "",
    github: "",
    portfolio: "",
  },
  avatarUrl: "",
  cvUrl: "",
  formations: [
    {
      diplome: "Bachelor 3e année – Développement Web, Application & IA",
      etablissement: "Digital Campus Paris",
      periode: "2026 – 2027",
    },
    {
      diplome: "Bachelor 2e année – Développement Web & Application",
      etablissement: "Digital Campus Paris",
      periode: "2025 – 2026",
    },
    {
      diplome: "Bachelor 1re année – Développement Web & Application",
      etablissement: "ECE Paris – École Centrale d'Ingénierie",
      periode: "2024 – 2025",
    },
  ],
  langues: ["Français (Maternelle)", "Anglais (Courant)"],
  interets: ["Veille technologique (Architectures applicatives & IA)", "Jeux vidéo"],
};

const skillsData = [
  { nom: "React.js", categorie: "Frontend", niveau: 5, ordre: 1 },
  { nom: "Next.js", categorie: "Frontend", niveau: 5, ordre: 2 },
  { nom: "TypeScript / JavaScript", categorie: "Frontend", niveau: 4, ordre: 3 },
  { nom: "Tailwind CSS", categorie: "Frontend", niveau: 5, ordre: 4 },
  { nom: "HTML5 / CSS3", categorie: "Frontend", niveau: 5, ordre: 5 },
  { nom: "Figma", categorie: "Frontend", niveau: 3, ordre: 6 },
  { nom: "Node.js / Express.js", categorie: "Backend", niveau: 4, ordre: 1 },
  { nom: "C# / .NET", categorie: "Backend", niveau: 4, ordre: 2 },
  { nom: "APIs REST / WebAPI", categorie: "Backend", niveau: 4, ordre: 3 },
  { nom: "PostgreSQL", categorie: "Backend", niveau: 3, ordre: 4 },
  { nom: "MongoDB", categorie: "Backend", niveau: 4, ordre: 5 },
  { nom: "Supabase", categorie: "Backend", niveau: 3, ordre: 6 },
  { nom: "Python (scraping & scripts)", categorie: "Data & IA", niveau: 4, ordre: 1 },
  { nom: "n8n (automatisation)", categorie: "Data & IA", niveau: 4, ordre: 2 },
  { nom: "APIs LLM (Groq, OpenAI)", categorie: "Data & IA", niveau: 4, ordre: 3 },
  { nom: "Git / GitHub", categorie: "Outils & Méthodologie", niveau: 5, ordre: 1 },
  { nom: "Docker", categorie: "Outils & Méthodologie", niveau: 3, ordre: 2 },
  { nom: "Linux", categorie: "Outils & Méthodologie", niveau: 4, ordre: 3 },
  { nom: "CI/CD", categorie: "Outils & Méthodologie", niveau: 3, ordre: 4 },
  { nom: "Méthodes Agiles (Scrum)", categorie: "Outils & Méthodologie", niveau: 4, ordre: 5 },
  { nom: "Vercel", categorie: "Outils & Méthodologie", niveau: 4, ordre: 6 },
];

const experiencesData = [
  {
    poste: "Développeur Web & Automatisation Freelance",
    entreprise: "Malt, Upwork, Fiverr & clients directs",
    periode: "2024 – Présent",
    type: "Freelance",
    lieu: "Remote",
    points: [
      "Conception de 3 sites/plateformes sur mesure (Next.js, WordPress) avec une hausse moyenne du trafic observée de +25 %.",
      "Correction de 15+ bugs critiques front/back et réduction du temps de chargement des pages de 30 %.",
      "Déploiement d'un tableau de bord de gestion de ressources (Next.js, MongoDB) utilisé quotidiennement par les équipes clients.",
      "Création d'agents/chatbots et d'automatisations n8n ayant réduit de 40 % le temps de traitement manuel des mails/data.",
    ],
    technologies: ["Next.js", "WordPress", "MongoDB", "n8n", "Groq API"],
    ordre: 1,
  },
  {
    poste: "Intégrateur Web (Stage)",
    entreprise: "BTI-Advisory",
    periode: "Sept. 2025 – Nov. 2025",
    type: "Stage",
    lieu: "Île-de-France",
    points: [
      "Résolution de 20+ tickets UI/UX et optimisation du responsive design sur les plateformes clients.",
      "Implémentation du plan de marquage analytique (Matomo, Google Analytics) couvrant 100 % des parcours utilisateurs clés.",
    ],
    technologies: ["HTML/CSS", "JavaScript", "Matomo", "Google Analytics"],
    ordre: 2,
  },
  {
    poste: "Développeur Web (Stage)",
    entreprise: "KOSALA PME",
    periode: "Mars 2024 – Août 2024",
    type: "Stage",
    lieu: "Île-de-France",
    points: [
      "Conception et développement intégral (from scratch) d'un outil web de gestion interne utilisé par 15+ collaborateurs.",
      "Modélisation de la base de données relationnelle et gestion du versioning collaboratif sous Git.",
    ],
    technologies: ["PHP", "Laravel", "MySQL", "Git"],
    ordre: 3,
  },
];

const projectsData = [
  {
    titre: "LexaPad",
    slug: "lexapad",
    resume:
      "Application web de prise de notes assistée par IA, avec espace de dessin interactif et rédaction assistée.",
    description:
      "LexaPad combine prises de notes rapides, espace de dessin interactif (Drawing Board) et un module de rédaction assisté par IA. " +
      "L'intégration de l'API Groq permet l'analyse sémantique du texte pour la correction grammaticale, l'enrichissement du vocabulaire, " +
      "la génération de sujets d'entraînement et l'évaluation personnalisée du niveau de rédaction.",
    imageUrl: "",
    galerie: [],
    technologies: ["Next.js", ".NET C#", "Supabase", "Groq API"],
    points: [
      "Espace de dessin interactif (Drawing Board) intégré à l'éditeur de notes.",
      "Correction grammaticale et enrichissement du vocabulaire par IA.",
      "Génération de sujets d'entraînement et évaluation du niveau de rédaction.",
    ],
    lienGithub: "",
    lienDemo: "",
    enVedette: true,
    statut: "Terminé",
    ordre: 1,
  },
  {
    titre: "BookHouse",
    slug: "bookhouse",
    resume: "Marketplace de livres avec catalogue dynamique et recherche filtrée.",
    description:
      "Plateforme e-commerce dédiée à la vente de livres, avec gestion de catalogue dynamique (+100 références), " +
      "authentification utilisateur et recherche filtrée par genre, auteur et prix.",
    imageUrl: "",
    galerie: [],
    technologies: ["React.js", "Express.js", "Node.js", "MongoDB"],
    points: [
      "Gestion de catalogue dynamique avec plus de 100 références.",
      "Authentification utilisateur sécurisée.",
      "Recherche et filtres avancés.",
    ],
    lienGithub: "",
    lienDemo: "",
    enVedette: true,
    statut: "Terminé",
    ordre: 2,
  },
  {
    titre: "MovieLib",
    slug: "movielib",
    resume: "Gestionnaire de médiathèque pour rechercher, filtrer et cataloguer des contenus.",
    description:
      "Application web interactive permettant la recherche, le filtrage et le catalogage de contenus (films, séries) " +
      "via la consommation d'APIs tierces.",
    imageUrl: "",
    galerie: [],
    technologies: ["React.js", "Node.js", "Express.js"],
    points: [
      "Recherche et filtrage de contenus via API tierce.",
      "Catalogage personnalisé des médias.",
    ],
    lienGithub: "",
    lienDemo: "",
    enVedette: false,
    statut: "Terminé",
    ordre: 3,
  },
];

async function seed() {
  console.log("Connexion à MongoDB…");
  await mongoose.connect(MONGODB_URI);

  console.log("Peuplement du profil…");
  await Profile.deleteMany({});
  await Profile.create(profileData);

  console.log("Peuplement des compétences…");
  await Skill.deleteMany({});
  await Skill.insertMany(skillsData);

  console.log("Peuplement des expériences…");
  await Experience.deleteMany({});
  await Experience.insertMany(experiencesData);

  console.log("Peuplement des projets…");
  await Project.deleteMany({});
  await Project.insertMany(projectsData);

  console.log("Terminé ✅");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
