.PHONY: ci lint format test

ci: format lint test

format:
	@echo "✨ Checking code formatting with Black..."
	python3 -m black --check .

lint:
	@echo "🔍 Running Ruff linter..."
	python3 -m ruff check .
