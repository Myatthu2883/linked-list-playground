# Linked List Playground
### Portfolio Project — Day 02

An interactive web app to visualize and manipulate a **Singly Linked List** in real time, built with **Next.js 15 (App Router)** and **React 18**.

---

## Features

- **Insert** — Prepend (head), Append (tail), Insert at index
- **Remove** — Remove head, tail, or by index
- **Search** — Find by value with O(n) traversal highlight
- **Reverse** — Reverse the entire list in place (Floyd's technique)
- **Presets** — Load sample lists instantly (chains, fibonacci, descending)
- **Operation Log** — Timestamped log of every operation
- **Complexity chips** — Live Big-O reference per operation
- Dark monospace theme with smooth node animations

---

## Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Framework  | Next.js 15 App Router   |
| UI         | React 18 (hooks only)   |
| Styling    | CSS Modules             |
| DS Logic   | Vanilla JS class (OOP)  |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/
│   ├── layout.jsx         # Root layout & JetBrains Mono font
│   ├── page.jsx           # Home page
│   └── globals.css        # Dark theme CSS variables
├── components/
│   ├── LinkedListPlayground.jsx        # Main interactive component
│   └── LinkedListPlayground.module.css # Scoped styles + animations
└── lib/
    └── LinkedList.js      # Full OOP LinkedList with all operations
```

---

## Operations & Complexity

| Operation    | Time   | Space | Notes                        |
|--------------|--------|-------|------------------------------|
| Prepend      | O(1)   | O(1)  | Insert before head           |
| Append       | O(n)   | O(1)  | Traverse to tail             |
| Insert at i  | O(n)   | O(1)  | Traverse to index i-1        |
| Remove head  | O(1)   | O(1)  | Repoint head                 |
| Remove tail  | O(n)   | O(1)  | Traverse to second-to-last   |
| Remove at i  | O(n)   | O(1)  | Traverse to index i-1        |
| Search       | O(n)   | O(1)  | Linear scan                  |
| Reverse      | O(n)   | O(1)  | In-place pointer swap        |
| Overall space| —      | O(n)  | n nodes allocated            |

---

## Key Concepts Demonstrated

- **Object-Oriented Design** — `ListNode` and `LinkedList` classes with encapsulated methods
- **Pointer manipulation** — `next` references for linking/unlinking nodes
- **React state immutability** — list is cloned before each mutation to trigger re-renders
- **CSS Modules** — scoped styles with keyframe animations (`popIn`, `pulse`)
- **Big-O analysis** — complexity documented per operation and shown in the UI
- **Floyd's cycle detection** — included as a bonus utility method

---

*Part of a 30-day CS Portfolio Project series.*
