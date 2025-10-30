# ========================
# Build Stage
# ========================
FROM gradle:9.2-jdk21 AS builder

WORKDIR /app

COPY build.gradle.kts settings.gradle.kts gradlew gradlew.bat gradle/ ./
COPY src/ ./src/

RUN ./gradlew clean build --no-daemon

# ========================
# Runtime Stage
# ========================
FROM eclipse-temurin:25-jre

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
