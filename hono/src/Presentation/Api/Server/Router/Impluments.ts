import {Context} from "hono";

export interface ITemplateController {}

export interface IAuthController {
  login(c: Context): Promise<void | Response>
}
