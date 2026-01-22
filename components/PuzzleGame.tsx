'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { Match3Engine, Position, Tile } from '@/lib/game-engine';
import { getFeaturedModelId, recordFreePlay } from '@/lib/daily';
import { StorageManager } from '@/lib/storage';
import { models } from '@/data/models';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface PuzzleGameProps {
  levelId: string;
}

const LEVELS: Record<string, { targetScore: number; moves: number }> = {
  '1': { targetScore: 500, moves: 25 },
  '2': { targetScore: 700, moves: 22 },
  '3': { targetScore: 900, moves: 20 },
  '4': { targetScore: 1100, moves: 18 },
  '5': { targetScore: 1300, moves: 18 },
  '6': { targetScore: 1500, moves: 16 },
  '7': { targetScore: 1800, moves: 15 },
  '8': { targetScore: 2000, moves: 15 },
};

export default function PuzzleGame({ levelId }: PuzzleGameProps) {
  const { t, language } = useLanguage();
  const router = useRouter();
  const [engine] = useState(() => new Match3Engine(8, 5));
  const [grid, setGrid] = useState<Tile[][]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [selectedTile, setSelectedTile] = useState<Position | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const level = LEVELS[levelId] || LEVELS['1'];

  useEffect(() => {
    setGrid(engine.getGrid());
    setMoves(level.moves);
  }, [engine, level.moves]);

  const handleTileClick = useCallback(async (row: number, col: number) => {
    if (isProcessing || gameOver) return;

    const newPos: Position = { row, col };

    if (!selectedTile) {
      setSelectedTile(newPos);
      return;
    }

    // Try to swap
    const success = engine.swap(selectedTile, newPos);
    
    if (success) {
      setIsProcessing(true);
      setSelectedTile(null);
      
      // Process matches
      await new Promise(resolve => setTimeout(resolve, 200));
      const matchScore = engine.processMatches();
      
      const newScore = score + matchScore;
      const newMoves = moves - 1;
      
      setScore(newScore);
      setMoves(newMoves);
      setGrid([...engine.getGrid()]);
      
      // Check win/lose conditions
      if (newScore >= level.targetScore) {
        setVictory(true);
        setGameOver(true);
        
        // Add reward
        const modelId = getFeaturedModelId();
        const model = models.find(m => m.id === modelId);
        if (model) {
          StorageManager.addReveal(modelId, model.photos);
        }
        recordFreePlay();
        
        setTimeout(() => setShowReward(true), 500);
      } else if (newMoves <= 0) {
        setGameOver(true);
        recordFreePlay();
      }
      
      setIsProcessing(false);
    } else {
      // Invalid swap or no matches
      setSelectedTile(newPos);
    }
  }, [selectedTile, isProcessing, gameOver, engine, score, moves, level.targetScore]);

  const handleRestart = () => {
    window.location.reload();
  };

  const handleContinue = () => {
    router.push('/album');
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-charcoal via-charcoal to-charcoal/95">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/play" className="text-cream/60 hover:text-cream transition-colors text-sm">
            ← {t('common.back')}
          </Link>
          <div className="text-lg font-display font-bold text-gold">
            {t('play.level')} {levelId}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card text-center">
            <div className="text-sm text-cream/60">{t('puzzle.score')}</div>
            <div className="text-2xl font-bold text-gold">{score}</div>
          </div>
          <div className="card text-center">
            <div className="text-sm text-cream/60">{t('puzzle.target')}</div>
            <div className="text-2xl font-bold">{level.targetScore}</div>
          </div>
          <div className="card text-center">
            <div className="text-sm text-cream/60">{t('puzzle.moves')}</div>
            <div className="text-2xl font-bold text-rose">{moves}</div>
          </div>
        </div>

        {/* Game grid */}
        <div className="card">
          <div className="grid grid-cols-8 gap-1 md:gap-2 max-w-md mx-auto">
            {grid.map((row, rowIndex) =>
              row.map((tile, colIndex) => {
                const isSelected = selectedTile?.row === rowIndex && selectedTile?.col === colIndex;
                return (
                  <button
                    key={`${rowIndex}-${colIndex}-${tile.id}`}
                    onClick={() => handleTileClick(rowIndex, colIndex)}
                    disabled={isProcessing || gameOver}
                    className={`tile tile-${tile.type} ${isSelected ? 'ring-2 ring-cream scale-110' : ''}`}
                  />
                );
              })
            )}
          </div>
        </div>

        {/* Game over modal */}
        {gameOver && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50 animate-fade-in">
            <div className="card max-w-md w-full space-y-6 text-center">
              <h2 className="text-3xl font-display font-bold">
                {victory ? t('puzzle.victory') : t('puzzle.defeat')}
              </h2>
              
              {victory && (
                <div className="space-y-4">
                  <div className="text-6xl">🎉</div>
                  <div className="space-y-2">
                    <div className="text-xl text-gold">{t('puzzle.revealProgress')}</div>
                    <div className="text-sm text-cream/60">{t('puzzle.photographersCut')}</div>
                  </div>
                </div>
              )}
              
              {!victory && (
                <div className="space-y-4">
                  <div className="text-6xl">😔</div>
                  <div className="text-cream/70">
                    {t('puzzle.score')}: {score} / {level.targetScore}
                  </div>
                </div>
              )}
              
              <div className="flex gap-3">
                <button onClick={handleRestart} className="btn-secondary flex-1">
                  {t('puzzle.tryAgain')}
                </button>
                {victory && (
                  <button onClick={handleContinue} className="btn-primary flex-1">
                    {t('puzzle.continue')}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
