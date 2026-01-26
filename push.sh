#!/bin/bash

# Stop if not inside a git repo
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
  echo "❌ Not a git repository"
  exit 1
}

# Check commit message
if [ -z "$1" ]; then
  echo "❌ Commit message required"
  echo "Usage: ./push.sh \"your commit message\""
  exit 1
fi

echo "📦 Adding changes..."
git add .

echo "📝 Committing..."
git commit -m "$1" || exit 1

echo "🚀 Pushing to origin/term..."
git push origin term

echo "✅ Done!"
