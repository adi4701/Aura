<div align="center">

<img width="80" height="80" src="https://github.com/adi4701/Aura/blob/main/public/logo.svg" alt="Aura Logo" />

# Aura

### Social Wellness & Music Companion

*Find your perfect frequency.*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## Overview

**Aura** is a social wellness web application that combines AI-powered mood analysis, music recommendations, guided breathing, and community connection — all in one beautifully designed space.

Tell Aura how you're feeling. It listens, recommends music matched to your emotional frequency, helps you breathe through the hard moments, and connects you with a live community of people on the same journey.

---

## Features

### 🤖 Aura Chat (AI Companion)
Powered by **Google Gemini AI**, the chatbot analyzes your emotional state with empathy and responds with:
- Personalized music recommendations (embedded YouTube player)
- Contextual wellness tips
- Supportive, emotionally intelligent conversation

### 📊 My Dashboard (Mood Journal)
A private space to track your emotional well-being over time:
- Log mood entries with a score (1–10) and journal text
- Interactive mood trend chart (Recharts line graph)
- Daily rotating affirmations for positive reinforcement
- Persisted securely to Firestore per user

### 🌬️ Breathe
An interactive **4-7-8 breathing exercise** to reduce anxiety and promote calm:
- Animated visual guide through each phase (Inhale → Hold → Exhale)
- Real-time countdown timer
- Simple one-tap start/stop control

### 🫂 Community Feed
Anonymous social connection:
- Share your current mood and the song you're listening to
- See what others in the community are vibing with in real time
- Live user counter showing active users

### 💙 Mental Health Resources
Quick access to critical crisis support lines:
- National Suicide Prevention Lifeline (988)
- Crisis Text Line (Text HOME to 741741)
- The Trevor Project (LGBTQ+ youth)
- NAMI HelpLine

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS v4 |
| Animation | Motion (Framer Motion) |
| AI | Google Gemini (`@google/genai`) |
| Backend / Auth | Firebase (Firestore + Google Auth) |
| Charts | Recharts |
| Icons | Lucide React |
| Markdown | React Markdown |

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or later recommended)
- A **Firebase** project with Firestore and Google Authentication enabled
- A **Gemini API key** from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adi4701/Aura.git
   cd Aura
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Configure Firebase**

   Update `firebase.ts` with your Firebase project credentials (API key, project ID, etc.).

5. **Deploy Firestore security rules**
   ```bash
   firebase deploy --only firestore:rules
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
Aura/
├── app/
│   ├── page.tsx          # Root page — routing & layout logic
│   ├── layout.tsx        # HTML shell, fonts, metadata
│   └── globals.css       # Global styles
├── components/
│   ├── Chatbot.tsx        # AI chat interface (Gemini)
│   ├── Dashboard.tsx      # Mood journal & trend chart
│   ├── Breathe.tsx        # 4-7-8 breathing exercise
│   ├── CommunityFeed.tsx  # Anonymous community mood feed
│   ├── LandingPage.tsx    # Unauthenticated landing page
│   ├── Resources.tsx      # Mental health crisis resources
│   ├── Settings.tsx       # User profile settings
│   ├── LiveCounter.tsx    # Real-time active users counter
│   ├── FirebaseProvider.tsx # Auth context & Firebase state
│   └── ErrorBoundary.tsx  # Global error boundary
├── hooks/
│   └── use-mobile.ts      # Responsive breakpoint hook
├── lib/
│   ├── firebase-utils.ts  # Firestore helpers & error handling
│   └── utils.ts           # General utility functions
├── firebase.ts            # Firebase SDK initialization
├── firestore.rules        # Firestore security rules
└── public/
    └── logo.svg           # Aura logo
```

---

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run clean    # Clean Next.js build cache
```

---

## Firestore Data Model

| Collection | Fields |
|---|---|
| `journals` | `userId`, `mood`, `moodScore` (1–10), `entry`, `createdAt` |
| `communityMoods` | `mood`, `song`, `artist`, `createdAt` |
| `presence` | `lastActive` |

Security rules enforce authentication, ownership validation, and field constraints (e.g., mood max 50 chars, entries max 2000 chars).

---

## Deployment

Aura is designed for **Firebase Hosting** but works on any platform that supports Next.js.

```bash
npm run build
firebase deploy
```

Or deploy to Vercel with a single command:

```bash
vercel --prod
```

---

## License

This project is open source. See [LICENSE](LICENSE) for details.

---

<div align="center">
  Built with ♥ to help people find their frequency.
</div>
