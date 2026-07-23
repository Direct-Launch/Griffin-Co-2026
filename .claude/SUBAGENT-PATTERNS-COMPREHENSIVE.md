# Subagent Delegation Patterns for Direct Launch

**Purpose**: Offload file-heavy, read-intensive work to separate context windows, keeping main Claude Code session light for 50-100% longer before hitting compaction.

**Token Savings Model**: Each subagent run saves 3-15K tokens in the main session by avoiding bulk file reads that would otherwise consume context. Subagents use their own token budget.

---

## When to Use Subagents (Decision Tree)

```
Is the task primarily reading, analyzing, or gathering data?
├─ YES: Delegate to subagent ✓
│  └─ Does it involve 10+ files? Always use subagent
│  └─ Does it involve external research? Use subagent
│  └─ Does it involve codebase exploration? Use subagent
│
├─ NO: Keep in main thread
   └─ Writing, editing, building (execution) → main thread
   └─ Refinement based on feedback → main thread
   └─ Small targeted reads (1-3 files) → main thread
```

---

## 12 Task Types with Subagent Patterns

### 1. **Codebase Exploration** (Theme/Plugin Structure Discovery)

**When**: Starting work on a new client site or unfamiliar section; need to understand how the theme is organized.

**Trigger**: "I need to understand the [theme/section] structure before building."

**Subagent Does**:
- Read all files in `/wp-content/themes/[theme]/` directory tree
- Identify component hierarchy (e.g., Elementor widget structure, UiCore brand kit usage)
- Map page template relationships
- Find existing patterns/conventions

**Subagent Returns**:
- One-page architecture overview (ASCII tree)
- List of key files + what each does
- Reusable component locations
- Naming conventions + patterns to follow

**Example Prompt**:
```
Subagent, explore the Griffin-Co-2026 theme structure.

Read:
1. /wp-content/themes/[theme]/ directory recursively
2. Look for: component hierarchy, Elementor widget paths, UiCore integration
3. Find: existing product page templates (to reuse for Blog 2)

Return:
- ASCII tree of theme structure
- List of Elementor widgets in use
- Path to product page template
- Naming convention for new components
```

**Token Savings**: 8-12K tokens (avoids main thread reading 50+ files)

**Integration**: Store result in ClickUp task description or Obsidian vault as project reference.

---

### 2. **Content Audit** (Consistency & Quality Review)

**When**: Before starting new content, need to ensure consistency with existing tone, structure, keyword usage.

**Trigger**: "Audit existing blog posts for [brand voice/keyword/structure] before I write Blog 2."

**Subagent Does**:
- Read all existing blog posts (Blog 1 + any others)
- Extract: tone patterns, sentence structure, keyword placement, opening/closing formula
- Identify: what works well, what's repeated too often, unique phrases
- Note: Yoast score patterns, meta description length, internal link patterns

**Subagent Returns**:
- Brand voice fingerprint (3-5 characteristic phrases, typical sentence length)
- Keyword placement patterns (where keywords appear in post)
- Structure template (how many sections, typical heading hierarchy)
- Baseline metrics (avg post length, paragraphs per section, links per 1000 words)

**Example Prompt**:
```
Subagent, audit Griffin & Co blog for consistency before I write Blog 2.

Read:
1. Blog 1: Lab Diamond Certification (from GitHub repo)
2. Any other published blog posts on the Griffin & Co site
3. Brand vault: Writing Style.md

Analyze:
- Tone + voice (typical phrases, sentence structure)
- Keyword placement (where "lab diamond" appears)
- Structure (sections, headings, intro/outro formula)
- Yoast patterns (meta desc length, keyword density)

Return:
- Brand voice fingerprint (5 key phrases)
- Structure template (outline of Blog 1 sections)
- Keyword placement map (where to use "lab-grown diamond")
- Metrics (word count per section, internal links to aim for)
```

**Token Savings**: 6-10K tokens (avoids main thread re-reading existing posts)

**Integration**: Paste result into ClickUp task 86c5ptja4 (Blog 2) so main thread can reference it.

---

### 3. **Competitor/Market Research Analysis**

**When**: Need to understand landscape before writing strategy; gathering inspiration without main thread burning tokens on browsing.

**Trigger**: "Research how [competitors] position [topic] before I write our version."

