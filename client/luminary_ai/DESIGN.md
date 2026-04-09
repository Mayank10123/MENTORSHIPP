# Design System Specification: The Cognitive Architecture

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Executive."** 

We are moving away from the "chat-bot" aesthetic toward a high-end, editorial dashboard that feels like a private glass-walled office in a midnight skyscraper. The goal is to convey an atmosphere of quiet authority and proactive intelligence. 

To break the "standard template" look, this system utilizes **Intentional Asymmetry** and **Tonal Depth**. Instead of a centered, rigid grid, we employ wide-margin layouts with overlapping elements—such as a data visualization card partially obscuring a background glass gradient—to create a sense of three-dimensional space. We prioritize breathing room over information density, allowing the AI's "insights" to occupy the stage with editorial importance.

---

## 2. Colors & Surface Philosophy
The palette is rooted in deep oceanic stability, punctuated by the vibrant hum of active intelligence.

### The "No-Line" Rule
Standard UI relies on borders to separate thoughts. This system forbids it. **1px solid borders are prohibited for sectioning.** 
*   **The Technique:** Define boundaries through background color shifts. A `surface-container-low` section should sit directly against a `surface` background. The transition must be seamless, relying on the human eye’s ability to perceive tonal change rather than a drawn line.

### Surface Hierarchy & Nesting
Treat the interface as a physical stack of semi-translucent materials.
*   **Base:** `surface` (#0b1326) acts as the infinite void.
*   **The Stack:** Use the `surface-container` tiers to pull elements forward. For instance, a profile dashboard uses `surface-container-lowest` for the main canvas, while active AI insight cards use `surface-container-highest` to "float" toward the user.
*   **The Glass & Gradient Rule:** For hero sections and primary AI interactions, use a backdrop-blur (12px–20px) combined with `surface-variant` at 60% opacity. Apply a subtle linear gradient from `primary` (#adc6ff) to `primary-container` (#4d8eff) at a 5% opacity overlay to give the surface a "charged" feel.

---

## 3. Typography
We use a dual-typeface system to balance professional authority with technical precision.

*   **Display & Headlines (Manrope):** Chosen for its geometric soul and wide apertures. `display-lg` through `headline-sm` should be set with tight letter-spacing (-0.02em) to create an authoritative, editorial impact. This is the voice of the "Coach."
*   **Body & Labels (Inter):** The industry standard for readability. `body-md` and `title-sm` are your workhorses. Inter’s neutral tone ensures that data-heavy career analytics remain the focus without visual fatigue.
*   **Hierarchy Tip:** Use `tertiary` (#b9c8de) for secondary body text to create a natural "recession" in the information hierarchy, keeping the user’s eye fixed on `on-surface` primary data.

---

## 4. Elevation & Depth
Depth is a functional tool, not a decoration. We achieve it through **Tonal Layering**.

*   **The Layering Principle:** To lift a card, do not reach for a shadow first. Move it up the surface scale. Place a `surface-container-high` card inside a `surface-container-low` parent.
*   **Ambient Shadows:** For floating modals or "Intelligence" pop-overs, use shadows with a blur radius of 40px–60px. The color must be a tinted version of `background` (e.g., #060e20) at 15% opacity. Never use pure black or grey.
*   **The Ghost Border Fallback:** Where accessibility requires a container boundary (e.g., input fields), use the `outline-variant` token at **15% opacity**. It should be felt, not seen.
*   **Glassmorphism:** AI-generated content (like a "Suggested Career Path") should always use glassmorphism. Use a `surface-bright` fill at 40% opacity with a `backdrop-filter: blur(12px)`. This integrates the AI’s logic into the user’s existing environment.

---

## 5. Components

### Buttons
*   **Primary:** A solid fill of `primary-container` (#4d8eff). Use `rounded-md` (12px). No border.
*   **Secondary (Success):** Use `secondary-container` (#00a572) with `on-secondary-container` text for "Progress" or "Success" actions.
*   **Tertiary:** Ghost style. No background, `primary` text. Transitions to `surface-container-high` on hover.

### Inputs & Fields
*   **Style:** `surface-container-highest` background. 
*   **States:** On focus, the "Ghost Border" increases to 40% opacity using `primary`, and a subtle `primary` outer glow (4px blur) is applied.

### Cards & Data Lists
*   **Strict Rule:** Forbid divider lines. 
*   **Alternative:** Use 24px–32px of vertical white space to separate list items. If items must be distinct, use alternating subtle background shifts (`surface-container-low` vs `surface-container-lowest`).

### AI Insight Chips
*   **Style:** Use `tertiary-container` with a `label-md` font. These should feel like small "tags" of data that the AI has extracted for the user.

---

## 6. Do's and Don'ts

### Do
*   **Do** embrace negative space. If a screen feels "full," it’s likely too cluttered for an executive experience.
*   **Do** use `secondary` (#4edea3) sparingly. It is a "reward" color, reserved for career milestones and progress bars.
*   **Do** overlap elements. An icon protruding slightly outside its container adds a custom, high-end feel.

### Don't
*   **Don't** use standard "Drop Shadows" from a UI kit. They look cheap. Use our Ambient Shadow spec.
*   **Don't** use 100% white for text. Use `on-surface` (#dae2fd) to maintain the midnight aesthetic and reduce eye strain.
*   **Don't** use sharp corners. Everything must adhere to the `DEFAULT` (8px) or `md` (12px) radii to feel approachable yet modern.

---

## 7. Contextual AI Components
*   **The Intelligence Pulse:** A small, 4px circular glow using `primary` that sits next to AI-generated text, subtly pulsing to indicate "Live Coaching."
*   **The Career Trajectory Graph:** Use a `secondary` to `primary` gradient for line charts to symbolize the transition from "Current State" to "AI-Enhanced Success."