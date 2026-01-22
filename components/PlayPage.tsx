'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { getFeaturedModelId, getFreePlaysRemaining } from '@/lib/daily';
import { models } from '@/data/models';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const LEVELS = [
  { id: 1, targetScore: 500, moves: 25 },
  { id: 2, targetScore: 700, moves: 22 },
  { id: 3, targetScore: 900, moves: 20 },
  { id: 4, targetScore: 1100, moves: 18 },
  { id: 5, targetScore: 1300, moves: 18 },
  { id: 6, targetScore: 1500, moves: 16 },
  { id: 7, targetScore: 1800, moves: 15 },
  { id: 8, targetScore: 2000, moves: 15 },
];

export default function PlayPage() {
  const { t, language } = useLanguage();
  const [featuredModel, setFeaturedModel] = useState<any>(null);
  const [freePlays, setFreePlays] = useState(0);

  useEffect(() => {
    const modelId = getFeaturedModelId();
    const model = models.find(m => m.id === modelId);
    setFeaturedModel(model);
    setFreePlays(getFreePlaysRemaining());
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-charcoal via-charcoal to-charcoal/95">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-cream/60 hover:text-cream transition-colors">
            ← {t('common.back')}
          </Link>
          <div className="text-right space-y-1">
            <div className="text-sm text-cream/60">{t('play.dailyPlays')}</div>
            <div className="text-2xl font-display font-bold text-gold">{freePlays}</div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="page-title">{t('play.title')}</h1>
          {featuredModel && (
            <p className="text-cream/70">
              Today&apos;s featured:{' '}
              <span className="text-gold font-semibold">
                {language === 'ja' ? featuredModel.display_name_ja : featuredModel.display_name_en}
              </span>
            </p>
          )}
        </div>

        {/* Levels grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {LEVELS.map((level) => (
            <Link
              key={level.id}
              href={`/play/${level.id}`}
              className="group card hover:border-gold/30 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="text-center space-y-3">
                <div className="text-3xl font-display font-bold text-gold">
                  {level.id}
                </div>
                <div className="text-sm text-cream/70 space-y-1">
                  <div>{t('play.target')}: {level.targetScore}</div>
                  <div>{t('puzzle.moves')}: {level.moves}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info */}
        <div className="card text-center text-sm text-cream/60 space-y-2">
          <p>{t('puzzle.photographersCut')}</p>
          <p className="text-xs">{t('puzzle.shootNote')}</p>
        </div>
      </div>
    </div>
  );
}
