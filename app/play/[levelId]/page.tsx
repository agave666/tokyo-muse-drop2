import { LanguageProvider } from '@/components/LanguageProvider';
import PuzzleGame from '@/components/PuzzleGame';

// Generate static paths for all levels
export function generateStaticParams() {
  return [
    { levelId: '1' },
    { levelId: '2' },
    { levelId: '3' },
    { levelId: '4' },
    { levelId: '5' },
    { levelId: '6' },
    { levelId: '7' },
    { levelId: '8' },
  ];
}

export default function Page({ params }: { params: { levelId: string } }) {
  return (
    <LanguageProvider>
      <PuzzleGame levelId={params.levelId} />
    </LanguageProvider>
  );
}
