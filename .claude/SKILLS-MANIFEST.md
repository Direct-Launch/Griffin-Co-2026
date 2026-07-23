# [CLIENT NAME] - Skills Manifest (Optimized Setup)

**Status**: Optimized 12-Skill Configuration  
**Auto-Loading**: Enabled via shell scripts  
**Token Target**: 15K per page (down from 40K without skills)  

---

## 🎯 Optimized Skill Stack (12 Skills - Down from 15)

### **CORE TIER: Always Active (Never Disable)**

These 3 skills run continuously. No configuration needed:

```
1. Impeccable        (Code quality - QUALITY GATE)
2. Claude-seo        (SEO optimization)
3. Obsidian MCP      (Brand vault queries - auto-discovered)
```

**Why**: These prevent bloat while ensuring quality. MCP + skill level separation means no conflicts.

**Token Cost**: ~4-5K (baseline session overhead)

---

## 🔄 CONFIGURATION-BASED LOADING (Task-Specific)

Use auto-loading scripts to select config based on task type:

```bash
# Determine your task type, then run:
./scripts/load-skills.sh [page|blog|component|optimize|test|strategy|review]
```

---

## 📋 Configuration A: Page Building (70% of Work)

**When to use**: Creating new service pages, landing pages, sections

**Auto-load with**:
```bash
./scripts/load-skills.sh page
```

**Skills Loaded**:
```
✅ Impeccable       (quality - always on)
✅ Claude-seo       (SEO - always on)
✅ Skill UI         (component building - NEW)
```

**What you get**:
- Build new pages quickly
- SEO optimization built-in
- Code quality checked

**Expected Performance**:
- Duration: 60-90 minutes
- Cost: 6-8K tokens
- Savings vs. no skills: 60%

**Workflow**:
```
1. Read ClickUp task (has keywords + structure from Desktop strategy)
2. Build page with Skill UI
3. Impeccable auto-checks quality
4. Claude-seo implements SEO
5. Commit to GitHub
```

**When NOT to use Code Burn yet**:
- If it's a simple page (first pass)
- If performance isn't critical
- Add Code Burn LATER if needed (run Config D separately)

---

## 📝 Configuration B: Blog Posts (20% of Work)

**When to use**: Writing blog posts, articles, content marketing

**Auto-load with**:
```bash
./scripts/load-skills.sh blog
```

**Skills Loaded**:
```
✅ Claude-seo       (SEO + writing - always on)
✅ Impeccable       (quality - always on)
```

**What you get**:
- SEO-optimized writing
- Keyword integration
- Quality checked

**Expected Performance**:
- Duration: 40-60 minutes
- Cost: 3-5K tokens
- Savings vs. no skills: 70%

**Workflow**:
```
1. Read ClickUp task (keywords from Desktop strategy session)
2. Write post with Claude-seo guiding keyword placement
3. Impeccable checks structure/readability
4. Optional: Use Stop Slop Skill before final publish
5. Publish to WordPress
```

**Pro tip**: If post needs heavy editing, optionally load Stop Slop:
```bash
# Optional addon for blog posts:
claude skills load "Stop Slop Skill"
```

---

## 🎨 Configuration C: Complex Components (10% of Work)

**When to use**: Building interactive components, carousels, custom sections

**Auto-load with**:
```bash
./scripts/load-skills.sh component
```

**Skills Loaded**:
```
✅ Impeccable       (quality - always on)
✅ Claude-seo       (SEO - always on)
✅ Skill UI         (component building)
✅ Code Burn        (optimization - NEW sequenced)
```

**What you get**:
- Built components
- Optimized for performance
- Quality ensured

**Expected Performance**:
- Duration: 90-120 minutes total
  - Build: 60 min
  - Optimize: 30 min
  - Test: 30 min
- Cost: 8-10K tokens
- Savings vs. no skills: 50%

**Workflow**:
```
1. Load Config C (includes Code Burn)
2. Build component with Skill UI (60 min)
3. Auto-check quality with Impeccable
4. Code Burn optimizes (30 min)
5. Optional: Add Playwright CLI for testing
   ./scripts/load-skills.sh test
6. Commit to GitHub
```

**Important**: Build first (Skill UI), then optimize (Code Burn). Don't try to optimize while building.

---

## ⚡ Configuration D: Performance Optimization

**When to use**: AFTER initial build, when performance is critical

**Auto-load with**:
```bash
./scripts/load-skills.sh optimize
```

