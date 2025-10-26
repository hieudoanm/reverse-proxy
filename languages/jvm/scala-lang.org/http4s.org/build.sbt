name := "reverse-proxy-http4s"
version := "0.0.1"
scalaVersion := "3.3.1"

libraryDependencies ++= Seq(
  "org.http4s" %% "http4s-ember-server" % "0.23.25",
  "org.http4s" %% "http4s-ember-client" % "0.23.25",
  "org.http4s" %% "http4s-dsl" % "0.23.32",
  "org.typelevel" %% "cats-effect" % "3.5.1"
)

Compile / mainClass := Some("Application")
