export function getAdminToken() {
  return process.env.ADMIN_TOKEN ?? "";
}

export function isAdminCookieValid(cookieValue: string | undefined) {
  const token = getAdminToken();
  if (!token) return false;
  return cookieValue === token;
}
