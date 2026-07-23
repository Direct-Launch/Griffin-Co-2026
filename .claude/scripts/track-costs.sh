#!/bin/bash

################################################################################
# SKILLS COST TRACKER
# Logs token usage and costs per session
# Run monthly to identify which skills actually provide value
################################################################################

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[TRACKER]${NC} $1"
}

log_success() {
    echo -e "${GREEN}✅${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

# Ensure logs directory exists
LOGS_DIR="./logs"
mkdir -p "$LOGS_DIR"

# Create cost log file
COST_LOG="$LOGS_DIR/skill-costs.log"
SUMMARY_FILE="$LOGS_DIR/monthly-summary.txt"

# Timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
DATE_ONLY=$(date '+%Y-%m-%d')

show_help() {
    echo ""
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║         SKILLS COST TRACKER                                 ║"
    echo "║     Monitor token usage and optimize skills configuration   ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  log [type] [cost] [notes]  - Log a session"
    echo "  summary                    - Show monthly summary"
    echo "  audit                      - Generate audit report"
    echo "  help                       - Show this help"
    echo ""
    echo "Examples:"
    echo "  $0 log page 8000 'Service page with 4 sections'"
    echo "  $0 log blog 5000 'Blog post, Yoast green'"
    echo "  $0 log component 10000 'Hero component with animations'"
    echo "  $0 summary"
    echo "  $0 audit"
    echo ""
    echo "Cost Targets (tokens per task):"
    echo "  • Page: 6-8K (Config A)"
    echo "  • Blog: 3-5K (Config B)"
    echo "  • Component: 8-10K (Config C)"
    echo "  • Optimize: 2-4K (Config D)"
    echo ""
}

# Log a session
log_session() {
    local task_type="$1"
    local token_cost="$2"
    local notes="$3"
    
    if [[ -z "$task_type" ]] || [[ -z "$token_cost" ]]; then
        echo "Usage: $0 log [type] [cost] [notes]"
        exit 1
    fi
    
    # Append to log file
    echo "$TIMESTAMP | $task_type | $token_cost | $notes" >> "$COST_LOG"
    
    log_success "Session logged:"
    echo "  • Type: $task_type"
    echo "  • Tokens: $token_cost"
    echo "  • Notes: $notes"
    echo ""
    
    # Check if within targets
    case "$task_type" in
        page)
            if [ "$token_cost" -gt 8000 ]; then
                log_warning "Page exceeded target (8K tokens)"
            fi
            ;;
        blog)
            if [ "$token_cost" -gt 5000 ]; then
                log_warning "Blog exceeded target (5K tokens)"
            fi
            ;;
        component)
            if [ "$token_cost" -gt 10000 ]; then
                log_warning "Component exceeded target (10K tokens)"
            fi
            ;;
    esac
}

