# ✅ CONFIG C: COMPLEX COMPONENT CHECKLIST

**When to Use**: Building interactive components, carousels, animations, complex layouts  
**Frequency**: ~10% of your work  
**Duration**: 90-120 minutes (build 60min + optimize 30min + test 30min)  
**Cost Target**: 8-10K tokens  

---

## 🎯 **Skills to Invoke**

This is a **two-phase task**. Do Phase 1 first (build), then Phase 2 (optimize).

---

### **PHASE 1: BUILD - PROMPT TEMPLATE (Copy This)**

```
I'm building a complex component for [CLIENT_NAME].

Please use these skills to help:
- Skill UI (for component architecture and building)
- Impeccable (for code quality)
- Claude-seo (for semantic HTML and accessibility)

Component Details:
- Component name: [e.g., Product Carousel, Testimonial Slider, Feature Grid]
- Component type: [e.g., Interactive, Animated, Responsive Grid]
- Framework: [React, HTML/CSS, Shopify Liquid, WordPress PHP]
- Features needed: [list key features]
- Brand constraints: [colors, fonts from Obsidian]

Requirements:
1. Build clean, semantic component architecture
2. Make it responsive (mobile-first)
3. Include proper accessibility (alt text, ARIA, keyboard nav)
4. Implement animations [if needed]
5. Follow brand guidelines

Here's what I need the component to do...
```

---

### **PHASE 2: OPTIMIZE - PROMPT TEMPLATE (Copy After Phase 1)**

```
Now that the component is built, let's optimize it.

Please use these skills:
- Code Burn (for optimization and minification)
- Impeccable (for final quality check)

Optimization Goals:
- Minify CSS/JavaScript
- Remove unused code
- Improve Core Web Vitals (LCP, FID, CLS)
- Optimize bundle size

Here's the current component code...
```

---

## 📋 **WORKFLOW CHECKLIST**

Before you start, make sure you have:

- [ ] **Project folder open** in Claude Code terminal
- [ ] **Obsidian brand vault open** (for brand colors, fonts)
- [ ] **ClickUp task open** (for component specs)
- [ ] **This checklist visible** (reference while working)
- [ ] **Component design/mockup available** (reference for layout)

---

## 🔄 **STEP-BY-STEP WORKFLOW**

### **PHASE 1: BUILD (60 minutes)**

#### **Step 1: Define Component (5 min)**

```
Component Name: ___________________
Component Type: ___________________
Key Features:
  - ___________________
  - ___________________
  - ___________________
Framework: ___________________
Responsive Breakpoints: ___________________
Browser Support: ___________________
```

#### **Step 2: Set Build Context (Minute 0-5)**

Use Phase 1 prompt template. Be specific:
- Component behavior (what does it do?)
- Design reference (link to mockup or description)
- Brand constraints (colors, fonts, spacing)
- Performance requirements (fast/lightweight?)

#### **Step 3: Build Component (Minute 5-50)**

I'll use:
- **Skill UI** → Suggest component structure, code patterns
- **Impeccable** → Check code quality as we build
- **Claude-seo** → Ensure semantic HTML, accessibility

You provide:
- Feedback on structure/layout
- Any design changes needed
- Content/data for the component
- Test as we go

#### **Step 4: Quality Check (Minute 50-60)**

Before moving to Phase 2:
- [ ] Code has no errors (Impeccable approved)
- [ ] All sections render correctly
- [ ] Responsive at breakpoints (375px, 768px, 1024px)
- [ ] Accessible (keyboard navigation works, alt text present)
- [ ] Matches brand guidelines

---

### **PHASE 2: OPTIMIZE (30 minutes)**

**Only start Phase 2 after Phase 1 is complete!**

#### **Step 5: Optimize (Minute 60-85)**

I'll use:
- **Code Burn** → Minify, remove unused code, optimize
- **Impeccable** → Verify quality after optimization

You provide:
- Confirmation optimization looks good
- Final tweaks if needed

#### **Step 6: Performance Test (Minute 85-90)**

Before committing:
- [ ] Bundle size reduced (how much?)
- [ ] Core Web Vitals check (LCP, FID, CLS)
- [ ] Still works correctly (functionality preserved)
- [ ] Code quality maintained (Impeccable approved)

---

## 💡 **KEY POINTS**

✅ **Build first, optimize second** - Never optimize during build phase  
✅ **Mobile-first thinking** - Design for 375px first, enhance for larger  
✅ **Accessibility matters** - Keyboard nav, ARIA labels, semantic HTML  
✅ **Test at each breakpoint** - 375px (mobile), 768px (tablet), 1024px+ (desktop)  
✅ **Brand compliance** - Colors, fonts, spacing from Obsidian must match  

---

## 📊 **COST TRACKING**

**After you finish BOTH phases, run:**

```
./scripts/track-costs.sh log component [TOKENS] "Component name - description"
```

Example:
```
./scripts/track-costs.sh log component 9500 "Product carousel - animations, responsive"
```

**Expected**: 8-10K tokens total (Phase 1: 5-6K, Phase 2: 2-3K)  
**If higher**: Might need simpler component or break into smaller pieces  
**If lower**: Excellent work!  

---

## ❓ **COMMON QUESTIONS**

**Q: Should I build in React or vanilla JavaScript?**  
A: Depends on your project. React for complexity/state. Vanilla for simplicity. Tell Claude your preference.

**Q: How do I handle animations?**  
A: Mention "CSS animations" or "Lottie animations" in your prompt. Skill UI will guide approach.

**Q: What if optimization breaks the component?**  
A: Stop and revert. Functionality > micro-optimization. We can try different approach.

**Q: Can I skip Phase 2 (optimization)?**  
A: Yes, if performance isn't critical. But for production, Phase 2 is recommended.

**Q: How do I test responsiveness locally?**  
A: Browser DevTools → Toggle device toolbar → Test at 375px, 768px, 1024px.

---

## ✅ **SUCCESS CRITERIA**

After this config, you should have:

- ✅ Component built with semantic HTML
- ✅ Responsive at 3+ breakpoints (mobile, tablet, desktop)
- ✅ Accessible (keyboard nav, ARIA labels, alt text)
- ✅ Code quality checked (Impeccable approved)
- ✅ Animations/interactions working smoothly
- ✅ Optimized for performance (Phase 2)
- ✅ Bundle size reduced by 15-25%
- ✅ Core Web Vitals acceptable
- ✅ Costs logged (8-10K tokens)
- ✅ Component committed to GitHub

---

## 🚀 **READY TO START?**

**Phase 1:**
1. Copy Phase 1 prompt template
2. Fill in component details
3. Paste in Claude Code
4. Mention: "Use Skill UI, Impeccable, and Claude-seo skills"
5. I'll guide you through building

**Phase 2 (After Phase 1 Complete):**
1. Copy Phase 2 prompt template
2. Share the built component code
3. Paste in Claude Code
4. Mention: "Use Code Burn and Impeccable skills"
5. I'll guide you through optimization

---

## 📞 **DURING THE TASK**

If you get stuck:
- Tell me which phase you're on
- Share the component code or error
- I'll help debug in real-time

**Remember: Build first (Phase 1), optimize second (Phase 2). Don't mix them!**

---

**Status**: Ready to use  
**Skills - Phase 1**: Skill UI + Impeccable + Claude-seo  
**Skills - Phase 2**: Code Burn + Impeccable  
**Cost**: 8-10K tokens total  
**Duration**: 90-120 minutes  
