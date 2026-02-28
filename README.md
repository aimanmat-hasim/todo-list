# Todo List ✨

A React + TypeScript Todo List app with animated UI effects, glassmorphism styling, and interactive task controls.

---

## Features

- Add tasks by typing and pressing **Enter**
- Delete tasks
- Reorder tasks (**Up / Down**)
- Animated task text rendering (`SplitText`)
- Glass-style task container (`GlassSurface`)
- Animated light-ray background (`LightRays`)
- Interactive glare hover effect on action buttons (`GlareHover`)
- Performance-friendly task rendering with `memo` + stable handlers

---

## Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **GSAP** (text animation)
- **OGL/WebGL** (light rays effect)
- **CSS** (custom UI/effects styling)

---

## Architecture

### Entry
- `src/main.tsx` mounts app
- `src/App.tsx` renders `ToDoList`

### Main Feature
- `src/todolist.tsx`
  - Holds task state and task operations (`add`, `delete`, `move up/down`)
  - Uses React hooks: `useState`, `useRef`, `useEffect`, `useCallback`
  - Uses `memo` for `TaskRow` to reduce unnecessary re-renders

### Reusable Visual Components
- `src/SplitText.tsx` — task text animation
- `src/GlareHover.tsx` + `GlareHover.css` — button glare effect
- `src/GlassSurface.tsx` + `GlassSurface.css` — glass container effect
- `src/LightRays.tsx` + `LightRays.css` — WebGL background rays

### Styling
- `src/index.css` manages global layout, typography, button styles, and responsive behavior

---

## Run Locally

```bash
npm install
npm run dev