import { z } from 'zod'

export interface IEnvLib {
  getSecretKey(): string
  getJwtSecretKey(): string
}

const envSchema = z.object({
  SECRET_KEY: z.string(),
  JWT_SECRET_KEY: z.string(),
})

export class EnvLib implements IEnvLib {
  private SECRET_KEY: string
  private JWT_SECRET_KEY: string
  constructor() {
    const { SECRET_KEY, JWT_SECRET_KEY } = envSchema.parse(process.env)
    this.SECRET_KEY = SECRET_KEY
    this.JWT_SECRET_KEY = JWT_SECRET_KEY
  }

  public getSecretKey(): string {
    return this.SECRET_KEY
  }

  public getJwtSecretKey(): string {
    return this.JWT_SECRET_KEY
  }

  static builder(): IEnvLib {
    return new this()
  }
}
