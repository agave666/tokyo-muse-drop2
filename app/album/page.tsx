import { LanguageProvider } from '@/components/LanguageProvider';
import AlbumPage from '@/components/AlbumPage';

export default function Page() {
  return (
    <LanguageProvider>
      <AlbumPage />
    </LanguageProvider>
  );
}
