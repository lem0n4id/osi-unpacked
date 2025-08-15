# OSI Story App — Step-by-Step Build Plan (React + GSAP + Tailwind + Framer Motion)

> Goal: Build a cinematic, pixel-art OSI model visualizer with two characters, a wire between them, and step-through scenes for each OSI layer. Each step is a tiny, focused task (aim for 5–20 minutes per step). Commit after most steps.

---

## Phase 0 — Project Bootstrap

1. **Create project directory**

   * `mkdir osi-story && cd osi-story`
2. **Initialize git**

   * `git init` → creates an empty repo.
3. **Create a README**

   * `echo "# OSI Story App" > README.md`
   * Add a one-liner description.
4. **Create a .gitignore**

   * `curl -s https://www.toptal.com/developers/gitignore/api/node,visualstudiocode > .gitignore` (or create manually for Node/Vite).
5. **Initialize React app with Vite**

   * `npm create vite@latest . -- --template react`
6. **Install dependencies**

   * `npm install`
7. **Install UI + animation deps**

   * `npm install -D tailwindcss@3 postcss autoprefixer`
   * `npm install gsap framer-motion`
8. **Tailwind init**

   * `npx tailwindcss init -p` (creates `tailwind.config.js` and `postcss.config.js`).
9. **Configure Tailwind content**

   * In `tailwind.config.js`, set `content: ["./index.html","./src/**/*.{js,jsx}"]`.
10. **Add Tailwind base styles**

    * In `src/index.css`, add:

      ```css
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
      ```
11. **Run dev server**

    * `npm run dev` → verify the Vite React app boots.
12. **Commit bootstrap**

    * `git add . && git commit -m "chore: bootstrap React app with Tailwind, GSAP, Framer Motion"`

---

## Phase 1 — Design System & Layout Skeleton

13. **Install pixel font**

    * Add Google Font *VT323* or *Press Start 2P* in `index.html` `<link>`.
14. **Global styles**

    * In `src/index.css`, set body styles for pixel vibe:

      ```css
      :root { --bg: #0e0f13; --term: #0b0f0c; --green: #00ff7f; --pastel: #c8d6e5; }
      body { @apply bg-[color:var(--bg)] text-[color:var(--pastel)]; font-family: 'VT323', monospace; }
      .terminal { background: var(--term); }
      ```
15. **Create folder structure**

    * `src/components`, `src/scenes`, `src/assets`, `src/lib`, `src/data`, `src/styles`.
16. **Create a layout shell**

    * `src/components/AppShell.jsx` with a centered container, header bar, and footer.
17. **Wire AppShell**

    * Use `AppShell` inside `App.jsx` and verify rendering.
18. **Commit**

    * `git add . && git commit -m "feat: app shell with pixel font and base theme"`

---

## Phase 2 — Scene Canvas & Characters

19. **Create SceneCanvas component**

    * `src/components/SceneCanvas.jsx` – a container with fixed aspect ratio (16:9) using Tailwind.
20. **Add placeholder characters**

    * `src/components/CharacterSprite.jsx` – simple pixel blocks or SVG rectangles; props: `side` ('left'|'right'), `state` ('idle'|'typing'|'smile').
21. **Add 2000s computer sprite**

    * `src/components/ComputerSprite.jsx` – CRT monitor + box CPU (SVG or CSS blocks).
22. **Add Cable component**

    * `src/components/Cable.jsx` – a midline cable (SVG path) between computers.
23. **Compose IdleScene**

    * `src/scenes/IdleScene.jsx` – left+right character at desks, computers, cable in middle.
24. **Render IdleScene in App**

    * Replace default content with `<IdleScene />` inside `SceneCanvas`.
25. **Commit**

    * `git add . && git commit -m "feat: idle scene with characters, computers, cable"`

---

## Phase 3 — Controls & State

26. **Add UI store (simple)**

    * In `src/lib/state.js`, export `useState` hooks for `currentStep`, `currentLayer` (default null or 0), `direction` ('forward'|'reverse').
