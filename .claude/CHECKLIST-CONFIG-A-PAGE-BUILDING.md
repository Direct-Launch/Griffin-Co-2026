# ✅ CONFIG A: PAGE BUILDING CHECKLIST

**When to Use**: Creating new service pages, landing pages, sections, WordPress posts  
**Frequency**: ~70% of your work  
**Duration**: 60-90 minutes  
**Cost Target**: 6-8K tokens  

---

## 🎯 **Skills to Invoke**

When starting this task, **copy this template and modify it with your actual page details:**

---

### **PROMPT TEMPLATE (Copy This)**

```
I'm building a new page for [CLIENT_NAME]. 

Please use these skills to help:
- Skill UI (for component building and layout)
- Impeccable (for code quality checking)
- Claude-seo (for SEO optimization)

Page Details:
- Page type: [e.g., Service page, Product page, Landing page]
- Target keywords: [list 3-5 keywords from Obsidian brand vault]
- Sections needed: [e.g., Hero, Features, Testimonials, CTA]
- Content focus: [brief description]

Here's what I need:
1. Build the page structure with semantic HTML
2. Create reusable components where applicable
3. Ensure code quality (use Impeccable feedback)
4. Implement SEO (meta tags, heading hierarchy, internal links)
5. Make it mobile-responsive

Let me provide the content/requirements...
```

---

## 📋 **WORKFLOW CHECKLIST**

Before you start, make sure you have:

- [ ] **Project folder open** in Claude Code terminal
- [ ] **Obsidian brand vault open** (for brand colors, fonts, tone)
- [ ] **ClickUp task open** (for page requirements and keywords)
- [ ] **This checklist visible** (reference while working)

---

## 🔄 **STEP-BY-STEP WORKFLOW**

### **Step 1: Gather Page Information (5 min)**

Before asking Claude, collect:

```
Page Name: ___________________
Client: ___________________
Target Keywords: ___________________
Target Audience: ___________________
Primary Goal: ___________________
Sections Needed: 
  - ___________________
  - ___________________
  - ___________________
```

### **Step 2: Set the Context (Minute 0-5)**

Use the prompt template above. Be specific about:
- Page type
- Keywords (from brand vault)
- Sections needed
- Brand tone (from Obsidian)

### **Step 3: Build the Page (Minute 5-50)**

I'll use:
- **Skill UI** → Build semantic components
- **Impeccable** → Check code quality as we go
- **Claude-seo** → Add SEO (meta, keywords, internal links)

You provide:
- Content/copy for each section
- Any design specifics from brand vault
- Feedback on layout/structure

### **Step 4: Quality Review (Minute 50-70)**

Before finishing:
- [ ] Impeccable has reviewed code
- [ ] All pages validate (no errors)
- [ ] SEO implemented (meta, keywords, hierarchy)
- [ ] Mobile responsive verified
- [ ] Brand guidelines followed

### **Step 5: Test & Commit (Minute 70-90)**

Before pushing:
- [ ] Test page in browser (local or staging)
- [ ] Check Core Web Vitals
- [ ] Verify all links work
- [ ] Commit to GitHub with clear message

---

## 💡 **KEY POINTS**

✅ **Skill UI handles building** - Don't write HTML from scratch, let it suggest components  
✅ **Impeccable catches quality issues** - Listen to its feedback, fix issues  
✅ **Claude-seo guides keywords** - Use target keywords naturally, not forced  
✅ **Brand vault is your source** - Reference Obsidian for colors, fonts, tone  
✅ **Mobile-first thinking** - Design for mobile first, then enhance for desktop  

---

## 📊 **COST TRACKING**

**After you finish this page, run:**

```
./scripts/track-costs.sh log page [TOKENS] "Page name - sections built"
```

Example:
```
./scripts/track-costs.sh log page 7500 "Service page - 4 sections, Yoast green"
```

**Expected**: 6-8K tokens  
**If higher**: Might need Config D (optimize) as next step  
**If lower**: Excellent! You're ahead of target  

---

## ❓ **COMMON QUESTIONS**

**Q: Should I use Elementor or build in code?**  
A: For WordPress + Elementor: Have Claude suggest layout, you build in Elementor editor using Skill UI feedback. For Shopify: Build Liquid/CSS in code directly.

**Q: What if the page needs animations?**  
A: Mention "animation" in your prompt. Skill UI can suggest Lottie or CSS animations (but note: might push cost toward Config C).

**Q: How do I know if it's "mobile responsive"?**  
A: Test at 375px (mobile), 768px (tablet), 1024px+ (desktop). All sections should be readable/usable at each breakpoint.

**Q: What if Impeccable flags issues?**  
A: Fix them! Quality is non-negotiable. Don't move on until code is clean.

---

## ✅ **SUCCESS CRITERIA**

After this config, you should have:

- ✅ New page built and committed
- ✅ All semantic HTML (proper heading hierarchy, alt text, etc.)
- ✅ SEO implemented (meta, keywords, internal links)
- ✅ Mobile responsive (tested at 3 breakpoints)
- ✅ Code quality checked (Impeccable approved)
- ✅ Costs logged (6-8K tokens)
- ✅ Brand guidelines followed (colors, fonts, tone)

---

## 🚀 **READY TO START?**

1. Copy the prompt template above
2. Fill in your page details
3. Paste it in Claude Code
4. Mention: "Use Skill UI, Impeccable, and Claude-seo skills"
5. I'll activate those skills and guide you through

---

## 📞 **DURING THE TASK**

If you get stuck:
- Share the error with me
- Tell me what step you're on
- I'll help debug in real-time

**This checklist is your guide. Refer back to it anytime you need to remember the workflow.**

---

**Status**: Ready to use  
**Skills**: Skill UI + Impeccable + Claude-seo  
**Cost**: 6-8K tokens  
**Duration**: 60-90 minutes  
