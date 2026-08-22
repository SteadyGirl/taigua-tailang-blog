export async function onRequest(context) {
  const { request } = context;
  // 改成你自己的twikoo worker地址，https开头
  const upstreamBase = "https://twikoo‑cloudflare.3039704471.workers.dev";
  const reqUrl = new URL(request.url);
  const upstreamUrl = new URL(reqUrl.pathname, upstreamBase);
  upstreamUrl.search = reqUrl.search;

  const newReq = new Request(upstreamUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: "follow"
  });

  const resp = await fetch(newReq);
  return new Response(resp.body, resp);
}
