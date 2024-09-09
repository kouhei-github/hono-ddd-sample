import {ILoginUseCase} from "../Impluments/Auth";
import {IResponse} from "../index";
import {IJwtTokenExternal} from "../../../Domain/Interface/External/JwtTokenExternal";
import {Email} from "../../../Domain/Model/UserModel/email";
import {Password} from "../../../Domain/Model/UserModel/password";

export class LoginUseCase implements ILoginUseCase{
  constructor(private readonly je: IJwtTokenExternal) {
  }

  async execute(email: string, password: string): Promise<IResponse>{
    const emailVo = new Email(email)
    const passwordVo = new Password(password)

    const token = await this.je.generate(emailVo.getValue(), 1, "admin")
    const payload = await this.je.verify(token)
    if(!payload){
      throw new Error("Tokenが無効です")
    }
    return { data: {payload, token}, status: 200 }
  }

  static builder(je: IJwtTokenExternal): ILoginUseCase {
    return new this(je)
  }
}