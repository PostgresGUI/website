export function generateUuidV4(): string {
  return crypto.randomUUID();
}

export function generateUuidV7(): string {
  const timestamp = Date.now();
  const timestampHex = timestamp.toString(16).padStart(12, "0");

  const randomBytes = new Uint8Array(10);
  crypto.getRandomValues(randomBytes);

  // version 7: set version bits (0111) in the 7th nibble
  randomBytes[0] = (randomBytes[0] & 0x0f) | 0x70;
  // variant 10xx in the 9th nibble (index 2 of randomBytes maps to byte 9)
  randomBytes[2] = (randomBytes[2] & 0x3f) | 0x80;

  const hex = Array.from(randomBytes, (b) =>
    b.toString(16).padStart(2, "0")
  ).join("");

  const raw =
    timestampHex.slice(0, 8) +
    timestampHex.slice(8, 12) +
    hex.slice(0, 4) +
    hex.slice(4, 8) +
    hex.slice(8, 20);

  return [
    raw.slice(0, 8),
    raw.slice(8, 12),
    raw.slice(12, 16),
    raw.slice(16, 20),
    raw.slice(20, 32),
  ].join("-");
}

export function formatUuid(
  uuid: string,
  options: { uppercase: boolean; hyphens: boolean }
): string {
  let result = uuid;
  if (!options.hyphens) {
    result = result.replace(/-/g, "");
  }
  if (options.uppercase) {
    result = result.toUpperCase();
  }
  return result;
}
