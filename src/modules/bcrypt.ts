// Browser-compatible bcrypt replacement
// Note: For production, password hashing should be done on the server

const saltValue = 10;

// Simple demo hashing - NOT secure for production!
export const hash = (value: string): string => {
  // For demo purposes only - use proper backend hashing in production
  let hashed = 0;
  for (let i = 0; i < value.length; i++) {
    const char = value.charCodeAt(i);
    hashed = (hashed << 5) - hashed + char;
    hashed = hashed & hashed; // Convert to 32bit integer
  }
  return `demo_${Math.abs(hashed).toString(36)}_${saltValue}`;
};

export const compare = (value: string, hashedValue: string): boolean => {
  // Compare by re-hashing the input value
  return hashedValue === hash(value);
};

export const encrypt = (val: unknown): Uint8Array => {
  const utf8encoder = new TextEncoder();
  return utf8encoder.encode(JSON.stringify(val));
};

export const decrypt = (encodedVal: Uint8Array): any => {
  const decoder = new TextDecoder();
  return JSON.parse(decoder.decode(encodedVal));
};
