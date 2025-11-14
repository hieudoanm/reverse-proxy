build:
	bazel build //...

sync:
	bazel clean --expunge
	bazel mod tidy
	bazel sync --enable_workspace