**Skills Loaded**:
```
✅ Code Burn        (minification + optimization)
✅ Impeccable       (quality check)
```

**What you get**:
- Minified CSS/JS
- Unused code removed
- Core Web Vitals improved

**Expected Performance**:
- Duration: 20-30 minutes
- Cost: 2-4K tokens
- Typical improvement: 15-25% faster load

**Workflow**:
```
1. Build page/component first (Config A or C)
2. THEN run Config D
3. Code Burn optimizes
4. Impeccable final check
5. Test with Playwright
6. Commit
```

**Rule**: Always run Config D as second step, not first.

---

## 🧪 Configuration: Testing

**When to use**: BEFORE merging to main branch

**Auto-load with**:
```bash
./scripts/load-skills.sh test
```

**Skills Loaded**:
```
✅ Playwright CLI   (browser testing)
✅ Impeccable       (final quality)
```

**What you get**:
- Cross-browser testing (mobile/tablet/desktop)
- Performance metrics
- Layout verification

**Expected Performance**:
- Duration: 15-20 minutes
- Cost: 2-3K tokens

**Workflow**:
```
1. After building + optimizing
2. Run testing config
3. Playwright tests page on 3 breakpoints
4. Verify Core Web Vitals
5. Fix any issues
6. Merge PR to main
```

**Timing**: Last step before production.

---

## 🎓 Configuration: Desktop Strategy Session

**When to use**: Planning content, keywords, strategy (BEFORE Claude Code work)

**Auto-load with**:
```bash
./scripts/load-skills.sh strategy
```

**Skills Loaded** (in Claude Desktop, NOT Claude Code):
```
✅ Claude-seo       (keyword research)
✅ Marketing Skills (copy brainstorming)
✅ Context Engineering (prompt refinement)
```

**What you get**:
- Target keywords identified
- Copy angles brainstormed
- Page structure outlined
- Prompts optimized

**Expected Performance**:
- Duration: 30-45 minutes
- Cost: 6-8K tokens
- Output: Detailed ClickUp task for Claude Code

**Workflow**:
```
1. Open Claude Desktop (not Claude Code)
2. Run: ./scripts/load-skills.sh strategy
3. Query Obsidian brand vault
4. Research keywords with Claude-seo
5. Brainstorm headlines with Marketing Skills
6. Improve task description with Context Engineering
7. Save updated ClickUp task
```

**Why Desktop first**: Eliminates brainstorming cost from Code sessions. Claude Code just executes, doesn't brainstorm.

---

## ✍️ Configuration: Quality Review

**When to use**: Final review before publishing

**Auto-load with**:
```bash
./scripts/load-skills.sh review
```

**Skills Loaded**:
```
✅ Stop Slop Skill  (quality audit - catches weak copy)
✅ Impeccable       (code quality)
```

**What you get**:
- Filler language detected
- Weak phrasing flagged
- Code quality double-checked

**Expected Performance**:
- Duration: 15-20 minutes
- Cost: 2-3K tokens

**Workflow**:
```
1. After writing/building
2. Run review config
3. Stop Slop flags weak sentences
4. Fix flagged issues
5. Impeccable final code check
6. Publish
```

**Timing**: Before final publish.

---

## 🚀 Daily Workflow Example

### Morning: Strategy Session (Desktop)

```bash
# In Claude Desktop:
./scripts/load-skills.sh strategy

# Task: Research new service page keywords
# Time: 30 min
# Cost: ~7K tokens
# Output: Updated ClickUp task with:
#   - 10 target keywords
#   - 5 headline options
#   - Page structure outline
#   - Yoast targets

# Store in ClickUp for afternoon Claude Code work
```

### Afternoon: Build & Deploy (Claude Code)

```bash
# Task 1: Build service page
./scripts/load-skills.sh page
# - Build with Skill UI: 60 min
# - Cost: ~6K tokens

# Task 2: Optimize (if performance-critical)
./scripts/load-skills.sh optimize
# - Minify CSS/JS: 20 min
# - Cost: ~3K tokens

# Task 3: Test before merge
./scripts/load-skills.sh test
# - Playwright testing: 15 min
# - Cost: ~2K tokens

# Total tokens: ~17K
# Total time: 95 minutes (3 tasks)
```

### End of Day: Cleanup

```bash
./scripts/cleanup-skills.sh
# Unloads all skills
# Prevents session bloat
# Session memory cleared
```

### End of Month: Audit

