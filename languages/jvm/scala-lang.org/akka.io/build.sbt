name := "reverse-proxy-akka"
version := "0.0.1"
scalaVersion := "2.13.18"

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor-typed" % "2.8.8",
  "com.typesafe.akka" %% "akka-stream" % "2.8.8",
  "com.typesafe.akka" %% "akka-http" % "10.5.3"  // ✅ use 10.5.3 (latest on Maven Central)
)

ThisBuild / resolvers ++= Seq(
  "Akka library repository" at "https://repo.akka.io/maven",
  Resolver.sonatypeRepo("public")
)
