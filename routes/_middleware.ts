import { MiddlewareHandlerContext } from "$fresh/server.ts";

interface State {
  data: string;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const url = new URL(req.url);
  if (url.pathname != "/") {
    ctx.state.data = url.pathname;
  }
  const resp = await ctx.next();
  // console.log(req);
  resp.headers.set("server", "fresh server");
  return resp;
}
