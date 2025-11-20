plugins {
  application
  kotlin("jvm") version "2.2.21"

  checkstyle
  pmd
  id("com.diffplug.spotless") version "8.1.0"

  id("org.springframework.boot") version "3.5.8"
  id("io.spring.dependency-management") version "1.1.7"
  kotlin("plugin.spring") version "2.2.21"
}

group = "io.proxy.reverse"
version = "0.0.1-SNAPSHOT"

java {
  sourceCompatibility = JavaVersion.VERSION_21
}

repositories {
  mavenCentral()
}

application {
  mainClass.set("io.proxy.reverse.ApplicationKt") // Ensure this matches your main class
}

repositories {
  mavenCentral()
}

dependencies {
  implementation("org.springframework.boot:spring-boot-starter-webflux")
  implementation("org.jetbrains.kotlin:kotlin-reflect")
  implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

  testImplementation("org.springframework.boot:spring-boot-starter-test")
  testImplementation("io.projectreactor:reactor-test")
}

tasks.test {
  useJUnitPlatform()
}

/**
 * -------------------------
 * Checkstyle Configuration
 * -------------------------
 */
checkstyle {
  toolVersion = "12.1.2" // Latest stable version
  config = resources.text.fromFile("config/checkstyle/checkstyle.xml")
}

/**
 * -------------------------
 * PMD Configuration
 * -------------------------
 */
pmd {
  toolVersion = "7.18.0" // Latest PMD version
  ruleSetFiles = files("config/pmd/pmd-ruleset.xml")
}

spotless {
  java {
    googleJavaFormat()  // auto-format according to Google Java Style
  }
}

// Enable dependency locking for reproducible builds
dependencyLocking {
  // Lock all configurations (implementation, testImplementation, etc.)
  lockAllConfigurations()
}
