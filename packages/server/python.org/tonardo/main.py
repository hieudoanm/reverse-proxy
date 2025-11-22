import urllib.parse
import tornado.ioloop
import tornado.web
import httpx
import time
import logging

# ========= Config =========
TIMEOUT = 10.0  # seconds
ALLOWED_SCHEMES = {"http", "https"}
LOG_FORMAT = "[%(asctime)s] %(levelname)s: %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
logger = logging.getLogger("proxy")
# ==========================

HOP_BY_HOP = {
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailers",
    "transfer-encoding",
    "upgrade",
}


class QueryParamProxyHandler(tornado.web.RequestHandler):
    async def prepare(self):
        """
        Reverse proxy that fetches the full target URL from ?url=<target>.
        Example:
          /proxy?url=https://api.github.com/users/octocat
        """
        start_time = time.time()
        target = self.get_query_argument("url", None)
        if not target:
            self.set_status(400)
            msg = "Missing 'url' query parameter."
            logger.warning(f"{self.request.remote_ip} → 400 {msg}")
            self.finish(msg)
            return

        parsed = urllib.parse.urlparse(target)
        if parsed.scheme not in ALLOWED_SCHEMES:
            self.set_status(400)
            msg = f"Invalid URL scheme '{parsed.scheme}'. Only http/https allowed."
            logger.warning(f"{self.request.remote_ip} → 400 {msg}")
            self.finish(msg)
            return

        # Copy headers except hop-by-hop + Host
        headers = {
            k: v
            for k, v in self.request.headers.items()
            if k.lower() not in HOP_BY_HOP and k.lower() != "host"
        }

        # Add forwarding headers
        headers["X-Forwarded-For"] = self.request.remote_ip
        headers["X-Forwarded-Host"] = self.request.host
        headers["X-Forwarded-Proto"] = self.request.protocol

        method = self.request.method.upper()
        body = self.request.body if self.request.body else None

        logger.info(f"🔁 {method} {target} ← {self.request.remote_ip}")

        try:
            async with httpx.AsyncClient(
                timeout=TIMEOUT, follow_redirects=False
            ) as client:
                async with client.stream(
                    method, url=target, headers=headers, content=body
                ) as upstream_resp:
                    # Copy status + headers
                    self.set_status(upstream_resp.status_code)
                    for k, v in upstream_resp.headers.items():
                        if k.lower() not in HOP_BY_HOP | {
                            "content-length",
                            "transfer-encoding",
                        }:
                            self.set_header(k, v)

                    # Stream body back to client
                    async for chunk in upstream_resp.aiter_bytes():
                        self.write(chunk)
                        await self.flush()
                    self.finish()

                    duration = (time.time() - start_time) * 1000
                    logger.info(
                        f"✅ {method} {target} → {upstream_resp.status_code} ({duration:.1f} ms)"
                    )

        except httpx.RequestError as exc:
            duration = (time.time() - start_time) * 1000
            logger.error(f"❌ {method} {target} failed after {duration:.1f} ms: {exc}")
            self.set_status(502)
            self.finish(f"Upstream request failed: {exc}")


def make_app():
    return tornado.web.Application(
        [
            (r"/proxy", QueryParamProxyHandler),
        ],
        debug=True,
    )


if __name__ == "__main__":
    port = 8080
    app = make_app()
    app.listen(port)
    logger.info(
        f"🚀 Tornado proxy running on http://127.0.0.1:{port}/proxy?url=<target>"
    )
    tornado.ioloop.IOLoop.current().start()
