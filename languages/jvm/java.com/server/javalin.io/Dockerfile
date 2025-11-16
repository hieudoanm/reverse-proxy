# ========================
# Build Stage
# ========================
FROM gradle:9.2-jdk21 AS builder

WORKDIR /app

COPY build.gradle settings.gradle gradlew gradlew.bat gradle/ ./
COPY src/ ./src/

RUN ./gradlew clean build --no-daemon

# ========================
# Runtime Stage
# ========================
FROM eclipse-temurin:25.0.1_8-jre

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
