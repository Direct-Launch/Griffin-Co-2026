# 🔄 WORKFLOW: CLAUDE CODE + CLICKUP + HIGH-VOLUME WORK

**Direct Launch Daily Operations**

---

## 📍 THE SETUP

- **Claude Code Terminal**: Where you do work (griffin-co-2026 project)
- **ClickUp**: Where tasks live
- **Canva**: Design references
- **GitHub**: Code repository
- **This file**: Your workflow guide

---

## 🎯 DAILY WORKFLOW

### **Morning: Start Claude Code**

```bash
cd G:\Shared drives\Griffin & Co\Website Files\Griffin-Co-2026\Griffin-Co-2026 Clone\Griffin-Co-2026
claude
```

You're now in Claude Code terminal, ready to work.

### **Throughout Day: Tell Me Tasks**

As you work through ClickUp tasks (10-50 per day):

**From ClickUp, you see:**
```
Task 1: "Build engagement ring product page"
Task 2: "Write blog post - diamond care guide"
Task 3: "Optimize homepage performance"
Task 4: "Design summer campaign landing page"
[etc]
```

**You tell me:**
```
"Build engagement ring product page"
"Write blog post - diamond care guide"
"Optimize homepage performance"
"Design summer campaign landing page"
```

**I automatically:**
- Identify task type
- Activate right skills
- Guide you through execution
- Help you finish

### **During Work: I Guide You**

```
You: "Build engagement ring product page"
Me: "Great! Using Skill UI, Impeccable, and Claude-seo.
     What content do you have? Or should I suggest structure?"
You: [Provide content or brief]
Me: [Build the page with skills active]
You: [Review, give feedback]
Me: [Refine, optimize]
You: "Ready to commit"
Me: "Perfect, commit to GitHub"
```

**Time per task: 20-90 minutes depending on complexity**

### **End of Day: Quick Note**

```
You: "That's my work for today - 12 tasks"
Me: "Noted. I'm tracking tokens across all tasks."
```

---

## 💬 HOW TO TELL ME TASKS

### **Format 1: Simple Statement**
```
"Build a service page for engagement rings"
"Write a blog post about lab diamonds"
"Optimize the contact form"
```

### **Format 2: With Context**
```
"Build engagement ring page - 4 sections: hero, features, testimonials, CTA"
"Write blog on diamond care with focus on cleaning methods"
"Optimize homepage - improve LCP and CLS metrics"
```

### **Format 3: From ClickUp**
```
Just read me the ClickUp task title/description
"Build product page - Engagement Rings collection with Canva mockup attached"
```

**All formats work. Pick what feels natural.**

---

## 🛠️ TASK EXECUTION FLOW

### **Page/Section Building**
```
You: "Build engagement ring product page"
Me: Activate Skill UI + Impeccable + Claude-seo
Process:
  1. Structure page sections
  2. Add semantic HTML
  3. Implement SEO (keywords, meta, internal links)
  4. Check code quality
  5. Make responsive
Done: Ready to test/publish
Time: 60-90 min
Cost: 6-8K tokens
```

### **Blog/Content Writing**
```
You: "Write blog about diamond care"
Me: Activate Claude-seo + Impeccable
Process:
  1. Research target keywords
  2. Write SEO-optimized content
  3. Structure with subheadings
  4. Add internal links
  5. Verify Yoast targets
Done: Ready to publish
Time: 40-60 min
Cost: 3-5K tokens
```

### **Optimization**
```
You: "Optimize homepage speed"
Me: Activate Code Burn + Impeccable
Note: Only do after initial build is complete
Process:
  1. Minify CSS/JS
  2. Remove unused code
  3. Optimize images
  4. Improve Core Web Vitals
Done: Ready to test/deploy
Time: 20-30 min
Cost: 2-4K tokens
```

### **Testing**
```
You: "Test homepage on mobile/tablet/desktop"
Me: Activate Playwright CLI + Impeccable
Process:
  1. Screenshot at 3 breakpoints
  2. Test functionality
  3. Check for console errors
  4. Verify performance
Done: Report issues or clear to merge
Time: 15-20 min
Cost: 2-3K tokens
```

