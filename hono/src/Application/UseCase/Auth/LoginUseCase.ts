import {ILoginUseCase} from "../Impluments/Auth";
import {IResponse} from "../index";
import {IJwtTokenExternal} from "../../../Domain/Interface/External/JwtTokenExternal";

export class LoginUseCase implements ILoginUseCase{
  constructor(private readonly je: IJwtTokenExternal) {
  }

  async execute(email: string, password: string): Promise<IResponse>{
    try {
      const token = await this.je.generate(email, 1, "admin")
      const payload = await this.je.verify(token)
      if(!payload){
        return {
          data: 'Tokenが無効です',
          status: 403,
          message: 'Tokenが無効です',
        }
      }
      return { data: {payload, token}, status: 200, message: 'ログインできました' }
    } catch (e) {
      return {
        data: '',
        status: 400,
        message: `${e}`,
      }
    }
  }

  static builder(je: IJwtTokenExternal): ILoginUseCase {
    return new this(je)
  }
}