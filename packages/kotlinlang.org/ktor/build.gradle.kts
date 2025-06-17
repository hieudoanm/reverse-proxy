plugins {
    application
    kotlin("jvm") version "1.9.25"
}

application {
    mainClass.set("com.reverse.proxy.ApplicationKt")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-server-core-jvm:2.3.13")
    implementation("io.ktor:ktor-server-netty-jvm:2.3.13")
    implementation("io.ktor:ktor-client-core-jvm:2.3.13")
    implementation("io.ktor:ktor-client-cio-jvm:2.3.13")
    implementation("io.ktor:ktor-server-call-logging:2.3.13")
    testImplementation(kotlin("test"))
}

tasks.test {
    useJUnitPlatform()
}
