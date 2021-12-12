import { z } from "zod"

export const username = z
  .string()
  .regex(/(\w|_)+/)
  .transform((str) => str.trim().toLowerCase())

export const password = z.string().transform((str) => str.trim())

export const Signup = z.object({
  username,
  password,
})

export const Login = z.object({
  username,
  password: z.string(),
})
