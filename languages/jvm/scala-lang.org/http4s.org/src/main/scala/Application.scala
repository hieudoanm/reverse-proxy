import cats.effect._
import com.comcast.ip4s._
import org.http4s._
import org.http4s.client._
import org.http4s.ember.client._
import org.http4s.dsl.io._
import org.http4s.server._
import org.http4s.ember.server._
import org.typelevel.ci.CIString

object ReverseProxyApp extends IOApp {

  def clientResource: Resource[IO, Client[IO]] = EmberClientBuilder.default[IO].build

  def proxyService(client: Client[IO]): HttpApp[IO] = HttpApp[IO] { req =>
    req.uri.query.params.get("url") match {
      case Some(targetUrl) =>
        Uri.fromString(targetUrl) match {
          case Right(targetUri) =>
            val filteredHeaders = Headers(
              req.headers.headers.filterNot(_.name == CIString("Host"))
            )
            val forwardReq = Request(
              method = req.method,
              uri = targetUri,
              headers = filteredHeaders
            ).withEntity(req.body)

            client.run(forwardReq).use { resp =>
              IO.pure(
                Response[IO](
                  status = resp.status,
                  headers = resp.headers
                ).withEntity(resp.body)
              )
            }
          case Left(err) =>
            BadRequest(s"Invalid target URL: $err")
        }
      case None =>
        BadRequest("Missing 'url' query parameter")
    }
  }

  override def run(args: List[String]): IO[ExitCode] =
    clientResource.use { client =>
      org.http4s.ember.server.EmberServerBuilder
        .default[IO]
        .withHost(host"0.0.0.0")
        .withPort(port"8080")
        .withHttpApp(proxyService(client))
        .build
        .useForever
        .as(ExitCode.Success)
    }
}
