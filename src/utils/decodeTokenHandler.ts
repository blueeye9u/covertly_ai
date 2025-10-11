export const decodeTokenHandler = (name: string): string => {
  return Buffer.from(name, "base64").toString();
};
