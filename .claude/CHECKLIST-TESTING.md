# ✅ TESTING CHECKLIST

**When to Use**: BEFORE merging code to main branch  
**Frequency**: End of every development task  
**Duration**: 15-20 minutes  
**Cost Target**: 2-3K tokens  

---

## 🎯 **Skills to Invoke**

When starting this testing task:

---

### **PROMPT TEMPLATE (Copy This)**

```
I need to test this [page/component] before merging to production.

Please use these skills:
- Playwright CLI (for browser automation testing)
- Impeccable (for final code quality check)

Test Coverage:
- Desktop (1024px and up)
- Tablet (768px)
- Mobile (375px)

What to test:
- Layout renders correctly at all breakpoints
- All interactive elements work (buttons, links, forms)
- Images load and display properly
- No console errors
- Core Web Vitals acceptable

Here's the URL/code to test...
```

---

## 📋 **WORKFLOW CHECKLIST**

Before you start, make sure you have:

- [ ] **Code is committed to a feature branch** (not main)
- [ ] **Build is deployed to staging** (or local server running)
- [ ] **This checklist visible** (reference while testing)
- [ ] **Different devices available** (or use browser DevTools for emulation)

---

## 🔄 **STEP-BY-STEP WORKFLOW**

### **Step 1: Set Up Test Environment (5 min)**

**Make sure code is deployed:**

```
Option A: Local Development Server
  $ npm run dev
  or
  $ python -m http.server
  → Then test at: http://localhost:3000

Option B: Staging Environment
  → Deploy to staging branch
  → Test at: https://staging.griffin-co.com

Option C: GitHub Pages Preview (if applicable)
  → GitHub automatically previews PRs
  → Use that link for testing
```

### **Step 2: Create Test Checklist (5 min)**

Before testing, plan what to test:

```
Component/Page: ___________________
Test URL: ___________________

Functionality Tests:
  [ ] All buttons/links clickable
  [ ] Forms submit correctly
  [ ] Navigation works
  [ ] Search/filter functions work
  [ ] Modals/popups open and close
  [ ] Video/media plays

Responsive Tests (Test at 375px, 768px, 1024px):
  [ ] Layout doesn't break
  [ ] Text is readable
  [ ] Images scale properly
  [ ] Touch targets are large enough (44px+)
  [ ] Hamburger menu appears on mobile

Performance Tests:
  [ ] Page loads in <3 seconds
  [ ] No layout shifts (CLS <0.1)
  [ ] Interactions respond quickly (FID <100ms)

Quality Tests:
  [ ] No console errors
  [ ] No broken links
  [ ] All images have alt text
  [ ] Proper heading hierarchy
```

### **Step 3: Run Automated Tests (5 min)**

Use Playwright CLI to automate testing:

Share the prompt template above with:
- Test URL
- Devices to test (mobile 375px, tablet 768px, desktop 1024px)
- Key user flows to test

I'll use **Playwright** to:
- Screenshot at multiple breakpoints
- Click buttons and verify responses
- Test form submissions
- Check for console errors
- Report any issues

### **Step 4: Manual Testing (5 min)**

After automated tests:

**Test in actual browser** (Chrome DevTools emulation OK):

```
1. Open DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Test at: 375px (mobile), 768px (tablet), 1024px (desktop)
4. Go through each test item in your checklist
5. Note any issues
```

**Check for:**
- Visual glitches
- Functionality issues
- Performance problems
- Accessibility issues

### **Step 5: Report & Fix (5 min)**

If issues found:

```
Critical (Fix before merge):
  - Broken functionality
  - Layout completely broken
  - Console errors

Major (Should fix):
  - Minor visual glitches
  - Performance issues
  - Accessibility problems

Minor (Nice to fix):
  - Typos
  - Small styling tweaks
  - Non-critical spacing
```

**Share issues with me**, I'll help fix them.

---

## 💡 **KEY POINTS**

✅ **Test at 3 breakpoints** - 375px (mobile), 768px (tablet), 1024px (desktop)  
✅ **Test actual devices** - DevTools emulation is close but not exact  
✅ **Test user flows** - Don't just check appearance, verify functionality  
✅ **Check performance** - Use DevTools Performance tab to measure  
✅ **No console errors** - Fix any JavaScript errors before shipping  

---

## 📊 **COST TRACKING**

**After testing, run:**

```
./scripts/track-costs.sh log test [TOKENS] "Component/page name - test results"
```

Example:
```
./scripts/track-costs.sh log test 2800 "Service page - automated + manual testing, all pass"
```

**Expected**: 2-3K tokens  
**If higher**: Complex test scenarios (acceptable)  
**If lower**: Simple testing (great!)  

---

## ❓ **COMMON QUESTIONS**

**Q: Should I test in real devices or DevTools emulation?**  
A: DevTools is 95% accurate. For final QA, real devices are better, but DevTools is sufficient.

**Q: What if I find a bug during testing?**  
A: Don't merge! Fix it, test again, then merge. This is why we test.

**Q: How many browsers should I test?**  
A: Minimum: Chrome, Firefox, Safari. Mobile: iOS Safari, Chrome Android.

**Q: Should I test on slow networks?**  
A: Yes! DevTools has throttling options. Test on "Slow 4G" for realistic mobile experience.

**Q: Can I skip testing if I'm "sure" it works?**  
A: No! Testing always finds something. Even experienced devs miss things.

---

## ✅ **SUCCESS CRITERIA**

After this checklist, you should have:

- ✅ Tested at 3 breakpoints (375px, 768px, 1024px)
- ✅ All functionality working correctly
- ✅ No console errors
- ✅ Layout doesn't break at any size
- ✅ Images load and display properly
- ✅ Performance acceptable (<3s load, <0.1 CLS)
- ✅ Accessibility verified (keyboard nav, alt text)
- ✅ All tests documented
- ✅ Issues fixed or logged
- ✅ Costs logged (2-3K tokens)
- ✅ Ready to merge to main

---

## 🚀 **READY TO START?**

1. Deploy code to staging/local server
2. Copy the prompt template above
3. Provide test URL and devices
4. Paste in Claude Code
5. Mention: "Use Playwright CLI and Impeccable skills"
6. I'll run automated tests and guide manual testing

---

## 📞 **DURING THE TASK**

If issues found:
- Tell me which test failed
- Share screenshot/error message
- I'll help fix it before merge

**Remember: Test BEFORE merging, not after!**

---

**Status**: Ready to use  
**Skills**: Playwright CLI + Impeccable  
**Cost**: 2-3K tokens  
**Duration**: 15-20 minutes  
**Timing**: Run BEFORE merging to main  
