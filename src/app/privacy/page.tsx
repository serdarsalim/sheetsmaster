import { Suspense } from 'react';
import PrivacyContent from '../components/privacy-content';

export const metadata = {
  title: 'Privacy Policy | Sheets Master',
  description: 'Learn about how Sheets Master collects, uses, and protects your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <PrivacyContent />
      </Suspense>
    </div>
  );
}