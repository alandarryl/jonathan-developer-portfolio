import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

/**
 * A utiliser au début des routes API de mutation (POST/PUT/DELETE)
 * pour s'assurer que la requête vient bien d'une session admin valide.
 * Renvoie true si autorisé, false sinon.
 */
export async function isAuthorized() {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);
  return Boolean(session);
}
