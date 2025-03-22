import { Suspense } from 'react';
import TermsContent from '../components/terms-content';

export const metadata = {
  title: 'Terms and Conditions | Sheets Master',
  description: 'The terms and conditions governing your use of Sheets Master and its templates.',
};

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg font-medium">Loading...</p>
        </div>
      }>
        <TermsContent />
      </Suspense>
    </div>
  );
}