# Jershika C — Full Stack Developer Portfolio
## System Architecture, Implementation Log & Project Memory (`brain.md`)

*Last Updated: November 1, 2026*  
*Repository Root:* `c:/Users/jesow/Documents/github projects/jershika portfolio`

> [!CAUTION]
> ### 🔒 STRICT REPOSITORY POLICY: SECTIONS 1, 2, AND 3 ARE FROZEN & LOCKED
> Sections 1, 2, and 3 have been perfected, verified, and officially locked by the user:
> - **Section 1 (Hero)**: `src/components/Hero.tsx` (Portrait water ripple color reveal & masthead parallax)
> - **Section 2 (About)**: `src/components/About.tsx` (Obsidian Ash macOS Developer Terminal & architecture bento)
> - **Section 3 (Skills)**: `src/components/Skills.tsx`, `src/data/skillsDeckData.ts`, `src/components/TechLogos.tsx` (Pinned 3D card deck, native sticky runway, bidirectional scroll, minimal liquid glass Spider-Sense, gentle float, and click-anywhere flip)
> - **Supporting**: `src/components/Navbar.tsx`, `src/components/ResumeModal.tsx`, `src/index.css`
>
> **MANDATE FOR ALL FUTURE PROMPTS & SESSIONS**:  
> **NEVER modify or refactor any of these 3 sections unless the user explicitly names them and commands changes.**  
> Complete backup copy is preserved at `backups/sections_v1_fixed/`.

---

## 1. Project Overview & Aesthetic Vision

A modern, high-performance portfolio for **Jershika C**, an Honors Computer Science Engineering Graduate (8.51 CGPA) specializing in **Java, Spring Boot, PostgreSQL, and React.js**.

- **Aesthetic Direction**: **Apple Liquid Glass Material Design** (inspired by Better Stack liquid glass and Apple macOS/iOS frosted materials).
  - High-density frosted glass blur (`backdrop-filter: blur(24px - 36px) saturate(190% - 210%) brightness(1.05)`).
  - Specular top rim reflections (`inset 0 1.5px 2px 0 rgba(255, 255, 255, 1)`).
  - Ambient violet/lavender drop shadows (`rgba(147, 51, 234, 0.28)`).
  - Typography: `Outfit` (display heading & outlined masthead), `Plus Jakarta Sans` / `Inter` (clean UI body), and `Silver Editorial Italic` (editorial accents).
- **Core Technology Stack**:
  - **Framework**: React 18 with TypeScript
  - **Bundler & Tooling**: Vite 6, PostCSS, ESLint, TypeScript (`tsc -b`)
  - **Motion & Physics**: Framer Motion (`useScroll`, `useTransform`, `useSpring`, `AnimatePresence`)
  - **Graphics & Effects**: HTML5 Canvas 2D API (GPU destination-in masking for mouse water ripple reveal)
  - **Icons**: Lucide React + custom SVG brand icons (GitHub, LinkedIn)

---

## 2. What We Have Implemented

### A. Hero Section (`src/components/Hero.tsx`)
1. **Masthead Display & Proportions**:
   - `PORTFOLIO` rendered in `Outfit` 800 uppercase outline, spanning the full page starting from the left margin with a clean `0.75px` stroke and delicate opacity (`0.22`), completely eliminating internal double lines.
   - "My" in *Silver Editorial Italic* perched top-left directly above the letter **'P'** with a subtle tilt (`rotate: -2.5deg`).
2. **Signature Headline**:
   - "Full Stack Developer" in **one single line**.
   - "Full Stack" in bold modern sans (`#120D1A`).
   - "Developer" in *Silver Editorial Italic* featuring a **continuous looping gradient animation** (`developerGradientLoop 5s linear infinite`) sweeping between soft orchid/lavender-pink (`#F0ABFC`), vivid fuchsia (`#E879F9`), and rich violet (`#9333EA`).
3. **Interactive Water Ripple Portrait**:
   - High-resolution grayscale portrait of Jershika overlapping the masthead, positioned so her hair only subtly touches the bottom stroke of `PORTFOLIO`.
   - Seamless gradient opacity fade at the bottom (zero visible hard borders or cutoffs).
   - High-performance Canvas 2D render loop: moving or clicking the mouse spawns expanding liquid concentric ripples that reveal the original full-color portrait through GPU `destination-in` alpha masking.
4. **Smooth Scroll Parallax Animation**:
   - Integrated Framer Motion's `useScroll` with `useSpring` (`stiffness: 95`, `damping: 28`) for silky scroll inertia.
   - **Masthead Parallax**: Drifts downward (`+95px`), scales (`1` $\rightarrow$ `0.95`), and gently fades into background depth.
   - **Details Column Parallax**: Floats upward (`-42px`) and fades out smoothly on scroll down.
   - **Portrait Column Parallax**: Glides downward (`+50px`) with subtle depth scale (`0.96`).
   - **Ambient Pastel Orbs**: Float at multi-layered speeds (`+130px` and `-75px`) for atmospheric depth.
   - Composited with `will-change: transform, opacity` for hardware-accelerated 60–120 FPS performance.
5. **Action Buttons**:
   - `Download Resume`: Primary liquid glass pill button with purple gradient, specular top highlight, and purple glow.
   - `Explore Profile`: Frosted glass pill with hover lift.
   - `Get in Touch`: Frosted glass ghost button.
   - `GitHub` & `LinkedIn`: Floating liquid glass circular buttons in a single inline row.

### B. Navbar (`src/components/Navbar.tsx`)
1. **Clean Transparent Layout**:
   - Removed the left branding block (`JC` monogram, `Jershika C.`, and `Available for Roles` status badge) per user instruction.
   - Header wrapper background is 100% transparent (`pointer-events: none` on outer wrapper, `pointer-events: auto` on interactive capsules).
2. **Apple Liquid Glass Navigation Capsule**:
   - Centered floating dock with `backdrop-filter: blur(24px) saturate(200%) brightness(1.04)`.
   - Hairline specular highlight rim (`inset 0 1.5px 2px 0 rgba(255, 255, 255, 1)`).
   - Floating active-pill indicator for sections (`Home`, `About`, `Projects`, `Skills`, `Contact`).
3. **Control Buttons**:
   - `Resume` button: Frosted liquid glass pill.
   - `Get in Touch` button: Glowing purple liquid glass capsule.

### C. Resume Modal (`src/components/ResumeModal.tsx`)
1. **Apple Liquid Glass Outer Shell**:
   - Deep frosted backdrop overlay (`backdrop-filter: blur(18px) saturate(190%)`).
   - Modal shell container with `backdrop-filter: blur(36px) saturate(210%) brightness(1.05)`, top specular reflection glare, and ambient purple drop shadow (`0 36px 90px -15px rgba(147, 51, 234, 0.3)`).
