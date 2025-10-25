plugins {
    application
    kotlin("jvm") version "2.2.21"

    checkstyle
    pmd
    id("com.diffplug.spotless") version "6.25.0"
}

version = "0.0.1"
group = "com.proxy.reverse"

java {
    sourceCompatibility = JavaVersion.VERSION_21
}

application {
    mainClass.set("com.proxy.reverse.ApplicationKt")
}


repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-server-core-jvm:3.3.1")
    implementation("io.ktor:ktor-server-netty-jvm:3.3.1")
    implementation("io.ktor:ktor-client-core-jvm:3.3.1")
    implementation("io.ktor:ktor-server-call-logging:3.3.1")
    implementation("io.ktor:ktor-client-cio-jvm:3.3.1")
    implementation("io.ktor:ktor-client-encoding:3.3.1")

    testImplementation(kotlin("test"))
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
  toolVersion = "12.1.0" // Latest stable version
  config = resources.text.fromFile("config/checkstyle/checkstyle.xml")
}

/**
 * -------------------------
 * PMD Configuration
 * -------------------------
 */
pmd {
  toolVersion = "7.17.0" // Latest PMD version
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
