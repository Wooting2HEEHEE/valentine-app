'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SecretGate() {
  const router = useRouter();
  const [showSecret, setShowSecret] = useState(false);

  const handleZeroClick = () => {
    setShowSecret(true);
    setTimeout(() => {
      router.push('/login');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-2xl font-light text-gray-600 mb-4">Page Not Found</h1>
          <p className="text-gray-500 mb-8">
            The page you're looking for doesn't exist.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-center gap-1">
            {[4, 0, 4].map((num, index) => (
              <button
                key={index}
                onClick={() => num === 0 && handleZeroClick()}
                className={`w-8 h-8 rounded text-sm font-light transition-all ${
                  num === 0
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-600 cursor-pointer'
                    : 'bg-gray-50 text-gray-400 cursor-default'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          {showSecret && (
            <div className="mt-4 text-gray-400 text-sm">Loading...</div>
          )}
        </div>

        <div className="space-y-2">
          <a
            href="https://google.com"
            className="block text-gray-400 hover:text-gray-600 text-sm py-2"
          >
            ← Go back
          </a>
          <a
            href="https://google.com"
            className="block text-gray-400 hover:text-gray-600 text-sm py-2"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}
