import Link from 'next/link';
import { notFound } from 'next/navigation';
import AppShell from '@/app/components/AppShell';

const PAGES = Array.from({ length: 20 }).map((_, i) => {
  const id = i + 1;
  return {
    id,
    title: `Story ${id}`,
    heading:
      id === 1
        ? 'Vår Historia 🌟'
        : id === 20
          ? 'En sista sak… 💞'
          : `Ett litet minne #${id} 💖`,
    body:
      id === 1
        ? "Vår kärleks historia är vacker, detta är en liten virtuell version som du kan kolla på för att se hur mycket jag älskar dig"
        : id === 2
          ? "Smurfar och Muzhda är alltid bästa vänner, även om det gäller praktik"
        : id === 3
          ? "Inte alla är gangstrar, men du är mafiabossen"
        : id === 4
          ? "Ibland har vi använt AI för att se hur vi ser ut tillsammans, men vi gjorde det mycket bättre"
        : id === 5
          ? "Dina hauls ger mig alltid lycka och något att se fram emot, därför får du 10/10 hijab points"
        : id === 6
          ? "Inte alla lyfter mig som du, därför flyger du i luften just nu"
        : id === 7
          ? "Du är perfekt fotomodell, även om det gäller sminkspegel i Marshmallow"
        : id === 8
          ? "Du är vacker varje dag, men för varje dag som går blir du bara finare. Denna bild fick mig pirra extra mycket dock"
        : id === 9
          ? "Oavsett vad du gör så fixar du alltid tid för mig, och jag är enormt tacksam över det"
        : id === 10
          ? "Du har bra natti natti rutiner, men du inser aldrig hur gullig du verkligen är"
        : id === 11
          ? "Ibland har vi med oss några kideos, de tar ändå bilder på oss. Tack för du introducerar mig till din familj. Det betyder mycket för mig"
        : id === 12
          ? "Några dagar så kommer du ut och förväntar dig att sminket inte ska förstöras. Det kan du råglömma om du ser ut såhär."
        : id === 13
          ? "Ibland tar man bilder man inte vet andra kommer se, min bror fick denna som första bild. Och jag älskar att de va just den. Dina fina drag syns och du är vacker"
        : id === 14
          ? "Ibland pekar du exakt"
        : id === 15
          ? "Du hör alltid att du är fin osminkad, men du måste veta hur fin. Jag blir avundsjuk på spegeln som får se dig"
        : id === 16
          ? "Du är perfekt för allt, även som stickers när vi ska säga godnatt"
        : id === 17
          ? "Snart ska du börja gymma så kanske du behöver en liten uppvärmning innan ;-)"
        : id === 18
          ? "Jag har sett dig blomstra in till den vackraste kvinnan i mitt liv, denna bilden bara visar hur vacker du blivit min fina blomma"
        : id === 19
          ? "När det inte finns en Ipad i handen, så blir du bekvämare med bilder, och de bilderna älskar jag"
        : id === 20
          ? "Om du har kommit hit, betyder det att du sa JA… och det var allt jag ville. Gå nu till den sista överraskningen."
          : "",
    image:
      id === 1
        ? '/images/story-image.jpg'
        : id === 2
          ? '/images/story-3.jpg'
        : id === 3
          ? '/images/story-4.jpg'
        : id === 4
          ? '/images/story-5.jpg'
        : id === 5
          ? '/images/story-6.jpg'
        : id === 6
          ? '/images/story-7.jpg'
        : id === 7
          ? '/images/story-8.jpg'
        : id === 8
          ? '/images/story-9.jpg'
        : id === 9
          ? '/images/story-10.jpg'
        : id === 10
          ? '/images/story-11.jpg'
        : id === 11
          ? '/images/story-12.jpg'
        : id === 12
          ? '/images/story-13.jpg'
        : id === 13
          ? '/images/story-14.jpg'
        : id === 14
          ? '/images/story-15.jpg'
        : id === 15
          ? '/images/story-16.jpg'
          : id === 16
            ? '/images/story-17.jpg'
          : id === 17
            ? '/images/story-18.jpg'
          : id === 18
            ? '/images/story-19.jpg'
          : id === 19
            ? '/images/story-20.jpg'
            : '/images/story-image.jpg',
  };
});

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const n = Number(id);
  if (!Number.isFinite(n) || n < 1 || n > 20) notFound();

  const page = PAGES[n - 1];
  const prev = n > 1 ? `/story/${n - 1}` : '/valentine';
  const next = n < 20 ? `/story/${n + 1}` : '/final-surprise';

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link className="btn btn-secondary" href={prev}>
            ← Back
          </Link>
          <div className="text-white/90">{n} / 20</div>
          <Link className="btn btn-primary" href={next}>
            Next →
          </Link>
        </div>

        <h2 className="text-4xl font-handwriting text-white drop-shadow mb-4">{page.heading}</h2>
        <p className="text-white/90 text-lg leading-relaxed mb-6">{page.body}</p>
        
        <div className="flex justify-center mb-8">
          <img 
            src={page.image}
            alt="Ett litet minne"
            className="max-w-md rounded-xl shadow-lg border border-white/20"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link className="btn btn-secondary text-center" href="/games">
            Games 🎮
          </Link>
          <Link className="btn btn-secondary text-center" href="/gallery">
            Gallery 📸
          </Link>
          <Link className="btn btn-secondary text-center" href="/countdown">
            Countdown ⏳
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
