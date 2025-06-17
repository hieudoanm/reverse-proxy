# ========================
# Build Stage
# ========================
FROM gradle:8.7-jdk21 AS builder

WORKDIR /app

COPY build.gradle settings.gradle gradlew gradlew.bat gradle/ ./
COPY src/ ./src/

RUN ./gradlew clean build --no-daemon

# ========================
# Runtime Stage
# ========================
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
