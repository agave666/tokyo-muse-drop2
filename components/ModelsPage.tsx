'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { models } from '@/data/models';
import Link from 'next/link';

export default function ModelsPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-charcoal via-charcoal to-charcoal/95">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-cream/60 hover:text-cream transition-colors">
            ← {t('common.back')}
          </Link>
        </div>

        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="page-title">{t('models.title')}</h1>
          <div className="card max-w-2xl mx-auto">
            <p className="text-sm text-cream/70">{t('models.verified')}</p>
            <p className="text-sm text-cream/70 mt-2">{t('models.contentPolicy')}</p>
          </div>
        </div>

        {/* Models grid */}
        <div className="space-y-6">
          {models.map((model) => (
            <div key={model.id} className="card space-y-4 hover:border-gold/30 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-display font-semibold mb-1">
                    {language === 'ja' ? model.display_name_ja : model.display_name_en}
                  </h3>
                  <p className="text-cream/70">
                    {language === 'ja' ? model.tagline_ja : model.tagline_en}
                  </p>
                </div>
                <div className="text-3xl">✨</div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-2">
                {model.instagram && (
                  <a
                    href={model.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm"
                  >
                    📸 {t('models.instagram')}
                  </a>
                )}
                {model.tiktok && (
                  <a
                    href={model.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm"
                  >
                    🎵 {t('models.tiktok')}
                  </a>
                )}
                {model.fansite && (
                  <a
                    href={model.fansite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm"
                  >
                    🌟 {t('models.fanSite')}
                  </a>
                )}
              </div>

              {/* Photo count */}
              <div className="text-sm text-cream/60">
                {model.photos.length} {language === 'ja' ? '枚の写真' : 'exclusive photos'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
