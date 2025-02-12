from fastapi import FastAPI, Request, Query
import httpx
import uvicorn

app = FastAPI()


@app.api_route("/proxy", methods=["GET", "POST", "PUT", "DELETE"])
async def reverse_proxy(
    request: Request, target_url: str = Query(..., description="Target backend URL")
):
    """
    A reverse proxy that forwards requests to the given target_url.
    Example usage:
        http://localhost:8000/proxy?target_url=http://example.com
    """
    async with httpx.AsyncClient() as client:
        backend_response = await client.request(
            method=request.method,
            url=target_url,  # Forward request to the exact target URL
            headers=request.headers.raw,
            content=await request.body(),
        )

    return backend_response.json()


if __name__ == "__main__":
    from fastapi import FastAPI, Request, Query
import httpx
import uvicorn

app = FastAPI()


@app.api_route("/proxy", methods=["GET", "POST", "PUT", "DELETE"])
async def reverse_proxy(
    request: Request, target_url: str = Query(..., description="Target backend URL")
):
    """
    Reverse proxy forwarding requests to the given target_url.
    """
    async with httpx.AsyncClient() as client:
        backend_response = await client.request(
            method=request.method,
            url=target_url,
            content=await request.body(),
        )

    return backend_response.json()


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
