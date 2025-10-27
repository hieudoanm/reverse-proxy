name := "reverse-proxy-http4s"
version := "0.0.1"
scalaVersion := "3.7.3"

libraryDependencies ++= Seq(
  "org.http4s" %% "http4s-ember-server" % "0.23.32",
  "org.http4s" %% "http4s-ember-client" % "0.23.25",
  "org.http4s" %% "http4s-dsl" % "0.23.32",
  "org.typelevel" %% "cats-effect" % "3.7-4972921"
)

Compile / mainClass := Some("Application")
