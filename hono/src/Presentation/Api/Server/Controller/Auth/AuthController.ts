import {IAuthController, ITemplateController} from "../../Router/Impluments";
import {Context} from "hono";
import {authSchema} from "./Schema";
import {ILoginUseCase} from "../../../../../Application/UseCase/Impluments/Auth";

export class AuthController implements IAuthController {
  constructor(private readonly luc: ILoginUseCase) {
  }

  async login(c: Context): Promise<void | Response>{
    const body = await c.req.json()
    const {email, password} = authSchema.parse(body)
    const result = await this.luc.execute(email, password)
    if(result.status > 202){
      return c.json({message: result.message}, 400)
    }
    return c.json(result.data, result.status)
  }

  static builder(luc: ILoginUseCase): IAuthController {
    return new this(luc)
  }
}