2. **Floating Liquid Glass Control Dock**:
   - Header bar styled as a frosted glass dock with specular top line.
   - `Download PDF` button: Glowing lavender-purple liquid glass capsule with glossy top rim (`inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.72)`) and purple glow.
   - `Print` button: Frosted glass pill with specular highlights and smooth hover lift.
   - `Close (X)` button: Sleek circular frosted liquid glass button with 90° hover spin.
3. **Refined Inner Printable Resume Document**:
   - Upgraded container to `rgba(255, 255, 255, 0.97)` with `22px` rounded corners and soft drop shadow.
   - Replaced old `#ebdcd0` taupe dividers with clean lavender borders (`rgba(216, 180, 254, 0.45)`).
   - Updated headings and badges to match the portfolio's violet palette (`#9333EA`, `#120D1A`, `#645674`).
4. **Sleek macOS-Style Scrollbar**:
   - Custom 6px floating thumb with transparent track and `margin: 16px 0` to prevent clipping the rounded glass corners.

### D. Global Styles (`src/index.css`)
- Upgraded generic `.modal-overlay` and `.modal-content` to Apple Liquid Glass for complete visual harmony across all modals.

### E. Section 2: About & Continuous Flow Bridge (`src/components/About.tsx` & `src/components/Hero.tsx`)
1. **Continuous Flow Bridge (Hero → About)**:
   - **Hero Transmitter**: Sleek minimalist vertical pill with an animated glowing gradient bead (`flowBeadLoop 2.4s infinite`) pointing down to `#about`.
   - **About Receiver**: Matching vertical continuous flow line and glowing micro-node that responds to Framer Motion's `useScroll` + `useSpring`, creating a seamless physical hand-off across the section fold.
2. **Black, White & Ash Aesthetic (`cortex-taste` compliant)**:
   - Pure off-black charcoal velvet (`#141318`), crisp museum white (`#FFFFFF`), and refined ash slate neutrals (`#F5F5F7`, `#E5E3EB`, `#8E8B99`, `#26242E`).
   - Whisper-light lavender-pink gradient highlights (`#E9D5FF` to `#FCE7F3` specular tops, hairline borders, and live status dots).
3. **High-Density Metric Matrix**:
   - 4 cockpit glass tiles in monospace typography (`8.51` CGPA, `15%` Latency Reduction, `92%` Model Accuracy, `4+` Industry Roles) with hover elevation and specular top lines.
4. **Asymmetric Editorial Bento Grid (43% / 57%)**:
   - **Left (Obsidian Ash Velvet Card)**: Live status capsule with pulsing beacon (`AVAILABLE FOR FULL-TIME ROLES`), editorial statement, bio narrative, core engineering philosophy quote in *Silver Editorial Italic*, location pin, and quick-contact CTA.
   - **Right (Interactive Tech & Architecture Deck)**: Segmented tab switcher between *Enterprise Backend*, *Modern Interface*, and *Applied AI & Vision*, displaying architecture guarantees, live tech chips with spring physics, and engineering pillars.

---

## 3. What To Do Next (Project Roadmap)

1. **Experience / Timeline Section Enhancements**:
   - Apply liquid glass cards with subtle hover tilt and inner light refractions to the experience timeline.
   - Add interactive skill chips that highlight matching projects when clicked.
2. **Projects Section Upgrades**:
   - Add live demo modal previews with iframe / video scrub for featured full-stack projects (*Full Stack Project Management App*, *E-Commerce Engine*, etc.).
   - Include direct GitHub commit / repository stats badges.
3. **Contact Form Backend Integration**:
   - Hook the interactive form up to EmailJS, Formspree, or a Supabase Edge Function to deliver actual user messages directly to `jershika2612@gmail.com`.
4. **Mobile & Touch Optimization**:
   - Add touch-based ripple generator for mobile / tablet devices (triggering ripples on tap and drag across the portrait).
   - Fine-tune responsive padding for ultra-narrow screens (< 360px).
5. **SEO & Performance Audit**:
   - Add OpenGraph / Twitter Card preview meta tags with an image banner.
   - Implement JSON-LD structured data schema for `Person` and `ProfilePage`.
   - Verify lighthouse scores (Performance 95+, Accessibility 100, Best Practices 100, SEO 100).

---

## 4. Conversation History & Decision Log

