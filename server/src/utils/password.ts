import crypto from "crypto";

export const generateRandomPassword = (length = 10) => {
  return crypto
    .randomBytes(length)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, length);
};
