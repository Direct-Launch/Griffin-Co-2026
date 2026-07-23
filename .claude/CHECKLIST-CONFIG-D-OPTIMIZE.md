# ✅ CONFIG D: PERFORMANCE OPTIMIZATION CHECKLIST

**When to Use**: AFTER initial page/component build, when optimization is needed  
**Frequency**: As-needed optimization step  
**Duration**: 20-30 minutes  
**Cost Target**: 2-4K tokens  

---

## ⚠️ **IMPORTANT: Do This AFTER Config A or C**

Config D is a **second step**, not a first step.

```
Workflow:
1. Build page/component (Config A or C)
2. THEN run Config D (optimize)
3. NEVER run Config D first
```

---

## 🎯 **Skills to Invoke**

When starting this optimization task:

---

### **PROMPT TEMPLATE (Copy This)**

```
Now I want to optimize this [page/component] for performance.

Please use these skills:
- Code Burn (for minification and optimization)
- Impeccable (for quality verification)

Current Performance:
- Current file size: [e.g., 150KB CSS, 250KB JS]
- Current LCP: [e.g., 3.2 seconds]
- Current CLS: [e.g., 0.15]
- Main bottleneck: [e.g., unoptimized images, large JS bundle]

Optimization Goals:
- Target LCP: <2.5 seconds
- Target CLS: <0.1
- Reduce bundle size by: [15-25%]

Here's the current code...
```

---

## 📋 **WORKFLOW CHECKLIST**

Before you start, make sure you have:

- [ ] **Page/component already built** (from Config A or C)
- [ ] **Current performance metrics** (from browser DevTools or PageSpeed)
- [ ] **Code ready to optimize** (committed to branch)
- [ ] **This checklist visible** (reference while working)

---

## 🔄 **STEP-BY-STEP WORKFLOW**

### **Step 1: Gather Performance Data (5 min)**

**Measure current performance** using browser DevTools:

```
Open browser DevTools (F12):
1. Go to Performance tab
2. Record page load
3. Note:
   - LCP (Largest Contentful Paint): _____ seconds
   - FID (First Input Delay): _____ ms
   - CLS (Cumulative Layout Shift): _____ score
   
Open PageSpeed Insights (optional):
   - Mobile score: _____
   - Desktop score: _____
```

**File size check:**

```
DevTools > Sources tab:
   - Total CSS size: _____ KB
   - Total JS size: _____ KB
   - Total images: _____ KB
```

### **Step 2: Identify Bottlenecks (5 min)**

Look for:
- [ ] Unused CSS (can be removed?)
- [ ] Large JavaScript files (can be split?)
- [ ] Unoptimized images (can be compressed?)
- [ ] Render-blocking resources
- [ ] Unused fonts or libraries

**List top 3 bottlenecks:**
1. ___________________
2. ___________________
3. ___________________

### **Step 3: Optimize Code (15 min)**

Use the prompt template above. I'll use:
- **Code Burn** → Minify CSS/JS, remove unused code, split bundles
- **Impeccable** → Verify quality isn't degraded

You provide:
- Confirmation optimization looks good
- Any functionality issues to report

### **Step 4: Verify Performance (5 min)**

After optimization:

```
Re-measure performance:
   - New LCP: _____ seconds (was: _____)
   - New CLS: _____ (was: _____)
   - New JS size: _____ KB (was: _____ KB)
   - Improvement: _____ % faster
```

**Expected improvements:**
- LCP: 15-30% faster
- Bundle size: 20-35% smaller
- CLS: <0.1 (no layout shifts)

---

## 💡 **KEY POINTS**

✅ **Optimize AFTER building** - Never during initial build  
✅ **Functionality first** - Don't break things for tiny gains  
✅ **Measure before and after** - Proves the optimization worked  
✅ **Focus on big wins** - Remove unused code > micro-optimizations  
✅ **Test thoroughly** - Verify page still works perfectly  

---

## 📊 **COST TRACKING**

**After you finish optimization, run:**

```
./scripts/track-costs.sh log optimize [TOKENS] "Page/component - optimization details"
```

Example:
```
./scripts/track-costs.sh log optimize 3200 "Service page - minified CSS/JS, 28% smaller"
```

**Expected**: 2-4K tokens  
**If higher**: Optimization task was complex (acceptable)  
**If lower**: Quick optimization (great!)  

---

## ❓ **COMMON QUESTIONS**

**Q: How much optimization is enough?**  
A: Target: 15-25% bundle reduction + <2.5s LCP. After that, diminishing returns.

**Q: What if optimization breaks something?**  
A: Revert and try different approach. Functionality > performance micro-gains.

**Q: Should I optimize all pages or just critical ones?**  
A: Focus on high-traffic pages first. Then optimize others if time permits.

**Q: What about image optimization?**  
A: That's separate (use image compression tools). This config focuses on code optimization.

**Q: Can I skip optimization if page feels fast?**  
A: Yes, if users aren't experiencing slowness. But measuring first is smart.

---

## ✅ **SUCCESS CRITERIA**

After this config, you should have:

- ✅ Performance metrics measured (before and after)
- ✅ Bundle size reduced by 15-25%
- ✅ LCP improved to <2.5 seconds
- ✅ CLS score <0.1
- ✅ Code quality maintained (Impeccable approved)
- ✅ No functionality broken
- ✅ All tests passing
- ✅ Costs logged (2-4K tokens)
- ✅ Optimized code committed

---

## 🚀 **READY TO START?**

1. Measure current performance (using DevTools)
2. Copy the prompt template above
3. Fill in current metrics
4. Paste in Claude Code
5. Mention: "Use Code Burn and Impeccable skills"
6. I'll guide you through optimization

---

## 📞 **DURING THE TASK**

If you get stuck:
- Share the performance metrics
- Tell me what bottleneck you're targeting
- I'll suggest optimization approach

**Remember: Optimize AFTER building, not during!**

---

**Status**: Ready to use  
**Skills**: Code Burn + Impeccable  
**Cost**: 2-4K tokens  
**Duration**: 20-30 minutes  
**Timing**: Run AFTER Config A or C, not standalone  
