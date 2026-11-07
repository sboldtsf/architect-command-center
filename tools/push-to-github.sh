#!/bin/bash
# Push the latest Architect Command Center repo zip to GitHub.
#
# Usage:   bash push-to-github.sh            (finds the newest repo zip for you)
#          bash push-to-github.sh path/to/architect-command-center-repo.zip
#
# What it does:
#   1. Finds the newest architect-command-center-repo.zip (Claude's Cowork folders, then Downloads).
#   2. Unzips it fresh into ~/cc-push.
#   3. Shows what will be pushed and asks you to confirm.
#   4. Pushes main, then pushes the version tags (moving a tag if it was re-tagged).
# It never force-pushes main. If GitHub has commits you don't have, it stops and tells you.

set -u
REMOTE_URL="${CC_REMOTE:-https://github.com/sboldtsf/architect-command-center.git}"
WORK="$HOME/cc-push"
NAME="architect-command-center-repo"

bold() { printf "\033[1m%s\033[0m\n" "$1"; }
ok()   { printf "\033[32m✓ %s\033[0m\n" "$1"; }
warn() { printf "\033[33m! %s\033[0m\n" "$1"; }
fail() { printf "\033[31m✗ %s\033[0m\n" "$1"; exit 1; }

# ---- 1. Find the zip
ZIP="${1:-}"
if [ -z "$ZIP" ]; then
  ZIP=$(find "$HOME/Library/Application Support/Claude/local-agent-mode-sessions" "$HOME/Downloads" "$HOME/Desktop" \
          -name "$NAME.zip" -type f -print0 2>/dev/null | xargs -0 ls -t 2>/dev/null | head -1)
fi
[ -n "$ZIP" ] && [ -f "$ZIP" ] || fail "Could not find $NAME.zip. Run: bash push-to-github.sh /path/to/$NAME.zip"
bold "Using: $ZIP"
echo "   saved $(date -r "$ZIP" '+%b %d, %I:%M %p')"

# ---- 2. Unzip fresh
rm -rf "$WORK" && mkdir -p "$WORK" || fail "Could not create $WORK"
unzip -q "$ZIP" -d "$WORK" || fail "Could not unzip the file"
cd "$WORK/$NAME" 2>/dev/null || fail "The zip doesn't contain a $NAME folder"
git rev-parse --git-dir >/dev/null 2>&1 || fail "That folder isn't a git repo"
ok "Unzipped to $WORK/$NAME"

# ---- 3. Connect to GitHub and compare
if git remote get-url origin >/dev/null 2>&1; then git remote set-url origin "$REMOTE_URL"; else git remote add origin "$REMOTE_URL"; fi
echo "Checking GitHub..."
git fetch -q origin 2>/dev/null || fail "Could not reach GitHub. Check your network or GitHub sign-in, then try again."
BR=$(git branch --show-current); [ -n "$BR" ] || BR=main

if git rev-parse -q --verify "origin/$BR" >/dev/null; then
  BEHIND=$(git rev-list --count "$BR..origin/$BR")
  if [ "$BEHIND" -gt 0 ]; then
    warn "GitHub has $BEHIND commit(s) on $BR that this zip doesn't have:"
    git log --oneline "$BR..origin/$BR" | head -10
    fail "Stopping so nothing on GitHub is overwritten. Ask Claude to merge those changes into the repo first."
  fi
  NEW=$(git log --oneline "origin/$BR..$BR")
else
  NEW=$(git log --oneline "$BR" | head -20)
fi

TAGS=$(git tag --points-at HEAD | tr '\n' ' ')
echo
bold "Ready to push to $REMOTE_URL"
if [ -n "$NEW" ]; then echo "New commits on $BR:"; echo "$NEW" | sed 's/^/   /'; else echo "No new commits on $BR (it's already up to date)."; fi
[ -n "$TAGS" ] && echo "Version tag on the latest commit: $TAGS"
echo
read -r -p "Push now? (y/n) " ANS
case "$ANS" in y|Y|yes|YES) ;; *) echo "Cancelled. Nothing was pushed."; exit 0 ;; esac

# ---- 4. Push
if [ -n "$NEW" ]; then git push origin "$BR" || fail "Push of $BR failed (see the message above)."; ok "Pushed $BR"; fi
git push -q origin --tags 2>/dev/null || true                 # new tags
for T in $TAGS; do git push -q --force origin "refs/tags/$T" && ok "Tag $T is on the latest commit"; done   # moved tags
echo
ok "Done. https://github.com/sboldtsf/architect-command-center"
