plugins {
    application
    kotlin("jvm") version "2.2.20"
}

application {
    mainClass.set("com.reverse.proxy.ApplicationKt")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-server-core-jvm:3.2.3")
    implementation("io.ktor:ktor-server-netty-jvm:3.2.3")
    implementation("io.ktor:ktor-client-core-jvm:3.2.3")
    implementation("io.ktor:ktor-client-cio-jvm:3.2.3")
    implementation("io.ktor:ktor-server-call-logging:3.2.3")
    testImplementation(kotlin("test"))
}

tasks.test {
    useJUnitPlatform()
}
