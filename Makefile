build:
	go build -o ./bin/main

dev:
	go run ./api/main.go

format:
	gofmt -s -w .

start:
	./bin/main
