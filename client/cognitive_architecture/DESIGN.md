# Design System Strategy: Cognitive Architecture

## 1. Overview & Creative North Star: "The Kinetic Executive"
This design system moves beyond the static "SaaS template" to embrace a **Kinetic Executive** aesthetic. It is a visual manifestation of high-speed intelligence and structural stability. We avoid the "flatness" of modern web design by using the vibrant orange primary as a light source that illuminates a sophisticated, multi-layered architecture.

**The Creative North Star: Precision Energy.**
The interface should feel like a high-end command center. We break the rigid grid through **intentional asymmetry**—using wide margins and off-center focal points—and **tonal depth**, where the "Cognitive Architecture" is built through stacked layers of light and shadow rather than primitive lines.

---

## 2. Colors & Surface Philosophy
The palette is anchored by a deep, technical navy (`#060e20`) and electrified by a precision orange (`#f97316`).

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. 
Structure must be defined through:
- **Background Color Shifts:** Placing a `surface-container-low` section against a `surface` background.
- **Tonal Transitions:** Using subtle shifts in the navy spectrum to define boundaries.
- **Negative Space:** Allowing the `Manrope` typography to anchor the layout's structure.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical, machined layers. Use the surface-container tiers to create nested depth:
*   **Base:** `surface-dim` (#060e20)
*   **Sectioning:** `surface-container-low` (#091328)
*   **Interaction Cards:** `surface-container` (#0f1930)
*   **Elevated Elements:** `surface-container-highest` (#192540)

### The "Glass & Gradient" Rule
To achieve a "high-tech" finish, floating elements (modals, popovers) must use **Glassmorphism**.
*   **Formula:** `surface-variant` at 60% opacity + `backdrop-blur: 20px`.
*   **Signature Gradients:** For Hero CTAs and primary actions, utilize a linear gradient from `primary` (#ff9153) to `primary-container` (#ff7a23) at a 135-degree angle. This provides a "glowing" soul to the interface that flat hex codes cannot replicate.

---

### 3. Typography: The Editorial Voice
We use **Manrope** exclusively. It is a geometric sans-serif that maintains an "executive" posture while feeling modern and approachable.

*   **Display (lg/md/sm):** Use for high-impact statements. Set with tight letter-spacing (-0.02em) to create an authoritative, "Headline News" feel.
*   **Headline (lg/md/sm):** The workhorse for section headers. Always pair with generous top-padding to let the architecture breathe.
*   **Title (lg/md/sm):** Reserved for card titles and navigation. Use `medium` (500) or `semibold` (600) weights to ensure hierarchy against body text.
*   **Body (lg/md/sm):** Optimized for readability. Maintain a line-height of 1.6x for `body-md` to ensure the "Professional" feel isn't lost in data-dense areas.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "web 2.0" for this system. We use **Ambient Depth**.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` background. The contrast in the dark tones provides a "soft lift" that feels architectural.
*   **Ambient Shadows:** For floating elements, use a highly diffused shadow: `0px 24px 48px rgba(0, 0, 0, 0.4)`. The shadow must be tinted with the `on-surface` color to ensure it looks like light occlusion, not a "fuzzy grey box."
*   **The Ghost Border Fallback:** When high-contrast containment is required (e.g., input fields), use a "Ghost Border": `outline-variant` (#40485d) at **20% opacity**. Never use 100% opaque lines.

---

## 5. Components

### Buttons & Inputs
*   **Primary Button:** `primary` (#ff9153) background with `on-primary` (#511f00) text. Apply an 8px (`DEFAULT`) radius. On hover, transition to `primary-dim` (#fd761a) with a subtle inner-glow (1px white at 10% opacity).
*   **Input Fields:** Use `surface-container-high` as the base. No bottom line; use a 10% `outline` for the "Ghost Border." Focus states must use the `primary` color for the border and a 2px outer glow.

### Chips & Tags
*   **Action Chips:** 8px radius. Use `surface-container-highest` backgrounds. Use `primary` for the icon/text color to make them pop against the dark architecture.

### Cards & Lists
*   **Anti-Divider Policy:** Lists must never use horizontal dividers. Use 16px of vertical whitespace or alternating `surface-container` shifts to separate items.
*   **Cognitive Cards:** Use `surface-container` with an 8px radius. To denote "Active" states, do not change the border; instead, add a 2px vertical "glow strip" of `primary` color on the far left edge.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts (e.g., a 2/3 and 1/3 split) to create a sophisticated editorial feel.
*   **Do** use the `primary` orange sparingly—it is a laser-focused accent, not a background color.
*   **Do** use "Manrope" in all-caps for `label-sm` to create a "technical blueprint" aesthetic.

### Don't
*   **Don't** use 1px solid borders to separate sections. It breaks the "Cognitive Architecture" immersion.
*   **Don't** use pure white (#FFFFFF) for text in dark mode. Use `on-surface` (#dee5ff) to reduce eye strain and maintain the executive tone.
*   **Don't** use standard "Material" shadows. Use the Tonal Layering or Ambient Shadows described in Section 4.