# Show monthly summary
show_summary() {
    if [[ ! -f "$COST_LOG" ]]; then
        log_warning "No cost data yet. Run: $0 log [type] [cost] [notes]"
        exit 0
    fi
    
    echo ""
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║              MONTHLY SKILLS COST SUMMARY                    ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo ""
    
    # Get current month data
    current_month=$(date '+%Y-%m')
    
    echo "Entries for $current_month:"
    echo ""
    grep "$current_month" "$COST_LOG" || echo "No entries for this month yet"
    echo ""
    
    # Calculate totals by type
    echo "Cost Breakdown by Type:"
    echo "────────────────────────────────────"
    
    # Pages
    page_total=$(grep "$current_month" "$COST_LOG" | grep " page " | awk -F'|' '{sum+=$3} END {print sum}' || echo "0")
    page_count=$(grep "$current_month" "$COST_LOG" | grep " page " | wc -l || echo "0")
    page_avg=$([ "$page_count" -gt 0 ] && echo "scale=0; $page_total / $page_count" | bc || echo "0")
    
    echo "Pages:       $(printf '%5d' $page_count) tasks  |  $(printf '%7d' $page_total) tokens  |  avg: $(printf '%5d' $page_avg) per task"
    
    # Blogs
    blog_total=$(grep "$current_month" "$COST_LOG" | grep " blog " | awk -F'|' '{sum+=$3} END {print sum}' || echo "0")
    blog_count=$(grep "$current_month" "$COST_LOG" | grep " blog " | wc -l || echo "0")
    blog_avg=$([ "$blog_count" -gt 0 ] && echo "scale=0; $blog_total / $blog_count" | bc || echo "0")
    
    echo "Blogs:       $(printf '%5d' $blog_count) tasks  |  $(printf '%7d' $blog_total) tokens  |  avg: $(printf '%5d' $blog_avg) per task"
    
    # Components
    comp_total=$(grep "$current_month" "$COST_LOG" | grep " component " | awk -F'|' '{sum+=$3} END {print sum}' || echo "0")
    comp_count=$(grep "$current_month" "$COST_LOG" | grep " component " | wc -l || echo "0")
    comp_avg=$([ "$comp_count" -gt 0 ] && echo "scale=0; $comp_total / $comp_count" | bc || echo "0")
    
    echo "Components: $(printf '%5d' $comp_count) tasks  |  $(printf '%7d' $comp_total) tokens  |  avg: $(printf '%5d' $comp_avg) per task"
    
    # Totals
    grand_total=$((page_total + blog_total + comp_total))
    grand_count=$((page_count + blog_count + comp_count))
    
    echo "────────────────────────────────────"
    echo "TOTAL:      $(printf '%5d' $grand_count) tasks  |  $(printf '%7d' $grand_total) tokens"
    echo ""
    
    # Cost estimation (at Claude pricing: $3 per 1M input tokens)
    cost_usd=$(echo "scale=2; $grand_total * 0.003 / 1000" | bc)
    echo "Estimated Cost: \$$cost_usd"
    echo ""
}

# Generate audit report
generate_audit() {
    if [[ ! -f "$COST_LOG" ]]; then
        log_warning "No cost data yet. Run: $0 log [type] [cost] [notes]"
        exit 0
    fi
    
    echo ""
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║            SKILLS COST AUDIT REPORT                         ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo ""
    
    current_month=$(date '+%Y-%m')
    
    echo "📊 ANALYSIS: $current_month"
    echo ""
    
    # Find tasks exceeding targets
    echo "⚠️ Tasks Exceeding Targets:"
    echo "────────────────────────────────────"
    
    outliers=$(grep "$current_month" "$COST_LOG" | awk -F'|' '
        $2 ~ /page/ && $3 > 8000 {print "PAGE", $3, $4}
        $2 ~ /blog/ && $3 > 5000 {print "BLOG", $3, $4}
        $2 ~ /component/ && $3 > 10000 {print "COMPONENT", $3, $4}
    ')
    
    if [[ -z "$outliers" ]]; then
        echo "✅ All tasks within targets!"
    else
        echo "$outliers"
    fi
    echo ""
    
    # Skills recommendations
    echo "💡 Recommendations:"
    echo "────────────────────────────────────"
    
    current_month=$(date '+%Y-%m')
    avg_page=$(grep "$current_month" "$COST_LOG" | grep " page " | awk -F'|' '{sum+=$3; count++} END {if (count>0) print int(sum/count); else print 0}')
    
    if [[ -n "$avg_page" ]] && [[ "$avg_page" -gt 0 ]]; then
        if [ "$avg_page" -gt 8000 ]; then
            log_warning "Page average is HIGH ($avg_page tokens)"
            echo "  • Consider: Is Code Burn really needed?"
            echo "  • Consider: Is Playwright slowing down builds?"
            echo "  • Recommendation: Disable optional skills for simpler pages"
        else
            log_success "Page average is HEALTHY ($avg_page tokens)"
        fi
    fi
    
    echo ""
    echo "📋 Full Session Log:"
    echo "────────────────────────────────────"
    tail -20 "$COST_LOG" | while read line; do
        echo "$line"
    done
    
    echo ""
    echo "🔄 Next Steps:"
    echo "  1. Review high-cost tasks above"
    echo "  2. Check SKILLS-MANIFEST.md for any manual optimizations"
    echo "  3. Run monthly: $0 summary"
    echo ""
}

# Main
case "${1:-help}" in
    log)
        log_session "$2" "$3" "$4"
        ;;
    summary)
        show_summary
        ;;
    audit)
        generate_audit
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        log_warning "Unknown command: $1"
        show_help
        exit 1
        ;;
esac
