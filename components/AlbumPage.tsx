'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { models } from '@/data/models';
import { StorageManager } from '@/lib/storage';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AlbumPage() {
  const { t, language } = useLanguage();
  const [progress, setProgress] = useState<any>({});
  const [selectedPhoto, setSelectedPhoto] = useState<{
    modelId: string;
    photoId: string;
    filename: string;
    stage: number;
    shootNote: string;
    modelName: string;
    links?: any;
  } | null>(null);

  useEffect(() => {
    setProgress(StorageManager.getProgress());
  }, []);

  const getPhotoStage = (modelId: string, photoId: string) => {
    return progress[modelId]?.photos?.[photoId] || 0;
  };

  const getModelProgressPercent = (modelId: string) => {
    const modelProgress = progress[modelId];
    if (!modelProgress) return 0;
    
    const model = models.find(m => m.id === modelId);
    if (!model) return 0;
    
    let totalStages = 0;
    model.photos.forEach(photo => {
      const stage = modelProgress.photos[photo.id] || 0;
      totalStages += stage;
    });
    
    const maxStages = model.photos.length * 3;
    return Math.round((totalStages / maxStages) * 100);
  };

  const handlePhotoClick = (modelId: string, photoId: string) => {
    const model = models.find(m => m.id === modelId);
    if (!model) return;
    
    const photo = model.photos.find(p => p.id === photoId);
    if (!photo) return;
    
    const stage = getPhotoStage(modelId, photoId);
    
    setSelectedPhoto({
      modelId,
      photoId,
      filename: photo.filename,
      stage,
      shootNote: language === 'ja' ? photo.shoot_note_ja : photo.shoot_note_en,
      modelName: language === 'ja' ? model.display_name_ja : model.display_name_en,
      links: stage === 3 ? { instagram: model.instagram, tiktok: model.tiktok, fansite: model.fansite } : undefined,
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-charcoal via-charcoal to-charcoal/95">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-cream/60 hover:text-cream transition-colors">
            ← {t('common.back')}
          </Link>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="page-title">{t('album.title')}</h1>
        </div>

        {/* Models */}
        <div className="space-y-8">
          {models.map((model) => {
            const progressPercent = getModelProgressPercent(model.id);
            
            return (
              <div key={model.id} className="card space-y-4">
                {/* Model header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-display font-semibold">
                      {language === 'ja' ? model.display_name_ja : model.display_name_en}
                    </h3>
                    <p className="text-sm text-cream/60">
                      {language === 'ja' ? model.tagline_ja : model.tagline_en}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gold">{progressPercent}%</div>
                    <div className="text-xs text-cream/60">{t('album.progress')}</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-cream/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold to-rose transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Photos */}
                <div className="grid grid-cols-3 gap-4">
                  {model.photos.map((photo) => {
                    const stage = getPhotoStage(model.id, photo.id);
                    
                    return (
                      <button
                        key={photo.id}
                        onClick={() => handlePhotoClick(model.id, photo.id)}
                        className="aspect-[3/4] rounded-lg overflow-hidden relative group hover:scale-105 transition-transform"
                      >
                        {stage === 0 ? (
                          <div className="w-full h-full bg-gradient-to-br from-cream/5 to-cream/10 flex items-center justify-center">
                            <div className="text-center space-y-2">
                              <div className="text-4xl">🔒</div>
                              <div className="text-xs text-cream/60">{t('album.locked')}</div>
                            </div>
                          </div>
                        ) : (
                          <div className="relative w-full h-full">
                            <Image
                              src={`/photos/${photo.filename}`}
                              alt={`Photo ${photo.id}`}
                              fill
                              className="object-cover"
                              style={{
                                filter: stage === 1 ? 'blur(24px)' : stage === 2 ? 'blur(10px)' : 'blur(0)',
                              }}
                            />
                            {stage < 3 && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <div className="text-center text-xs text-cream">
                                  {t('album.stage', { current: stage, total: 3 })}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Photo viewer modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-6 z-50 animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-2xl w-full space-y-6" onClick={(e) => e.stopPropagation()}>
            {/* Photo */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              {selectedPhoto.stage === 0 ? (
                <div className="w-full h-full bg-gradient-to-br from-cream/10 to-cream/20 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-6xl">🔒</div>
                    <p className="text-cream/70">{t('album.playToReveal')}</p>
                  </div>
                </div>
              ) : (
                <Image
                  src={`/photos/${selectedPhoto.filename}`}
                  alt="Photo"
                  fill
                  className="object-cover"
                  style={{
                    filter:
                      selectedPhoto.stage === 1
                        ? 'blur(24px)'
                        : selectedPhoto.stage === 2
                        ? 'blur(10px)'
                        : 'blur(0)',
                  }}
                />
              )}
            </div>

            {/* Info */}
            <div className="card space-y-4">
              <div>
                <h3 className="text-xl font-display font-semibold">{selectedPhoto.modelName}</h3>
                <p className="text-sm text-cream/60">{selectedPhoto.shootNote}</p>
              </div>

              {selectedPhoto.stage < 3 && (
                <div className="text-center">
                  <div className="text-gold font-semibold">
                    {t('album.stage', { current: selectedPhoto.stage, total: 3 })}
                  </div>
                  <div className="text-sm text-cream/60">{t('album.playToReveal')}</div>
                </div>
              )}

              {selectedPhoto.stage === 3 && selectedPhoto.links && (
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-gold">{t('album.viewExternal')}</div>
                  <div className="flex gap-2">
                    {selectedPhoto.links.instagram && (
                      <a
                        href={selectedPhoto.links.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm flex-1"
                      >
                        {t('models.instagram')}
                      </a>
                    )}
                    {selectedPhoto.links.tiktok && (
                      <a
                        href={selectedPhoto.links.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm flex-1"
                      >
                        {t('models.tiktok')}
                      </a>
                    )}
                  </div>
                </div>
              )}

              <button onClick={() => setSelectedPhoto(null)} className="btn-primary w-full">
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
