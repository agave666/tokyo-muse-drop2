import enTranslations from '@/data/en.json';
import jaTranslations from '@/data/ja.json';

export type Language = 'en' | 'ja';

const translations: Record<Language, any> = {
  en: enTranslations,
  ja: jaTranslations,
};

export function getTranslation(lang: Language, key: string, params?: Record<string, string | number>): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key;
    }
  }
  
  if (typeof value !== 'string') {
    return key;
  }
  
  // Replace {{param}} with values
  if (params) {
    return value.replace(/\{\{(\w+)\}\}/g, (match, param) => {
      return params[param]?.toString() || match;
    });
  }
  
  return value;
}

export function getBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('ja')) {
    return 'ja';
  }
  return 'en';
}
