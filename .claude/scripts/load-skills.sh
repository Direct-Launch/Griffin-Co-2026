#!/bin/bash

################################################################################
# CLAUDE SKILLS AUTO-LOADER
# Automatically loads skill configurations based on task type
# Eliminates manual skill management and prevents bloat
################################################################################

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Log function
log() {
    echo -e "${BLUE}[CLAUDE]${NC} $1"
}

log_success() {
    echo -e "${GREEN}✅${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

log_error() {
    echo -e "${RED}❌${NC} $1"
}

# Check if Claude CLI is available
check_claude_cli() {
    if ! command -v claude &> /dev/null; then
        log_error "Claude CLI not found. Please install it first:"
        echo "npm install -g @anthropic-ai/claude-code"
        exit 1
    fi
}

# Unload all skills before loading new config
unload_all_skills() {
    log "Unloading previous skill configuration..."
    
    # List of all possible skills to unload
    local all_skills=(
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
    
    for skill in "${all_skills[@]}"; do
        claude skills unload "$skill" 2>/dev/null || true
    done
}

# Load skills for page building
load_config_page() {
    log "Loading Configuration A: Page Building"
    
    claude skills load "Skill UI"
    log_success "Loaded: Skill UI (component building)"
    
    claude skills load "Impeccable"
    log_success "Loaded: Impeccable (code quality)"
    
    claude skills load "Claude-seo"
    log_success "Loaded: Claude-seo (SEO implementation)"
    
    log_success "✨ Configuration A Ready (Page Building)"
    echo ""
    echo "Expected session:"
    echo "  • Duration: 60-90 minutes"
    echo "  • Cost: ~6-8K tokens"
    echo "  • Workflow: Build → Quality Check → Deploy"
    echo ""
    echo "Next: claude /cost to track spending"
}

# Load skills for blog post
load_config_blog() {
    log "Loading Configuration B: Blog Post"
    
    claude skills load "Claude-seo"
    log_success "Loaded: Claude-seo (SEO + writing)"
    
    claude skills load "Impeccable"
    log_success "Loaded: Impeccable (quality)"
    
    log_success "✨ Configuration B Ready (Blog Post)"
    echo ""
    echo "Expected session:"
    echo "  • Duration: 40-60 minutes"
    echo "  • Cost: ~3-5K tokens"
    echo "  • Workflow: Write → Optimize → Publish"
    echo ""
    echo "Optional: Add Stop Slop before final publish"
}

# Load skills for component building
load_config_component() {
    log "Loading Configuration C: Complex Component"
    
    claude skills load "Skill UI"
    log_success "Loaded: Skill UI (building)"
    
    claude skills load "Impeccable"
    log_success "Loaded: Impeccable (quality)"
    
    claude skills load "Code Burn"
    log_success "Loaded: Code Burn (optimization)"
    
    log_success "✨ Configuration C Ready (Component)"
    echo ""
    echo "Expected session:"
    echo "  • Duration: 90-120 minutes"
    echo "  • Cost: ~8-10K tokens"
    echo "  • Workflow: Build → Check → Optimize → Test"
    echo ""
    echo "Next: Add Playwright CLI before final merge"
}

# Load skills for performance optimization
load_config_optimize() {
    log "Loading Configuration D: Performance Optimization"
    
    claude skills load "Code Burn"
    log_success "Loaded: Code Burn (minification + optimization)"
    
    claude skills load "Impeccable"
    log_success "Loaded: Impeccable (quality)"
    
    log_success "✨ Configuration D Ready (Optimization)"
    echo ""
    echo "Expected session:"
    echo "  • Duration: 20-30 minutes"
    echo "  • Cost: ~3-4K tokens"
    echo "  • Workflow: Optimize → Verify → Test"
    echo ""
    echo "Use AFTER initial build (run this second, not first)"
}

# Load testing configuration
load_config_test() {
    log "Loading Testing Configuration"
    
    claude skills load "Playwright CLI"
    log_success "Loaded: Playwright CLI (browser testing)"
    
    claude skills load "Impeccable"
    log_success "Loaded: Impeccable (final quality check)"
    
    log_success "✨ Testing Configuration Ready"
    echo ""
    echo "Expected session:"
    echo "  • Duration: 15-20 minutes"
    echo "  • Cost: ~2-3K tokens"
    echo "  • Workflow: Test → Report → Commit"
    echo ""
    echo "Use BEFORE merging to main"
}

# Load desktop strategy configuration
load_config_strategy() {
    log "Loading Desktop Strategy Configuration"
    
    claude skills load "Claude-seo"
    log_success "Loaded: Claude-seo (keyword research)"
    
    claude skills load "Marketing Skills by Corey Haynes"
    log_success "Loaded: Marketing Skills (copy brainstorming)"
    
    claude skills load "Context Engineering Skill"
    log_success "Loaded: Context Engineering (prompt refinement)"
    
    log_success "✨ Strategy Configuration Ready"
    echo ""
    echo "Expected session:"
    echo "  • Duration: 30-45 minutes"
    echo "  • Cost: ~6-8K tokens"
    echo "  • Workflow: Research → Brainstorm → Plan"
    echo ""
    echo "Output: Store in ClickUp task for Claude Code to read"
}

# Load quality review configuration
load_config_review() {
    log "Loading Quality Review Configuration"
    
    claude skills load "Stop Slop Skill"
    log_success "Loaded: Stop Slop Skill (quality audit)"
    
    claude skills load "Impeccable"
    log_success "Loaded: Impeccable (code quality)"
    
    log_success "✨ Quality Review Configuration Ready"
    echo ""
    echo "Expected session:"
    echo "  • Duration: 15-20 minutes"
    echo "  • Cost: ~2-3K tokens"
    echo "  • Workflow: Review → Flag Issues → Improve"
    echo ""
    echo "Use BEFORE final publish"
}

# Show help
show_help() {
    echo ""
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║         CLAUDE SKILLS AUTO-LOADER                           ║"
    echo "║     Automatic skill management based on task type           ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo ""
    echo "Usage: $0 [TASK_TYPE]"
    echo ""
    echo "Task Types:"
    echo "  page       - Config A: Create new page/section (MOST COMMON)"
    echo "  blog       - Config B: Write blog post"
    echo "  component  - Config C: Build complex component"
    echo "  optimize   - Config D: Performance optimization (run AFTER build)"
    echo "  test       - Testing: Browser testing before merge"
    echo "  strategy   - Desktop: Keyword research & brainstorming"
    echo "  review     - Quality: Final review before publish"
    echo ""
    echo "Examples:"
    echo "  $0 page        # Load page building skills"
    echo "  $0 blog        # Load blog post skills"
    echo "  $0 component   # Load component building skills"
    echo "  $0 optimize    # Load optimization skills (after build)"
    echo ""
    echo "Advanced:"
    echo "  $0 strategy    # Desktop planning session (use in Claude Desktop)"
    echo "  $0 review      # Quality review session (before publish)"
    echo ""
    echo "What happens:"
    echo "  1. Unloads previous skill configuration"
    echo "  2. Loads skills for your task type"
    echo "  3. Shows expected duration, cost, workflow"
    echo "  4. Reminds you to use 'claude /cost' to track spending"
    echo ""
    echo "Tips:"
    echo "  • Choose task type BEFORE starting Claude Code"
    echo "  • One configuration per session (don't reload mid-session)"
    echo "  • Use 'claude /cost' to verify token spending"
    echo "  • Keep SKILLS-MANIFEST.md updated as you learn"
    echo ""
}

# Main function
main() {
    local task_type="${1:-}"
    
    # Show help if no argument or help flag
    if [[ -z "$task_type" ]] || [[ "$task_type" == "-h" ]] || [[ "$task_type" == "--help" ]]; then
        show_help
        exit 0
    fi
    
    echo ""
    log "Starting Claude Skills Auto-Loader"
    log "=================================="
    
    # Check Claude CLI
    check_claude_cli
    
    # Unload all skills first
    unload_all_skills
    echo ""
    
    # Load based on task type
    case "$task_type" in
        page)
            load_config_page
            ;;
        blog)
            load_config_blog
            ;;
        component)
            load_config_component
            ;;
        optimize)
            load_config_optimize
            ;;
        test)
            load_config_test
            ;;
        strategy)
            load_config_strategy
            ;;
        review)
            load_config_review
            ;;
        *)
            log_error "Unknown task type: $task_type"
            echo ""
            show_help
            exit 1
            ;;
    esac
    
    echo ""
    log_success "Configuration loaded successfully!"
    echo ""
    log "Ready to start Claude Code session"
    log "Use: claude"
    echo ""
}

# Run main function
main "$@"