27. **Place “Send Message” button**

    * In `IdleScene`, add a Tailwind-styled button near left character.
28. **Create SceneRouter**

    * `src/scenes/SceneRouter.jsx` – renders scene by `currentStep`.
29. **Wire button to advance**

    * On click, set `currentStep = 'L7'` and `currentLayer = 7`.
30. **Commit**

    * `git add . && git commit -m "feat: basic scene router and send button"`

---

## Phase 4 — GSAP & Framer Motion Boot

31. **Install GSAP types (optional)**

    * Skip for JS; if TS, install `@types/gsap`.
32. **Create gsap helpers**

    * `src/lib/anim.js` export a `makeTl()` wrapper `gsap.timeline({ defaults: { duration: 0.6, ease: "power2.out" }})`.
33. **Test a simple zoom**

    * In `IdleScene`, on button click, run a GSAP zoom to left monitor container.
34. **Framer Motion fade**

    * Wrap scenes in `<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/>`.
35. **Commit**

    * `git add . && git commit -m "feat: gsap zoom-to-monitor and framer motion fades"`

---

## Phase 5 — Data Model for OSI Layers

36. **Create layer metadata**

    * `src/data/layers.js` array of 7 objects: id, name, description, techNotes, sample.
37. **Add HTTP sample**

    * In Layer 7 sample, include realistic HTTP request payload.
38. **Add placeholders for ports/IP/MAC**

    * Reserve fields for L4 ports, L3 IPs, L2 MACs.
39. **Commit**

    * `git add . && git commit -m "feat: layer metadata with HTTP sample"`

---

## Phase 6 — Layer 7 (Application) Scene

40. **Create L7 scene**

    * `src/scenes/L7_Application.jsx` – messaging app window + protocol snippet.
41. **Style messaging app**

    * Create chat bubble for message "Hey, how are you?" with pixel borders.
42. **Add protocol panel**

    * Side panel shows HTTP request snippet from `layers.js`.
43. **Add info box**

    * Bottom text explains Layer 7; use Tailwind card.
44. **Next button**

    * Button sets `currentStep = 'L6'` and `currentLayer = 6`.
45. **Commit**

    * `git add . && git commit -m "feat: L7 scene with messaging UI and HTTP snippet"`

---

## Phase 7 — Layer 6 (Presentation) Scene

46. **Create L6 scene**

    * `src/scenes/L6_Presentation.jsx` – split view: plain vs encoded/encrypted.
47. **Encoding view**

    * Show hex bytes for the same message (simple mapper).
48. **Encryption animation**

    * GSAP scramble numbers/letters; toggle lock icon.
49. **Info box + Next**

    * Add explanation and hook Next → `L5`.
50. **Commit**

    * `git add . && git commit -m "feat: L6 scene with encoding & encryption animation"`

---

## Phase 8 — Layer 5 (Session) Scene

51. **Create L5 scene**

    * `src/scenes/L5_Session.jsx` – handshake mini-diagram.
52. **Three-way handshake**

    * Animate SYN → SYN-ACK → ACK labels with GSAP timeline.
53. **Sequence numbers**

    * Render small cards showing `Seq`/`Ack` increments.
54. **Info box + Next**

    * Explain session responsibilities; Next → `L4`.
55. **Commit**

    * `git add . && git commit -m "feat: L5 scene with TCP handshake visualization"`

---

## Phase 9 — Layer 4 (Transport) Scene

56. **Create L4 scene**

    * `src/scenes/L4_Transport.jsx` – segmentation and ports.
57. **Segment packets**

    * Split message into 2–3 boxes; label `Seq` numbers.
58. **Port numbers**

    * Show Source (ephemeral) and Dest (443) atop packets.
59. **Sliding window**

    * Animate send/ack flow; highlight retransmit on optional drop.
60. **Info box + Next**

    * Next → `L3`.
