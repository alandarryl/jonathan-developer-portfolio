# Portfolio — Jonathan Okana

Portfolio professionnel Next.js 14 (App Router) + MongoDB, avec un dashboard
d'administration pour tout modifier sans toucher au code : profil, compétences,
expériences, projets, et messages reçus via le formulaire de contact.

## Stack

- **Next.js 14** (App Router, Server Components)
- **MongoDB / Mongoose** pour les données
- **Tailwind CSS** pour le style
- **jose** pour l'authentification du dashboard (session par cookie signé)
- Images gérées en **lien externe** (tu les héberges où tu veux — Cloudinary,
  imgur, ton propre CDN…), pas d'upload de fichier dans ce projet.

## Architecture

```
app/
  (site)/              → les 5 pages publiques (groupe de routes, pas dans l'URL)
    page.js             → Accueil / intro
    a-propos/            → Présentation, compétences, parcours
    projets/              → Liste des projets
    projets/[slug]/        → Détail d'un projet
    contact/                → Coordonnées + formulaire de contact
  dashboard/
    login/                 → Connexion admin
    (protected)/           → Tout le reste du dashboard (protégé par middleware.js)
      page.js               → Vue d'ensemble
      profil/                → Édition du profil
      competences/            → CRUD compétences
      experiences/             → CRUD expériences
      projets/                  → Liste + création + édition de projets
      messages/                  → Messages reçus
  api/                    → Toutes les routes API REST (CRUD Mongo)

components/
  ui/        → Composants génériques (Button, Card, Input, Badge…)
  site/      → Composants des pages publiques (Header, Hero, Timeline…)
  dashboard/ → Composants du dashboard (Sidebar, formulaires, managers…)

lib/         → Connexion DB, authentification, accès aux données
models/      → Schémas Mongoose (Profile, Skill, Experience, Project, Message)
scripts/     → Script de peuplement initial (seed) avec tes vraies infos de CV
```

Chaque page publique est un Server Component qui lit directement la base via
`lib/data.js` (pas d'appel HTTP interne). Le dashboard utilise les routes
`/api/*` pour les mutations, protégées par une session admin.

## Installation

```bash
npm install
cp .env.example .env.local
```

Renseigne dans `.env.local` :

- `MONGODB_URI` — ta chaîne de connexion MongoDB (Atlas gratuit largement suffisant)
- `ADMIN_PASSWORD` — le mot de passe pour te connecter au dashboard
- `AUTH_SECRET` — une chaîne aléatoire longue (ex : `openssl rand -base64 32`)

## Peupler la base avec tes infos de CV

Un script te permet de démarrer avec tes vraies données (profil, compétences,
expériences, projets LexaPad / BookHouse / MovieLib) déjà en base :

```bash
npm run seed
```

Tu pourras ensuite tout modifier depuis le dashboard (`/dashboard`).

## Lancer le projet

```bash
npm run dev
```

- Site public : http://localhost:3000
- Dashboard : http://localhost:3000/dashboard (redirige vers `/dashboard/login`)

## Notes importantes

- **Images** : tous les champs image (`avatarUrl`, `imageUrl` d'un projet,
  `galerie`) attendent une URL absolue. Héberge tes images où tu veux et colle
  le lien dans le dashboard.
- **Sécurité** : le dashboard est protégé par un seul mot de passe partagé
  (`ADMIN_PASSWORD`). C'est suffisant pour un usage personnel, mais si tu
  déploies publiquement, choisis un mot de passe fort et un `AUTH_SECRET`
  bien aléatoire.
- **Déploiement** : ce projet est prêt pour Vercel. Ajoute les 3 variables
  d'environnement dans les réglages du projet Vercel, connecte ton cluster
  MongoDB Atlas (autorise l'IP `0.0.0.0/0` ou les IP Vercel), et déploie.

## Pistes d'évolution

- Ajouter un rich-text editor pour la bio et les descriptions de projet
- Ajouter le drag & drop pour réordonner projets/compétences/expériences
  (les champs `ordre` sont déjà prévus dans les modèles)
- Ajouter un envoi d'email (Resend, Nodemailer) quand un message arrive
- Ajouter une pagination sur la liste des messages si le volume grandit
