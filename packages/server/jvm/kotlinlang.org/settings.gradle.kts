rootProject.name = "proxy-kotlin"

include("proxy-kotlin-ktor")
include("proxy-kotlin-spring")

project(":proxy-kotlin-ktor").projectDir = file("services/ktor.io")
project(":proxy-kotlin-spring").projectDir = file("services/spring.io")

pluginManagement {
  repositories {
    gradlePluginPortal()
    mavenCentral()
  }
}
