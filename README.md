# Epithera - Skin Health Prototype

A full UI clickable prototype for the Epithera skin health tracking application.

## Features

### Original Flow (Preserved)
- **Login / Sign up** — Welcome back screen with Google & email auth
- **Home** — Daily greeting, progress, Log Habits, Skin Journal, skin check-in prompt
- **Daily Check-in** — 3-step flow: Habits → Food → Health (full view)
- **Habits** — Evening Skincare, Movement, Hygiene with swipe actions
- **Food Log** — Search & log food items
- **Health Check-in** — Skin feel, oiliness, gut health, breakouts, progress photo

### New Features Added

1. **Onboarding Questionnaire** (after first signup)
   - Do you drink alcohol? (Yes/No)
   - Do you smoke? (Yes/No)
   - Diet: Vegetarian / Non-Vegetarian / Vegan
   - Water habits: 1-3L / >3L / >5L daily

2. **Dermatologist Section** (Health tab)
   - Nearby dermatologists list with search
   - Online consultation option
   - Book appointments

3. **Fitness Device Connection** (Settings)
   - Apple Watch, Fitbit, Garmin, Google Fit
   - Connect for sleep & health tracking

4. **Personalized AI Insights**
   - Skin tip of the day on Home
   - Dedicated Insights screen with tips based on previous logs
   - Accessible via "View personalized insights" on Home

5. **Outdoor Sports** (under Movement)
   - Ball Sports: Cricket, Basketball, Football, Tennis
   - Water Sports: Swimming, Surfing, Kayaking, Water Polo

## How to Run

1. Open `index.html` in a web browser (Chrome, Safari, Firefox)
2. Or run a local server: `npx serve .` or `python -m http.server 8000`

## Demo Flow

1. **Sign up** → Questionnaire (4 questions) → Home
2. **Start Daily Check-in** → Habits (with Outdoor Sports) → Food → Health → Complete
3. **Health tab** → Dermatologist search & book
4. **Settings** → Connect fitness devices
5. **Home** → "View personalized insights" → AI tips

## Design

- Warm palette: beige, off-white, orange accents
- Mobile-first (375–430px width)
- Matches original Epithera screenshots
