'use client';

import { useLanguage } from '@/components/LanguageProvider';
import Link from 'next/link';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-charcoal via-charcoal to-charcoal/95">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-rose/5 rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 max-w-2xl w-full space-y-12 animate-fade-in">
        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tight">
            <span className="bg-gradient-to-r from-gold via-cream to-gold bg-clip-text text-transparent">
              {t('app.title')}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-cream/70 font-light tracking-wide">
            {t('app.tagline')}
          </p>
        </div>

        {/* Main navigation */}
        <nav className="grid grid-cols-2 gap-4">
          <Link
            href="/play"
            className="group card hover:border-gold/30 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="text-center space-y-2">
              <div className="text-4xl">🎮</div>
              <div className="text-xl font-display font-semibold group-hover:text-gold transition-colors">
                {t('nav.play')}
              </div>
            </div>
          </Link>

          <Link
            href="/album"
            className="group card hover:border-gold/30 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="text-center space-y-2">
              <div className="text-4xl">📸</div>
              <div className="text-xl font-display font-semibold group-hover:text-gold transition-colors">
                {t('nav.album')}
              </div>
            </div>
          </Link>

          <Link
            href="/models"
            className="group card hover:border-gold/30 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="text-center space-y-2">
              <div className="text-4xl">✨</div>
              <div className="text-xl font-display font-semibold group-hover:text-gold transition-colors">
                {t('nav.models')}
              </div>
            </div>
          </Link>

          <Link
            href="/settings"
            className="group card hover:border-gold/30 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="text-center space-y-2">
              <div className="text-4xl">⚙️</div>
              <div className="text-xl font-display font-semibold group-hover:text-gold transition-colors">
                {t('nav.settings')}
              </div>
            </div>
          </Link>
        </nav>

        {/* Footer note */}
        <div className="text-center text-sm text-cream/40 pt-8">
          <p>Prototype v0.1 • For testing purposes</p>
        </div>
      </main>
    </div>
  );
}
