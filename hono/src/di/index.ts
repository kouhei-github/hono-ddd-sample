import {IWebHooks, WebHooks} from "../Presentation/Api/Server/Router";
import {Hono} from "hono";
import {IEnvLib} from "../Pkg/Env/EnvLib";
import {AuthController} from "../Presentation/Api/Server/Controller/Auth/AuthController";
import {LoginUseCase} from "../Application/UseCase/Auth/LoginUseCase";
import {JwtTokenExternal} from "../Infrastructure/External/JwtToken/JwtTokenExternal";

export const injection = (app: Hono, envLib: IEnvLib): IWebHooks => {
  const jwtExternal = JwtTokenExternal.builder(envLib)
  const loginUseCase = LoginUseCase.builder(jwtExternal)
  const authController = AuthController.builder(loginUseCase)
  return WebHooks.builder(app, authController)
}