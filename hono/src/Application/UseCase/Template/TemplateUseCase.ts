import {ILoginUseCase} from "../Impluments/Auth";
import {ITemplateUseCase} from "../Impluments/Template";

export class TemplateUseCase implements ITemplateUseCase{
  constructor() {
  }

  execute(username: string, password: string){

  }

  static builder(): ILoginUseCase {
    return new this()
  }
}