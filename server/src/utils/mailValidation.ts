import CustomError from "../error/customError";

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    throw new CustomError("Invalid email format", 400);
}
