# -----------------------------------------
# Go multi-module workspace utilities
# -----------------------------------------
MODULES := $(shell find server -mindepth 1 -maxdepth 1 -type d -exec test -e "{}/go.mod" ';' -print)

.PHONY: ci fmt vet lint

ci: fmt vet lint

fmt:
	@echo "🧹 Running go fmt on all modules..."
	@for mod in $(MODULES); do \
		echo "→ Formatting $$mod"; \
		(cd $$mod && go fmt ./...); \
	done

vet:
	@echo "🔍 Running go vet on all modules..."
	@for mod in $(MODULES); do \
		echo "→ Vetting $$mod"; \
		(cd $$mod && go vet ./...); \
	done

lint:
	@echo "🧠 Running golangci-lint on all modules..."
	@for mod in $(MODULES); do \
		if [ -f "$$mod/go.mod" ]; then \
			echo "→ Linting $$mod"; \
			(cd $$mod && golangci-lint run ./...); \
		fi; \
	done
