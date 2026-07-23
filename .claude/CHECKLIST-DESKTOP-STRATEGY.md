# ✅ DESKTOP STRATEGY CHECKLIST

**When to Use**: BEFORE starting Code work - planning/brainstorming phase  
**Frequency**: Start of every new page/content project  
**Duration**: 30-45 minutes  
**Cost Target**: 6-8K tokens  
**Output**: Detailed task description to hand to Claude Code  

---

## 🎯 **Skills to Invoke**

This runs in **Claude Desktop** (not Claude Code terminal). Use these skills:

---

### **PROMPT TEMPLATE (Copy This)**

```
I'm planning content strategy for a new [page/blog post/campaign] for [CLIENT_NAME].

Please use these skills to help plan:
- Claude-seo (for keyword research and SEO strategy)
- Marketing Skills (for copy brainstorming and messaging)
- Context Engineering (to refine prompts for the execution phase)

Project Details:
- Project type: [Page/Blog/Campaign/Landing Page]
- Target audience: [Who is this for?]
- Business goal: [What are we trying to achieve?]
- Current situation: [e.g., New page, Redesign, Refreshing content]

What I need:
1. Target keyword research (3-5 primary + 5-10 secondary keywords)
2. Page/article structure outline
3. Copy angles and headline options
4. Internal link opportunities
5. CTA recommendations
6. Clear brief for the execution phase (Claude Code)

Here's my current thinking...
```

---

## 📋 **WORKFLOW CHECKLIST**

Before you start, make sure you have:

- [ ] **Claude Desktop open** (not Claude Code terminal)
- [ ] **Obsidian brand vault accessible** (for brand voice, audience info)
- [ ] **ClickUp open** (to update task with strategy)
- [ ] **This checklist visible** (reference while planning)
- [ ] **Client briefs/requirements available** (for context)

---

## 🔄 **STEP-BY-STEP WORKFLOW**

### **Step 1: Gather Project Information (10 min)**

Before asking Claude, collect:

```
Client: ___________________
Project Name: ___________________
Project Type: [Page / Blog / Campaign / Landing]
Target Audience: ___________________
Primary Business Goal: ___________________
Current Status: [New / Redesign / Refresh]

Competitor Context:
  - What are competitors doing?: ___________________
  - What are they missing?: ___________________

Brand Context (from Obsidian):
  - Brand voice: ___________________
  - Key messaging pillars: ___________________
  - Unique value prop: ___________________
```

### **Step 2: Plan Strategy (30 min)**

Use the prompt template above. I'll use:
- **Claude-seo** → Research keywords, analyze search intent
- **Marketing Skills** → Brainstorm copy angles, headlines, messaging
- **Context Engineering** → Refine brief for execution phase

You provide:
- Feedback on keyword targets
- Any adjustments to strategy
- Client preferences or constraints
- Competitor context

**Expected deliverables from this phase:**

```
✅ 3-5 Primary keywords (high-value targets)
✅ 5-10 Secondary keywords (supporting keywords)
✅ Page/article structure outline (sections, flow)
✅ 3-5 headline options with CTAs
✅ 2-3 unique copy angles
✅ Internal link opportunities (2-3 links to other pages/posts)
✅ Call-to-action recommendations
✅ Refined brief for execution phase
```

### **Step 3: Create Execution Brief (5 min)**

Before handing off to Claude Code, create a clear brief:

**Save this in ClickUp task description** (so Claude Code can read it):

```
## Strategy Summary

**Keywords**: [list primary + secondary]
**Audience**: [who we're writing for]
**Goal**: [what we want to achieve]
**Tone**: [brand voice]

## Content Structure
- Section 1: [heading + purpose]
- Section 2: [heading + purpose]
- Section 3: [heading + purpose]
- [etc]

## Key Copy Points
- Angle 1: [copy angle]
- Angle 2: [copy angle]
- Angle 3: [copy angle]

## Internal Links
- Link to [page/post]: [reason]
- Link to [page/post]: [reason]

## Call-to-Action
- Primary CTA: [specific action]
- Secondary CTA: [specific action]

## Special Notes
- [Any constraints or requirements]
- [Brand guidelines to follow]
- [Competitor considerations]
```

