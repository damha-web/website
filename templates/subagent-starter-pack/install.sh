#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <target-project-path>"
  exit 1
fi

TARGET="$1"
SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

mkdir -p "$TARGET/docs/01-plan"
cp "$SOURCE_DIR/subagent-strategy.md" "$TARGET/subagent-strategy.md"
cp "$SOURCE_DIR"/docs/01-plan/subagent-*.md "$TARGET/docs/01-plan/"

echo "Installed Subagent Starter Pack to: $TARGET"
echo "Next: merge AGENTS.snippet.md into your project's AGENTS.md"