61. **Commit**

    * `git add . && git commit -m "feat: L4 scene with segmentation, ports, sliding window"`

---

## Phase 10 — Layer 3 (Network) Scene

62. **Create L3 scene**

    * `src/scenes/L3_Network.jsx` – routers + path map.
63. **IP headers**

    * Assign `Src IP` and `Dest IP` from `layers.js` fields.
64. **Hop animation**

    * Packets hop across 2–3 routers; use GSAP path tween.
65. **Info box + Next**

    * Next → `L2`.
66. **Commit**

    * `git add . && git commit -m "feat: L3 scene with routing hops and IP headers"`

---

## Phase 11 — Layer 2 (Data Link) Scene

67. **Create L2 scene**

    * `src/scenes/L2_DataLink.jsx` – Ethernet framing + MACs.
68. **Frame wrapper**

    * Visually nest packet inside a frame; label `Src MAC`/`Dest MAC`.
69. **NIC animation**

    * Move frames into a NIC slot element; subtle glow.
70. **Info box + Next**

    * Next → `L1`.
71. **Commit**

    * `git add . && git commit -m "feat: L2 scene with Ethernet frame and NIC animation"`

---

## Phase 12 — Layer 1 (Physical) Scene

72. **Create L1 scene**

    * `src/scenes/L1_Physical.jsx` – binary/light/radio pulses on cable.
73. **Cable pulses**

    * Animate 1/0 blocks or wave pulses moving along the mid cable.
74. **Zoom out**

    * Frame both computers while pulses travel.
75. **Info box + Reverse button**

    * Button sets `direction = 'reverse'` and `currentStep = 'L1_recv'`.
76. **Commit**

    * `git add . && git commit -m "feat: L1 scene with signal pulses and reverse trigger"`

---

## Phase 13 — Reverse Journey Scenes (L1 → L7)

77. **Create receive L1 scene**

    * `src/scenes/RX_L1_Physical.jsx` – pulses arrive at right computer.
78. **RX L2**

    * `src/scenes/RX_L2_DataLink.jsx` – unwrap Ethernet frame.
79. **RX L3**

    * `src/scenes/RX_L3_Network.jsx` – remove IP header; validate Dest IP.
80. **RX L4**

    * `src/scenes/RX_L4_Transport.jsx` – reassemble segments; check ACKs.
81. **RX L5**

    * `src/scenes/RX_L5_Session.jsx` – confirm session established.
82. **RX L6**

    * `src/scenes/RX_L6_Presentation.jsx` – decrypt/decode to UTF-8.
83. **RX L7**

    * `src/scenes/RX_L7_Application.jsx` – show message in receiver app.
84. **Commit**

    * `git add . && git commit -m "feat: reverse journey scenes RX L1→L7"`

---

## Phase 14 — Message Delivered & Summary

85. **Delivered scene**

    * `src/scenes/Delivered.jsx` – right screen shows the chat bubble; character smiles.
86. **Summary screen**

    * `src/scenes/Summary.jsx` – vertical OSI stack, highlight per layer with brief recap.
87. **Replay button**

    * Sets state back to Idle: `currentStep = 'IDLE'`, clears progress.
88. **Commit**

    * `git add . && git commit -m "feat: delivered & summary screens with replay"`

---

## Phase 15 — Navigation & UX Polish

89. **Add HUD controls**

    * Global controls: Play/Pause, Next, Back, Skip to Layer dropdown.
90. **Keyboard support**

    * ArrowRight=Next, ArrowLeft=Back, Space=Play/Pause.
91. **Progress indicator**

    * Show current layer badge (7→1→7) at top-right.
92. **Tooltips**

    * Hover tooltips for ports/IP/MAC fields.
93. **Commit**

    * `git add . && git commit -m "feat: HUD controls, keyboard nav, progress badge, tooltips"`

---

## Phase 16 — Technical Accuracy Pass

