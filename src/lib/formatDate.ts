export function formatDate(value: unknown, fallback = "-") {
  if (!value) return fallback;

  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof (value as { toDate?: () => Date }).toDate === "function"
  ) {
    const date = (value as { toDate: () => Date }).toDate();
    return Number.isNaN(date.getTime()) ? fallback : date.toLocaleDateString();
  }

  if (typeof value === "number") {
    const date = new Date(value * 1000);
    return Number.isNaN(date.getTime()) ? fallback : date.toLocaleDateString();
  }

  const date = new Date(value as string);
  return Number.isNaN(date.getTime()) ? fallback : date.toLocaleDateString();
}
