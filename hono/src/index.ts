import { Hono } from 'hono'
import {EnvLib} from "./Pkg/Env/EnvLib";
import {injection} from "./di";
import { cors } from 'hono/cors'

// 環境変数の読み込み
const envLib = EnvLib.builder()

const app = new Hono().basePath("/api")
app.use(cors())

const router = injection(app, envLib)

router.register()

export default app
