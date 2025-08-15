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

### Acceptance Criteria
- [x] **UI State Management**: `src/lib/state.jsx` is created and provides `currentStep`, `currentLayer`, and `direction` state via a React Context.
- [x] **State Provider**: The main `App` component is wrapped in the `UIStateProvider`.
- [x] **"Send Message" Button**: A "Send Message" button is present in the `IdleScene`.
- [x] **Scene Router**: `src/scenes/SceneRouter.jsx` is implemented.
- [x] **State Advancement**: Clicking the "Send Message" button updates `currentStep` to 'L7'.
- [x] **Restart Button**: A "Restart" button is available.
- [x] **Restart Functionality**: The "Restart" button resets the state to `IDLE`.

---

## Phase 4 — Animation Foundation (GSAP & Framer Motion)

31. **Create GSAP Animation Helpers**
    *   In `src/lib/anim.js`, export a timeline factory: `export const makeTl = (opts) => gsap.timeline({ defaults: { duration: 0.6, ease: 'power2.out' }, ...opts });`. This standardizes animation timings.
    *   **Why**: Centralizing GSAP defaults ensures a consistent animation feel across all scenes and makes global timing adjustments trivial.

32. **Integrate Framer Motion for Scene Transitions**
    *   In `SceneRouter.jsx`, wrap the `switch` statement's output with Framer Motion's `<AnimatePresence>` component.
    *   Wrap each scene component (`<IdleScene />`, etc.) in `<motion.div key={step} {...sceneTransition}>`.
    *   Define a reusable `sceneTransition` object: `{ initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }`.
    *   **Why**: `AnimatePresence` handles enter/exit animations, allowing scenes to fade out gracefully before the next one fades in.

33. **Implement a Test Animation with GSAP**
    *   In `IdleScene.jsx`, create a `useRef` for the left computer monitor's container div (e.g., `const monitorRef = useRef(null);`).
    *   In the "Send Message" button's `onClick` handler, create a GSAP timeline using `makeTl()`.
    *   Add a tween to the timeline to zoom into the monitor: `tl.to(monitorRef.current, { scale: 1.5, duration: 1, ease: 'expo.inOut' });`.
    *   **Why**: This verifies that GSAP is correctly configured and can target React component elements via refs. It serves as a template for all future imperative animations.

34. **Commit Animation Foundation**
    *   `git add . && git commit -m "feat: setup GSAP helpers and Framer Motion scene transitions"`

### Acceptance Criteria
- [x] **GSAP Helper Created**: `src/lib/anim.js` exists and exports a `makeTl` timeline factory function.
- [x] **Framer Motion Integrated**: `SceneRouter.jsx` uses `<AnimatePresence>` and scenes are wrapped in `<motion.div>` to enable fade-in/fade-out transitions between steps.
- [x] **GSAP Test Animation Works**: Clicking the "Send Message" button in `IdleScene` successfully triggers a GSAP animation that visibly zooms in on the left computer monitor element.
- [x] **Smooth Transitions**: Changing scenes via the UI controls results in a smooth cross-fade animation without jarring visual jumps.

---

## Phase 5 — Data Model & Icons

