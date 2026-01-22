import { LanguageProvider } from '@/components/LanguageProvider';
import HomePage from '@/components/HomePage';

export default function Page() {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  );
}
