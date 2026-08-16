# Sarma HK — Digital Archive

![Portfolio Preview](./public/images/hero/K.Habikugasarma.jpeg)

A premium, interactive digital portfolio built for speed, aesthetics, and professional storytelling. Designed in the style of an engineering notebook, this archive tracks software engineering, embedded systems exploration, cloud infrastructure, and technical leadership.

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Animations:** Framer Motion
- **Hosting:** Vercel

## 🚀 Quick Start

First, install dependencies and run the development server locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Architecture

- **`src/app/`** - Core Next.js routing and global layout
- **`src/components/`** - Modular UI blocks separated by `sections/`, `ui/`, and `motion/`
- **`src/data/`** - Data-driven architecture containing fully typed datasets (`projects.ts`, `hackathons.ts`, `now.ts`) for easy content updates.

## ✨ Highlights

- **The Scoreboard:** Dynamic tracking of hackathons and competitive achievements.
- **Now:** A live technical journal mapping current learning tracks (Embedded Systems, AWS, CCNA).
- **Data-Driven:** All core data objects (Projects, Experience, Skills) are strictly typed and centralized, creating a CMS-like developer experience.

## ⚙️ Deployment

This project is optimized for direct Vercel deployment without additional configuration.

```bash
npm run build
npm run start
```
