# Subagent Quick Reference (One-Pager)

**Copy to `.claude/SUBAGENT-REFERENCE.md` for every project.**

---

## When to Delegate

✓ **Reading/research/analysis** (not writing)  
✓ **5+ files or APIs**  
✓ Result will be reused (ClickUp/Obsidian)  
✓ Subagent can work alone (no feedback loop)  

✗ Writing, building, or feedback loops  
✗ Small reads (1-3 files)  
✗ Real-time decision-making  

---

## 12 Subagent Patterns (Copy/Paste Templates)

### 1. Content Audit
```
Subagent, audit [existing post] for consistency before I write [new post].

Read: [existing blog] + Obsidian vault (Writing Style.md)

Return: Brand voice fingerprint, structure template, baseline metrics
```
**Saves**: 6-10K tokens | **Use**: Before writing new content

---

### 2. Codebase Exploration
```
Subagent, explore the [theme] structure.

Read: /wp-content/themes/[theme]/ recursively

Return: ASCII tree, key files list, reusable components, naming conventions
```
**Saves**: 8-12K tokens | **Use**: Starting new client/section

---

### 3. Competitor Research
```
Subagent, research how competitors position [topic].

Read: [3-5 competitor URLs from ClickUp brief]

Return: Positioning matrix, content gaps, tone recommendations
```
**Saves**: 5-9K tokens | **Use**: Before writing strategy

---

### 4. Keyword Research
```
Subagent, research keywords for [product/topic].

Read: ClickUp task + Opinly (if available) + existing content

Return: Keyword matrix, gap analysis, quick wins, cluster map
```
**Saves**: 7-11K tokens | **Use**: Before writing blog series

---

### 5. Yoast Metadata Extraction
```
Subagent, extract Yoast metadata from [blog 1].

Read: WordPress REST API or Code Snippets plugin output

Return: Meta template, readability baseline, checklist, examples
```
**Saves**: 4-6K tokens | **Use**: Before SEO optimization

---

### 6. ClickUp Task Synthesis
```
Subagent, synthesize [parent task] + all subtasks.

Read: ClickUp: [parent ID] and all linked subtasks

Return: Unified brief per item, master checklist, timeline
```
**Saves**: 3-5K tokens | **Use**: When parent has 5+ subtasks

---

### 7. Git History Analysis
```
Subagent, analyze recent changes to [section/files].

Read: git log (last 20 commits) for [file path]

Return: Change summary, known issues, refactor map, recommendations
```
**Saves**: 5-8K tokens | **Use**: Before editing recently-changed code

---

### 8. Image Asset Discovery
```
Subagent, inventory [section] images.

Read: /wp-content/uploads/, Obsidian Image Gallery.md, Canva templates

Return: Image specs, Canva template catalog, naming convention, design specs
```
**Saves**: 4-7K tokens | **Use**: Before creating new images

---

### 9. Brand Compliance Audit
```
Subagent, audit [draft post] against brand vault.

Read: Obsidian (Brand Overview, Writing Style, Color Palette, Typography) + draft

Return: Compliance checklist, specific fixes, brand voice assessment
```
**Saves**: 3-5K tokens | **Use**: Before publishing

---

### 10. Performance Audit
```
Subagent, run performance baseline on [page URL].

Test: Lighthouse (desktop + mobile), Core Web Vitals

Return: Baseline metrics, bottleneck list, quick wins, optimization targets
```
**Saves**: 5-8K tokens | **Use**: Before optimization phase

---

### 11. Accessibility Audit
```
Subagent, audit [page/post] for WCAG 2.1 AA compliance.

Test: Color contrast, heading hierarchy, alt text, keyboard nav

Return: Accessibility score, violations list, warnings, manual checklist
```
**Saves**: 4-6K tokens | **Use**: Before publishing

---

### 12. Design System Validation
```
Subagent, validate [new component] against design system.

Read: Existing components + new component + design docs

Return: Consistency checklist, deviations, missing variants, recommendations
```
**Saves**: 3-5K tokens | **Use**: Before merging component PR

---

## Prompt Template (Use for Any Task)

```
Subagent, [task summary].

**Read**:
1. [File/URL/API #1]
2. [File/URL/API #2]
3. [Obsidian vault / ClickUp / GitHub path]

**Analyze**: [What to extract/compare/identify]

**Return**: 
- [Output format #1]
- [Output format #2]
- [Specific checklist / recommendations]
```

---

## Token Savings Quick Estimate

| Task Type | Saves |
|-----------|-------|
| Codebase Exploration | 3-5K |
| Content Audit | 2-4K |
| Competitor Research | 2-4K |
| Keyword Research | 3-5K |
| Yoast Metadata | 1-3K |
| ClickUp Synthesis | 1-3K |
| Git History | 2-4K |
| Image Discovery | 2-4K |
| Brand Audit | 1-3K |
| Performance Audit | 2-3K |
| Accessibility Audit | 2-3K |
| Design System | 2-4K |

**Average per subagent**: 2-3K tokens saved (20-35% reduction)

**On 10 tasks/day**: Delegate 3-4 tasks = 6-12K tokens/day saved = **$0.10-$0.18/day**

---

## Integration Points

After subagent returns:

1. **Paste result** into ClickUp task description (for reuse)
2. **Or** save to Obsidian vault (for reference)
3. **Or** commit to GitHub (if code-related)
4. **Main thread** reads summary and proceeds to writing/building
5. Main thread **has fresh context** for 1-2 more hours of work

---

## Pro Tips

- **Chain subagents**: "Use these keywords from Subagent 1, now analyze..."
- **Reuse results**: Don't re-run the same subagent twice; reference old output
- **Combine with `/compact`**: After 8+ subagent calls, run `/compact`
- **Pair with Headroom**: Subagent + Headroom = maximum context efficiency
- **Store everything**: Every subagent result → ClickUp/Obsidian for future use

---

## Decision Tree

```
Is this task reading/analyzing/researching?
├─ YES: Can 1+ subagent do it?
│  └─ YES: Use subagent template from above
│  └─ NO: Keep in main thread
└─ NO: Writing/building/feedback?
   └─ YES: Main thread handles it
```

**When in doubt**: Delegate. Subagents are cheap; context is expensive.