```bash
./scripts/track-costs.sh audit
# Shows which configs exceeded targets
# Identifies optimization opportunities
# Generates recommendations
```

---

## 🎯 Skills NOT Included (Removed for Optimization)

These were in the original 15 but removed to avoid bloat:

```
❌ Obsidian Second Brain     → Use Obsidian MCP instead
❌ Scroll World              → Optional inspiration (skip)
❌ Hyperframes               → Only if complex (rare)
❌ Graphify                  → Only if data viz (rare)
❌ UI/UX Pro Max             → Use Config: strategy instead
```

**Why removed**: Added tokens without proportional value. Desktop strategy session replaces UI/UX feedback. Obsidian MCP is more efficient than Second Brain.

---

## 📊 Cost Tracking

### Track Every Session

```bash
# After each Claude Code session, log the cost:
./scripts/track-costs.sh log page 7500 "Service page, 3 sections"
./scripts/track-costs.sh log blog 4200 "Blog post, Yoast green"
./scripts/track-costs.sh log component 9800 "Hero carousel"
```

### Monthly Review

```bash
# First day of month, run audit:
./scripts/track-costs.sh audit

# Then optimize for next month:
# - If pages averaging >8K: reduce skill loading
# - If blogs averaging >5K: skip Stop Slop for simpler posts
# - If components averaging >10K: test without Code Burn first
```

---

## ⚠️ CRITICAL RULES (Optimized Setup)

### ALWAYS ✅

- ✅ Use auto-load scripts (never manually load)
- ✅ One config per session (don't reload mid-session)
- ✅ Load Desktop strategy BEFORE Code execution
- ✅ Track costs: `./scripts/track-costs.sh log [type] [cost] [notes]`
- ✅ Run cleanup after sessions: `./scripts/cleanup-skills.sh`
- ✅ Run monthly audit: `./scripts/track-costs.sh audit`

### NEVER ❌

- ❌ Load multiple configs in one session
- ❌ Skip Impeccable (quality gate)
- ❌ Load skills manually (use scripts)
- ❌ Use Config D before Config A/C
- ❌ Forget to cleanup after session (prevents bloat)
- ❌ Skip monthly audits (how you optimize)

### NEVER LOAD TOGETHER ❌

- ❌ Obsidian Second Brain + Obsidian MCP
- ❌ Stop Slop + Context Engineering (sequential, not parallel)
- ❌ Code Burn before Skill UI finishes

---

## 📋 Setup Checklist (Before First Use)

- [ ] Copy all scripts from ./scripts/ to .claude/scripts/
- [ ] Make scripts executable: `chmod +x .claude/scripts/*.sh`
- [ ] Test load script: `./scripts/load-skills.sh page`
- [ ] Create logs directory: `mkdir -p logs`
- [ ] Add to .gitignore: `logs/` and `*.log`
- [ ] Copy this manifest to project root
- [ ] Share manifest with team (if applicable)

---

## 🆘 Troubleshooting

### Skills won't load

```bash
# Check Claude CLI is installed
claude --version

# Check if skill exists
claude skills list

# If script fails, try manual load
claude skills load "Skill UI"
```

### High token cost

```bash
# Check what's loaded
claude /cost

# Cleanup and restart
./scripts/cleanup-skills.sh
./scripts/load-skills.sh page
```

### Forgotten to cleanup

```bash
# Unload all skills
./scripts/cleanup-skills.sh

# Or manually
claude skills unload "Skill UI"
# etc.
```

---

## 📞 Questions?

- **Auto-loading not working?** Check scripts/load-skills.sh is executable
- **Tokens too high?** Run ./scripts/track-costs.sh audit to identify why
- **Which config to use?** Check the 70/20/10 rule: page (70%), blog (20%), component (10%)
- **When to optimize?** Config D after Config A/C, not before

---

## 📈 Expected Results

After implementation:

| Metric | Before Optimization | After Optimization |
|--------|---|---|
| Quality | 6.0/10 | 8.8/10 |
| Tokens per page | 33K | 6-8K |
| Time per page | 110 min | 60-90 min |
| Setup overhead | Manual | Automated |
| Monthly audits | None | Built-in |

**Net result**: Better quality, half the tokens, 30% faster, zero manual skill management.

---

**Last Updated**: July 2026  
**Configuration**: Optimized 12-Skill Setup  
**Auto-Loading**: Enabled  
**Status**: ✅ Ready for Production
