import crypto from "node:crypto";

const ADMIN_COOKIE_VERSION = "v1";
const ADMIN_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 14;

export function getAdminToken() {
  return process.env.ADMIN_TOKEN ?? "";
}

function signAdminSession(expiresAt: number, secret: string) {
  return crypto
    .createHmac("sha256", secret)
    .update(`${ADMIN_COOKIE_VERSION}.${expiresAt}`)
    .digest("hex");
}

export function createAdminCookieValue(now = Date.now()) {
  const secret = getAdminToken();
  if (!secret) return null;

  const expiresAt = now + ADMIN_SESSION_TTL_MS;
  const signature = signAdminSession(expiresAt, secret);
  return `${ADMIN_COOKIE_VERSION}.${expiresAt}.${signature}`;
}

export function isAdminCookieValid(cookieValue: string | undefined, now = Date.now()) {
  const secret = getAdminToken();
  if (!secret || !cookieValue) return false;

  const [version, expiresAtRaw, signature] = cookieValue.split(".");
  if (version !== ADMIN_COOKIE_VERSION || !expiresAtRaw || !signature) {
    return false;
  }

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt < now) {
    return false;
  }

  const expected = signAdminSession(expiresAt, secret);
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
}
