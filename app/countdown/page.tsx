import AppShell from '@/app/components/AppShell';
import CountdownTimer from '@/app/components/CountdownTimer';

export default function CountdownPage() {
  return (
    <AppShell>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-handwriting text-white drop-shadow mb-6">Nedräkning Till Alla Hjärtans Dag ⏳</h2>
        <CountdownTimer />
        <p className="text-white/80 mt-6">
          Varje sekund är ett steg närmare vårt slutmål och &quot;giftemål&quot;. 💖
        </p>
      </div>
    </AppShell>
  );
}
