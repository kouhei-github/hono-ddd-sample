import {StatusCode} from "hono/dist/types/utils/http-status";

export type IResponse = {
  data: any
  status: StatusCode
  message: string
}
