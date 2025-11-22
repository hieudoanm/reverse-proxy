package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.ws._
import scala.concurrent.{ExecutionContext, Future}
import akka.util.ByteString

@Singleton
class ReverseProxyController @Inject()(
    ws: WSClient,
    cc: ControllerComponents
)(implicit ec: ExecutionContext)
    extends AbstractController(cc) {

  /**
   * Reverse proxy endpoint.
   * Example:
   *   GET  /proxy?target=https://jsonplaceholder.typicode.com/todos/1
   *   POST /proxy?target=http://localhost:8081/api/data
   */
  def proxy() = Action.async { request =>
    val maybeTarget = request.getQueryString("target")

    maybeTarget match {
      case Some(rawTarget) =>
        // Basic validation — only allow http(s)
        if (!rawTarget.startsWith("http://") && !rawTarget.startsWith("https://")) {
          Future.successful(BadRequest("Invalid target URL (must start with http/https)"))
        } else {
          val wsRequest = ws.url(rawTarget)
            // .withHttpHeaders(request.headers.toSimpleMap.toSeq: _*)
            .withMethod(request.method)

          // Forward request body depending on content type
          val forwarded: Future[WSResponse] = request.body match {
            case AnyContentAsJson(json)         => wsRequest.withBody(json).execute()
            case AnyContentAsXml(xml)           => wsRequest.withBody(xml).execute()
            case AnyContentAsText(text)         => wsRequest.withBody(text).execute()
            case AnyContentAsRaw(raw)           => wsRequest.withBody(raw.asBytes().getOrElse(ByteString.empty)).execute()
            case AnyContentAsFormUrlEncoded(f)  => wsRequest.withBody(f).execute()
            case _                              => wsRequest.execute()
          }

          // Return upstream response directly
          forwarded.map { resp =>
            Status(resp.status)(resp.body)
              .withHeaders(resp.headers.view.mapValues(_.mkString(",")).toSeq: _*)
          }
        }

      case None =>
        Future.successful(BadRequest("Missing 'target' parameter"))
    }
  }
}
