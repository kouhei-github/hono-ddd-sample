import {IAuthController, ITemplateController} from "../../Router/Impluments";
import {Context} from "hono";
import {authSchema} from "./Schema";
import {ILoginUseCase} from "../../../../../Application/UseCase/Impluments/Auth";

export class AuthController implements IAuthController {
  constructor(private readonly luc: ILoginUseCase) {
  }

  async login(c: Context): Promise<void | Response>{
    try {
      const body = await c.req.json()
      const {email, password} = authSchema.parse(body)
      const result = await this.luc.execute(email, password)
      return c.json(result.data, result.status)
    } catch (error) {
      if (error instanceof Error) {
        // エラーをキャッチ
        return c.json({ data: `${error.message}` }, 400)
      }
      return c.json({ data: `予期せぬエラーが発生しました` }, 400)
    }
  }

  static builder(luc: ILoginUseCase): IAuthController {
    return new this(luc)
  }
}