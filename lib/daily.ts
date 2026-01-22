import { models } from '@/data/models';
import { StorageManager, DailyData } from './storage';

export function getTodayString(): string {
  const now = new Date();
  return now.toISOString().split('T')[0]; // YYYY-MM-DD
}

export function getFeaturedModelId(): string {
  const today = getTodayString();
  const dailyData = StorageManager.getDailyData();

  // Check if we have data for today
  if (dailyData && dailyData.date === today) {
    return dailyData.featuredModelId;
  }

  // Generate new featured model for today using deterministic hash
  const hash = hashString(today);
  const modelIndex = hash % models.length;
  const featuredModelId = models[modelIndex].id;

  // Save new daily data
  StorageManager.setDailyData({
    date: today,
    featuredModelId,
    freePlaysUsed: 0
  });

  return featuredModelId;
}

export function getFreePlaysRemaining(): number {
  const MAX_FREE_PLAYS = 10;
  const today = getTodayString();
  const dailyData = StorageManager.getDailyData();

  if (!dailyData || dailyData.date !== today) {
    return MAX_FREE_PLAYS;
  }

  return Math.max(0, MAX_FREE_PLAYS - dailyData.freePlaysUsed);
}

export function recordFreePlay(): void {
  const today = getTodayString();
  const dailyData = StorageManager.getDailyData();

  if (!dailyData || dailyData.date !== today) {
    StorageManager.setDailyData({
      date: today,
      featuredModelId: getFeaturedModelId(),
      freePlaysUsed: 1
    });
  } else {
    StorageManager.setDailyData({
      ...dailyData,
      freePlaysUsed: dailyData.freePlaysUsed + 1
    });
  }
}

// Simple string hash function
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}
