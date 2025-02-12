from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse
import http.client


PORT = 8080  # Port where the proxy will run


class ReverseProxy(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_url = urlparse(self.path)
        target_url = parsed_url.query.replace("url=", "")  # Extract "url" query param
        print("target_url", target_url)

        if not target_url:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b'Missing "url" query parameter')
            return

        try:
            # Parse the target URL
            target = urlparse(target_url)
            http_connection = http.client.HTTPConnection(
                target.netloc
            )  # Connect to target host

            # Forward request to the target server
            # self.headers.replace_header("Host", target_url)
            # print("self.headers", self.headers)
            http_connection.request(
                "GET",
                target.path or "/",
            )

            # Get the response
            response = http_connection.getresponse()
            print("response", response)

            # Send response back to client
            print("response.status", response.status)
            self.send_response(response.status)
            for key, value in response.getheaders():
                self.send_header(key, value)
            self.end_headers()
            self.wfile.write(response.read())

        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(f"Proxy Error: {str(e)}".encode())


def run():
    server = HTTPServer(("0.0.0.0", PORT), ReverseProxy)
    print(f"Reverse Proxy running on port {PORT}")
    server.serve_forever()


if __name__ == "__main__":
    run()
