#!/bin/bash

################################################################################
# SKILLS CLEANUP SCRIPT
# Unloads all skills to prevent session bloat
# Run this after finishing a Claude Code session
################################################################################

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[CLEANUP]${NC} $1"
}

log_success() {
    echo -e "${GREEN}✅${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

# Check if Claude CLI is available
if ! command -v claude &> /dev/null; then
    echo "Claude CLI not found. Exiting."
    exit 1
fi

echo ""
log "Cleaning up skill configuration..."
echo ""

# All possible skills to unload
skills=(
    "Skill UI"
    "Impeccable"
    "Claude-seo"
    "Code Burn"
    "Playwright CLI"
    "Marketing Skills by Corey Haynes"
    "Context Engineering Skill"
    "Stop Slop Skill"
    "UI/UX Pro Max"
)

unloaded_count=0

for skill in "${skills[@]}"; do
    if claude skills unload "$skill" 2>/dev/null; then
        log_success "Unloaded: $skill"
        ((unloaded_count++))
    fi
done

echo ""
log_success "Cleanup complete! Unloaded $unloaded_count skills"
echo ""
log "Session memory cleared. Next session will start fresh."
echo ""
log "Optional: Show session cost summary"
echo "  Run: claude /cost"
echo ""
