import {z} from "zod";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export {
  authSchema
}