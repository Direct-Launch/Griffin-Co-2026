# ✅ QUALITY REVIEW CHECKLIST

**When to Use**: FINAL step - right before publishing/deploying  
**Frequency**: End of every project before going live  
**Duration**: 15-20 minutes  
**Cost Target**: 2-3K tokens  

---

## 🎯 **Skills to Invoke**

When starting this final quality review:

---

### **PROMPT TEMPLATE (Copy This)**

```
I need a final quality review of this [page/blog/component] before publishing.

Please use these skills:
- Stop Slop Skill (to catch weak writing, unclear passages, filler)
- Impeccable (for final code quality check)

What to review:
1. Writing quality (no fluff, clear messaging)
2. Copy consistency (brand voice throughout)
3. Grammar and spelling
4. Code quality (no errors, best practices)
5. Accessibility compliance
6. Brand guideline adherence

Red flags to catch:
- Overused phrases or clichés
- Unclear sentences that confuse readers
- Inconsistent tone or voice
- Weak CTAs or unclear next steps
- Any technical issues or warnings

Here's the content to review...
```

---

## 📋 **WORKFLOW CHECKLIST**

Before you start, make sure you have:

- [ ] **Page/blog/component is complete** (built and tested)
- [ ] **All copy is finalized** (ready for review)
- [ ] **Code is tested** (no known bugs)
- [ ] **This checklist visible** (reference while reviewing)
- [ ] **Brand vault accessible** (for final guideline check)

---

## 🔄 **STEP-BY-STEP WORKFLOW**

### **Step 1: Self-Review Checklist (5 min)**

Before asking Claude, go through yourself:

**Writing Quality:**
- [ ] No typos or grammar errors (use spell-check)
- [ ] Sentences are clear and concise
- [ ] No overused phrases ("As mentioned before", "For all intents and purposes")
- [ ] No filler words ("really", "very", "quite")
- [ ] Brand voice consistent throughout

**Code Quality:**
- [ ] No console errors (checked DevTools)
- [ ] No broken links or images
- [ ] All buttons/forms working
- [ ] No unused CSS or JavaScript
- [ ] Semantic HTML (proper heading hierarchy, alt text)

**Brand Compliance:**
- [ ] Colors match brand guidelines
- [ ] Fonts match brand guidelines
- [ ] Tone matches brand voice
- [ ] All required brand elements present

**Accessibility:**
- [ ] All images have alt text
- [ ] Links are descriptive (not "click here")
- [ ] Keyboard navigation works
- [ ] Color contrast is sufficient
- [ ] No flashing/seizure-inducing animations

**Performance:**
- [ ] Page loads quickly (<3 seconds)
- [ ] No layout shifts (CLS <0.1)
- [ ] Images optimized
- [ ] Code minified

### **Step 2: Final Content Review (10 min)**

Use the prompt template above. I'll use:
- **Stop Slop Skill** → Catch weak writing, unclear passages, filler
- **Impeccable** → Verify code quality one final time

You provide:
- Full page content or blog post text
- Code to review
- Any areas you're concerned about

**I'll check for:**
- Weak or unclear sentences
- Overused phrases or clichés
- Inconsistent tone
- Filler words that can be removed
- Confusing passages
- Code quality issues

### **Step 3: Implement Feedback (5 min)**

Review my feedback:

**Critical (must fix):**
- Broken functionality
- Missing alt text/accessibility
- Major grammar errors
- Brand guideline violations

**Important (should fix):**
- Weak sentences
- Tone inconsistencies
- Code quality issues
- Clarity improvements

**Nice to fix:**
- Minor word choices
- Style preferences
- Formatting tweaks

**Make these changes** (or discuss with me if you disagree).

### **Step 4: Final Sign-Off (1 min)**

Before publishing:

```
Final Checklist:
  [ ] Stop Slop review complete
  [ ] Code quality verified
  [ ] No accessibility issues
  [ ] Brand compliant
  [ ] All feedback addressed
  [ ] Ready to publish
```

---

## 💡 **KEY POINTS**

✅ **Quality gate** - This is your last chance to catch issues  
✅ **Fresh eyes** - My review catches things you've missed after working on it  
✅ **Stop slop** - Removes weak writing and filler automatically  
✅ **Final verification** - Code quality one last time  
✅ **Brand check** - Ensure everything matches guidelines  

---

## 📊 **COST TRACKING**

**After review is complete, run:**

```
./scripts/track-costs.sh log review [TOKENS] "Page/blog name - final quality review"
```

Example:
```
./scripts/track-costs.sh log review 2600 "Service page - Stop Slop review complete, all pass"
```

**Expected**: 2-3K tokens  
**If higher**: Extensive rewriting needed (acceptable)  
**If lower**: Minor tweaks only (great!)  

---

## ❓ **COMMON QUESTIONS**

**Q: Should I do this review myself or have Claude do it?**  
A: Both! Self-review first (catch obvious things), then Claude (catch subtle things).

**Q: What if the review finds major issues?**  
A: Good! Better to find them now than after publishing. We fix and review again.

**Q: Can I skip this if I'm confident in quality?**  
A: No! Even experienced writers miss things. The review always finds something.

**Q: What's the difference between this and Testing?**  
A: Testing = Does it work? Quality Review = Is it good?

**Q: How long should I wait between finishing and reviewing?**  
A: At least 30 minutes (or next day). Fresh perspective catches more issues.

---

## ✅ **SUCCESS CRITERIA**

After this checklist, you should have:

- ✅ Writing quality verified (Stop Slop approved)
- ✅ Code quality verified (Impeccable approved)
- ✅ No grammar or spelling errors
- ✅ Tone consistent throughout
- ✅ All accessibility requirements met
- ✅ All brand guidelines followed
- ✅ No broken links or images
- ✅ Performance acceptable
- ✅ All feedback addressed
- ✅ Costs logged (2-3K tokens)
- ✅ **Ready to publish! 🚀**

---

## 🚀 **READY TO START?**

1. Make sure page/blog/component is complete
2. Copy the prompt template above
3. Share full content/code for review
4. Paste in Claude Code
5. Mention: "Use Stop Slop Skill and Impeccable"
6. I'll review and provide detailed feedback

---

## 📞 **DURING THE TASK**

If you disagree with feedback:
- Tell me your reasoning
- We'll discuss and decide together
- Your call ultimately - I'm advising, not mandating

**Remember: This is your final quality gate. It matters!**

---

## 🎯 **After Review is Complete**

**Ready to publish:**

```
For WordPress:
  - Publish in WordPress admin
  - Schedule if needed
  - Share link on social media

For Shopify:
  - Push to main branch
  - Shopify auto-syncs theme
  - Goes live immediately

For static sites:
  - Merge PR to main
  - GitHub Actions deploys
  - Site updates automatically
```

---

**Status**: Ready to use  
**Skills**: Stop Slop Skill + Impeccable  
**Cost**: 2-3K tokens  
**Duration**: 15-20 minutes  
**Timing**: FINAL step before publishing  
