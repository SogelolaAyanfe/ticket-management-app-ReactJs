import bcrypt from "bcryptjs";

const saltValue = 10;

export const hash = (value: string) => {
  const salt = bcrypt.genSaltSync(saltValue);
  return bcrypt.hashSync(value, salt);
};

export const compare = (value: string, hash: string) =>
  bcrypt.compareSync(value, hash);

export const encrypt = (val: unknown) => {
  const utf8encoder = new TextEncoder();
  return utf8encoder.encode(JSON.stringify(val));
};

export const decrypt = (encodedVal: Uint8Array<ArrayBuffer>) => {
  const decoder = new TextDecoder();
  return JSON.parse(decoder.decode(encodedVal));
};
