#include <boost/beast.hpp>
#include <boost/asio.hpp>
#include <iostream>
#include <string>

namespace beast = boost::beast;
namespace http = beast::http;
namespace net = boost::asio;
using tcp = net::ip::tcp;

// Extract target host and path from query
bool parse_target_url(const std::string& request, std::string& host, std::string& path) {
    size_t pos = request.find("?target=http://");
    if (pos == std::string::npos) return false;

    std::string target = request.substr(pos + 9);
    size_t path_start = target.find("/");
    if (path_start == std::string::npos) {
        host = target;
        path = "/";
    } else {
        host = target.substr(0, path_start);
        path = target.substr(path_start);
    }
    return true;
}

// Forward HTTP request to the target server
std::string forward_request(const std::string& host, const std::string& path, net::io_context& ioc) {
    try {
        tcp::resolver resolver(ioc);
        tcp::socket socket(ioc);

        // Resolve domain and connect
        auto endpoints = resolver.resolve(host, "80");
        net::connect(socket, endpoints);

        // Create HTTP GET request
        http::request<http::string_body> req{http::verb::get, path, 11};
        req.set(http::field::host, host);
        req.set(http::field::user_agent, BOOST_BEAST_VERSION_STRING);

        // Send request
        http::write(socket, req);

        // Receive response
        beast::flat_buffer buffer;
        http::response<http::dynamic_body> res;
        http::read(socket, buffer, res);

        // Convert response body to string
        std::ostringstream response_stream;
        response_stream << res;

        return response_stream.str();
    } catch (std::exception& e) {
        return "HTTP/1.1 502 Bad Gateway\r\n\r\nError: " + std::string(e.what());
    }
}

// Handle client requests
void handle_client(tcp::socket client_socket) {
    beast::flat_buffer buffer;
    http::request<http::string_body> req;

    try {
        // Read HTTP request from client
        http::read(client_socket, buffer, req);
        std::string request_text = req.target().to_string();

        // Extract target host & path from query
        std::string host, path;
        if (!parse_target_url(request_text, host, path)) {
            std::string error_response = "HTTP/1.1 400 Bad Request\r\n\r\nMissing target URL";
            http::write(client_socket, http::response<http::string_body>{http::status::bad_request, 11, error_response});
            return;
        }

        // Forward request to target server
        net::io_context ioc;
        std::string response = forward_request(host, path, ioc);

        // Send response back to client
        http::write(client_socket, http::response<http::string_body>{http::status::ok, 11, response});
    } catch (std::exception& e) {
        std::cerr << "Error: " << e.what() << "\n";
    }
}

// Main function to start the proxy server
int main() {
    try {
        net::io_context ioc;
        tcp::acceptor acceptor(ioc, {tcp::v4(), 8080});
        std::cout << "Reverse Proxy running on port 8080...\n";

        while (true) {
            tcp::socket socket(ioc);
            acceptor.accept(socket);
            std::thread(handle_client, std::move(socket)).detach();
        }
    } catch (std::exception& e) {
        std::cerr << "Error: " << e.what() << "\n";
    }

    return 0;
}
