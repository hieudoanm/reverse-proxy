import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import akka.http.scaladsl.server.Directives._
import akka.stream.Materializer
import scala.concurrent.{Await, ExecutionContextExecutor}
import scala.concurrent.duration._

object ProxyServer extends App {

  implicit val system: ActorSystem = ActorSystem("proxy")
  implicit val materializer: Materializer = Materializer(system)
  implicit val executionContext: ExecutionContextExecutor = system.dispatcher

  val route =
    path("proxy") {
      parameter("targetUrl") { targetUrl =>
        get {
          val request = HttpRequest(uri = targetUrl)
          complete(Http().singleRequest(request))
        }
      }
    }

  val bindingFuture = Http().newServerAt("localhost", 8080).bind(route)

  bindingFuture.foreach { _ =>
    println("✅ Reverse proxy running at http://localhost:8080/proxy?targetUrl=<URL>")
    println("Press CTRL+C to stop the server.")
  }

  // 👇 Keeps the JVM alive until manually terminated
  Await.result(system.whenTerminated, Duration.Inf)
}
