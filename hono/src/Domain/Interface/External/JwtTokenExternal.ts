import {z} from "zod";

const jwtSchema = z.object({
  email: z.string().email(),
  role: z.string(),
  userId: z.number()
})

type jwtSchemaDto = z.infer<typeof jwtSchema>

export {
  jwtSchema,
  jwtSchemaDto
}

export interface IJwtTokenExternal {
  generate(email: string, userId: number, role: string): Promise<string>
  verify(token: string): Promise<jwtSchemaDto|undefined>
}