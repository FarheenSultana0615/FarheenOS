<div align="center">

<img src="public/wallpaper.jpg" alt="FarheenOS Banner" width="100%" style="border-radius: 12px"/>

# FarheenOS

### An operating system. In your browser. As a portfolio.

[![Live Demo](https://img.shields.io/badge/LIVE%20DEMO-farheenos.vercel.app-00ffff?style=for-the-badge&logo=vercel&logoColor=black)](https://farheenos.vercel.app)
[![Built With](https://img.shields.io/badge/Built%20With-React%20%2B%20TypeScript-ff3399?style=for-the-badge&logo=react&logoColor=white)](https://farheenos.vercel.app)
[![Three.js](https://img.shields.io/badge/3D-Three.js-00ff9d?style=for-the-badge&logo=three.js&logoColor=black)](https://farheenos.vercel.app)

</div>

---

## ✦ What is FarheenOS?

Most developer portfolios look the same.  
White background. Project cards. Contact form. Scroll down. Done.

**FarheenOS is not that.**

FarheenOS is a fully interactive, OS-themed portfolio experience — built from scratch to challenge what a portfolio can be. When you open it, you're not reading about a developer. You're inside how one thinks.

**[→ Experience it live](https://farheenos.vercel.app)**

---

## ✦ Why an Operating System?

An operating system is the purest expression of system design.

- **Process management** — what runs, when, and why
- **Memory allocation** — what gets resources and what doesn't  
- **Window management** — boundaries, hierarchy, and ownership
- **Resource scheduling** — priority, concurrency, conflict resolution

These aren't just OS concepts. They're the mental models behind every well-architected piece of software ever built.

FarheenOS is an argument — made in code — for how I think about systems.

---

## ✦ Features

### 🖥️ Desktop Environment
A fully functional OS desktop experience with draggable, resizable windows — each behaving as an independent process with its own state, focus management, and lifecycle.

### 🏛️ 3D Interactive Museum
A Three.js powered 3D museum where career milestones, projects, and achievements exist as floating geometric exhibits — color-coded by category, orbitable, zoomable, and explorable. Built with `@react-three/fiber` and `@react-three/drei`.

### 🎨 Dynamic Wallpaper System
A wallpaper engine that changes the desktop environment's visual identity — because even an OS deserves personality.

### 🖥️ Hidden Terminal Easter Egg
Somewhere inside FarheenOS is a working terminal. Find it. You'll know when you do. 👀

### ⚡ Framer Motion Transitions
Every window open, close, minimize, and maximize is choreographed with physics-based animations — nothing snaps, everything flows.

### 📱 Fully Responsive
Adapts intelligently from desktop to mobile — the 3D camera, UI density, and interaction model all shift to match the device.

---

## ✦ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| 3D Engine | Three.js + React Three Fiber + Drei |
| State Management | Zustand |
| Animations | Framer Motion |
| Styling | Tailwind CSS + shadcn/ui |
| Routing | React Router DOM |
| Build Tool | Vite |
| Deployment | Vercel |

---

## ✦ Architecture Highlights
```
FarheenOS/
├── src/
│   ├── components/
│   │   ├── Desktop/          # OS window manager & desktop layer
│   │   ├── Museum/           # Three.js 3D exhibit system
│   │   ├── Terminal/         # Hidden easter egg 👀
│   │   └── ui/               # shadcn component library
│   ├── data/
│   │   └── MileStone.ts      # Career & project exhibit data
│   ├── hooks/                # Custom React hooks
│   ├── store/                # Zustand global state
│   └── pages/                # Route-level components
```

**Key design decisions:**
- **Window management** modeled after real OS process trees — each window has an id, z-index stack, focus state, and independent lifecycle
- **3D scene** uses instanced rendering patterns for performance — geometry reused across exhibits
- **State architecture** separates UI state (Zustand) from server state (React Query) deliberately
- **Animation system** uses Framer Motion's layout animations — no manual position calculations

---

## ✦ Performance

| Metric | Result |
|---|---|
| Build size | 1.38 MB (397 KB gzipped) |
| Modules transformed | 2,605 |
| Build time | ~18s |
| 3D render target | 60fps desktop / 30fps mobile |
| DPR | Adaptive [1, 1.8] |

---

## ✦ About the Builder

**Farheen Sultana** — Software Engineer & Data Modeler  
Currently building production software at Hiffai Tech Solutions while completing a BCA at Osmania University (CGPA 8.5/10).

FarheenOS was built while *actively learning* Three.js — not after mastering it. Every unfamiliar library in this stack was new when the first commit was made. That's not a disclaimer. That's the point.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Farheen%20Sultana-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/farheen-sultana-54723a254)
[![GitHub](https://img.shields.io/badge/GitHub-FarheenSultana0615-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/FarheenSultana0615)
[![Email](https://img.shields.io/badge/Email-farheensultana0615@gmail.com-ff3399?style=for-the-badge&logo=gmail&logoColor=white)](mailto:farheensultana0615@gmail.com)

---

<div align="center">

**"An OS isn't just software. It's a philosophy of how things should work together."**

[farheenos.vercel.app](https://farheenos.vercel.app) · Built with passion and way too many Three.js docs

</div>
