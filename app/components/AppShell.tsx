import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen heart-bg">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <header className="mb-10 flex items-center justify-between">
          <Link href="/memories" className="text-3xl font-handwriting text-white drop-shadow">
            Mazbuli 💭
          </Link>
          <LogoutButton />
        </header>
        <div className="card">{children}</div>
      </div>
    </div>
  );
}
