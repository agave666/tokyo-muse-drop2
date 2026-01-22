import { Language } from './i18n';

export interface PhotoProgress {
  [photoId: string]: number; // 0-3 (locked, blur1, blur2, clear)
}

export interface ModelProgress {
  photos: PhotoProgress;
  totalReveals: number;
}

export interface Progress {
  [modelId: string]: ModelProgress;
}

export interface DailyData {
  date: string; // YYYY-MM-DD
  featuredModelId: string;
  freePlaysUsed: number;
}

export class StorageManager {
  private static KEYS = {
    LANG: 'tmd_lang',
    PROGRESS: 'tmd_progress',
    DAILY: 'tmd_daily',
  };

  static getLanguage(): Language | null {
    if (typeof window === 'undefined') return null;
    const lang = localStorage.getItem(this.KEYS.LANG);
    return lang as Language | null;
  }

  static setLanguage(lang: Language): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.KEYS.LANG, lang);
  }

  static getProgress(): Progress {
    if (typeof window === 'undefined') return {};
    const data = localStorage.getItem(this.KEYS.PROGRESS);
    if (!data) return {};
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  }

  static setProgress(progress: Progress): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.KEYS.PROGRESS, JSON.stringify(progress));
  }

  static getDailyData(): DailyData | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(this.KEYS.DAILY);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  static setDailyData(data: DailyData): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.KEYS.DAILY, JSON.stringify(data));
  }

  static resetProgress(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.KEYS.PROGRESS);
    localStorage.removeItem(this.KEYS.DAILY);
  }

  static addReveal(modelId: string, modelPhotos: any[]): void {
    const progress = this.getProgress();
    
    if (!progress[modelId]) {
      progress[modelId] = {
        photos: {},
        totalReveals: 0
      };
    }

    // Find next photo to reveal
    for (const photo of modelPhotos) {
      const currentStage = progress[modelId].photos[photo.id] || 0;
      if (currentStage < 3) {
        progress[modelId].photos[photo.id] = currentStage + 1;
        progress[modelId].totalReveals++;
        this.setProgress(progress);
        return;
      }
    }

    // All photos fully revealed
    progress[modelId].totalReveals++;
    this.setProgress(progress);
  }

  static getPhotoStage(modelId: string, photoId: string): number {
    const progress = this.getProgress();
    return progress[modelId]?.photos[photoId] || 0;
  }

  static getModelProgress(modelId: string): ModelProgress {
    const progress = this.getProgress();
    return progress[modelId] || { photos: {}, totalReveals: 0 };
  }
}
