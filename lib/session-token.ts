import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "deos_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function signSessionToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    if (!process.env.AUTH_SECRET) return false;
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}
