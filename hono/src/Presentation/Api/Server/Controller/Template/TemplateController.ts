import {ITemplateController} from "../../Router/Impluments";

export class TemplateController implements ITemplateController{
  constructor() {
  }

  execute(username: string, password: string){

  }

  static builder(): ITemplateController {
    return new this()
  }
}