import { LanguageProvider } from '@/components/LanguageProvider';
import PlayPage from '@/components/PlayPage';

export default function Page() {
  return (
    <LanguageProvider>
      <PlayPage />
    </LanguageProvider>
  );
}
