import logging
import time
import requests
from pyramid.config import Configurator
from pyramid.response import Response
from waitress import serve
from urllib.parse import urlparse

# ===== Logging Setup =====
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger("pyramid.reverse_proxy")
# =========================

# Hop-by-hop headers that cannot be sent in WSGI
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


def proxy_view(request):
    start_time = time.time()
    client_ip = request.remote_addr or "unknown"

    try:
        target_url = request.params.get("url")
        if not target_url:
            logger.warning(f"[{client_ip}] Missing 'url' parameter")
            return Response("Missing 'url' query parameter", status=400)

        parsed = urlparse(target_url)
        if parsed.scheme not in ("http", "https"):
            logger.warning(f"[{client_ip}] Invalid scheme in URL: {target_url}")
            return Response("Only http/https URLs are allowed", status=400)

        logger.info(f"🌐 [{client_ip}] {request.method} {request.path_qs}")
        logger.info(f"🔁 Target: {target_url}")

        # Forward headers and body (strip host)
        headers = {k: v for k, v in request.headers.items() if k.lower() != "host"}
        data = request.body if request.method in ("POST", "PUT", "PATCH") else None

        # Perform the upstream request
        resp = requests.request(
            method=request.method,
            url=target_url,
            headers=headers,
            data=data,
            allow_redirects=False,
            timeout=15,
        )

        elapsed = time.time() - start_time
        logger.info(
            f"✅ [{client_ip}] {request.method} {target_url} → {resp.status_code} ({elapsed:.2f}s)"
        )

        # Filter out hop-by-hop headers before returning to WSGI
        safe_headers = {
            k: v for k, v in resp.headers.items() if k.lower() not in HOP_BY_HOP
        }

        response = Response(
            body=resp.content,
            status=resp.status_code,
            headers=safe_headers,
        )
        return response

    except requests.exceptions.Timeout:
        logger.error(f"⏰ Timeout contacting {target_url}")
        return Response(f"Timeout contacting {target_url}", status=504)
    except requests.exceptions.RequestException as e:
        logger.exception(f"❌ Proxy request failed: {e}")
        return Response(f"Proxy error: {e}", status=502)
    except Exception as e:
        logger.exception(f"🔥 Unexpected error: {e}")
        return Response(f"Internal proxy error: {e}", status=500)


def main():
    config = Configurator()
    config.add_route("proxy", "/proxy")
    config.add_view(
        proxy_view,
        route_name="proxy",
        request_method=("GET", "POST", "PUT", "PATCH", "DELETE"),
    )
    app = config.make_wsgi_app()
    return app


if __name__ == "__main__":
    port = 8080
    logger.info(
        f"🚀 Pyramid reverse proxy running on http://127.0.0.1:{port}/proxy?url=<target>"
    )
    serve(main(), host="0.0.0.0", port=port)