94. **Validate protocol samples**

    * Ensure HTTP, TCP seq/ack, IP headers, MACs are plausible (use RFC-friendly examples like TEST-NET addresses 203.0.113.0/24).
95. **Add error simulation toggle (optional)**

    * Checkbox to drop one packet and show retransmit at L4.
96. **Lat/Loss slider (optional)**

    * Sliders that slow GSAP timeline or insert delays.
97. **Copy tweaks**

    * Simplify info boxes for clarity; ensure each layer’s role is accurate.
98. **Commit**

    * `git add . && git commit -m "chore: accuracy pass, optional error/latency controls"`

---

## Phase 17 — Packaging & Deploy

99. **README update**

    * Add screenshots/GIFs, stack, run instructions, and credits.
100. **Deploy**
     \- Create repo on GitHub, push code.
     \- Deploy to Vercel or Netlify: connect repo, set build command `npm run build`, output `dist/`.
101. **Tag v0.1.0**
     \- `git tag v0.1.0 && git push --tags`.

---

## Phase 18 — Stretch (Optional Extras)

102. **Multiple protocols**
     \- Add toggles for HTTP vs SMTP vs DNS (affects L7–L4 visuals).
103. **Theme switcher**
     \- Pastel day vs terminal night.
104. **Localization**
     \- Extract strings for i18n.
105. **Mobile responsiveness**
     \- Scale scene canvas for narrow screens.
106. **Performance pass**
     \- Use `React.memo` on sprites; reduce re-renders; GSAP timeline re-use.
107. **Analytics (privacy-friendly)**
     \- Track which layers users replay the most.

---

### File Hints (Examples)

* `src/data/layers.js`

  ```js
  export const LAYERS = [
    { id: 7, name: 'Application', desc: 'Human-facing protocols (HTTP/SMTP/FTP).', sample: `POST /chat HTTP/1.1\nHost: char2.net\nContent-Type: text/plain\nContent-Length: 18\n\nHey, how are you?` },
    { id: 6, name: 'Presentation', desc: 'Encode, compress, encrypt (UTF-8, TLS).', sample: '4865792c20…' },
    { id: 5, name: 'Session', desc: 'Manage sessions, checkpoints.', sample: 'SYN / SYN-ACK / ACK' },
    { id: 4, name: 'Transport', desc: 'TCP segments, ports, reliability.', ports: { src: 49152, dst: 443 } },
    { id: 3, name: 'Network', desc: 'IP addressing and routing.', ip: { src: '192.0.2.10', dst: '203.0.113.25' } },
    { id: 2, name: 'Data Link', desc: 'Frames, MAC addressing, switches.', mac: { src: '66:77:88:99:AA:BB', dst: '00:1A:2B:3C:4D:5E' } },
    { id: 1, name: 'Physical', desc: 'Signals on wire/air/fiber.' }
  ];
  ```

* `src/lib/anim.js`

  ```js
  import { gsap } from 'gsap';
  export const makeTl = (opts = {}) => gsap.timeline({ defaults: { duration: 0.6, ease: 'power2.out' }, ...opts });
  ```

* Scene routing idea:

  ```jsx
  // SceneRouter.jsx
  export default function SceneRouter({ step }) {
    switch (step) {
      case 'IDLE': return <IdleScene/>;
      case 'L7': return <L7_Application/>;
      case 'L6': return <L6_Presentation/>;
      case 'L5': return <L5_Session/>;
      case 'L4': return <L4_Transport/>;
      case 'L3': return <L3_Network/>;
      case 'L2': return <L2_DataLink/>;
      case 'L1': return <L1_Physical/>;
      case 'L1_recv': return <RX_L1_Physical/>;
      // … up to RX_L7
      case 'DELIVERED': return <Delivered/>;
      case 'SUMMARY': return <Summary/>;
      default: return <IdleScene/>;
    }
  }
  ```

---

**Tip:** Keep each step tiny. If a step takes >30 minutes, split it. Commit early and often. Enjoy the vibe-coding flow!