### **Planning (Claude Desktop)**
```
You: "Plan strategy for new product page"
Tool: Claude Desktop (different from Claude Code!)
Me: Activate Claude-seo + Marketing Skills + Context Engineering
Process:
  1. Keyword research
  2. Copy brainstorming
  3. Structure outline
  4. Internal link strategy
Done: Brief saved in ClickUp for execution phase
Time: 30-45 min
Cost: 6-8K tokens
Output: Then use Claude Code to build from brief
```

### **Quality Review**
```
You: "Final review this blog post before publish"
Me: Activate Stop Slop Skill + Impeccable
Process:
  1. Check writing quality
  2. Catch weak sentences
  3. Verify code quality
  4. Brand compliance check
Done: Ready to publish
Time: 15-20 min
Cost: 2-3K tokens
```

---

## 📋 INTEGRATION WITH TOOLS

### **ClickUp Usage**
```
Store tasks there (you already do)
When working:
  1. Open ClickUp task
  2. Read requirements
  3. Tell me: "Build [task name]"
  4. We execute
  5. Update task status when done
```

### **Canva Integration**
```
If task has Canva mockup:
  1. Open Canva file
  2. Note design, colors, layout
  3. Tell me: "Build page following Canva mockup at [link]"
  4. I build to match design
```

### **GitHub Workflow**
```
As you build:
  1. Create feature branch: git checkout -b feature/page-name
  2. Make changes (I guide you)
  3. Commit: git commit -m "Add engagement ring product page"
  4. Push: git push origin feature/page-name
  5. Create PR when ready
  6. Merge to main when approved
  7. Auto-deploy via GitHub Actions
```

### **Obsidian Brand Vault**
```
I can query it automatically for:
  - Brand colors, fonts
  - Tone of voice guidelines
  - Logo files, images
  - SEO keywords
Just tell me: "Use Griffin & Co brand guidelines from Obsidian"
```

---

## 🔄 MULTIPLE TASKS IN SEQUENCE

**This is how high-volume work flows:**

```
9:00 AM: 
  "Build engagement ring page"
  [We build, 60 min]

10:00 AM:
  "Write diamond care blog"
  [We write, 45 min]

10:45 AM:
  "Optimize homepage"
  [We optimize, 25 min]

11:10 AM:
  "Test homepage before merge"
  [We test, 15 min]

11:25 AM:
  [Ready for next task]
  "Design landing page mockup in Canva"
  [Continue...]
```

**Each task: brief handoff → I activate skills → we execute → done → next task**

---

## 📊 COST TRACKING (Simplified)

### **No Per-Task Logging**

Instead of logging after each task:

```
End of day:
  You: "That's 12 tasks done"
  Me: "Noted. Tracking ~85K tokens across all tasks"

End of week (Friday):
  You: "Log this week"
  Me: "Total: 47 tasks, ~145K tokens
       Pages (12): 72K
       Blogs (8): 24K
       Optimization (15): 30K
       Components (12): 19K"
  You: "Save that"

End of month:
  You: "Monthly summary"
  Me: "300 tasks, ~580K tokens, ~$1.74 cost"
```

**See COST-TRACKER.txt for logging template**

---

## ⚡ SPEED TIPS

### **To Move Faster:**
- ✅ Have content/requirements ready (don't ask me to brainstorm)
- ✅ Use ClickUp for context (I can read task descriptions)
- ✅ Use Canva mockups (I build to match)
- ✅ Let me know constraints upfront (budget, time, brand rules)
- ✅ Batch similar tasks (multiple pages = faster)

### **What Slows Things Down:**
- ❌ Waiting for content/requirements from clients
- ❌ Changing requirements mid-task
- ❌ Unclear brand guidelines
- ❌ No reference designs

---

## 🔐 QUALITY STANDARDS

Every task should have:
- ✅ Semantic HTML (proper structure)
- ✅ Code quality (Impeccable check)
- ✅ Mobile responsive (tested at 3 breakpoints)
- ✅ Brand compliance (colors, fonts, tone)
- ✅ SEO basics (when applicable)
- ✅ No console errors
- ✅ Tested before merge

**All automatic with skill activation. No manual checks needed.**

---

## 🚀 READY TO START

1. ✅ Claude Code terminal open
2. ✅ This workflow guide ready
3. ✅ QUICK-START.md reference visible
4. ✅ COST-TRACKER.txt template ready

**Now you're set up for high-volume work.**

Tell me your first task from ClickUp and we'll execute! 🚀

---

**Questions about workflow?** Ask now.  
**Ready to start working?** Tell me your first task!
