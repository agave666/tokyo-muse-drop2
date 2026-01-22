# Tokyo Muse Drop (TMD) - Match-3 Puzzle Game with Photo Rewards

A mobile-first match-3 puzzle game where clearing levels unlocks exclusive photo content shot in Tokyo with progressive reveal stages.

## 🎮 Features

- **Match-3 Puzzle Game**: Classic 8x8 grid gameplay with smooth animations
- **Progressive Photo Reveal**: Each photo unlocks in 3 stages (heavy blur → light blur → clear)
- **Daily Featured Model**: Rotates automatically among 5 models
- **Bilingual Support**: English and Japanese with auto-detection
- **Mobile-First Design**: Responsive, touch-friendly interface
- **Local Storage**: All progress saved in browser (no backend needed)
- **Monetization Placeholders**: Ready for future Orynth integration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
cd tokyo-muse-drop
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

The app is configured for static export and can be deployed to Vercel or any static hosting.

## 📁 Project Structure

```
tokyo-muse-drop/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Home page
│   ├── play/                # Level select & puzzle game
│   ├── album/               # Photo album viewer
│   ├── models/              # Model profiles
│   └── settings/            # Settings & language
├── components/              # React components
│   ├── LanguageProvider.tsx
│   ├── HomePage.tsx
│   ├── PlayPage.tsx
│   ├── PuzzleGame.tsx
│   ├── AlbumPage.tsx
│   ├── ModelsPage.tsx
│   └── SettingsPage.tsx
├── lib/                     # Core logic
│   ├── i18n.ts             # Translation helper
│   ├── storage.ts          # localStorage manager
│   ├── daily.ts            # Daily rotation logic
│   ├── game-engine.ts      # Match-3 game logic
│   └── payment.ts          # Payment service interface
├── data/                    # Configuration & content
│   ├── models.ts           # Model metadata
│   ├── en.json             # English translations
│   └── ja.json             # Japanese translations
└── public/
    └── photos/             # Photo assets (place JPGs here)
```

## 📸 Adding Photos

1. Place JPG files in `public/photos/` following this naming convention:
   - `model1_1.jpg`, `model1_2.jpg`, `model1_3.jpg`
   - `model2_1.jpg`, `model2_2.jpg`, `model2_3.jpg`
   - etc. (5 models × 3 photos = 15 total)

2. Photos should be:
   - High quality JPG format
   - Portrait orientation (3:4 ratio recommended)
   - Optimized for web (< 500KB each)

3. Update `data/models.ts` if you want to change:
   - Model names
   - Photo captions/shoot notes
   - External links (Instagram, TikTok, fan sites)

## 🎨 Customization

### Colors & Branding

Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  charcoal: '#1a1a1a',  // Background
  cream: '#faf8f5',     // Text
  gold: '#d4af37',      // Accent
  rose: '#ff6b9d',      // Secondary accent
}
```

### Fonts

The app uses:
- **Display**: Playfair Display (titles)
- **Body**: Inter (UI text)

Change fonts in `app/layout.tsx`.

### Game Difficulty

Adjust level parameters in `components/PuzzleGame.tsx`:

```typescript
const LEVELS = [
  { id: 1, targetScore: 500, moves: 25 },
  { id: 2, targetScore: 700, moves: 22 },
  // Add more levels or adjust difficulty
];
```

## 🌐 Translations

Add or modify translations in:
- `data/en.json` - English
- `data/ja.json` - Japanese

The translation system uses dot notation:
```typescript
t('app.title')           // "PHOTOVERSE"
t('puzzle.moves')        // "Moves"
t('album.stage', { current: 2, total: 3 })  // "Stage 2 of 3"
```

## 💾 Data Structure

### LocalStorage Keys

- `tmd_lang` - Selected language ('en' or 'ja')
- `tmd_progress` - Photo unlock progress
- `tmd_daily` - Daily featured model & play count

### Progress Format

```json
{
  "model1": {
    "photos": {
      "photo1": 3,  // Stage 0-3 (0=locked, 3=fully revealed)
      "photo2": 2,
      "photo3": 0
    },
    "totalReveals": 5
  }
}
```

## 🔌 Future Integration: Orynth

The payment system is modular and ready for integration:

1. Replace `lib/payment.ts` with Orynth SDK
2. Implement wallet connection UI
3. Add NFT minting for fully revealed photos
4. Enable SOL payments for boosters

Interface is defined in `PaymentService`:
```typescript
interface PaymentService {
  purchaseExtraMoves(): Promise<boolean>;
  purchaseExtraPlays(): Promise<boolean>;
  isAvailable(): boolean;
}
```

## 🎯 Game Logic

### Match-3 Rules

1. Swap adjacent tiles
2. Match 3+ of same color
3. Matched tiles clear and drop
4. Chain reactions score bonus points
5. Reach target score within move limit

### Reward System

- Win level → +1 reveal token for today's featured model
- Tokens unlock photos progressively:
  - Photo 1: Stage 0→1→2→3
  - Photo 2: Stage 0→1→2→3
  - Photo 3: Stage 0→1→2→3
- Stage 3 = Full reveal + external links unlocked

### Daily Rotation

Featured model changes daily using deterministic hash:
```typescript
const hash = hashString(todayDate);  // YYYY-MM-DD
const modelIndex = hash % 5;  // Cycles through 5 models
```

## 🧪 Testing

### Reset Progress

Use the "Reset Progress" button in Settings to clear all data and test from scratch.

### Test Different Dates

Modify `lib/daily.ts` temporarily to test daily rotation:
```typescript
export function getTodayString(): string {
  return '2026-01-21';  // Override for testing
}
```

### Verify Blur Stages

Check photo reveal progression:
1. Play and win a level
2. Go to Album
3. Click on today's featured model photos
4. Verify blur stages: locked → blur(24px) → blur(10px) → clear

## 📱 Mobile Optimization

- Touch-friendly 44×44px minimum tap targets
- Smooth animations with CSS transitions
- Responsive grid that adapts to screen size
- No external dependencies for lightness
- Optimized images with Next/Image

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy (auto-detected Next.js config)

### Other Static Hosts

```bash
npm run build
```

Upload the `out/` directory to:
- Netlify
- GitHub Pages
- Cloudflare Pages
- Any static host

## ⚠️ Content Policy

This prototype includes:
- No nudity
- No swimwear
- 18+ models only
- Licensed content

Update `data/models.ts` and translations if policy changes.

## 📄 License

Prototype for internal testing. All rights reserved.

## 🤝 Contributing

This is a prototype. For production:
1. Add proper error handling
2. Implement analytics
3. Add unit tests
4. Optimize bundle size
5. Add accessibility features (ARIA labels, keyboard nav)
6. Implement backend for cross-device sync

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Verify photos are in correct location
3. Clear localStorage and refresh
4. Check browser compatibility (modern browsers only)

---

Built with Next.js 14, TypeScript, and Tailwind CSS
