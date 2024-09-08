import {Hono} from "hono";
import {IAuthController} from "./Impluments";

export interface IWebHooks {
  register(): void
}

export class WebHooks implements IWebHooks {
  constructor(private readonly app: Hono, private readonly auth: IAuthController) {
  }
  register(): void {
    // TODO OpenApiでswagerの作成(hono-openapi)
    // 認証用ルーティング
    this.authRouter()

    // パブリック公開用のルーティング
    this.publicRouter()

  }

  private authRouter(): void {
    const authRouter = this.app.basePath("/v1/auth")
    authRouter.post("/login", (c) => this.auth.login(c))
  }

  private publicRouter(): void {
    const publicRouter = this.app.basePath("/v1")
    publicRouter.get('/health', (c) => {
      return c.text('Hello Hono!')
    })
  }

  static builder(app: Hono, auth: IAuthController): IWebHooks {
    return new this(app, auth)
  }
}