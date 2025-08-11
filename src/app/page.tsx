'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/accounts');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">AlphaBuddy Pro</h1>
        <p className="text-gray-600">Redirecting to accounts...</p>
      </div>
    </div>
  );
}