**Subagent Does**:
- Read competitor websites / blog posts (via URLs or GitHub if open-source)
- Extract: messaging patterns, keyword choices, visual hierarchy, positioning language
- Identify: gaps (what they don't cover), strengths (what they do well), tone differences
- Note: Call-to-action patterns, proof/credibility elements

**Subagent Returns**:
- Competitor positioning matrix (table: company → key message → keywords → tone)
- Content gaps (what Griffin & Co could own)
- Inspiration checklist (3-5 patterns worth copying, 3-5 to avoid)
- Positioning recommendation (1-2 sentences: how to differentiate)

**Example Prompt**:
```
Subagent, research how other jewelry sites explain lab diamonds.

Analyze:
1. 3-5 competitor blog posts on lab diamonds (links in ClickUp brief)
2. Their messaging: what makes lab diamonds sound appealing?
3. Keywords they use (search their pages for "lab diamond" variations)
4. Tone: formal, friendly, technical, sales-y?

Return:
- Competitor positioning matrix (keyword choices, tone, key selling points)
- Content gaps (what they miss that Griffin & Co could own)
- Tone recommendations (formal vs. friendly based on competitor analysis)
- 3 phrases to avoid (over-used), 3 phrases that work well
```

**Token Savings**: 5-9K tokens (avoids main thread browsing competitor sites)

**Integration**: Feeds into ClickUp task description; main thread uses results to guide writing.

---

### 4. **Keyword Research & Gap Analysis**

**When**: Need comprehensive keyword map for a new blog series or product section; don't want main thread doing all the research.

**Trigger**: "Research keywords for [product/topic] and find gaps vs. our existing content."

**Subagent Does**:
- Query keyword tools or existing content databases (Opinly, Yoast, or GitHub SEO files)
- Extract: keyword volume, difficulty, intent, search trends
- Compare: what we rank for vs. what's missing
- Identify: quick-win keywords (low difficulty, decent volume)
- Map: keyword clusters (related search terms)

**Subagent Returns**:
- Keyword matrix (keyword → volume → difficulty → search intent → blog assignment)
- Gap analysis (high-value keywords we don't cover)
- Quick wins (3-5 easy wins to prioritize)
- Cluster map (related keywords to link together)

**Example Prompt**:
```
Subagent, research keywords for the Lab Diamond series.

Query:
1. ClickUp: Lab Diamonds parent task (86c5ptg3j) — what keywords are mentioned?
2. Obsidian vault: SEO Keywords.md (if exists)
3. Opinly/Yoast data (if available): keyword volume/difficulty for "lab diamond"

Analyze:
- Current ranking: What lab diamond keywords does Griffin & Co rank for?
- Gaps: High-value keywords we don't cover yet
- Clusters: Related keywords (e.g., "lab-grown diamond", "certified lab diamond")

Return:
- Keyword matrix (keyword | volume | difficulty | search intent | which blog post)
- Gap analysis (top 5 high-value keywords to prioritize)
- Internal linking map (which blogs should link to which)
- Primary keywords for Blogs 1-4 (one keyword per blog to optimize for)
```

**Token Savings**: 7-11K tokens (avoids main thread keyword research overhead)

**Integration**: Store in ClickUp; main thread uses for SEO optimization during writing.

---

### 5. **Yoast Metadata Extraction & Pattern Analysis**

**When**: Need to extract metadata from existing posts before optimizing new ones; save main thread from reading XML/REST API responses.

**Trigger**: "Extract Yoast metadata from existing blogs to find the pattern before I optimize the new one."

**Subagent Does**:
- Query WordPress REST API (or read Yoast exports) for existing post metadata
- Extract: focus keyword, meta description length, readability score, keyword density
- Identify: patterns (e.g., all meta descriptions are 155-160 chars)
- Note: What's working (high-ranking posts) vs. what isn't

**Subagent Returns**:
- Yoast metadata template (meta description length, focus keyword guidelines)
- Readability baseline (typical flesch score for Griffin & Co posts)
- Metadata checklist (what to fill in for new posts)
- Examples (3 best-performing post metadata to use as reference)

**Example Prompt**:
```
Subagent, extract Yoast metadata from Blog 1 to set the template.

Read:
1. Blog 1 Yoast fields (via WordPress REST API or Code Snippets plugin):
   - Focus keyword
   - Meta description
   - Readability score
   - Keyword density
   - Slug

2. Compare to 1-2 other Griffin & Co posts (if available)

Return:
- Meta description template (typical length, structure)
- Focus keyword guidelines (one keyword per post, placement strategy)
- Readability target (flesch score range for Griffin & Co)
- Metadata checklist (required fields + examples from Blog 1)
```

**Token Savings**: 4-6K tokens (avoids main thread parsing REST API responses)

**Integration**: Main thread uses template when optimizing Blogs 2-4.

---

### 6. **ClickUp Task Synthesis** (Multiple Subtasks → Unified Brief)

**When**: A parent task has 5+ subtasks; need one unified brief instead of main thread reading them all separately.

**Trigger**: "Synthesize the Lab Diamonds parent task (86c5ptg3j) into one brief for each blog post."

**Subagent Does**:
- Read parent task + all subtasks from ClickUp
- Extract: requirements, constraints, due dates, dependencies
- Consolidate: eliminate redundancy, highlight contradictions
- Organize: by blog post (Blog 1, 2, 3, 4)

**Subagent Returns**:
- Unified brief per blog post (one doc, 200-300 words each)
- Master constraints/dependencies list
- Timeline + milestones
- Checklist (what "done" looks like)

**Example Prompt**:
```
Subagent, synthesize the Lab Diamonds series into 4 briefs.

Read:
1. Parent task: Lab Diamonds (86c5ptg3j)
2. All subtasks: Blog 1-4 (86c5ptj9q, 86c5ptja4, 86c5ptjap, 86c5ptjbm)
3. Each task's description, checklist, linked resources

Synthesize:
- One brief per blog post (consolidate requirements)
- Master requirements (word count, target keywords, Yoast goal)
- Timeline + milestones
- Done criteria

Return:
- 4 briefs (one per blog) in markdown
- Master checklist (common requirements across all blogs)
- Timeline (when each blog is due)
```

**Token Savings**: 3-5K tokens (avoids main thread reading 5+ separate ClickUp screens)

**Integration**: Paste briefs into ClickUp; main thread references them during writing.

---

### 7. **Git History Analysis** (Understanding Recent Changes)

**When**: Starting work on a section modified recently; need to understand what changed and why without main thread wading through git logs.

**Trigger**: "Analyze recent changes to the product pages to understand current state before I update them."

**Subagent Does**:
- Read git commit history (last 10-20 commits touching relevant files)
- Extract: what files changed, what was added/removed, commit messages
- Identify: current issues/TODOs, incomplete work, recent bug fixes
- Note: Naming conventions, recent refactors, patterns being phased in/out

**Subagent Returns**:
- Change summary (what was modified in last 2-4 weeks)
- Known issues list (TODOs from recent commits)
- Refactor map (old patterns → new patterns)
- Recommendations (best practices evident from recent changes)

**Example Prompt**:
```
Subagent, analyze recent changes to Griffin-Co-2026 product pages.

Read:
1. Git log (last 20 commits) for /product-pages/ or product-related files
2. Commit messages, diffs, author notes
3. Any TODOs or comments in recent changes

Analyze:
- What was added/removed recently?
- Any patterns shifting (old component → new component)?
- Known issues or incomplete work?

Return:
- Summary: What changed in the last month
- Issues: Any known problems or TODOs
- Patterns: What naming/structure conventions are current
- Recommendations: Best practices to follow
```

**Token Savings**: 5-8K tokens (avoids main thread parsing git diffs)

**Integration**: Reference in main thread when making new changes; helps avoid conflicts.

---

### 8. **Image Asset Discovery & Organization**

**When**: Before creating new images in Canva; need to know what assets exist, what size/format is expected, what brand guidelines apply.

**Trigger**: "Find all existing product images and their specs before I design the new Lab Diamond hero image."

**Subagent Does**:
- Read image directory structure and metadata
- Extract: existing image dimensions, formats, naming conventions
- Check: Canva templates that exist (linked in Obsidian)
- Identify: brand image patterns (color overlays, text placement, aspect ratios)

**Subagent Returns**:
- Image inventory (existing product images + specs)
- Canva template catalog (which templates work for what)
- Naming convention (how to name new images)
- Design specs (dimensions, format, color space for web)

**Example Prompt**:
```
Subagent, inventory Griffin & Co product images before I design new ones.

Read:
1. /wp-content/uploads/ or image directory (all product images)
2. Obsidian vault: Image Gallery.md (if exists)
3. Canva: Templates folder for Griffin & Co
4. Existing blog images (Blog 1): dimensions, naming, format

Analyze:
- Image dimensions in use (1200x800? 1200x600?)
- File formats (JPG, PNG, WebP?)
- Naming convention (what-is-this.jpg or ProductName_TypeOfImage.jpg?)
- Canva templates available

Return:
- Image specs checklist (dimensions, format, naming for new images)
- Canva templates catalog (which templates to use for what)
- Existing image inventory (list of current images + dimensions)
- Recommendations (sizing, format, naming for Lab Diamond images)
```

**Token Savings**: 4-7K tokens (avoids main thread browsing image directories)

**Integration**: Pass results to Canva workflow; Canva then uses specs to generate images.

---

### 9. **Brand Compliance Audit** (Against Obsidian Vault)

**When**: Before publishing new content; verify it matches brand guidelines.

**Trigger**: "Audit the draft blog against our brand guidelines before I publish."

**Subagent Does**:
- Read brand vault files: Brand Overview.md, Writing Style.md, Color Palette.md, Typography.md
- Read the draft blog post
- Compare: tone, terminology, color usage, formatting against guidelines
- Flag: deviations, inconsistencies, anything that doesn't match brand

**Subagent Returns**:
- Compliance checklist (✓ matches, ✗ doesn't match, ? unclear)
- Specific fixes needed (line-by-line suggestions)
- Brand voice assessment (does tone match?)
- Color/visual compliance (any brand colors used correctly?)

**Example Prompt**:
```
Subagent, audit Blog 2 draft against Griffin & Co brand guidelines.

Read:
1. Obsidian vault: Brand Overview.md, Writing Style.md, Color Palette.md, Typography.md
2. Draft blog post (Blog 2: Lab Diamond Shapes)

Compare:
- Tone: Does it match the brand voice?
- Terminology: Using the right terms (lab-grown vs. lab diamond)?
- Color mentions: Are brand colors (#004225, #ffdda6) used appropriately?
- Formatting: Heading hierarchy, emphasis, structure match guidelines?

Return:
- Compliance checklist (✓/✗ for each guideline)
- Specific fixes (line numbers + what to change)
- Brand voice assessment (how well does it match?)
- Any terminology that needs adjustment
```

**Token Savings**: 3-5K tokens (avoids main thread re-reading vault files)

**Integration**: Main thread receives checklist; makes quick edits before publishing.

---

### 10. **Performance Audit** (Page Speed & Metrics)

**When**: Before launching new pages or after bulk updates; need baseline performance data without main thread running tests.

**Trigger**: "Run a performance baseline on the new product page before I optimize it."

**Subagent Does**:
- Access Chrome DevTools metrics or Lighthouse API
- Measure: Core Web Vitals (LCP, FID, CLS), overall performance score
- Test: mobile and desktop
- Identify: biggest performance bottlenecks

**Subagent Returns**:
- Baseline metrics (before optimization)
- Performance bottleneck list (images too large, render-blocking JS, etc.)
- Quick wins (easy optimizations)
- Optimization targets (what to aim for)

**Example Prompt**:
```
Subagent, run a performance audit on the new Lab Diamond product page.

Test:
1. Page URL (live or preview link)
2. Desktop and mobile
3. Lighthouse score
4. Core Web Vitals: LCP, FID, CLS

Measure:
- Overall performance score
- Biggest bottlenecks
- Image optimization opportunities
- JS/CSS optimization needs

Return:
- Baseline metrics (performance score before optimization)
- Bottleneck list (sorted by impact)
- Quick wins (easy 5-10% improvements)
- Optimization targets (what score to aim for)
```

**Token Savings**: 5-8K tokens (avoids main thread running repeated Lighthouse tests)

**Integration**: Results feed into Config D (Optimization) workflow.

---

### 11. **Accessibility Audit** (WCAG 2.1 AA Compliance)

**When**: Before publishing pages; ensure accessibility standards are met without main thread doing manual testing.

**Trigger**: "Audit the new product page for accessibility before I publish."

**Subagent Does**:
- Run automated accessibility checks (axe DevTools, WAVE, Pa11y)
- Test: color contrast, heading hierarchy, alt text, keyboard navigation
- Identify: WCAG 2.1 AA violations
- Prioritize: critical (fails accessibility) vs. warnings (could be better)

**Subagent Returns**:
- Accessibility score (WCAG 2.1 AA pass/fail)
- Violations list (critical issues to fix)
- Warnings (improvements recommended)
- Checklist (what to verify manually)

**Example Prompt**:
```
Subagent, run an accessibility audit on Blog 2 draft.

Test:
1. Page content: Blog 2 markdown/HTML
2. Heading hierarchy (H1, H2, H3 nesting correct?)
3. Color contrast (text/background)
4. Links: descriptive text or just URLs?
5. Images: alt text present and descriptive?

Check:
- WCAG 2.1 AA compliance
- Keyboard navigation (can tab through content?)
- Font sizes (readable on mobile?)

Return:
- Accessibility score (AA pass/fail)
- Critical violations (must fix)
- Warnings (should fix)
- Checklist (items to verify before publishing)
```

**Token Savings**: 4-6K tokens (avoids main thread manual accessibility testing)

**Integration**: Results feed into quality review before publishing.

---

### 12. **Design System Validation** (Component Consistency)

**When**: After building multiple components; verify they follow established patterns without main thread spot-checking each one.

**Trigger**: "Audit the new components against our design system before I commit."

**Subagent Does**:
- Read design system docs / existing components
- Compare: new components against established patterns
- Check: naming conventions, prop patterns, variant coverage
- Identify: deviations, missing variants, inconsistent patterns

**Subagent Returns**:
- Consistency checklist (✓/✗ for each component)
- Deviation list (what doesn't match the system)
- Missing patterns (variants or states needed)
- Recommendations (how to bring it into alignment)

**Example Prompt**:
```
Subagent, validate the new product gallery component against our design system.

Read:
1. Existing design system components (in /components/ or Obsidian design docs)
2. New product gallery component (in PR or working branch)
3. Pattern conventions: naming, props, variants

Compare:
- Naming: Does it follow the pattern (product-[type])?
- Props: Are props consistent with similar components?
- Variants: Does it cover the same cases as other components?
- Styling: Does it use the same brand colors and typography?

Return:
- Consistency checklist (✓/✗ for each pattern)
- Deviations (what's different from the system)
- Missing variants (states/sizes needed for consistency)
- Recommendations (how to align)
```

**Token Savings**: 3-5K tokens (avoids main thread browsing design system)

**Integration**: Results feed into Config D (Quality Review) before merging.

---

## Subagent Workflow Template

Every subagent prompt should follow this structure:

```markdown
Subagent, [task summary].

**Read**:
1. [File/URL/API #1]
2. [File/URL/API #2]
3. [Optional: Obsidian vault / ClickUp task]

**Analyze**:
- [What to look for / patterns to extract]
- [What to measure / compare]
- [What to flag / identify]

**Return**:
- [Specific output format #1]
- [Specific output format #2]
- [Optional: recommendations / checklist]
```

---

## Integration with Direct Launch Workflow

### Before Subagent Delegation
1. ✅ Task is reading/research/analysis (not writing/building)
2. ✅ Involves 5+ files or APIs or external sources
3. ✅ Result will be reusable (ClickUp, Obsidian, GitHub, docs)

### During Subagent Delegation
1. Main thread waits briefly (2-3 minutes typical)
2. Subagent runs in separate context window
3. Main thread can start something else if desired

### After Subagent Returns
1. Paste result into ClickUp or Obsidian (source of truth)
2. Main thread reads summary and proceeds to building/writing
3. Main thread has fresh context capacity (didn't spend it reading)

---

## Token Savings by Task Type

| Task Type | Main Thread Cost | Subagent Cost | Savings |
|-----------|-----------------|---------------|---------|
| Codebase Exploration | 12-15K | 8-10K | 3-5K (25-35%) |
| Content Audit | 10-12K | 6-8K | 2-4K (20-35%) |
| Competitor Research | 9-11K | 5-7K | 2-4K (20-35%) |
| Keyword Research | 11-14K | 7-9K | 3-5K (25-35%) |
| Yoast Metadata | 6-8K | 4-5K | 1-3K (15-40%) |
| ClickUp Synthesis | 5-7K | 3-4K | 1-3K (20-50%) |
| Git History | 8-10K | 5-6K | 2-4K (20-40%) |
| Image Discovery | 7-9K | 4-5K | 2-4K (25-45%) |
| Brand Audit | 5-7K | 3-4K | 1-3K (20-50%) |
| Performance Audit | 8-10K | 5-7K | 2-3K (20-30%) |
| Accessibility Audit | 7-9K | 4-6K | 2-3K (20-35%) |
| Design System Validation | 6-8K | 3-4K | 2-4K (30-50%) |

**Average Delegation Savings**: 2-3K tokens per task (20-35% reduction)

**High-Volume Impact**: On 10 tasks/day, delegating 3-4 of them = 6-12K tokens saved daily = 30-60K tokens saved weekly = $0.10-$0.18/day in saved costs.

---

## When NOT to Use Subagents

- ✗ Writing tasks (main thread should write)
- ✗ Small targeted reads (1-3 files → main thread is fine)
- ✗ Feedback loops (reviewing something you just built → main thread context already has it)
- ✗ Real-time decisions (need to see the thing live → main thread should do it)
- ✗ Client communication (direct interaction → main thread owns the relationship)

---

## Example: Full Lab Diamond Blog Series with Subagents

### Day 1: Research & Strategy (Subagents Run, Main Thread Waits)

```
Week 1 Tasks (all research, all delegated to subagents):

1. Content Audit subagent: Analyze Blog 1 for tone/structure
   → Returns: Brand voice fingerprint, structure template
   → Time: 2 minutes

2. Competitor Research subagent: Analyze 5 competitor lab diamond pages
   → Returns: Positioning matrix, content gaps
   → Time: 3 minutes

3. Keyword Research subagent: Map keywords for the series
   → Returns: Keyword matrix, internal linking map
   → Time: 2 minutes

4. ClickUp Synthesis subagent: Combine all 4 blog task briefs
   → Returns: Unified brief for each blog, master checklist
   → Time: 1 minute

Total subagent work: 8 minutes
Main thread context consumed: 0 (waiting)
Main thread ready for: Writing phase
```

### Day 2-5: Writing Phase (Main Thread Builds, Subagents on Standby)

```
Day 2: Write Blog 1 outline (reference: Content Audit results)
  - Main thread reads: Audio file from subagent (already in ClickUp)
  - Write: Outline for Blog 1
  - Tokens used: 4K

Day 3: Write Blog 1 full post (reference: Keyword matrix)
  - Main thread reads: Keyword recommendations from subagent
  - Write: Full 1,300-word post with keyword placement
  - Run: Yoast metadata extraction subagent (2 min)
  - Apply: Meta template to Blog 1
  - Tokens used: 6K

Day 4-5: Repeat for Blogs 2-4
  - Each blog: 1 day (6-8K tokens)
  - Reference: Structure template, keyword map, brand voice fingerprint
  - Subagents on standby if needed (none needed if content audit was thorough)

Total main thread work: 4 days × 6-8K = 24-32K tokens
Total subagent work: ~10K tokens (research phase)
Total cost: 34-42K tokens (vs. 60-80K without delegation)
Savings: 18-38K tokens (30-50% reduction)
```

---

## Pro Tips

### Tip 1: Chain Subagents for Efficiency
If one subagent's output is needed by another, don't have them run sequentially—tell the second subagent what the first found:

```
Subagent 2, use these keyword recommendations from Subagent 1:
[paste keyword matrix]

Now analyze competitor messaging for these keywords...
```

### Tip 2: Reuse Subagent Output
Store every subagent result in ClickUp or Obsidian. If you need the same analysis for a different blog post, just reference the old one instead of re-running the subagent.

### Tip 3: Combine Subagents with `/compact`
If main thread has run 8+ subagent delegations, run `/compact` before the next big writing phase. Cleans up the conversation while preserving subagent results.

### Tip 4: Subagent + Headroom Combo
Subagents work best with Headroom enabled. Headroom compresses subagent returns before they land in main thread, extending main session life even further.

### Tip 5: Set Expectations
Before delegating: "I'll have the outline ready in 5 minutes (waiting for subagent research). Meanwhile..." — keeps you productive during the wait.

---

## Next Steps

1. **This Week**: Try one subagent task from your current workflow (recommendation: Content Audit for Lab Diamond Blog 1)
2. **Next Week**: Use subagents for 2-3 research tasks before writing
3. **Month 2**: Integrate subagent results into 50% of your tasks
4. **Ongoing**: Track token savings per subagent task type; optimize based on your patterns

---

## Checklist: Before Every Subagent Delegation

- [ ] Task is reading/research/analysis (not writing)?
- [ ] Involves 5+ files, APIs, or external sources?
- [ ] Result will be stored in ClickUp/Obsidian/GitHub (reusable)?
- [ ] Subagent can work independently (doesn't need feedback)?
- [ ] Main thread doesn't need live updates from this task?
- [ ] Prompt is specific (not vague)?

If all ✓, delegate. If any ✗, keep in main thread.
