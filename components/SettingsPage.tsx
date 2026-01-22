'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { StorageManager } from '@/lib/storage';
import { paymentService } from '@/lib/payment';
import Link from 'next/link';
import { useState } from 'react';

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleReset = () => {
    StorageManager.resetProgress();
    setShowResetConfirm(false);
    window.location.href = '/';
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleBoosterClick = async (type: 'moves' | 'plays') => {
    if (!paymentService.isAvailable()) {
      showToast(t('boosters.comingSoon'));
      return;
    }
    
    try {
      const success = type === 'moves' 
        ? await paymentService.purchaseExtraMoves()
        : await paymentService.purchaseExtraPlays();
      
      if (success) {
        showToast('Purchase successful!');
      } else {
        showToast('Purchase failed');
      }
    } catch (error) {
      showToast('Error processing purchase');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-charcoal via-charcoal to-charcoal/95">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-cream/60 hover:text-cream transition-colors">
            ← {t('common.back')}
          </Link>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="page-title">{t('settings.title')}</h1>
        </div>

        {/* Language */}
        <div className="card space-y-4">
          <h3 className="text-xl font-display font-semibold">{t('settings.language')}</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setLanguage('en')}
              className={`p-4 rounded-lg border transition-all ${
                language === 'en'
                  ? 'bg-gold/20 border-gold text-gold'
                  : 'bg-cream/5 border-cream/10 hover:bg-cream/10'
              }`}
            >
              {t('settings.english')}
            </button>
            <button
              onClick={() => setLanguage('ja')}
              className={`p-4 rounded-lg border transition-all ${
                language === 'ja'
                  ? 'bg-gold/20 border-gold text-gold'
                  : 'bg-cream/5 border-cream/10 hover:bg-cream/10'
              }`}
            >
              {t('settings.japanese')}
            </button>
          </div>
        </div>

        {/* Boosters */}
        <div className="card space-y-4">
          <div>
            <h3 className="text-xl font-display font-semibold">{t('boosters.title')}</h3>
            <p className="text-sm text-cream/60 mt-1">{t('boosters.description')}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleBoosterClick('moves')}
              className="btn-secondary"
            >
              <div className="text-center space-y-1">
                <div className="text-2xl">➕</div>
                <div className="text-sm">{t('boosters.extraMoves')}</div>
              </div>
            </button>
            <button
              onClick={() => handleBoosterClick('plays')}
              className="btn-secondary"
            >
              <div className="text-center space-y-1">
                <div className="text-2xl">🎮</div>
                <div className="text-sm">{t('boosters.extraPlays')}</div>
              </div>
            </button>
          </div>
        </div>

        {/* Content Policy */}
        <div className="card space-y-4">
          <h3 className="text-xl font-display font-semibold">{t('settings.contentPolicy')}</h3>
          <p className="text-sm text-cream/70">{t('settings.policyText')}</p>
        </div>

        {/* Reset */}
        <div className="card space-y-4">
          <h3 className="text-xl font-display font-semibold">{t('settings.resetProgress')}</h3>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="btn-secondary w-full text-rose"
          >
            {t('settings.reset')}
          </button>
        </div>

        {/* Reset confirmation modal */}
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50 animate-fade-in">
            <div className="card max-w-md w-full space-y-6">
              <h3 className="text-xl font-display font-semibold text-center">
                {t('settings.resetConfirm')}
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="btn-secondary flex-1"
                >
                  {t('settings.cancel')}
                </button>
                <button
                  onClick={handleReset}
                  className="btn-primary flex-1 bg-rose hover:bg-rose/90"
                >
                  {t('settings.reset')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
            <div className="card px-6 py-3 shadow-2xl">
              <p className="text-sm font-semibold">{toast}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
