import AppShell from '@/app/components/AppShell';

export default function MemoriesPage() {
  return (
    <AppShell>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-handwriting text-white drop-shadow mb-6">Våra Minnen 💭</h2>
        <p className="text-white/80 mb-8 text-lg">
          En samling på "Albumet" jag snackar om. Detta är varför jag sparar så mycket bilder ;-)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <MemoryCard 
            title="Galleri" 
            description="Bilder och förhoppsningsvis några små videos av våra äventyr"
            icon="📸"
            href="/gallery"
          />
          <MemoryCard 
            title="Berättelser" 
            description="Vår resa berättad genom ord och minnen"
            icon="📖"
            href="/story/1"
          />
          <MemoryCard 
            title="Dejt kvällar och Speciella dagar" 
            description="Dejter, firanden och milstolpar"
            icon="✨"
            href="/moments"
          />
        </div>

        <div className="card bg-white/10 border border-white/20 p-8">
          <h3 className="text-2xl font-handwriting text-white mb-4">Bara så du vet💝</h3>
          <p className="text-white/80 text-sm italic">Albumet som startade allt, där varje bild berättar ett kapitel i vår kärlekshistoria.</p>
          <p className="text-white/90 leading-relaxed">
            &nbsp;v oss som vi haft hittils (mest dig) Men det inkluderar lite minnen av varje träff sen den första. Jag vet inte om jag lyckas fixa till videos ännu, men bilder finns ;-)💝. Jag vill att du alltid ser hur mycket jag uppskattar och älskar dig min fina Muzhda
          </p>
        </div>
      </div>
    </AppShell>
  );
}

function MemoryCard({ title, description, icon, href }: {
  title: string;
  description: string;
  icon: string;
  href: string;
}) {
  return (
    <a 
      href={href}
      className="block p-6 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
    >
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-handwriting text-white mb-2">{title}</h3>
      <p className="text-white/80 text-sm">{description}</p>
    </a>
  );
}
