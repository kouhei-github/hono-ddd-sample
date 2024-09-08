import {IResponse} from "../../index";

export interface ILoginUseCase {
  execute(email: string, password: string): Promise<IResponse>
}