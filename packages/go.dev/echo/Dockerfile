FROM golang:1.24.4

LABEL maintainer="hieumdoan@gmail.com"
LABEL version="1.0"
LABEL description="Reverse Proxy - Echo"

WORKDIR /app

COPY . .

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o ./bin/main main.go

ENTRYPOINT ["./dist/main"]
