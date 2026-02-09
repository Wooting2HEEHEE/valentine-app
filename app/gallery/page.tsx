'use client';

import { useState } from 'react';
import AppShell from '@/app/components/AppShell';

export default function GalleryPage() {
  const [currentIndexes, setCurrentIndexes] = useState<{ [key: string]: number }>({});

  const memoryCategories = [
    {
      id: 'first-adventure',
      title: 'Första Äventyret', 
      description: 'Dagen vi utforskade Malmö tillsammans och gick vilse på bästa sätt',
      items: [
        { image: '/images/mazdish-memory.jpg', date: '1 November 2025', title: 'Malmö Äventyr' },
        { image: '/images/first-date-2.jpg', date: '1 November 2025', title: 'Första Träffen 2' },
        { image: '/images/first-date-3.png', date: '2 November 2025', title: 'Första Träffen 3' },
        { image: '/images/first-date-4.png', date: '3 November 2025', title: 'Första Träffen 4' },
        { image: '/images/first-date-5.jpg', date: '3 November 2025', title: 'Första Träffen 5' },
      ]
    },
    {
      id: 'coffee-dates',
      title: 'Big Backs', 
      description: 'Otaliga timmar spenderade med att prata, skratta och njuta av varandras sällskap',
      items: [
        { image: '/images/bigbacks-1.jpg', date: '7 November 2025', title: 'Big Backs 1' },
        { image: '/images/bigbacks-2.jpg', date: '7 November 2025', title: 'Big Backs 2' },
        { image: '/images/bigbacks-3.jpg', date: '7 November 2025', title: 'Big Backs 3' },
        { image: '/images/bigbacks-4.jpg', date: '13 December 2025', title: 'Big Backs 4' },
        { image: '/images/bigbacks-5.jpg', date: '7 November 2025', title: 'Big Backs 5' },
        { image: '/images/bigbacks-6.jpg', date: '20 November 2025', title: 'Big Backs 6' },
      ]
    },
    {
      id: 'rainy-days',
      title: 'Mazbuli Syndrom', 
      description: 'Även de mörkaste dagarna blev ljusa när vi var tillsammans',
      items: [
        { image: '/images/mazbuli-1.png', date: '2 November 2025', title: 'Mazbuli 1' },
        { image: '/images/mazbuli-5.jpg', date: '7 November 2025', title: 'Mazbuli 2' },
        { image: '/images/mazbuli-6.jpg', date: '7 November 2025', title: 'Mazbuli 3' },
        { image: '/images/mazbuli-7.jpg', date: '11 November 2025', title: 'Mazbuli 4' },
        { image: '/images/mazbuli-8.jpg', date: '20 November 2025', title: 'Mazbuli 5' },
        { image: '/images/mazbuli-9.jpg', date: '23 November 2025', title: 'Mazbuli 6' },
        { image: '/images/mazbuli-10.jpg', date: '23 November 2025', title: 'Mazbuli 7' },
        { image: '/images/mazbuli-11.jpg', date: '25 November 2025', title: 'Mazbuli 8' },
        { image: '/images/mazbuli-12.jpg', date: '25 November 2025', title: 'Mazbuli 9' },
        { image: '/images/mazbuli-13.jpg', date: '25 November 2025', title: 'Mazbuli 10' },
        { image: '/images/mazbuli-14.jpg', date: '25 November 2025', title: 'Mazbuli 11' },
        { image: '/images/mazbuli-15.jpg', date: '25 November 2025', title: 'Mazbuli 12' },
        { image: '/images/mazbuli-16.jpg', date: '15 December 2025', title: 'Mazbuli 13' },
        { image: '/images/mazbuli-17.jpg', date: '13 December 2025', title: 'Mazbuli 14' },
        { image: '/images/mazbuli-18.jpg', date: '28 December 2025', title: 'Mazbuli 15' },
      ]
    },
    {
      id: 'celebration',
      title: 'Goofy Muzhda', 
      description: 'Roliga och fina bilder på min vackra fru <3',
      items: [
        { image: '/images/goofy-1.jpg', date: '11 November 2025', title: 'Goofy 1' },
        { image: '/images/goofy-2.jpg', date: '20 November 2025', title: 'Goofy 2' },
        { image: '/images/goofy-5.jpg', date: '30 November 2025', title: 'Goofy 5' },
        { image: '/images/goofy-6.jpg', date: '8 December 2025', title: 'Goofy 6' },
        { image: '/images/goofy-7.png', date: '13 December 2025', title: 'Goofy 7' },
        { image: '/images/goofy-8.jpg', date: '15 December 2025', title: 'Goofy 8' },
        { image: '/images/goofy-9.jpg', date: '26 December 2025', title: 'Goofy 9' },
        { image: '/images/goofy-12.jpg', date: '25 January 2026', title: 'Goofy 12' },
        { image: '/images/goofy-13.jpg', date: '25 January 2026', title: 'Goofy 13' },
        { image: '/images/goofy-14.jpg', date: '25 January 2026', title: 'Goofy 14' },
      ]
    },
    {
      id: 'simple-joys',
      title: 'Personliga Favoriter', 
      description: 'Bilder när jag blev nykär ',
      items: [
        { image: '/videos/personal-1.mov', date: '20 Mars 2025', title: 'Personlig 1' },
        { image: '/videos/personal-2.mov', date: '17 April 2025', title: 'Personlig 2' },
        { image: '/images/personal-3.jpg', date: '31 Oktober 2025', title: 'Personlig 3' },
        { image: '/images/personal-4.jpg', date: '30 Oktober 2025', title: 'Personlig 4' },
        { image: '/images/personal-5.jpg', date: '30 Oktober 2025', title: 'Personlig 5' },
        { image: '/images/personal-6.jpg', date: '30 Oktober 2025', title: 'Personlig 6' },
        { image: '/images/personal-7.jpg', date: '30 Oktober 2025', title: 'Personlig 7' },
        { image: '/images/personal-8.jpg', date: '5 December 2025', title: 'Personlig 8' },
        { image: '/images/personal-9.jpg', date: '30 November 2025', title: 'Personlig 9' },
        { image: '/images/personal-10.jpg', date: '13 December 2025', title: 'Personlig 10' },
        { image: '/images/personal-11.jpg', date: '18 December 2025', title: 'Personlig 11' },
        { image: '/images/personal-12.jpg', date: '28 December 2025', title: 'Personlig 12' },
        { image: '/images/personal-13.jpg', date: '5 Januari 2026', title: 'Personlig 13' },
        { image: '/images/personal-14.jpg', date: '5 Januari 2026', title: 'Personlig 14' },
        { image: '/images/personal-16.jpg', date: '5 Februari 2026', title: 'Personlig 15' },
        { image: '/images/personal-17.jpg', date: '7 Februari 2026', title: 'Personlig 16' },
        { image: '/images/personal-18.jpg', date: '13 Januari 2026', title: 'Personlig 17' },
      ]
    },
    {
      id: 'future-dreams',
      title: 'Random Upplevelser', 
      description: 'Random moments som gör livet värt att leva',
      items: [
        { image: '/images/random-2.jpg', date: '2 Januari 2026', title: 'Random 1' },
        { image: '/images/random-4.jpg', date: '11 Januari 2026', title: 'Random 2' },
        { image: '/images/random-5.jpg', date: '13 December 2025', title: 'Random 3' },
        { image: '/images/random-6.jpg', date: '30 November 2025', title: 'Random 4' },
        { image: '/images/random-7.jpg', date: '25 November 2025', title: 'Random 5' },
        { image: '/images/random-8.jpg', date: '25 November 2025', title: 'Random 6' },
        { image: '/images/random-9.jpg', date: '3 November 2025', title: 'Random 7' },
      ]
    },
  ];

  const nextImage = (categoryId: string) => {
    setCurrentIndexes((prev: { [key: string]: number }) => ({
      ...prev,
      [categoryId]: ((prev[categoryId] || 0) + 1) % memoryCategories.find(cat => cat.id === categoryId)!.items.length
    }));
  };

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-handwriting text-white drop-shadow mb-6">Fotogalleri 📸</h2>
        <p className="text-white/80 mb-8 text-lg">
          Fångade ögonblick som berättar vår historia. Varje foto håller ett speciellt minne och ett leende.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Alla minnen är nu karuseller */}
          {memoryCategories.map((category) => {
            const currentIndex = currentIndexes[category.id] || 0;
            const currentItem = category.items[currentIndex];
            
            return (
              <MemoryCarousel 
                key={category.id}
                category={category}
                currentItem={currentItem}
                onNext={() => nextImage(category.id)}
                currentIndex={currentIndex}
                totalItems={category.items.length}
              />
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/70 italic">
            "Varje bild berättar en historia, och vår historia är min favorit." 
          </p>
        </div>
      </div>
    </AppShell>
  );
}

function MemoryCarousel({ 
  category, 
  currentItem, 
  onNext, 
  currentIndex, 
  totalItems 
}: {
  category: any;
  currentItem: any;
  onNext: () => void;
  currentIndex: number;
  totalItems: number;
}) {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-square rounded-xl bg-white/10 border border-white/20 mb-3 overflow-hidden hover:bg-white/20 transition-all duration-300">
        <div className="w-full h-full flex items-center justify-center text-white/50">
          {currentItem.image.includes('.mov') || currentItem.image.includes('.mp4') ? (
            <video 
              className="w-full h-full object-contain rounded-lg"
              autoPlay 
              muted 
              loop 
              playsInline
            >
              <source src={currentItem.image} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : currentItem.image.includes('.jpg') || currentItem.image.includes('.jpeg') || currentItem.image.includes('.png') ? (
            <img 
              src={currentItem.image} 
              alt={currentItem.title}
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-2">📷</div>
              <p className="text-sm">Fotominne</p>
            </div>
          )}
        </div>
      </div>
      <h3 className="text-lg font-handwriting text-white mb-1">{category.title}</h3>
      <p className="text-white/80 text-sm mb-1">{category.description}</p>
      <p className="text-white/60 text-xs italic">{currentItem.date}</p>
      
      <button
        onClick={onNext}
        className="mt-2 w-full py-1 px-2 bg-white/10 hover:bg-white/20 rounded text-white/80 text-xs transition-colors"
      >
        Nästa ({currentIndex + 1}/{totalItems}) →
      </button>
    </div>
  );
}
