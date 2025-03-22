import { Suspense } from 'react';
import NotFoundContent from './components/not-found-content';

export const metadata = {
  title: '404 - Page Not Found | Sheets Master',
  description: 'We couldn\'t find the page you were looking for.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <NotFoundContent />
      </Suspense>
    </div>
  );
}