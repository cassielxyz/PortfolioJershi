# Creative Experience Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Experience section into an anti-generic, high-agency interactive timeline adhering strictly to the Black, Ash, White, and minimal pinkish-lavender liquid glass design system, with scroll parallax, animated light beams, interactive filter tabs, official tech icons, and expandable architectural deep-dive drawers.

**Architecture:** A modern single-file component `Experience.tsx` backed by data in `portfolioData.ts`, utilizing Framer Motion for scroll-linked animations, spring physics, and animated presence. Styled with high-density Apple Liquid Glass frosted shells, specular rim refractions, and responsive CSS grid/flex layouts compliant with `cortex-taste`.

**Tech Stack:** React 19, TypeScript, Framer Motion, Lucide React, TechLogos (SVG brand components), CSS Grid / PostCSS.

**Spec:** Current `src/components/Experience.tsx` and design guidelines in `cortex-taste`.

## Global Constraints
- Sections 1 (Hero), 2 (About), and 3 (Skills) must remain 100% UNTOUCHED and fully functional.
- Color palette: Black (`#121118`, `#14131A`), Ash (`#26242E`, `#63606E`, `#8E8B99`, `#E5E3EB`, `#F5F5F7`), Crisp White (`#FFFFFF`), with minimal whisper pinkish-lavender accents (`#F5D0FE`, `#FAF7FC`).
- NO pure black (`#000000`). NO generic 3-column card layouts.
- Zero emojis. Use Lucide React icons or SVG brand primitives.
- Hardware-accelerated transforms (`transform`, `opacity`) for smooth 60–120 FPS performance.

## Review Focus
1. Section transitions: Smooth handoff from Skills runway into Experience without layout clipping.
2. Filter tabs: Seamless layout transitions (`AnimatePresence` with `mode="popLayout"`) when toggling All / Current & Enterprise / Internships.
3. Interactive drawers: Smooth expanding/collapsing of "System Architecture & Engineering Impact" drawers without breaking timeline spine alignment.
4. Mobile responsiveness: Clean single-column fallback on `< 768px` viewports without horizontal scroll.
5. Hero & Skills safety: Hero portrait ripple color reveal and Skills 3D card deck must remain completely functional.

---

### Task 1: Architecture Deep-Dive Specifications in Data
**Files:**
- Modify: `src/data/portfolioData.ts`

**Interfaces:**
- Enhance `ExperienceItem` type to include optional `architectureImpact` object with `highlights`, `keyMetrics`, and `challengesSolved`.

- [ ] **Step 1: Check existing `ExperienceItem` interface**
Verify existing fields in `src/data/portfolioData.ts`.

- [ ] **Step 2: Add architectural impact metadata to each experience entry**
Add rich engineering details for Imperial Info System, Agile Infotech, Ak Info Park, and Srishti Innovative.

- [ ] **Step 3: Run build to ensure type safety**
Run: `npm run build`
Expected: PASS

---

### Task 2: Redesign `Experience.tsx` with Apple Liquid Glass & Motion Engine
**Files:**
- Modify: `src/components/Experience.tsx`

**Interfaces:**
- Consumes: `experiences` from `src/data/portfolioData.ts`, `TechLogo` from `src/components/TechLogos.tsx`.
- Produces: Default export `Experience: React.FC`.

- [ ] **Step 1: Implement Section Header with Editorial Typography**
Eyebrow `03 / CAREER & PROFESSIONAL TRAJECTORY`, display heading `Professional Experience & Engineering Milestones` with Playfair Display italic.

- [ ] **Step 2: Build Apple Liquid Glass Filter Dock**
Create visionOS-style frosted glass segmented control buttons with specular top highlights and active pinkish-lavender glow.

- [ ] **Step 3: Build Continuous Timeline Spine & Animated Photon Beam**
Render vertical spine line with continuous traveling gradient photon (`@keyframes spinePhotonPulse 3.5s infinite`).

- [ ] **Step 4: Build Specimen Cards with Live Status Node & Expandable Architecture Drawers**
- Current role node: Pulsing emerald beacon ring.
- Card surface: Liquid glass with specular top reflection (`inset 0 1.5px 2px rgba(255, 255, 255, 0.85)`).
- Tech pills: Display authentic brand vector logos via `TechLogo`.
- Expandable drawer: Toggle button with rotating chevron revealing architecture impact.

- [ ] **Step 5: Add Responsive Scoped Styles**
Ensure mobile responsiveness (< 768px) with strict single-column alignment and no horizontal scroll.

---

### Task 3: Verification & Integration Testing
**Files:**
- Test: Full build and browser verification.

- [ ] **Step 1: Run TypeScript compiler and production build**
Run: `npm run build`
Expected: Build passes with code 0.

- [ ] **Step 2: Verify zero regressions across Sections 1, 2, and 3**
Confirm Hero portrait ripple canvas, About terminal, and Skills 3D card deck scroll remain 100% intact.

- [ ] **Step 3: Document changes in `brain.md`**
Append entry #24 documenting the Creative Experience Section implementation.
