name := "proxy-play"
version := "0.0.1"
scalaVersion := "2.13.18"

libraryDependencies ++= Seq(
  guice,
  "com.typesafe.play" %% "play-ahc-ws" % play.core.PlayVersion.current
)

enablePlugins(PlayScala)