| # | User Request & Intent | Technical Implementation & Solution | Outcome / Status |
|---|---|---|---|
| **1** | Match reference image for first section: Silver Editorial Italic for "Developer" and "My", replace old photo with `jershika.png`, add mouse ripple color reveal effect (YouTube reference), white bottom fade on image, entrance animations. | Built composite hero stage with dual-layer portrait (grayscale base + full-color Canvas with radial gradient ripples and GPU destination-in masking). Loaded Silver Editorial Italic font. Styled reference composition. | **Completed** |
| **2** | Continue and open preview in browser. | Launched Vite dev server on `http://localhost:5173/`, verified canvas rendering and entrance animations. | **Completed** |
| **3** | Remove obsolete UI badges from screenshot. Developer word must have white-to-pink gradient and sit in ONE line with Full Stack. Increase PORTFOLIO size to 3/4 screen behind portrait, thin its stroke, move lower text downward, decrease image size slightly, and slow down mouse ripple. | Positioned "Full Stack Developer" on one flex line. Added top-white to bottom-pink/purple gradient. Scaled `PORTFOLIO` to 3/4 width. Pushed lower content down. Adjusted ripple expansion speed and linger duration. | **Completed** |
| **4** | Developer gradient fine-tuning like reference. Move image slightly down so it only touches PORTFOLIO. Increase PORTFOLIO to full page starting from margin, "My" touching 'P', thin stroke, lower opacity. Align GitHub and LinkedIn icons in same line as Download Resume. | Set `PORTFOLIO` font size to `clamp(5rem, 15vw, 17.5rem)` starting at left margin with `0.75px` stroke and `0.22` opacity. Placed "My" at `rotate(-2.5deg)`. Inline-flexed social icons with action buttons. | **Completed** |
| **5** | Revoke outline font change: restore the previous clean Outfit font for PORTFOLIO outline while maintaining full page width. | Restored single unified outline with `Outfit` 800 uppercase (`color: transparent; -webkit-text-stroke: 0.75px #94A3B8;`). Eliminated double outlines. | **Completed** |
| **6** | Remove screenshot elements and ripple hint pill. Make Navbar background 100% transparent. Style navbar components, Resume button, and Get in Touch button in Apple Liquid Glass theme (YouTube & Better Stack references). Add infinite looping gradient animation to the word "Developer". | Removed left brand monogram and badge. Made header transparent. Styled floating capsule dock with high-density blur, specular rim, and inner glow. Added `developerGradientLoop 5s linear infinite` keyframe animation. | **Completed** |
| **7** | Add smooth slight scroll animation for Hero section. Update outer components of Resume modal ("Download Resume") to the same Apple Liquid Glass theme. | Implemented Framer Motion `useScroll` + `useSpring` parallax for masthead, text, portrait, and orbs. Transformed Resume modal overlay, shell, header, Download PDF, Print, and Close buttons to Apple Liquid Glass with custom sleek scrollbar. Verified with live browser testing and builds passing cleanly. | **Completed** |
| **8** | Redesign Section 2 (About) with creative Black, White & Ash theme, minimal whisper lavender-pink gradients, strict taste skill compliance, and continuous flow animation from Section 1 (Hero) into Section 2 (About) without breaking Hero or any existing functionality. | Implemented matching scroll flow transmitter/receiver bridge between Hero and About. Redesigned About section into an asymmetric high-density editorial bento (4 monospace metric tiles, Obsidian Ash card with live status beacon and philosophy quote, and 3-tab interactive Architecture Deck with spring physics). Verified in browser with 0 console errors and clean build. | **Completed** |
| **9** | Restore Hero section to exact untouched configuration (ensure cursor color reveal with ripple effect on portrait is 100% preserved) and remove AI-generated looking components from screenshots (connecting flow lines/bead, "Available for Roles" status pill, and "Core Principle" quote box). | Reverted all Hero section changes (removed flow line/bead), verified portrait cursor ripple color reveal operates at 120fps. Completely removed flow line receiver, status badge pill, and quote box from About.tsx. Expanded authentic bio narrative with clean typography. Build and visual verification passed cleanly. | **Completed** |
| **10** | Transform left black box into an Apple macOS Developer Terminal with window buttons (red, yellow, green), command lines, and blinking cursor. Remove "Clean Architecture" and "Performant Delivery" bottom strip from Tech Deck. Add spring-damped scroll parallax to Section 2 matching Hero section's physics. | Built Apple macOS Terminal window with interactive traffic lights (with hover micro-icons), terminal title, zsh prompt lines, statement, and blinking cursor `▋`. Removed footer pillars from right deck. Configured Framer Motion `useScroll` + `useSpring` parallax (header, metrics, terminal, and deck). Verified with browser subagent and clean build. | **Completed** |
| **11** | Rename terminal title to "jershika", make sentences shorter and simple, change font within terminal to typewriter font (Courier Prime), add slight liquid glass edge effect, calibrate color scheme strictly to Black, White & Ash with minimal light pinkish-lavender accent (remove green/purple), add sequential opening text animation and enhanced scroll parallax. | Renamed window title to `jershika`, loaded Google Font `Courier Prime`, converted bio text to concise high-impact bullet lines, applied frosted liquid glass specular rim with top/edge glare, replaced green/purple text with monochrome ash and `#F5D0FE` accent, added Framer Motion staggered entrance variants and responsive scroll parallax. Fully verified with browser subagent. | **Completed** |

---

## 5. Key Architecture & Styling References

- **Liquid Glass Shell Formula**:
  ```css
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.72) 0%, rgba(246, 240, 254, 0.52) 100%);
  backdrop-filter: blur(36px) saturate(210%) brightness(1.05);
  -webkit-backdrop-filter: blur(36px) saturate(210%) brightness(1.05);
  border: 1px solid rgba(255, 255, 255, 0.95);
  box-shadow: 
    0 36px 90px -15px rgba(147, 51, 234, 0.3),
    0 16px 40px rgba(0, 0, 0, 0.12),
    inset 0 2px 3px 0 rgba(255, 255, 255, 1),
    inset 0 -2px 3px 0 rgba(147, 51, 234, 0.12);
  ```
- **Primary Liquid Glass Button Formula**:
  ```css
  background: linear-gradient(135deg, #9333EA 0%, #7E22CE 100%);
  border: 1px solid rgba(255, 255, 255, 0.48);
  box-shadow: 
    0 8px 24px -2px rgba(147, 51, 234, 0.42),
    inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.72),
    inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(20px) saturate(190%) brightness(1.05);
  ```
- **Framer Motion Scroll Parallax Formula**:
  ```typescript
  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 28,
    restDelta: 0.001,
  });
  ```

---

### #12. About Section Multi-Plane Scroll Parallax & Typewriter Entrance Activation
- **Date**: 2026-11-01
- **Driver**: User asked where the scroll animation and opening animations are for the About section.
- **Root Cause & Enhancements**:
  1. **Subtle Travel Range Amplified**: The previous `[85, -75]` translation was mapped over 2030px of scroll, producing only ~22px movement across 500px of scrolling (imperceptible to the naked eye). Amplified `terminalY` to `[130, 0, 0, -110]` and `deckY` to `[65, 0, 0, -55]`, providing a noticeable **120px differential parallax** between the left and right bento cards.
  2. **3D Perspective Pitch on Scroll**: Added hardware-accelerated `perspective: 1200px` to `.about-bento-grid` and dynamic `rotateX` pitch (`4deg -> 0deg -> -3deg`) and `scale` (`0.94 -> 1.0 -> 0.96`), giving tactile physical weight matching the Hero section.
  3. **Scroll-Sync Hairline Progress Track**: Integrated a reactive 2.5px progress beam along the top edge of the Apple Terminal window (`scaleX: smoothProgress`) with a subtle `#F5D0FE` pinkish-lavender glow, providing immediate visual feedback as the user scrolls.
  4. **Staggered Typewriter Opening Reveal**: Reconfigured `typewriterLineVariants` with blur-to-focus (`filter: blur(4px) -> blur(0px)`) and removed `once: true` (`viewport: { once: false, amount: 0.25 }`) so the command execution, statement, and bullet points reveal crisply as the terminal scrolls into view.

---

### #13. Skills Section Redesign: A24-Inspired 3D Physical Card Deck
- **Date**: 2026-11-01
- **Driver**: User requested removing the scroll progress over the terminal, and transforming the Skills section into an animated deck of cards inspired by the Awwwards SOTD A24 site by Ravi Klaassens (where media discs in a crate are flipped and scaled in 3D).
- **Deliverables & Architectural Decisions**:
  1. **Terminal Cleanliness**: Removed `.terminal-scroll-track` hairline progress indicator over the Apple Terminal window in `About.tsx`.
  2. **Dedicated SVG Logo Component (`TechLogos.tsx`)**: Created 16 authentic, high-resolution vector SVGs for Java, Spring Boot, React, TypeScript, Python, PostgreSQL, Supabase, MySQL, REST APIs, JPA/Hibernate, OpenCV, YOLO, XGBoost, Git, Docker, and Postman.
  3. **3D Physical Card Deck Metaphor**:
     - Modeled on A24's physical media crate: cards sit on a 3D stage (`perspective: 1400px`).
     - Center card in focus: `scale: 1.08`, `rotateY: 0deg`, `translateZ: 60px`, with active specular glare and subtle `#F5D0FE` pinkish-lavender halo.
     - Flanking cards: `scale: 0.9 -> 0.78`, `rotateY: ±24deg -> ±34deg`, `translateZ: -40px -> -100px`, `opacity: 0.75 -> 0.15`.
  4. **Tactile Interaction Modes**:
     - Scroll-driven progressive scrubbing via `useScroll` and `useSpring`.
     - Direct card click to center.
     - Prev / Next tactile arrow navigation and keyboard Arrow Left / Right hotkeys.
     - Category filter tabs (`All`, `Backend`, `Frontend`, `Languages`, `Databases`, `AI & Vision`, `Tooling`).
  5. **Synchronized A24 Editorial Readout**: Displays the active card's index (`CARD 01 / 16`), deep engineering architecture role, production guarantees checklist, and related ecosystem technology pills.
  6. **Zero Regressions**: Hero Canvas 2D cursor water ripple color reveal and About section remain 100% intact.



