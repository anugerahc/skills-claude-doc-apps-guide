#!/usr/bin/env bash
# App User Guide Generator installer — auto-detect AI coding tool(s) in target project and wire up
# the adapter.
# Usage:
#   ./install.sh [target-dir] [--tool claude|antigravity|kiro|cursor|codex] [--all]
# Default target-dir: current directory. Without --tool/--all, auto-detects by existing folders
# and falls back to asking interactively if nothing is detected.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="."
TOOLS=()
ALL=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --tool) TOOLS+=("$2"); shift 2 ;;
    --all) ALL=true; shift ;;
    *) TARGET="$1"; shift ;;
  esac
done

TARGET="$(cd "$TARGET" && pwd)"
echo "Target project: $TARGET"

# 1. Copy core + template (always, merge — never delete unrelated files)
mkdir -p "$TARGET/_app-user-guide-generator"
cp -r "$SCRIPT_DIR/core" "$TARGET/_app-user-guide-generator/"
cp -r "$SCRIPT_DIR/template" "$TARGET/_app-user-guide-generator/"
echo "core/ + template/ copied to $TARGET/_app-user-guide-generator/"

# 2. Detect tools if not explicitly given
if [[ ${#TOOLS[@]} -eq 0 && "$ALL" == false ]]; then
  [[ -d "$TARGET/.claude" ]] && TOOLS+=("claude")
  [[ -d "$TARGET/.agents" ]] && TOOLS+=("antigravity")
  [[ -d "$TARGET/.kiro" ]] && TOOLS+=("kiro")
  [[ -d "$TARGET/.cursor" ]] && TOOLS+=("cursor")
  [[ -f "$TARGET/AGENTS.md" ]] && TOOLS+=("codex")

  if [[ ${#TOOLS[@]} -eq 0 ]]; then
    echo "Gak kedetek tool AI coding apapun di $TARGET."
    echo "Pilih manual (pisah spasi) dari: claude antigravity kiro cursor codex"
    read -r -p "> " -a TOOLS
  else
    echo "Kedetek tool: ${TOOLS[*]}"
  fi
fi
[[ "$ALL" == true ]] && TOOLS=(claude antigravity kiro cursor codex)

# 3. Install adapter per tool
for tool in "${TOOLS[@]}"; do
  case "$tool" in
    claude)
      mkdir -p "$TARGET/.claude/skills/app-user-guide-generator"
      cp "$SCRIPT_DIR/adapters/claude-code/SKILL.md" "$TARGET/.claude/skills/app-user-guide-generator/SKILL.md"
      echo "[claude] .claude/skills/app-user-guide-generator/SKILL.md"
      ;;
    antigravity)
      mkdir -p "$TARGET/.agents/skills/app-user-guide-generator" "$TARGET/.agents/workflows"
      cp "$SCRIPT_DIR/adapters/antigravity/.agents/skills/app-user-guide-generator/SKILL.md" "$TARGET/.agents/skills/app-user-guide-generator/SKILL.md"
      cp "$SCRIPT_DIR/adapters/antigravity/.agents/workflows/app_user_guide_generator.md" "$TARGET/.agents/workflows/app_user_guide_generator.md"
      echo "[antigravity] .agents/skills/app-user-guide-generator/, .agents/workflows/app_user_guide_generator.md"
      ;;
    kiro)
      mkdir -p "$TARGET/.kiro/steering"
      cp "$SCRIPT_DIR/adapters/kiro/.kiro/steering/app-user-guide-generator.md" "$TARGET/.kiro/steering/app-user-guide-generator.md"
      echo "[kiro] .kiro/steering/app-user-guide-generator.md"
      ;;
    cursor)
      mkdir -p "$TARGET/.cursor/rules"
      cp "$SCRIPT_DIR/adapters/cursor/.cursor/rules/app-user-guide-generator.mdc" "$TARGET/.cursor/rules/app-user-guide-generator.mdc"
      echo "[cursor] .cursor/rules/app-user-guide-generator.mdc"
      ;;
    codex)
      MARKER="<!-- app-user-guide-generator:start -->"
      if [[ -f "$TARGET/AGENTS.md" ]] && grep -qF "$MARKER" "$TARGET/AGENTS.md"; then
        echo "[codex] AGENTS.md already has app-user-guide-generator block, skipped"
      else
        {
          echo ""
          echo "$MARKER"
          cat "$SCRIPT_DIR/adapters/codex/AGENTS.md"
          echo "<!-- app-user-guide-generator:end -->"
        } >> "$TARGET/AGENTS.md"
        echo "[codex] appended block to AGENTS.md"
      fi
      ;;
    *)
      echo "Tool gak dikenal: $tool (skip)"
      ;;
  esac
done

echo ""
echo "Selesai. Baca $TARGET/_app-user-guide-generator/core/app-user-guide-generator-core.md buat metodologi lengkap."
