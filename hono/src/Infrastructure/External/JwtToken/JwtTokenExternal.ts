import {IJwtTokenExternal, jwtSchema, jwtSchemaDto} from "../../../Domain/Interface/External/JwtTokenExternal";
import {IEnvLib} from "../../../Pkg/Env/EnvLib";
import { sign, verify } from 'hono/jwt'


export class JwtTokenExternal implements IJwtTokenExternal {
  constructor(private readonly envLiv: IEnvLib) {
  }

  async generate(email: string, userId: number, role: string): Promise<string> {
    const payload = {
      email,
      role,
      userId,
      exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
    }
    const token = await sign(payload, this.envLiv.getJwtSecretKey())
    return token
  }

  async verify(token: string): Promise<jwtSchemaDto|undefined> {
    try {
      const decodedPayload = await verify(token, this.envLiv.getJwtSecretKey())
      const payload = jwtSchema.parse(decodedPayload)
      return payload
    } catch (e) {
      return undefined
    }

  }

  static builder(envLiv: IEnvLib): IJwtTokenExternal {
    return new this(envLiv)
  }
}