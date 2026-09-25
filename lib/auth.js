import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "admin_session";
const ALG = "HS256";

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "AUTH_SECRET est manquant. Ajoute-le dans ton fichier .env.local"
    );
  }
  return new TextEncoder().encode(secret);
}

/** Crée un token de session signé, valable 7 jours. */
export async function createSessionToken() {
  return await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

/** Vérifie un token de session. Renvoie le payload si valide, sinon null. */
export async function verifySessionToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
