import { LanguageProvider } from '@/components/LanguageProvider';
import ModelsPage from '@/components/ModelsPage';

export default function Page() {
  return (
    <LanguageProvider>
      <ModelsPage />
    </LanguageProvider>
  );
}
