# Iron Clad 7‑Day Plan 🚀

A complete, interactive 7‑day muscle‑building nutrition and workout plan built with React, TypeScript, Tailwind CSS, MUI, and Headless UI.

---

## 🚀 Project Overview

**Iron Clad 7‑Day Plan** helps you track daily meals, macros, cooking instructions, and workouts, plus grocery shopping with cost estimates.

**Key Features:**

- Interactive checklists for groceries and daily completion
- Nutrition breakdown (protein, carbs, fats, calories, fiber) with tooltips
- Cooking instructions for every meal
- Price estimates per meal and weekly total
- Responsive UI with Tailwind CSS and MUI components
- Tabbed navigation (Headless UI)

---

## 🛠 Installation & Development

1. **Clone the repository**

   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Start development server**

   ```sh
   npm run dev
   ```

4. **Build for production**

   ```sh
   npm run build
   ```

5. **Preview production build**

   ```sh
   npm run preview
   ```

---

## 🔧 Tech Stack

- **Framework:** React + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** MUI (Material UI)
- **Icons:** lucide‑react
- **Tabs & Accessibility:** Headless UI

---

## 🗂️ Project Structure

```
/src
├─ data/
│  └─ plan.ts       # nutrition, meals, pricing, instructions
├─ components/
│  └─ MusclePlan.tsx
├─ main.tsx         # React entry point
├─ App.tsx          # routing & layout
└─ index.html       # updated document head & favicon

/public
├─ favicon.ico
└─ og-image.png     # Open Graph image
```

---

## ⚙️ Configuration

- **index.html**: project title, meta tags, favicon link
- **tailwind.config.js**: include `./src/**/*.{ts,tsx}` in `content`
- **tsconfig.json**: ensure strict TypeScript settings

---

## ✅ Usage

- **Grocery Checklist**: check items to mark as bought; triggers line‑through animation
- **Daily Tabs**: navigate days Mon–Sun, mark day complete
- **Macros**: hover over icons for protein, carbs, etc.
- **Costs**: see per‑meal and weekly cost estimates

---

## 📦 Deployment

Build and deploy anywhere static sites are supported (Netlify, Vercel, etc.):

```sh
npm run build
# deploy contents of /dist
```

---

## 👤 Author & License

Created by **Your Name**.

© 2025 Iron Clad Fitness. All rights reserved.
