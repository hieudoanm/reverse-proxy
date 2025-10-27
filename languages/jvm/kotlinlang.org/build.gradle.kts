plugins {
  kotlin("jvm") version "2.2.21"

  checkstyle
  pmd
  id("com.github.spotbugs") version "6.0.15"
  id("com.diffplug.spotless") version "8.0.0"
}

subprojects {
  group = "io.proxy.reverse"
  version = "0.0.1-SNAPSHOT"
  description = "reverse-proxy"

  apply(plugin = "org.jetbrains.kotlin.jvm")
  apply(plugin = "checkstyle")
  apply(plugin = "pmd")
  apply(plugin = "com.github.spotbugs")
  apply(plugin = "com.diffplug.spotless")

  repositories {
    mavenCentral()
  }

  kotlin {
    jvmToolchain(21)
  }

  tasks.withType<Test> {
    useJUnitPlatform()
  }

  // Enable dependency locking for reproducible builds
  dependencyLocking {
    // Lock all configurations (implementation, testImplementation, etc.)
    lockAllConfigurations()
  }
}
