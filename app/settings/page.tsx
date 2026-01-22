import { LanguageProvider } from '@/components/LanguageProvider';
import SettingsPage from '@/components/SettingsPage';

export default function Page() {
  return (
    <LanguageProvider>
      <SettingsPage />
    </LanguageProvider>
  );
}
