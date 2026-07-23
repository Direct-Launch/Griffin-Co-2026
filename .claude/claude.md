# CLAUDE.md — Griffin & Co (Griffin-Co-2026)

## Project Identity
- **Client:** Griffin & Co — fine jewellery, Shopify (Liquid theme)
- **Managed by:** Direct Launch
- **Brand source of truth:** Obsidian vault at
  `G:\Shared drives\Griffin & Co\Obsidian Vault\Griffin-Co-2026\`
  Query it every session for colors, fonts, tone, keywords. **Never hardcode brand values in this file** — they go stale the moment the vault updates and this doesn't.
- **SEO:** No Yoast on this project (Shopify platform). Use the Claude-seo skill for on-page SEO instead.
- **Conversation history:** Run sessions via `specstory run claude`. SpecStory auto-saves live to
  `G:\Shared drives\Griffin & Co\Obsidian Vault\Griffin-Co-2026\Conversations\`
  (set via `output_dir` in SpecStory's config). Obsidian Git (Vinzent Böhm) auto-commits/pushes that vault on its own interval — don't run manual git commands against the Conversations folder.

---

## Token Efficiency Stack (Headroom + Ponytail + Subagents + SpecStory)

### 📝 SpecStory (Conversation Persistence)
**Status**: Active. All Claude Code sessions auto-save via SpecStory.

- **What it does**: Auto-saves Claude Code conversations as markdown files. Stores them in Obsidian vault for easy reference across sessions. Enables session resumption without re-reading long context.
- **How it works**: 
  - Run: `specstory run claude` (wraps the normal `claude` command)
  - Or create alias: `alias claude='specstory run claude'`
  - Auto-saves every turn to `G:\Shared drives\Griffin & Co\Obsidian Vault\Griffin-Co-2026\Conversations\`
  - Obsidian Git plugin (Vinzent Böhm) auto-commits/pushes conversations on its interval (no manual git needed)
- **Verify it's working**:
  - Check `G:\Shared drives\Griffin & Co\Obsidian Vault\Griffin-Co-2026\Conversations\` folder
  - Should see `.md` files appearing in real-time during session
  - Run `specstory watch` in a separate terminal to monitor
- **Resume a session**: 
  - Same session: `claude -c` (last session)
  - Specific session: `claude -r SESSION_ID` (pick from history)
- **Impact**: 
  - Session continuity without token cost (context lives in Obsidian, not in Claude Code memory)
  - Reusable research/analysis across projects (store results in vault, reference later)
  - Audit trail for client work (conversations visible in Obsidian)
  - Saves ~10-20% tokens on multi-day projects (don't re-read conversation history; read from Obsidian instead)

**Integration with Subagents**: Subagent results get auto-saved to Conversations folder. Store them in ClickUp/Obsidian task descriptions for reuse.

---

### 🔧 Headroom (Context Compression)
**Status**: Enabled by default. Works transparently—no action needed.

- **What it does**: Compresses tool outputs, logs, files, and conversation history before they reach Claude. 20-95% token savings depending on content type.
- **How it works**: You ran `headroom wrap claude` once (setup). Every Claude Code session auto-proxies through Headroom.
- **Verify it's running**: 
  - Run `headroom doctor` (health check)
  - Run `headroom dashboard` in a separate terminal (live savings display)
- **Impact**: ~20% token reduction on code work; 40-95% on structured data (JSON, API responses, file metadata)

### ⚙️ Ponytail (Anti-Over-Engineering)
**Status**: Active by default at `full` level.

- **What it does**: Prevents building unnecessary code by running a ladder before writing:
  1. Does this need to exist? (YAGNI)
  2. Already in this codebase? (reuse)
  3. Stdlib does it? (use it)
  4. Native platform feature? (use it)
  5. Installed dependency? (use it)
  6. One line? (one line)
  7. Only then: the minimum that works
- **How it works**: Always-on skill—no manual activation. Intercepts every code suggestion.
- **Commands**:
  - `/ponytail` — show current level
  - `/ponytail lite` — gentle (mostly warnings)
  - `/ponytail full` — default (active anti-over-engineering)
  - `/ponytail ultra` — aggressive (for frustrated codebases)
  - `/ponytail off` — disable temporarily
- **Impact**: 20-54% LOC reduction; 15-22% token savings; 20-27% faster execution
- **Savings table**: Date picker 404→23 lines (native `<input>`), color picker 287→23 lines, API wrapper 120→1-liner middleware

### 🤖 Subagent Delegation (The Biggest Lever)
**Status**: Ready to use. Delegate any research/analysis task; main thread handles writing/building.

- **What it does**: Offloads file-heavy, read-intensive work to separate context windows. Subagents run in isolation; main thread stays light and can work 50-100% longer before hitting compaction.
- **When to delegate** (use decision tree):
  - ✅ Task is reading, analyzing, or gathering data? Delegate.
  - ✅ Involves 5+ files, APIs, or external sources? Delegate.
  - ✅ Result will be reused (ClickUp/Obsidian)? Delegate.
  - ✅ Subagent can work independently (no feedback loop)? Delegate.
  - ✗ Writing, building, or real-time decisions? Keep in main thread.

- **12 Subagent Patterns** (copy templates from `.claude/SUBAGENT-QUICK-REFERENCE.md`):
  1. **Content Audit** — Extract tone, structure, keyword patterns from existing posts → template for writing new ones
  2. **Codebase Exploration** — Read theme directory structure → architecture overview + reusable components
  3. **Competitor Research** — Analyze competitor websites → positioning matrix + content gaps
  4. **Keyword Research** — Map SEO keywords → keyword matrix + internal linking strategy
  5. **Yoast Metadata Extraction** — Extract meta data patterns from Blog 1 → template for Blogs 2-4
  6. **ClickUp Synthesis** — Combine parent task + 5 subtasks → one unified brief
  7. **Git History Analysis** — Analyze recent commits → understand what changed and why
  8. **Image Asset Discovery** — Inventory images + Canva templates → design specs
  9. **Brand Compliance Audit** — Compare draft against Obsidian vault → checklist of fixes
  10. **Performance Audit** — Run Lighthouse baseline → bottleneck list + optimization targets
  11. **Accessibility Audit** — WCAG 2.1 AA check → compliance score + violations list
  12. **Design System Validation** — Check new components against existing patterns → consistency checklist

- **How to delegate** (template):
  ```
  Subagent, [task summary].
  
  Read:
  1. [File/URL/API #1]
  2. [File/URL/API #2]
  3. [Obsidian/ClickUp/GitHub path]
  
  Analyze: [What to extract/compare/identify]
  
  Return:
  - [Output format #1]
  - [Output format #2]
  - [Recommendations]
  ```

- **Token savings per subagent**: 1-5K tokens (15-50% reduction); average 2-3K per task
- **High-volume impact**: Delegating 3-4 out of 10 daily tasks = 6-12K tokens saved/day = $0.10-$0.18/day
- **Storage pattern**: Paste subagent result into ClickUp task or Obsidian vault for reuse across multiple blog posts/projects

### Combined Impact (All Four Tools)
- **SpecStory**: Session continuity + audit trail (saves 10-20% tokens on multi-day work by avoiding context re-read)
- **Headroom**: Compresses input (20% savings on code)
- **Ponytail**: Eliminates over-building (10-54% LOC reduction)
- **Subagents**: Keep main session light (50-100% longer before compaction)
- **Total**: 40-70% token reduction on high-volume work (page building, blog series, component work)

**Example—Lab Diamond Blog Series** (5-day project):
- **Day 1** (Research): 4 subagents run in isolation → 21-38K tokens (subagents only, main thread = 0)
- **Days 2-5** (Writing): Main thread writes 4 blogs → 18-27K tokens
- **SpecStory savings** (multi-day): Conversation auto-saved; if resuming session, read from Obsidian instead of re-loading context = +10-20% efficiency gain
- **Without optimization**: 80-100K tokens ($0.24-$0.30)
- **With all four tools**: 35-55K tokens ($0.11-$0.17)
- **Per blog cost**: $0.03-$0.05 (vs. $0.06-$0.075 without tools)

---

## Skills — auto-activate by task type

| Task Type | Skills | Est. Cost |
|---|---|---|
| Page/Section | Skill UI + Impeccable + Claude-seo | 6–8K tokens |
| Blog/Content | Claude-seo + Impeccable | 3–5K tokens |
| Component | Skill UI + Impeccable + Code Burn (sequential) | 8–10K tokens |
| Optimize | Code Burn + Impeccable (run *after* build) | 2–4K tokens |
| Test | Playwright CLI + Impeccable | 2–3K tokens |
| Quality Review | Stop Slop + Impeccable | 2–3K tokens |

Impeccable and Claude-seo stay on for all production work. Don't load multiple configs in the same session.

**Note**: Above costs assume Headroom + Ponytail are active (they're always on). Subagent delegation further reduces main thread cost by offloading research tasks.

---

## Quality & Reasoning Standards

These govern how you work on this project, not just what you produce.

**1. Read what's actually being asked.** Before answering, work out what I'll *do* with the output in the next hour, and what would make it useless even if every sentence were true. If a stated constraint and the literal request conflict, serve the constraint and say what you did — flag it if the stakes are high enough to ask first.

**2. Decompose into independently checkable pieces.** Split a task at the seams where each piece has its own way of being wrong, checkable without leaning on the rest. If a piece can't be checked alone, split it again. Check upstream pieces first — their errors propagate downstream.

**3. Spend effort where the risk actually lives.** For each piece, ask what breaks if it's wrong and how loudly. Verify the highest-consequence claim hardest, even if it's boring — not the part that's most interesting to work on.

**4. Verify by re-deriving, not by recognizing.** A claim that "sounds right" has only passed one test: it's shaped like a true thing. Rebuild it from a different angle — different method, different starting point — before trusting it. For anything about the current state of a tool, platform, or API: look it up, don't recall it. (This file exists because that step got skipped for SpecStory's CLI the first time.)

**5. Tag what's verified vs. guessed, and say which.** Mark claims in your own head as verified-this-session, retrieved-from-training (could be stale), inferred, or assumed — then let your confidence language track that, not fluency. Don't hedge everything uniformly; concentrate the uncertainty where it's real.

**6. Attack your own conclusion before shipping it.** Once you have an answer, try to break it: one concrete counterexample, one alternative explanation for the same evidence, one assumption that kills it if false. What survives, ships. What doesn't, gets fixed or flagged.

**7. Lead with the answer, then reasoning, then risk.** Decision-ready answer first. Then the minimum chain needed to audit it. Then what could change the answer, what wasn't checked, and how I'd find out if it's wrong.

**8. Watch for the failures that look like competence:** confident prose standing in for verification; a long answer that covers everything and decides nothing; false precision on a guess; citing "how these usually work" without checking this instance; elaborating the user's framing instead of testing it; hedging everything so nothing stands out; quietly answering a different (better) question without saying so.

**Self-test before sending anything non-trivial:**
1. Does this serve what they'll actually do with it, not just the literal words?
2. Is the highest-consequence claim the one verified hardest?
3. Can the reader tell verified claims from guesses without asking?
4. What was the best attack on this, and did it survive?
5. If it's wrong, how do they find out?

---

## Workflow Notes
- Desktop (Claude.ai) = planning/strategy, read-only reference. Claude Code terminal = production, file edits, commits, deploys.
- ClickUp holds task briefs (keywords, structure, copy angles) — read the task before starting build work rather than re-deriving strategy in-session.
- Git is source of truth for code. Obsidian is source of truth for brand. Don't let them drift — query, don't cache.

---

## Supporting Documents (Reference)

Copy these to `.claude/` folder in your project:

| File | Purpose | When to Use |
|------|---------|-----------|
| `SUBAGENT-QUICK-REFERENCE.md` | One-page cheat sheet | Every session (quick lookup) |
| `QUICK-START-WORKFLOW.md` | Task types + estimated costs | Start of week (planning) |
| `WORKFLOW.md` | How to execute tasks | When starting a task |
| `COST-TRACKER.txt` | Weekly/monthly spend logging | Friday (weekly summary) |

**For Deep Dives** (in `/mnt/user-data/outputs/`):
- `SUBAGENT-PATTERNS-COMPREHENSIVE.md` — Full guide to all 12 subagent patterns
- `LAB-DIAMOND-WORKFLOW-EXAMPLE.md` — Real workflow example (research day + writing days)
- `QUICK-START-SUMMARY.md` — High-level overview of the entire system

---

## Quick Start (Today)

1. ✅ Headroom: Already running (set up `headroom wrap claude`)
2. ✅ Ponytail: Active by default (`/ponytail` to check level)
3. ✅ Subagents: Copy `SUBAGENT-QUICK-REFERENCE.md` to `.claude/`
4. 🎯 First task: Read `.claude/QUICK-START-WORKFLOW.md` (5 min)
5. 🎯 Second task: Pick any task type; tell Claude the type naturally
6. 📊 Friday: "Log this week's work" → token summary + cost breakdown

---

## Contact / Issues

- Token efficiency not matching estimates? Run `headroom doctor`
- Ponytail blocking code you need? `/:ponytail ultra` (aggressive mode)
- Subagent results unclear? Check `SUBAGENT-PATTERNS-COMPREHENSIVE.md` for better prompt examples