### **Step 4: Clarify for Execution (5 min)**

After strategy is clear:

**Use Context Engineering skill to refine the brief:**

Ask Claude to review and ask:
- Any questions about the strategy?
- Are there ambiguities that need clarification?
- What assumptions should Claude Code verify?

This ensures Claude Code has a crystal-clear brief and won't waste tokens brainstorming.

---

## 💡 **KEY POINTS**

✅ **Plan BEFORE building** - Eliminates brainstorming waste in Code session  
✅ **Keywords drive content** - Not the other way around  
✅ **Document strategy** - Save brief in ClickUp for Claude Code to read  
✅ **Get feedback** - Confirm strategy before building  
✅ **One clear output** - A detailed brief ready for execution  

---

## 📊 **COST TRACKING**

**After planning is complete, run:**

```
./scripts/track-costs.sh log strategy [TOKENS] "Project name - strategy planning complete"
```

Example:
```
./scripts/track-costs.sh log strategy 7200 "Service page strategy - 5 keywords, outline, copy angles"
```

**Expected**: 6-8K tokens  
**If higher**: Complex research or many iterations (acceptable)  
**If lower**: Quick planning (great!)  

---

## ❓ **COMMON QUESTIONS**

**Q: Should I run this in Claude Desktop or Claude Code?**  
A: **Claude Desktop**. This is planning. Claude Code is for execution.

**Q: What if I'm in a rush - can I skip strategy?**  
A: No! Strategy saves time in execution. 30 min planning = 60 min saved in Code.

**Q: How many keywords is enough?**  
A: Minimum 3-5 primary (high value). Add 5-10 secondary (supporting).

**Q: Should I do keyword research myself or have Claude do it?**  
A: Claude-seo does research. Your job: provide business context, feedback.

**Q: What if keywords seem too competitive?**  
A: Ask Claude-seo for alternatives. We can target different angle or lower-volume keywords.

---

## ✅ **SUCCESS CRITERIA**

After this checklist, you should have:

- ✅ 3-5 primary keywords identified
- ✅ 5-10 secondary keywords identified
- ✅ Page/article structure outlined
- ✅ 3+ headline options brainstormed
- ✅ 2-3 copy angles developed
- ✅ Internal link opportunities noted
- ✅ CTAs recommended
- ✅ Clear brief in ClickUp (for Claude Code)
- ✅ Costs logged (6-8K tokens)
- ✅ Ready to hand off to execution phase

---

## 🚀 **READY TO START?**

1. Open **Claude Desktop** (not Claude Code)
2. Copy the prompt template above
3. Fill in project details
4. Paste in Claude Desktop
5. Mention: "Use Claude-seo, Marketing Skills, and Context Engineering"
6. Work through strategy planning

---

## 📞 **DURING THE TASK**

If you get stuck:
- Tell me what strategy aspect you're working on
- Share brainstorming results
- I'll help refine or provide alternatives

**Remember: Strategy BEFORE execution! This is your planning phase.**

---

## 🔗 **After Strategy is Complete**

**Hand off to Claude Code execution:**

1. Copy the strategy brief you created
2. Update ClickUp task with brief
3. Start Claude Code terminal
4. Use Config A/B/C to execute
5. Claude Code reads the brief and executes (no more brainstorming needed)

---

**Status**: Ready to use  
**Skills**: Claude-seo + Marketing Skills + Context Engineering  
**Cost**: 6-8K tokens  
**Duration**: 30-45 minutes  
**Tool**: Claude Desktop (not Claude Code)  
**Timing**: Run BEFORE execution phase  
