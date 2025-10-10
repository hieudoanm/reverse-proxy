name := "reverse-proxy"
version := "1.0"
scalaVersion := "2.13.14"

libraryDependencies ++= Seq(
  guice,
  "com.typesafe.play" %% "play-ahc-ws" % play.core.PlayVersion.current
)

enablePlugins(PlayScala)
