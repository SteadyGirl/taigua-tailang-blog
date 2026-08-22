export default async function onRequest(context) {
  const { request } = context;
  const workerUrl = "https://twikoo-cloudflare.3039704471.workers.dev/"; // 替换成你的twikoo worker地址，例："https://twikoo-demo.xxx.workers.dev"

  const newUrl = new URL(request.url);
  const targetUrl = new URL(workerUrl);
  targetUrl.pathname = newUrl.pathname;
  targetUrl.search = newUrl.search;

  const newRequest = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: "follow"
  });

  return await fetch(newRequest);
}
