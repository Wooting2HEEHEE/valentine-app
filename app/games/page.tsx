import AppShell from '@/app/components/AppShell';
import HeartClickGame from '@/app/components/HeartClickGame';
import ComplimentGenerator from '@/app/components/ComplimentGenerator';

export default function GamesPage() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-handwriting text-white drop-shadow mb-6">Games 🎮</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
            <h3 className="text-white text-2xl font-bold mb-3">Click the Heart</h3>
            <p className="text-white/80 mb-4">Catch 20 hearts as fast as you can.</p>
            <HeartClickGame />
          </div>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
            <h3 className="text-white text-2xl font-bold mb-3">Random Compliment</h3>
            <p className="text-white/80 mb-4">Press the button. Receive love.</p>
            <ComplimentGenerator />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
