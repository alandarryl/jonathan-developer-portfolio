import mongoose from "mongoose";
import dns from "node:dns"; // 👈 1. Import du module DNS

// 👈 2. Redirection vers les DNS Cloudflare/Google pour contourner la box
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global._mongooseCache;

if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

/**
 * Connecte (ou réutilise la connexion) à MongoDB.
 * Appeler `await connectDB()` en haut de chaque route API / server component
 * qui a besoin d'accéder à la base de données.
 */
export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI est manquant. Ajoute-le dans ton fichier .env.local"
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}