35. **Create Comprehensive Layer Data**
    *   In `src/data/layers.js`, create and export an array named `LAYERS`.
    *   Each object in the array will represent an OSI layer and must include:
        *   `id`: `number` (7 down to 1).
        *   `name`: `string` (e.g., 'Application').
        *   `shortDesc`: `string` (A brief, punchy summary).
        *   `desc`: `string` (A one-sentence explanation of the layer's role).
        *   `techNotes`: `string` (Implementation details for our visualization).
        *   `sample`: `string` or `object` (e.g., HTTP headers, hex codes, or handshake steps).
        *   `Icon`: `React.Component` (An icon representing the layer).
    *   **Why**: This structure provides all necessary text, data, and visual components for each scene from a single, easily-managed source.

36. **Install React Icons**
    *   Run `npm install react-icons` to get a library of high-quality icons.
    *   Import icons for each layer (e.g., `VscLock` for Presentation, `VscGlobe` for Network).
    *   **Why**: Icons provide quick visual cues for each layer, reinforcing learning and improving the UI's aesthetic.

37. **Populate Data for All 7 Layers**
    *   Fill in the `layers.js` array with specific, technically-plausible data for each layer's `sample` field.
    *   Use TEST-NET IP addresses (e.g., `203.0.113.0/24`) and example MAC addresses to ensure realism.
    *   For Layer 4 (Transport), model the `segments` as an array of objects.
    *   For Layer 5 (Session), model the `sample` as an object with `step1`, `step2`, `step3` for the handshake.
    *   **Why**: Rich, accurate data makes the visualization more compelling and educational. Structuring complex samples as objects makes them easier to parse and animate.

38. **Commit Data Model**
    *   `git add . && git commit -m "feat: create comprehensive data model for OSI layers"`

### Acceptance Criteria
- [x] **Layer Data File Created**: `src/data/layers.js` exists and exports a `LAYERS` array.
- [x] **Icons Installed**: `react-icons` is added to `package.json`.
- [x] **Complete Data Structure**: Each layer object in `layers.js` contains all required fields: `id`, `name`, `shortDesc`, `desc`, `techNotes`, `sample`, and `Icon`.
- [x] **Plausible Sample Data**: The `sample` data for each layer (HTTP, TCP, IP, MAC) is filled out with realistic, technically-sound examples.
- [x] **Icons Assigned**: Each layer has a relevant icon component assigned to its `Icon` property.

---

## Phase 6 — Layer 7 (Application) Scene

39. **Create L7 Scene Component**
    *   Create the file `src/scenes/L7_Application.jsx`.
    *   Import React, `useUIState` from `../lib/state.jsx`, and `LAYERS` from `../data/layers.js`.
    *   Define the component structure: a main flex container with two children: a "Messaging App" panel and a "Protocol Data" panel. Add an "Info Box" at the bottom.

40. **Fetch and Display Layer Data**
    *   Inside the component, get the layer data: `const { layers } = useUIState();`.
    *   Find the L7 data: `const layerData = layers.find(l => l.id === 7);`.
    *   Display `layerData.sample` in the protocol panel, preserving whitespace with `whitespace-pre-wrap`.
    *   Display `layerData.desc` in the info box.

41. **Style UI Elements**
    *   **Messaging App**: Create a `div` with a dark background (e.g., `bg-gray-800`), a title bar, and a chat bubble component inside. Style with pixelated borders (`border-2 border-gray-500`).
    *   **Protocol Panel**: Use a similar dark, bordered `div`.
    *   **Info Box**: A container with the layer `Icon`, `name`, and `desc`. Style it as a footer card.

42. **Implement Navigation**
    *   Get the state setter: `const { setCurrentStep } = useUIState();`.
    *   Add a "Next: Presentation Layer" button.
    *   On click, call `setCurrentStep('L6')`.

43. **Commit L7 Scene**
    *   `git add . && git commit -m "feat: build L7 Application scene"`

### Acceptance Criteria
- [x] **Component Renders**: `L7_Application.jsx` is created and renders in the `SceneRouter` without errors.
- [x] **Data Displayed**: The component correctly fetches and displays the `sample` and `desc` for Layer 7 from the global state.
- [x] **UI Correctly Styled**: The scene shows three distinct, styled areas: a messaging app view, a protocol data view, and an info box, all matching the pixel-art theme.
- [x] **Navigation Works**: Clicking the "Next" button updates the application state, causing the `SceneRouter` to transition to the `L6` scene.

---

## Phase 7 — Layer 6 (Presentation) Scene

44. **Create L6 Scene Component**
    *   Create `src/scenes/L6_Presentation.jsx`.
    *   Structure it with a split-view layout: one panel for "Plain Data" and another for "Encoded & Encrypted Data".
    *   Fetch L6 data from the `layers` state: `const layerData = layers.find(l => l.id === 6);`.

45. **Visualize Data Transformation**
    *   In the "Plain Data" panel, display `layerData.sample.plain`.
    *   In the "Encoded" panel, display `layerData.sample.encoded`.
    *   Add a lock icon (`VscLock`) next to the encoded data.

46. **Animate Encryption with GSAP**
    *   Use `useEffect` to run an animation when the component mounts.
    *   Create a GSAP timeline with `makeTl()`.
    *   Target the encoded text element and use a `from` tween to animate its characters from a random scramble to the final hex values. (GSAP's `ScrambleTextPlugin` is ideal, or a simple manual version can be written).
    *   Simultaneously, animate the `VscLock` icon, perhaps by changing its color or scale, to signify the encryption process completing.
    *   **Why**: This visually demonstrates the layer's core function: transforming data into a secure, standardized format for transport.

47. **Implement Navigation**
    *   Add a "Next: Session Layer" button that calls `setCurrentStep('L5')`.

48. **Commit L6 Scene**
    *   `git add . && git commit -m "feat: build L6 Presentation scene with encryption animation"`

### Acceptance Criteria
- [x] **Component Renders**: `L6_Presentation.jsx` is created and renders correctly.
- [x] **Split View**: The scene clearly displays both the plain text message and its corresponding hex-encoded version in separate panels.
- [x] **Encryption Animation**: On scene load, the hex data performs a "scramble" or "reveal" animation, and a lock icon animates to indicate the process is complete.
- [x] **Navigation Works**: The "Next" button correctly transitions the state to the `L5` scene.

---

## Phase 8 — Layer 5 (Session) Scene

49. **Create L5 Scene Component**
    *   Create `src/scenes/L5_Session.jsx`.
    *   Fetch L5 data: `const layerData = layers.find(l => l.id === 5);`.
    *   Design a layout to visualize the three-way handshake: three columns or rows representing the SYN, SYN-ACK, and ACK steps.

50. **Visualize Handshake Steps**
    *   For each step (`layerData.sample.step1`, etc.), create a component or `div` that displays its details: the name (`SYN`), sequence number (`Seq`), and acknowledgment number (`Ack`).
    *   Use `useRef` to get references to the container of each of the three handshake step elements.

51. **Animate the Handshake Timeline**
    *   In a `useEffect`, create a GSAP timeline to animate the handshake process sequentially.
    *   `tl.from(synRef.current, { opacity: 0, x: -50 })`: Animate the SYN packet sliding in.
    *   `tl.from(synAckRef.current, { opacity: 0, x: 50 })`: Animate the SYN-ACK packet sliding in from the other side.
    *   `tl.from(ackRef.current, { opacity: 0, x: -50 })`: Animate the final ACK packet.
    *   **Why**: A sequential timeline clearly demonstrates the back-and-forth nature of establishing a session, which is the core concept of this layer.

52. **Implement Navigation**
    *   Add a "Next: Transport Layer" button that calls `setCurrentStep('L4')`.

53. **Commit L5 Scene**
    *   `git add . && git commit -m "feat: build L5 Session scene with handshake animation"`

### Acceptance Criteria
- [x] **Component Renders**: `L5_Session.jsx` is created and renders correctly.
- [x] **Handshake Visualized**: The scene displays three distinct elements representing the SYN, SYN-ACK, and ACK steps of the TCP handshake.
- [x] **Data Displayed**: Each handshake step correctly shows its name, sequence, and acknowledgment numbers from the data model.
- [x] **Sequential Animation**: On scene load, the three handshake steps appear one after another in the correct order, animated by GSAP.
- [x] **Navigation Works**: The "Next" button correctly transitions the state to the `L4` scene.

---

## Phase 9 — Layer 4 (Transport) Scene

54. **Create L4 Scene Component**
    *   Create `src/scenes/L4_Transport.jsx`.
    *   Fetch L4 data: `const layerData = layers.find(l => l.id === 4);`.
    *   Design a layout that shows a large data block being broken down into smaller "segment" components.

55. **Visualize Segmentation and Ports**
    *   Create a `Segment` component that takes `data`, `seq`, `ports` as props.
    *   Inside `L4_Transport.jsx`, map over `layerData.segments` and render a `Segment` for each item.
    *   Each `Segment` component should display a header with the Source Port (`layerData.ports.src`), Destination Port (`layerData.ports.dst`), and its unique Sequence Number (`segment.seq`).

56. **Animate Segmentation**
    *   In a `useEffect`, create a GSAP timeline.
    *   Start with a single, large "Encrypted Data" block visible.
    *   Animate the large block fading out while simultaneously animating the individual `Segment` components fading in and spacing themselves out.
    *   A stagger effect is perfect here: `tl.from(segmentRefs.current, { opacity: 0, y: -50, stagger: 0.2 });`.
    *   **Why**: This animation directly visualizes the core responsibility of Layer 4: breaking a large stream of data into smaller, manageable segments for transport.

57. **Implement Navigation**
    *   Add a "Next: Network Layer" button that calls `setCurrentStep('L3')`.

58. **Commit L4 Scene**
    *   `git add . && git commit -m "feat: build L4 Transport scene with segmentation"`

### Acceptance Criteria
- [ ] **Component Renders**: `L4_Transport.jsx` is created and renders correctly.
- [ ] **Data Displayed**: The scene correctly renders multiple "segment" elements from the `layerData.segments` array.
- [ ] **Header Info Correct**: Each segment correctly displays the source port, destination port, and its unique sequence number.
- [ ] **Segmentation Animation**: On scene load, a single data block is visually replaced by an animated sequence of smaller segments appearing.
- [ ] **Navigation Works**: The "Next" button correctly transitions the state to the `L3` scene.

---

## Phase 10 — Layer 3 (Network) Scene

59. **Create L3 Scene Component**
    *   Create `src/scenes/L3_Network.jsx`.
    *   Fetch L3 data: `const layerData = layers.find(l => l.id === 3);`.
    *   Design a layout showing the segments from L4, which will be encapsulated into packets. Add a visual path with 2-3 router icons between the source and destination computers.

60. **Visualize IP Header Encapsulation**
    *   For each segment, show an "IP Header" being added. This header should prominently display the Source IP (`layerData.ip.src`) and Destination IP (`layerData.ip.dst`).
    *   The combination of the segment and the IP header now forms a "Packet".

61. **Animate Encapsulation and Routing**
    *   In a `useEffect`, create a GSAP timeline.
    *   **Animation Step 1: Encapsulation.** Animate the IP header appearing and wrapping each segment. `tl.from(ipHeaderRefs.current, { scaleX: 0, stagger: 0.2 });`
    *   **Animation Step 2: Routing.** Animate the newly created packets moving along the path, pausing briefly at each router icon before continuing. Use GSAP's MotionPathPlugin for a smooth curve or simple `x` and `y` tweens for linear hops.
    *   **Why**: This two-part animation clearly distinguishes between adding the IP address (encapsulation) and using it to send the packet across a network (routing).

62. **Implement Navigation**
    *   Add a "Next: Data Link Layer" button that calls `setCurrentStep('L2')`.

63. **Commit L3 Scene**
    *   `git add . && git commit -m "feat: build L3 Network scene with IP routing animation"`

### Acceptance Criteria
- [ ] **Component Renders**: `L3_Network.jsx` is created and renders correctly.
- [ ] **IP Headers Displayed**: Each packet visually includes a header containing the correct source and destination IP addresses from the data model.
- [ ] **Encapsulation Animated**: An animation clearly shows the IP header being added to each segment to form a packet.
- [ ] **Routing Animation**: The packets are animated moving from the source, hopping between router icons, and arriving at the destination.
- [ ] **Navigation Works**: The "Next" button correctly transitions the state to the `L2` scene.

---

## Phase 11 — Layer 2 (Data Link) Scene

64. **Create L2 Scene Component**
    *   Create `src/scenes/L2_DataLink.jsx`.
    *   Fetch L2 data: `const layerData = layers.find(l => l.id === 2);`.
    *   The layout should show the packets arriving from L3, ready to be framed.

65. **Visualize Ethernet Framing**
    *   For each packet, show a "Frame Header" being added. This header must display the Source MAC (`layerData.mac.src`) and Destination MAC (`layerData.mac.dst`).
    *   The combination of the packet and the frame header is now an "Ethernet Frame".
    *   Add a visual representation of a Network Interface Card (NIC) on the source computer.

66. **Animate Framing and Handoff to NIC**
    *   In a `useEffect`, create a GSAP timeline.
    *   **Animation Step 1: Framing.** Animate the frame header appearing and wrapping each packet. `tl.from(frameHeaderRefs.current, { opacity: 0, scaleX: 0, stagger: 0.2 });`
    *   **Animation Step 2: Handoff.** Animate the completed frames moving into the NIC element. As they arrive, make the NIC glow or pulse to signify it's processing them for physical transmission. `tl.to(frameRefs.current, { x: '+=100', opacity: 0, stagger: 0.2 }).to(nicRef.current, { boxShadow: '0 0 10px #00ff7f', repeat: 1, yoyo: true }, '-=0.5');`
    *   **Why**: This visualizes the final data packaging step before physical transmission—framing for the local network segment and handing off to the hardware.

67. **Implement Navigation**
    *   Add a "Next: Physical Layer" button that calls `setCurrentStep('L1')`.

68. **Commit L2 Scene**
    *   `git add . && git commit -m "feat: build L2 Data Link scene with framing animation"`

### Acceptance Criteria
- [ ] **Component Renders**: `L2_DataLink.jsx` is created and renders correctly.
- [ ] **MAC Addresses Displayed**: Each frame visually includes a header containing the correct source and destination MAC addresses.
- [ ] **Framing Animation**: An animation clearly shows a frame header being added to each packet.
- [ ] **NIC Handoff Animation**: The completed frames are animated moving into a NIC element, which provides a visual feedback pulse or glow.
- [ ] **Navigation Works**: The "Next" button correctly transitions the state to the `L1` scene.

---

## Phase 12 — Layer 1 (Physical) Scene

69. **Create L1 Scene Component**
    *   Create `src/scenes/L1_Physical.jsx`.
    *   The layout should be a wide shot showing both the source and destination computers, connected by the central `Cable` component.
    *   Create a `SignalPulse` component, which is a small, styled `div` that will represent a single bit.

70. **Animate Signal Transmission with MotionPath**
    *   In a `useEffect`, create a GSAP timeline.
    *   Get a reference to the SVG `<path>` element inside the `Cable` component.
    *   Generate an array of `SignalPulse` components and get `ref`s for them.
    *   Use GSAP's `MotionPathPlugin` to animate the pulses along the cable path. This creates a smooth, flowing visual of data transmission.
    *   `tl.to(pulseRefs.current, { motionPath: { path: '#cable-path', align: '#cable-path' }, stagger: 0.1, duration: 3, ease: 'none' });`
    *   **Why**: `MotionPathPlugin` is essential for animating elements along a non-linear SVG path, which is exactly what the cable is. It makes the signal flow look natural and dynamic.

71. **Implement Reverse Journey Trigger**
    *   Get `setCurrentStep` and `setDirection` from the `useUIState` hook.
    *   Add a button like "Signal Arrived: Begin Unpacking".
    *   On click, call `setDirection('reverse')` and `setCurrentStep('L1_RECV')`. This prepares the app to move backward up the OSI stack.

72. **Commit L1 Scene**
    *   `git add . && git commit -m "feat: build L1 Physical scene with signal transmission"`

### Acceptance Criteria
- [ ] **Component Renders**: `L1_Physical.jsx` is created and shows the full scene with both computers.
- [ ] **Signal Animation**: On scene load, a stream of "bit" elements animates from the source computer to the destination computer.
- [ ] **Animation Follows Path**: The animation path correctly follows the SVG cable connecting the two computers.
- [ ] **Reverse Navigation Works**: Clicking the button correctly updates the application state (`direction` to `reverse`, `currentStep` to `L1_RECV`) to start the reverse journey.

---

## Phase 13 — Reverse Journey (L1 → L7 Unpacking)

73. **Create All RX Scene Components**
    *   Create placeholder files for the entire receive journey: `RX_L1_Physical.jsx`, `RX_L2_DataLink.jsx`, `RX_L3_Network.jsx`, `RX_L4_Transport.jsx`, `RX_L5_Session.jsx`, `RX_L6_Presentation.jsx`, and `RX_L7_Application.jsx`.
    *   Wire them up in `SceneRouter.jsx` with keys like `L1_RECV`, `L2_RECV`, etc.

74. **Implement RX L1 & L2: Signal to Frame**
    *   **`RX_L1_Physical`**: Show the signal pulses arriving at the destination computer's NIC. The NIC should glow. The "Next" button should lead to `L2_RECV`.
    *   **`RX_L2_DataLink`**: Animate the Ethernet frames emerging from the NIC. Then, animate the Frame Header flying off, leaving just the IP Packet. This is the reverse of the L2 framing animation. The "Next" button leads to `L3_RECV`.

75. **Implement RX L3 & L4: Packet to Segment to Data**
    *   **`RX_L3_Network`**: Animate the IP Header flying off the packets, leaving the TCP Segments. The destination IP on the header should match the receiver's IP. "Next" leads to `L4_RECV`.
    *   **`RX_L4_Transport`**: Animate the individual segments merging back into a single, large "Encrypted Data" block. This is the reverse of the segmentation animation. "Next" leads to `L5_RECV`.

76. **Implement RX L5, L6 & L7: Decrypt and Deliver**
    *   **`RX_L5_Session`**: Briefly show a "Session Confirmed" or checkmark animation. "Next" leads to `L6_RECV`.
    *   **`RX_L6_Presentation`**: Animate the lock icon unlocking and the hex data unscrambling back into plain text. This is the reverse of the encryption animation. "Next" leads to `L7_RECV`.
    *   **`RX_L7_Application`**: Show the plain text message appearing in the destination user's chat application window. The character sprite could change to a "smile" state. "Next" leads to `DELIVERED`.

77. **Commit Reverse Journey**
    *   `git add . && git commit -m "feat: build all reverse journey (RX) scenes"`

### Acceptance Criteria
- [ ] **All RX Components Created**: All 7 `RX_*.jsx` scene files are created and routed correctly.
- [ ] **RX L2 Un-framing**: The L2 scene correctly animates the removal of the MAC header.
- [ ] **RX L3 De-capsulation**: The L3 scene correctly animates the removal of the IP header.
- [ ] **RX L4 Reassembly**: The L4 scene correctly animates the segments merging into a single data block.
- [ ] **RX L6 Decryption**: The L6 scene correctly animates the "unlocking" and decoding of the data back to plain text.
- [ ] **RX L7 Delivery**: The L7 scene shows the final message in the receiver's UI.
- [ ] **Seamless Flow**: Navigating from `L1_RECV` to `L7_RECV` provides a continuous and logical story of data being unpacked at each layer.

---

## Phase 14 — Finale & Summary

78. **Create Delivered Scene**
    *   Create `src/scenes/Delivered.jsx`.
    *   This scene confirms the message was successfully received. It should show the final message in the receiver's chat window and the receiver's `CharacterSprite` in a `state='smile'` pose.
    *   Add a "View Summary" button that calls `setCurrentStep('SUMMARY')`.

79. **Create Summary Scene**
    *   Create `src/scenes/Summary.jsx`.
    *   Design a layout that maps over the `layers` array from the UI state.
    *   For each layer, render a `div` or `LayerSummaryCard` component that displays the layer's `Icon`, `name`, and `shortDesc`. Arrange these in a vertical list.

80. **Animate the Summary List**
    *   In a `useEffect`, use `makeTl()` to create a GSAP timeline.
    *   Animate the summary cards appearing one by one using a stagger effect.
    *   `tl.from(summaryCardRefs.current, { opacity: 0, x: -100, stagger: 0.1, ease: 'power2.out' });`
    *   **Why**: This provides a final, polished "reveal" of the entire OSI stack, reinforcing the journey the user just completed.

81. **Implement Replay Functionality**
    *   Add a "Replay Story" button to the `Summary` scene.
    *   The `onClick` handler must reset the application to its initial state by calling `setCurrentStep('IDLE')` and `setDirection('forward')`.

82. **Commit Finale Scenes**
    *   `git add . && git commit -m "feat: build Delivered and Summary scenes"`

### Acceptance Criteria
- [ ] **Delivered Scene Renders**: `Delivered.jsx` correctly displays the final message and the smiling character sprite.
- [ ] **Summary Scene Renders**: `Summary.jsx` correctly maps over the layer data and displays a list of all 7 layers with their icons and descriptions.
- [ ] **Summary Animation**: On scene load, the list of OSI layers animates into view sequentially.
- [ ] **Replay Functionality**: Clicking the "Replay Story" button correctly resets the application state, causing the `SceneRouter` to render the `IdleScene`.
- [ ] **Navigation Works**: The "View Summary" button correctly transitions from the `Delivered` scene to the `Summary` scene.

---

## Phase 15 — Global UI & UX Polish

83. **Create a Global HUD Component**
    *   Create `src/components/HUD.jsx` (Heads-Up Display).
    *   This component will be rendered in `App.jsx` outside the main `SceneCanvas` to ensure it's always visible.
    *   It will contain navigation buttons (Back, Next, Reset) and the progress indicator.

84. **Implement Data-Driven Navigation Logic**
    *   In `src/lib/state.jsx`, define the complete story sequence in an array: `const STORY_SEQUENCE = ['IDLE', 'L7', 'L6', ..., 'L1', 'L1_RECV', ..., 'DELIVERED', 'SUMMARY'];`.
    *   Create `handleNext` and `handleBack` functions. These will find the index of the `currentStep` in `STORY_SEQUENCE` and use `setCurrentStep` to advance to `index + 1` or `index - 1`.
    *   The "Reset" button will simply call `setCurrentStep('IDLE')`.
    *   Pass these handlers down through the context provider.
    *   **Why**: This centralizes navigation logic, making it robust and easy to modify, rather than having each scene manage its own "Next" step.

85. **Add a Progress Indicator**
    *   Inside the `HUD.jsx`, create a `ProgressIndicator` component.
    *   It should map over the `LAYERS` data and display a small circle or square for each layer.
    *   The indicator for the `currentLayer` should be highlighted (e.g., different color or size).

86. **Implement Keyboard Navigation**
    *   In `App.jsx`, use a `useEffect` to add a global `keydown` event listener to the `window`.
    *   The event handler will listen for `ArrowRight` (to call `handleNext`), `ArrowLeft` (to call `handleBack`), and `r` (to call `handleReset`).
    *   Remember to return a cleanup function from `useEffect` to remove the listener on unmount.

87. **Add Tooltips for Technical Data**
    *   In scenes like `L4_Transport`, `L3_Network`, and `L2_DataLink`, wrap the port/IP/MAC address elements in a `div` with a `title` attribute to provide simple, native browser tooltips.
    *   Example: `<div title="Source Port: Ephemeral">49522</div>`.
    *   For more advanced styling, a library like `react-tooltip` could be installed and used.

88. **Commit UX Polish**
    *   `git add . && git commit -m "feat: add global HUD, keyboard nav, and tooltips"`

### Acceptance Criteria
- [ ] **HUD Component Created**: A `HUD.jsx` component is rendered globally in `App.jsx`.
- [ ] **Data-Driven Navigation**: Navigation is handled by centralized `handleNext`/`handleBack` functions that use a sequence array.
- [ ] **Functional Controls**: The "Next," "Back," and "Reset" buttons in the HUD correctly control the flow of the story.
- [ ] **Keyboard Shortcuts**: The `ArrowRight`, `ArrowLeft`, and `r` keys successfully trigger the corresponding navigation actions.
- [ ] **Progress Indicator Works**: A visual indicator in the HUD accurately highlights the current OSI layer being viewed.
- [ ] **Tooltips Implemented**: Hovering over IP addresses, MAC addresses, or port numbers in their respective scenes displays a helpful tooltip.

---

## Phase 16 — Final Polish & Accuracy

89. **Review All Descriptive Text**
    *   Read through every `desc` and `techNotes` field in `src/data/layers.js`.
    *   Check for technical accuracy, clarity, and typos. Ensure the descriptions are easy for a non-expert to understand.
    *   **Why**: The primary goal is education. The text must be correct and concise to be effective.

90. **Validate Protocol Sample Data**
    *   Double-check the `sample` data in `src/data/layers.js`.
    *   **IPs**: Ensure they are from RFC 5737 TEST-NET blocks (e.g., `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24`).
    *   **Ports**: Ensure the source port is in the ephemeral range (49152–65535) and the destination is a common port (e.g., 443 for HTTPS).
    *   **MACs**: Ensure they follow the correct 6-octet hexadecimal format.
    *   **Why**: Using standardized, plausible data adds a layer of professionalism and technical credibility to the project.

91. **(Optional) Implement Error Simulation**
    *   Add a new boolean state to `state.jsx`: `isErrorSimulated`. Add a toggle for it in the `HUD`.
    *   In `L4_Transport.jsx`, modify the segmentation animation. If `isErrorSimulated` is true, the GSAP timeline should randomly pick one segment, animate it "dropping" (e.g., `opacity: 0, y: '+=50'`), and then, after a delay, animate a "retransmitted" copy of that segment appearing and rejoining the flow.
    *   **Why**: This powerfully demonstrates one of TCP's core features—reliability and error correction.

92. **Commit Final Polish**
    *   `git add . && git commit -m "chore: review text and validate technical data"`

### Acceptance Criteria
- [ ] **Text is Accurate and Clear**: All descriptive text throughout the application has been proofread and is free of errors.
- [ ] **Protocol Data is Plausible**: All IP addresses, ports, and MAC addresses use realistic, standards-compliant examples.
- [ ] **(Optional) Error Simulation Works**: If implemented, toggling the error simulation causes a visible packet drop and retransmission animation in the Layer 4 scene.

---

## Phase 17 — Packaging & Deployment

93. **Enhance the README.md**
    *   Open `README.md` and add the following sections:
        *   **Live Demo Link**: A placeholder for the final URL.
        *   **Screenshot/GIF**: A high-quality animated GIF showcasing the full animation cycle.
        *   **Tech Stack**: A list of key technologies used (React, Vite, GSAP, Framer Motion, Tailwind CSS).
        *   **Local Development**: Clear, step-by-step instructions (`git clone`, `npm install`, `npm run dev`).
        *   **Credits**: Acknowledge any assets, fonts, or inspiration.
    *   **Why**: A good README is the front door to your project. It should make it easy for others to understand, run, and appreciate your work.

94. **Prepare for Production Build**
    *   Run the build command: `npm run build`.
    *   Verify that it completes without errors and that a `dist` directory is created with the optimized production assets.
    *   **Why**: This catches any production-only issues before deployment.

95. **Deploy to a Hosting Service (Vercel/Netlify)**
    *   Create a new public repository on GitHub and push your code.
    *   Sign up for Vercel or Netlify and connect your GitHub account.
    *   Import the new repository.
    *   Configure the project settings:
        *   **Build Command**: `npm run build`
        *   **Output Directory**: `dist`
        *   **Install Command**: `npm install`
    *   Deploy the site. Once live, update the README with the final URL.
    *   **Why**: Vercel and Netlify offer a seamless, automated deployment pipeline for modern frontend apps, including continuous deployment on every push to `main`.

96. **Tag the Release**
    *   Once the site is live and verified, create a Git tag to mark this version.
    *   `git tag v1.0.0`
    *   `git push --tags`
    *   **Why**: Tagging creates a permanent reference point for a specific version of your project, making it easy to track releases and changes over time.

### Acceptance Criteria
- [ ] **README is Comprehensive**: The `README.md` file is fully updated with a description, GIF, tech stack, and local setup instructions.
- [ ] **Successful Production Build**: The `npm run build` command executes without errors.
- [ ] **Application is Deployed**: The project is live on a public URL provided by Vercel, Netlify, or a similar service.
- [ ] **Live URL in README**: The README's demo link points to the deployed application.
- [ ] **v1.0.0 Tag Pushed**: A `v1.0.0` tag exists in the GitHub repository.one-liner description.

---

## Phase 18 — Stretch Goals (Optional)

*These are ideas for future enhancements after the core application is complete.*

97. **Add More Protocols**
    *   **Concept**: Allow the user to select different application-layer protocols (e.g., SMTP, DNS) to see how the data and some layer behaviors change.
    *   **Implementation**:
        *   Add a protocol selector (e.g., a dropdown) in the `HUD`.
        *   Create different `sample` data objects in `layers.js` for each protocol.
        *   The `L7_Application` scene would need to render a different UI (e.g., an email client for SMTP).
        *   The destination port in the L4 data would change (e.g., 25 for SMTP, 53 for DNS).

98. **Implement a Theme Switcher**
    *   **Concept**: Allow users to toggle between the default "Terminal Night" theme and a "Pastel Day" theme.
    *   **Implementation**:
        *   Add a theme state (`'dark' | 'light'`) to `state.jsx`.
        *   In `tailwind.config.js`, use CSS variables for colors.
        *   In `index.css`, define two root selectors (`:root` and `:root.light`) with different color variable values.
        *   When the theme state changes, toggle the `.light` class on the `<html>` or `<body>` element.

99. **Improve Mobile Responsiveness**
    *   **Concept**: Ensure the application is usable and looks good on smaller screens.
    *   **Implementation**:
        *   Use Tailwind's responsive prefixes (e.g., `md:`, `lg:`) to adjust layouts, font sizes, and element visibility.
        *   The main `SceneCanvas` might need to scale down, or the layout could switch to a single-column format on mobile.

100. **Performance Optimization Pass**
     *   **Concept**: Ensure animations are smooth and the app is snappy, even with complex scenes.
     *   **Implementation**:
         *   Wrap components that don't need to re-render often in `React.memo`.
         *   Use the React DevTools Profiler to identify and fix performance bottlenecks.
         *   For GSAP, ensure timelines are properly killed on component unmount to prevent memory leaks (`return () => tl.kill();` in `useEffect`).

### Acceptance Criteria
- [ ] **Features Implemented**: Any chosen stretch goals are functional, well-integrated, and meet the same quality standards as the core application.nore**

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
