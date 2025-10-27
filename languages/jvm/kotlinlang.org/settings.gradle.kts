rootProject.name = "reverse-proxy-kotlin"

include("reverse-proxy-kotlin-ktor")
include("reverse-proxy-kotlin-spring")

project(":reverse-proxy-kotlin-ktor").projectDir = file("services/ktor.io")
project(":reverse-proxy-kotlin-spring").projectDir = file("services/spring.io")

pluginManagement {
  repositories {
    gradlePluginPortal()
    mavenCentral()
  }
}
