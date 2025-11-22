from flask import Flask, request, jsonify
import requests

app = Flask(__name__)


@app.route("/proxy", methods=["GET", "POST", "PUT", "DELETE"])
def reverse_proxy():
    """
    A reverse proxy that forwards requests to a target_url provided as a query parameter.
    Example usage:
        GET http://localhost:5000/proxy?target_url=http://example.com/api/data
    """
    target_url = request.args.get("target_url")

    if not target_url:
        return jsonify({"error": "target_url query parameter is required"}), 400

    try:
        response = requests.request(
            method=request.method,
            url=target_url,
            headers={key: value for key, value in request.headers if key != "Host"},
            data=request.get_data(),
            cookies=request.cookies,
            allow_redirects=False,
        )

        return (response.content, response.status_code, response.headers.items())

    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