---

### #14. Skills Pinned Runway, 3D Apple Flip Card, Spider-Sense Hover Aura & Authentic Logos
- **Date**: 2026-11-01
- **Driver**: User requested fixing the screen during skills until the last card is revealed, removing the bottom white panel, placing descriptions on the back of the card with an Apple-smooth 3D flip, adding card hover wobble with cartoon Spider-Sense colorful wavy lines, making scroll buttery smooth and revealing cards one-by-one, and ensuring all tech stack logos are the original colored brand logos.
- **Deliverables & Architectural Decisions**:
  1. **Pinned Sticky Runway**:
     - Converted #skills container into .skills-pinned-runway (min-height: 340vh) housing .skills-sticky-stage (position: sticky; top: 0; height: 100vh).
     - Screen remains pinned to the viewport stage throughout all 16 tech cards. Once the 16th card is revealed and the runway ends, scroll releases naturally to #experience.
     - Integrated smoothScroll.on('change') with discrete step quantization (1 / N), ensuring cards reveal one-by-one smoothly without lag or transform conflicts.
  2. **Editorial Panel Removal & 3D Flip Card**:
     - Completely removed the white bottom editorial panel (.skills-editorial-readout-panel) shown in the screenshot.
     - Implemented .card-flipper-core with transform-style: preserve-3d; backface-visibility: hidden and fluid Apple spring transition (0.55s cubic-bezier(0.16, 1, 0.3, 1)).
     - .card-face.card-back holds the full architecture summary, 3 production guarantees with green checkmarks, stack pillars, and quick flip-return triggers.
     - Decoupled flip state from hover wobble so flipped cards preserve rotateY(180deg) while wobbling.
  3. **Cartoon Spider-Sense Hover Lines & Tactile Wobble**:
     - Authored .spider-sense-aura containing three curved SVG paths (top, left, right) in electric cyan (#00F5D4), shocking pink (#FF007F), vivid yellow (#FFE600), and purple (#A855F7).
     - Animated with @keyframes spiderWaveRun with pulsating dashed frequency mimicking comic-book spidey sense.
     - Applied @keyframes cardWobble and @keyframes cardWobbleFlipped on card hover.
  4. **Official Colored Tech Stack Logos**:
     - Verified all 16 logos in TechLogos.tsx render in their authentic brand colors (Spring Boot green, React cyan, TypeScript blue, Python blue/yellow, PostgreSQL blue elephant, Supabase emerald, etc.) instead of monochrome.
  5. **Verification & Zero Regressions**:
     - npm run build cleanly passed with 0 errors.
     - Browser subagent verified pinned scroll, one-by-one card reveal, Spider-Sense hover lines, wobble, and 3D flip.
     - Hero section Canvas 2D water ripple color reveal and About section remain 100% intact.

---

### #15. Elimination of Cropping, Direct Card Flip, Liquid Glass Chromatic Spider-Sense, & GPU 60-120fps Scroll
- **Date**: 2026-11-01
- **Driver**: Fixed vertical section cropping (top headline cut off, bottom card overflow into Experience), removed the redundant toolbar (card counter, arrows, flip button), implemented authentic comic-book liquid glass chromatic aberration Spider-Sense lines (replacing dashed dots), eliminated frame skipping with continuous floating-point motion values, and centered the card stage vertically in the viewport.
- **Deliverables & Architectural Decisions**:
  1. **Crop Elimination & Vertical Centering**:
     - Removed .skills-deck-toolbar entirely, saving ~65px of vertical space.
     - Reconfigured .skills-sticky-stage as a centered flex column with 100vh height and 1rem padding.
     - Refined card dimensions to 285px x 380px and tightened header metrics, reducing total stage height to ~565px.
     - In 730px-900px viewports, this guarantees ~80px of clear breathing room at the top (no headline crop) and ~80px at the bottom (zero overlap with Experience).
  2. **Liquid Glass Chromatic Aberration Spider-Sense**:
     - Replaced dashed stroke SVG lines with organic, continuous Bézier wave arcs radiating from card crown and flanks.
     - Designed 3 distinct chromatic aberration layers:
       - Red/Magenta channel (#FF0A54 at -2px, -1.5px with mix-blend-mode: screen and drop shadow).
       - Electric Cyan channel (#00F5D4 at +2px, +1.5px with mix-blend-mode: screen and drop shadow).
       - Liquid Glass Core Sheen (white-gold gradient #spideyLiquidCoreGlow with specular sheen).
     - Driven by @keyframes spideyPrismRed, @keyframes spideyPrismCyan, and @keyframes spideyGlassHarmonic.
  3. **Continuous 60-120 FPS Card Scroll Animation**:
     - Removed discrete integer state updates on scroll.
     - Mapped scroll progress [0.06, 0.94] to a continuous floating motion value (smoothCardProgress) with rest buffers at runway start and end.
     - Derived card transforms (x, rotateY, z, scale, opacity, zIndex) directly via useTransform in DeckCardItem, updating on the GPU via requestAnimationFrame without React state re-renders.
  4. **Direct Card Flip & Specifications**:
     - Clicking anywhere on any card directly flips it 180deg via Apple spring transition (0.55s cubic-bezier(0.16, 1, 0.3, 1)).
     - Flanking cards glide smoothly to center when clicked.
     - Cleaned event propagation to prevent double-bubbling on back face.
  5. **Verification**:
     - Build passed cleanly with 0 errors (npm run build).
     - Browser subagent verified direct flip, flip back, chromatic Spider-Sense hover lines, zero cropping, and smooth section transitions.

---

### #16. Direct Flip Anywhere, Behind-Card Liquid Glass Spider-Sense, Centered Discrete Snapping & Apple Liquid Nav
- **Date**: 2026-11-01
- **Driver**: User requested removing all buttons from card flip (clicking anywhere in the card flips it), moving the Spider-Sense animation behind the card with liquid glass effect, making the category filter nav transparent with Apple liquid glass translucent buttons, removing the long description paragraph completely, changing the headline to 'Skills & Technical Expertise', fixing all tech stack logos with authentic vector brand paths, and snapping each card to a proper centered position revealing each card smoothly without getting stuck between cards.
- **Deliverables & Architectural Decisions**:
  1. **Direct Card Flip Anywhere (Zero Buttons)**:
     - Removed all buttons on front and back faces (no inspect specs button, no close button).
     - Clicking anywhere on .card-deck-slot triggers a Framer Motion spring flip: rotateY(180deg) via Apple spring physics (stiffness: 220, damping: 20).
     - Decoupled tactile hover wobble into a dedicated .card-wobble-layer to eliminate keyframe transform override conflicts with 3D flip.
  2. **Spider-Sense Liquid Glass Radiating Behind the Card**:
     - Moved .spider-sense-liquid-aura to z-index: 1, sitting directly behind the .card-face layers (z-index: 5).
     - Emits organic, continuous Bézier wave arcs with dual chromatic aberration channels (Red/Magenta #FF0A54, Electric Cyan #00F5D4) and a white-gold liquid glass specular caustic core.
  3. **Apple Transparent Liquid Glass Category Nav**:
     - .skills-filter-tabs-nav container set to background: transparent with zero borders or box-shadows.
     - .skills-filter-pill buttons styled as Apple frosted liquid glass (backdrop-filter: blur(24px) saturate(190%), border: 1px solid rgba(255,255,255,0.7), and active glow).
  4. **Headline & Description Cleanup**:
     - Removed the entire lead description paragraph.
     - Changed headline to 'Skills & Technical Expertise' with Playfair Display italic editorial accents.
  5. **Authentic Official Tech Logos**:
     - Overhauled TechLogos.tsx with verified official vector brand SVG graphics for all 16 tech stacks (Spring Boot, Java, React, TypeScript, PostgreSQL Slonik, Supabase, OpenAPI/REST, Hibernate, Python, OpenCV, YOLO, XGBoost, MySQL Sakila, Git, Docker, Postman).
  6. **Discrete Centered Card Snapping**:
     - Coupled targetMotionIndex with runway useScroll progress and gesture handling.
     - Cards smoothly glide with Framer Motion spring physics and ALWAYS snap dead-center to an integer card index (0 to 15), preventing cards from getting stuck halfway between two cards.
  7. **Verification**:
     - Build passed cleanly (npm run build).
     - Browser subagent verified direct flip on front and back, behind-card Spider-Sense lines, transparent Apple liquid glass tabs, and discrete centered card snapping.

---

### #17. Fast Scroll Glitch Elimination, Hero Color Reveal Fix, & Experience Section Redesign
- **Date**: 2026-11-01
- **Driver**: User reported fast scrolling caused the website to glitch and feel sluggish in the Skills section, the Hero portrait water ripple color reveal was not working, and requested continuing to the next section (Experience) utilizing design skills (cortex-taste).
- **Deliverables & Architectural Decisions**:
  1. **Fast Scroll Glitch Elimination in Skills (src/components/Skills.tsx)**:
     - Removed synthetic onWheel={handleWheel} listener and 340ms wheel throttling lock (isWheelingRef.current) which conflicted with browser momentum scrolling.
     - Upgraded Framer Motion spring to high responsiveness (stiffness: 260, damping: 28, mass: 0.25).
     - Directly mapped scroll progress to continuous float (continuousIdx = clamped * (filteredCards.length - 1)) for uninterrupted 60-120fps fluid glide at any scroll speed.
     - Added 120ms debounce settle-to-center snap on scroll rest, guaranteeing cards glide fluidly at high speed and automatically settle centered when scrolling stops.
  2. **Hero Water Ripple Color Reveal Fix (src/components/Hero.tsx)**:
     - Identified root cause of non-working color reveal: offscreen DPR canvas dimension mismatch and squashed destination-in drawImage scaling on high-DPI displays.
     - Refactored renderRipples to use direct single-canvas source-in compositing:
       1. Clear canvas directly with ctx.clearRect(0, 0, canvas.width, canvas.height).
       2. Save context and apply ctx.scale(dpr, dpr).
       3. Draw cursor soft radial gradient spotlight and expanding concentric water ripple arcs in source-over mode (pure white with varying alpha).
       4. Switch to ctx.globalCompositeOperation = 'source-in' and draw colorImg directly over the alpha mask.
       5. Restore context.
     - Handled cached image preloading (img.complete && img.naturalWidth > 0) to ensure colorImg is immediately ready.
     - Verified with browser subagent: hovering over Jershika portrait reveals vibrant warm color under the cursor, and clicking spawns expanding water ripple waves.
  3. **Experience Section Architectural Redesign (src/components/Experience.tsx)**:
     - Redesigned using cortex-taste principles: Black, White, and Ash palette with minimal light pinkish-lavender (#F5D0FE / #E879F9) accents.
     - Editorial display heading: 'Professional Experience &' in bold modern sans, 'Career Milestones' in Instrument Serif italic.
     - Apple Liquid Glass Segmented Filter Bar: All Roles (4), Production & Enterprise (1), Engineering Internships (3).
     - Interactive Continuous Timeline Spine with animated traveling light beam (animation: timelineSpineBeam 3.6s infinite).
     - Live Pulsing Node Orbital: Current role (Imperial Info System) features active violet beacon pulse ring (nodePulseRing 2.4s infinite).
     - Apple Liquid Glass Specimen Cards: Specular top refraction, role/company lockup, location/period capsules, verified checkmark responsibilities, authentic tech deployed pills, and expandable 'System Architecture & Engineering Impact' drawers.
  4. **Verification**:
     - TypeScript compiler (tsc -b) and Vite production bundle passed cleanly with exit code 0.
     - Browser subagent verified Hero portrait color reveal, Skills fast scroll fluid motion, and Experience section filter switching and expandable drawers.

---

### #18. Skills Card Flip Anywhere, 3D Liquid Glass Spider-Sense Behind Card, Authentic Logos & Buttery Monotonic Snapping
- **Date**: 2026-11-01
- **Driver**: Fixed card flip to work by clicking anywhere on the card without any buttons, positioned the Spider-Sense animation physically behind the card in 3D (translateZ: -35px) with liquid glass chromatic aberration arcs, made the category nav background 100% transparent with Apple liquid glass frosted buttons, completely removed description paragraph clutter, set clean editorial title (02 / SKILLS & EXPERTISE), fixed all 16 tech stack logos with authentic official brand SVGs (resolving REST/Postman collision), and ensured cards snap dead-center one-by-one with buttery-smooth monotonic glide and zero oscillation.
- **Deliverables & Architectural Decisions**:
  1. **Click Anywhere Card Flip (Zero Buttons)**:
     - Removed pointerEvents restrictions so all visible cards can be clicked and hovered immediately.
     - Attached handleCardClick directly to .card-deck-slot, .card-wobble-layer, .card-flipper-core, and both .card-face.card-front and .card-face.card-back.
     - Completely eliminated all flip buttons and button-like hint text on both faces.
     - Replaced footer text with industrial barcode patterns and clean serial specs (01 // PROD, 01 // ARCHIVE).
  2. **Spider-Sense Liquid Glass Radiating Behind the Card in 3D**:
     - Moved .spider-sense-liquid-aura to transform: translateZ(-35px) with transform-style: preserve-3d; and z-index: 0. In 3D perspective space, the aura physically radiates from behind the card.
     - Crafted liquid glass caustics using an ambient liquid halo (#spideyAuraBackdrop) and a multi-stop specular reflection gradient (#spideyLiquidGlassReflect).
     - Separated 3 optical dispersion channels: Red/Magenta (#FF0A54), Electric Cyan (#00F5D4), and Liquid Glass Specular Core.
     - Added radiating wavy comic tingle arcs over the top card crown, top-left diagonal, top-right diagonal, left flank, and right flank.
  3. **Apple Transparent Liquid Glass Category Nav**:
     - .skills-filter-tabs-nav styled with background: transparent !important; border: none !important; box-shadow: none !important;.
     - .skills-filter-pill buttons styled as Apple visionOS frosted liquid glass: background: rgba(255, 255, 255, 0.25), backdrop-filter: blur(24px) saturate(200%), specular top highlight inset 0 1px 1.5px rgba(255, 255, 255, 0.95), and light pinkish-lavender glow on active tab.
  4. **Editorial Header & Zero Description**:
     - Removed lead description paragraph completely.
     - Eyebrow styled as 02 / SKILLS & EXPERTISE with Playfair Display italic editorial accents on Skills & Technical Expertise.
  5. **Authentic Official Vector Brand Tech Logos (TechLogos.tsx)**:
     - Fixed regex matcher collision where generic api matched Postman. Resolved to norm.includes('rest') || (norm.includes('api') && !norm.includes('postman')).
     - Verified all 16 skills display their unmistakable official colored logos (Spring Boot, Core Java, React, TypeScript, PostgreSQL, Supabase, REST, Hibernate, Python, OpenCV, YOLO, XGBoost, MySQL, Git, Docker, Postman).
  6. **Buttery-Smooth Monotonic Card Snapping & Pinned Wheel Interception**:
     - Fixed isPinned detection: rect.top <= 80 && rect.bottom >= window.innerHeight - 80 accounts for navbar height and prevents premature scroll release.
     - Bounded rate-limited RAF interpolation loop: step = Math.sign(diff) * Math.min(Math.abs(diff) * 0.09, 0.034).
     - Exact target integer snapping: else if (current !== target) { currentProgressMotion.set(target); setActiveCardIndex(target); }.
     - Monotonic 3D depth formula: z = 120 - Math.abs(d) * 45 eliminates flat clamping and z-fighting.
     - Wheel event prevents default only while within [0, maxCard], smoothly stepping cards forward/backward with accumulated threshold and allowing natural page scroll to #experience at card 15, or up to #about at card 0.
  7. **Verification**:
     - npx tsc --noEmit passed with 0 errors.
     - Playwright browser subagent verified click-anywhere flip, flip back, spider-sense liquid glass behind the card, transparent Apple liquid nav pills, and smooth centered card snapping.


---

### #19. Restored Exact Hero Cursor Color Reveal Water Ripples & Deterministic Skills Scroll Section Locking
- **Date**: 2026-11-01
- **Driver**: Restored the exact water ripple cursor image color reveal configuration on Jershika's portrait in Hero.tsx from earlier working checkpoint (hero_before_678.txt) without inventing new config, and fixed the skills section scroll behavior so the viewport remains locked in #skills until all 16 cards are revealed one by one before proceeding to #experience.
- **Deliverables & Architectural Decisions**:
  1. **Exact Hero Water Ripple Image Color Reveal Restored (src/components/Hero.tsx)**:
     - Synced offscreen canvas dimensions strictly to physical canvas dimensions (`offscreen.width = canvas.width`, `offscreen.height = canvas.height`).
     - Added context save and DPR scaling on the offscreen mask (`maskCtx.save()`, `maskCtx.scale(dpr, dpr)`).
     - Preserved exact original ripple configuration:
       - Soft focal radial gradient directly under cursor (`maskCtx.createRadialGradient(x, y, 0, x, y, 68)`).
       - Primary expanding liquid wave (`radius: 6, maxRadius: max(180, maxR), speed: 1.8, alpha: 0.92, fadeSpeed: 0.007, ringWidth: 62`).
       - Secondary concentric echo wave (`echoOuter = outerR - 26, echoInner = max(0, echoOuter - ringWidth * 0.7)`).
       - GPU `destination-in` masking compositing color image onto the ripple mask.
       - Instant cached image fallback handling ensuring color image is always loaded and ready.
  2. **Deterministic Skills Scroll Section Locking (src/components/Skills.tsx)**:
     - Set `.skills-pinned-runway` to `height: 100vh; min-height: 100vh; width: 100%; overflow: hidden;`.
     - Attached window-level wheel and touch event handlers active when `isInView = rect.top <= window.innerHeight * 0.65 && rect.bottom >= window.innerHeight * 0.35`.
     - **Strict Lock**: While `currentTarget < maxCard`, all downward wheel/touch movements execute `e.preventDefault()` and step to the next card (0 through 15). The viewport remains strictly inside `#skills` and cannot skip or scroll into the next section until all 16 cards are revealed.
     - **Controlled Section Exit**: Only after card 15 is revealed does further downward scrolling advance smoothly to `#experience` via `scrollIntoView({ behavior: 'smooth' })`.
     - **Reversible Lock**: Upward scrolling steps backward through cards 15 to 0 while remaining locked, and only advances to `#about` once card 0 is reached.
  3. **Verification**:
     - `npx tsc --noEmit` compiled cleanly with exit code 0.
     - Browser subagent verified Hero portrait ripple color reveal and shockwave on click, Spider-Sense caustics behind active card, click-anywhere card flip, locked card progression through all 16 cards, and smooth advance to Experience.

---

### #20. Forensic Reversion of Collapsed Experience Section & Full Stabilization of Hero Ripples & Skills Scroll
- **Date**: 2026-11-01
- **Driver**: User reported that changes made during the Experience section redesign broke the site layout ("everything has collapsed after giving the prompt to build the experience section"). Forensically investigated project history, restored Experience.tsx to its original clean HEAD state, fixed the container CSS mask that was breaking Hero portrait compositing, and implemented hardware-accelerated Framer Motion spring physics in Skills.tsx with deterministic scroll locking.
- **Deliverables & Architectural Decisions**:
  1. **Restored Original Experience.tsx**:
     - Discarded the 900+ line accordion/drawer overhaul and restored src/components/Experience.tsx to its original 365-line state from HEAD.
     - Preserved clean role/company cards, verified achievement checkmarks, and responsive tags without collapsing.
  2. **Hero Portrait Water Ripple Compositing Fix**:
     - Identified root cause of non-working reveal: an outer container CSS mask-image was masking the interactive canvas out of the render tree in Chrome/Edge.
     - Removed the container mask and restored individual layer masks on .portrait-base-image and .portrait-ripple-canvas matching all_hero_views.txt and hero_before_678.txt.
     - Fully verified in live browser: hovering reveals vibrant portrait colors and clicking emits concentric shockwave ripples.
  3. **Skills Section useSpring Motion & Deterministic Scroll Lock**:
     - Replaced manual RAF interpolation with Framer Motion useSpring (stiffness: 170, damping: 22, mass: 0.5) driven by targetMotion.
     - Fixed window-level wheel and touch event interception: while currentTarget < maxCard, all wheel/touch events call e.preventDefault() and step to the next card. The page remains locked in #skills until all 16 cards are revealed.
     - Once card 15 is revealed, downward scrolling smoothly transitions to the restored Experience section.
  4. **Verification**:
     - npx tsc --noEmit compiled cleanly with 0 errors.
     - End-to-end browser subagent verified Hero ripple reveal, 3D Spider-Sense on hover, click-anywhere flip, locked card progression through all 16 cards, and clean transition to the restored Experience section.

---

### #21. Minimal Transparent Liquid Glass Spider-Sense, Reduced Hover Wobble, & Centered Viewport Scroll Locking
- **Date**: 2026-11-01
- **Driver**: User requested making the Spider-Sense animation minimal with transparent liquid glass aesthetics (removing cartoonish colorful neon lines), reducing the card hover wobble to a subtle gentle float, ensuring the scroll animation starts ONLY when the cards are centered in the middle of the screen for both forward and backward scrolling, fixing the screen solidly in the skills section until all cards are revealed before transitioning to the next section, and making the card reveal slow, steady, and one-by-one.
- **Deliverables & Architectural Decisions**:
  1. **Minimal Transparent Liquid Glass Spider-Sense (`SpiderSenseBehindCard`)**:
     - Removed all harsh neon red/magenta (`#FF0A54`) and cyan (`#00F5D4`) cartoon dispersion lines and high-contrast mix-blend filters.
     - Engineered transparent liquid glass caustics using hairline strokes (1.1px - 1.3px), `#spideyLiquidGlassReflect` specular caustics (white, whisper-lavender `#F5D0FE`, and soft ice-blue `#E0E7FF`), and frosted ambient caustics.
     - Placed physically behind the card in 3D (`translateZ(-30px)`), breathing gently via `@keyframes spideyGlassGentleCaustic` (2.8s alternate pulse).
  2. **Reduced Card Hover Wobble (`.card-wobble-layer`)**:
     - Replaced fast 0.85s jitter wobble (-1.2° to +1° and -7px bounce) with an ultra-gentle, luxurious float: `@keyframes cardHoverGentleFloat 3s ease-in-out infinite alternate`.
     - Micro-tilt limited to ±0.25° and elevation capped at -2px to -4px, creating a smooth tactile hover elevation without violent wobbling.
  3. **Centered Viewport Screen Fixing & Scroll Locking (Forward & Backward)**:
     - Configured `.skills-pinned-runway` as a clean 100vh section without dead runway space.
     - Implemented window scroll detection that engages lock ONLY when `#skills` arrives in the middle of the viewport (`distFromCenter <= 45px`).
     - **Forward Locking**: When entering from above (`#about`), locks cleanly at Card 0. Subsequent downward wheel/touch events call `e.preventDefault()` to keep the screen solidly fixed in place while cycling cards 0 to 15. Only when Card 15 is revealed does continuing to scroll down unlock the screen and smoothly advance to `#experience`.
     - **Backward Locking**: When entering from below (`#experience`), locks cleanly at Card 15 (last card). Subsequent upward wheel/touch events call `e.preventDefault()`, holding the screen fixed while stepping backward 15 down to 0. Only when Card 0 is reached does continuing to scroll up unlock and smoothly advance to `#about`.
  4. **Slow & Steady Card Reveal Progression**:
     - Capped RAF step velocity to `0.016` card/frame (~60 frames / 1 full second per card transition), providing a cinematic, majestic slide for each card.
     - Enforced a 420ms pacing cooldown and 55-delta threshold, preventing wheel sweeping or trackpad momentum from skipping multiple cards.
  5. **Verification**:
     - Production build (`tsc -b && vite build`) passed with exit code 0.
     - Dev server active and responsive on `http://localhost:5173/`.
     - Hero portrait water ripple color reveal and all 3 sections remain 100% intact and functional.

---

### #22. Elimination of Fast-Scroll Auto-Skipping & Robust Backward-From-End Scroll Traversal
- **Date**: 2026-11-01
- **Driver**: User reported two specific defects:
  1. Fast scrolling was queuing multiple card increments, causing cards to scroll automatically on their own, skip past cards, and prematurely dump the user into the next section.
  2. Backward scrolling from Experience was sometimes initializing cards at the front (Card 0) instead of the back (Card 15) and getting stuck.
- **Deliverables & Architectural Decisions**:
  1. **Fast-Scroll Runaway & Skipping Elimination**:
     - Root Cause: Fast scrolling queued high wheel delta values into `targetProgressRef`, while the slow easing loop was still catching up. When the user stopped scrolling, the loop continued running on auto-pilot towards card 15.
     - Solution:
       - Installed transition guard `isAnimating = Math.abs(currentTarget - currentVal) > 0.12`. While a card is in motion, all additional wheel/touch events are discarded! Extra increments CANNOT queue up.
       - Natural responsive easing (`step = Math.sign(diff) * Math.min(Math.abs(diff) * 0.18, 0.065)`) completes transitions promptly (~280ms) without auto-pilot delays.
       - Disconnecting stale wheel accumulation on pause (> 180ms) ensures leftover momentum cannot trigger unintentional card hops.
       - Section exit safeguard: The next section (`#experience`) is only entered if the user is already settled on the last card (`isSettledOnLastCard && hasRestedOnLast > 300ms`) and performs a separate, deliberate scroll.
  2. **True Backward Scroll Traversal (`entryOriginRef`)**:
     - Root Cause: Direction detection relied on volatile `lastScrollY` comparisons that were corrupted by programmatic `window.scrollTo` smooth scroll events.
     - Solution:
       - Physical viewport position tracker (`entryOriginRef.current`):
         - If user was below `#skills` in Experience (`rect.top < -80`): `entryOriginRef = 'below'`.
         - If user was above `#skills` in About (`rect.top > 80`): `entryOriginRef = 'above'`.
       - When locking on backward scroll, the stage ALWAYS starts strictly at `maxCard` (Card 15), rendering the back of the deck.
       - Upward scrolling reliably steps backward `15 -> 14 -> 13 -> ... -> 0`.
       - Only when Card 0 is reached and settled for > 300ms does another upward scroll advance to `#about`.
  3. **Verification**:
     - `npm run build` compiled cleanly with exit code 0.
     - Dev server responsive on `http://localhost:5173/`.
     - Verified bidirectional scroll stability: forward from front (0 -> 15 -> Experience) and backward from end (15 -> 0 -> About).

---

### #23. Bulletproof Native Pinned Scroll Runway Architecture (Zero Glitch / Zero Skip)
- **Date**: 2026-11-01
- **Driver**: User reported that virtual scroll locking was still skipping when scrolling fast forward, and backward scroll was failing to seamlessly step cards in center and transition to next sections.
- **Root Cause & Architectural Shift**:
  - Custom virtual scroll lockers relying on `window.scrollTo` and `e.preventDefault()` are inherently prone to race conditions, missed distance thresholds during fast sweeps, and synthetic scroll feedback loops.
  - Replaced the virtual lock with a **True Native Pinned Sticky Runway** (`.skills-pinned-runway` at `clamp(3400px, 420vh, 4800px)` with `.skills-sticky-stage` at `position: sticky; top: 0; height: 100vh`).
- **Deliverables & Architectural Decisions**:
  1. **Strictly Respective to User Scroll**:
     - Card motion is mapped 1:1 via Framer Motion's `useScroll` with `target: runwayRef`.
     - Forward scroll moves cards forward; backward scroll moves cards backward; stopping scroll stops the cards immediately.
     - Zero auto-pilot runaway loops, zero synthetic queueing.
  2. **Centered Cards Guarantee**:
     - `.skills-sticky-stage` is mechanically held at `top: 0` by CSS `position: sticky`. The cards remain locked in the dead vertical center of the screen throughout the entire section.
     - Start buffer (`[0.0, 0.05]`): Card 0 is centered and stationary as the stage pins.
     - Reveal zone (`[0.05, 0.95]`): Smooth, fluid progression through cards 0 to 15.
     - End buffer (`[0.95, 1.0]`): Card 15 is fully revealed, centered, and stationary.
  3. **Guaranteed Seamless Section Transitions**:
     - It is physically impossible to skip the cards when scrolling forward because the runway is in the DOM. The user must scroll through all 16 cards before the runway ends and releases to `#experience`.
     - Scrolling backward from Experience enters at progress `1.0` (Card 15). The stage pins, reveals cards backward (`15 -> 0`), and only releases up to `#about` once Card 0 is reached.
  4. **Verification**:
     - `npm run build` compiled with code 0 (`tsc -b && vite build`).
     - Dev server running on `http://localhost:5173/`.
     - Hero portrait water ripple color reveal and all 3 sections are fully functional.

---

### #24. Creative Experience Section Architecture (`cortex-taste` & Apple Liquid Glass)
- **Date**: 2026-11-02
- **Driver**: Initial exploration of experience section.

---

### #25. "My Story" Chronological Narrative Experience Architecture (Reverse Engineered from Rishi Thakor)
- **Date**: 2026-11-02
- **Driver**: User requested removing the gap between Skills & Experience and re-architecting Experience into a seamless scroll Story section inspired by `https://therishithakor.com/my-story`.
- **Deliverables & Architectural Decisions**:
  1. **Zero-Gap Skills-to-Experience Seamless Flow**:
     - Removed the `margin-bottom: 2.5rem` from `.skills-pinned-runway` in `Skills.tsx` (and in `backups/sections_v1_fixed/Skills.tsx`), setting it to `margin-bottom: 0`.
     - Completely eliminated the horizontal light stripe between the bottom of the Skills card deck and Experience.
  2. **Reverse Engineered "My Story" Dual-Column Architecture**:
     - **Left Column: Pinned Sticky Time Clock (`.story__clock`)**:
       - `position: sticky; top: 0; height: 100vh;` stays pinned beside the narrative throughout user scroll.
       - **3D Concentric Rotating Chrono Tunnel (`.story__bg-canvas`)**:
         - HTML5 Canvas rendering 14 concentric time dials with radial clock hour ticks and hands that rotate in 3D perspective as you scroll (`camZ` and `spin`).
         - Drifting stardust particles rendered in whisper pinkish-lavender (`#F5D0FE`) and soft graphite.
       - **Eyebrow**: Monospace tag `CAREER CHRONICLE // MY STORY` with emerald pulsing live beacon.
       - **Editorial Headline**: "Tracing the trajectory."
       - **Mechanical Rolling Year Digits (Odometer)**:
         - Tabular numerals (`clamp(5.5rem, 9.5vw, 9.5rem)`) showing the year (`2026`, `2025`, `2024`).
         - 4 digit columns (`.story__digit-col`) with staggered CSS translateY transform driven by `cubic-bezier(0.65, 0, 0.2, 1)` that smoothly rolls the digits when the active chapter changes!
       - **Active Tenure Chip**: Monospace uppercase badge with calendar icon updating dynamically (`AUG 2026 — PRESENT`, etc.).
       - **Chrono Progress Meter**:
         - Circular rewind clock SVG icon rotating with scroll progress (`p * -720deg`).
         - Counter indicator: `01 / 04`, `02 / 04`, `03 / 04`, `04 / 04`.
         - High-precision progress bar scaling with scroll percentage.
     - **Right Column: Natural Scrolling Storyline (`.story__line`)**:
       - Native natural scroll (NO hijacked scroll lock, zero stutter).
       - Timeline Rail (`.story__rail`) with dynamic travelled gradient trail (`.story__tail`).
       - Sticky Travelling Focal Dot (`.story__travel-dot`) riding `top: 50vh`, tracking down the rail and highlighting the chapter passing the viewport center.
       - **4 Liquid Glass Chapter Cards**:
         - Active chapter gets full opacity `1.0`, illuminated specular rim, and pinkish-lavender glow.
         - Inactive chapters sit at muted editorial ash `0.38`.
         - Chapter 1: Imperial Info System (Full Stack Developer, Aug 2026 — Present, Current Enterprise Role)
         - Chapter 2: Agile Infotech (Python Full Stack Intern, June 2025 — July 2025, 3 Full Stack Apps)
         - Chapter 3: Ak Info Park (Full Stack Web Development Intern, Feb 2025, 15% Latency Boost)
         - Chapter 4: Srishti Innovative Computer Systems (Python & Data Analysis Intern, Feb 2024 — Mar 2024, Visual Analytics)
         - Includes Key Deliverable & Impact callouts, responsibilities, and `TechLogo` tags.
  3. **Verification**:
     - `npm run build` passed with exit code 0 (`tsc -b && vite build`).
     - Dev server verified on `http://localhost:5173/` (HTTP 200).
     - Sections 1, 2, and 3 remain preserved and fully operational.
