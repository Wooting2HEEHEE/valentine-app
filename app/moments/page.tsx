import AppShell from '@/app/components/AppShell';

export default function MomentsPage() {
  const moments = [
    {
      title: "Dagen Vi Träffades",
      date: "November 1 2025",
      description: "Dagen som ändrade våra liv, du var min första känsla av kärlek och jag visste direkt att du skulle bli min fru från dagen jag såg dig. Kramen som varade så länge mitt i regnet, pussarna från händerna till kinderna. Det var kul att vara med dig i Malmö, starta äventyret med dig och att jag började älska dig på ett nytt sätt efter den dagen. Tack för allt Muzhda jan, jigaram.",
      type: "milestone"
    },
    {
      title: "Första Dejten Tillsammans",
      date: "November 7 2025", 
      description: "Timmar flög förbi som minuter. Då visste jag att jag kunde prata med dig för evigt. Vi yappade så fritt och vi var så glada över att vi fick en träff bara 6 dagar efter den första. Det var även då du fick ditt första brev från mig.",
      type: "date"
    },
    {
      title: "Vår första sushi date",
      date: "29 november 2025",
      description: "Denna dagen var vi i Hyllinge, vi hade så tråkigt i Hyllinge för vi väntade bara på maten men som tur hittade vi något att göra, som att bli tomtar tillsammans i nån dollarstore.",
      type: "adventure"
    },
    {
      title: "Sena Natt Samtal",
      date: "TYP ALLTID?",
      description: "Jag älskar att somna på samtal med dig, att plugga med dig, att prata med dig på bussen, när du har tid och när vi gör saker så vi inte kan ses men vi hittar alltid tid att prata med varandra.",
      type: "intimate"
    },
    {
      title: "Överraskningen på din och min födelsedag",
      date: "November 25 och Februari 3",
      description: "Jag kommer ihåg första gången du gav mig en present, du försökte så gärna tända en sticka som inte gick, och gav mig en påse full av kärlek, jag kände mig som om jag blev vald varje gång av dig. Dina presenter var så meningsfulla och bra. Jag ville verkligen visa hur mycket jag uppskattar och älskar dig, därför började jag både planera med din marwish och planera hela dagen. För jag vill alltid bevisa att jag älskar dig mycket mer ;-)",
      type: "surprise"
    },
    {
      title: "Kristianstad",
      date: "13 December 2025",
      description: "Vi upptäckte C4, en skön Khai & Mui, en fin liten gång och plats där vi kunde ta bilder där det fanns enomrt många speglar. Din fina parfym, dina kläder som matchade så bra och vi matchade också fast vi var legit motsatta. Där du hade vitt jag hade svart o andra hållet också. Det var kul att besöka kristianstad med bigboy, även om den börja tjuta sen när vi var tbx i markaryd. Tyvärr kommer ingen någonsin kunna ta Marshmallows plats. ",
      type: "fun"
    },
    {
      title: "Första Polisstopp",
      date: "6 Januari 2026",
      description: "Vi träffades lite spontant och hade hittat en så skön position, där vi var jätte bekväma men ändå där vi glömde tiden. Det var då vi ser helljus bakom oss. Någon hade ringt polisen HAHAHA. Det var så roligt att bara uppleva dedär me dig och det kommer för evigt vara en av de roligaste minnen jag har med dig. De kom i så bra tid att det var dags att gå hem. Tyvärr tar alltid våra träffar slut. Jag längtar tills dagen jag aldrig behöver säga hejdå till dig igen. ",
      type: "surprise"
    }
  ];

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-handwriting text-white drop-shadow mb-6">Speciella Ögonblick ✨</h2>
        <p className="text-white/80 mb-8 text-lg">
          En tidslinje av vackra ögonblick som har format vår resa tillsammans.
        </p>

        <div className="space-y-6">
          {moments.map((moment, index) => (
            <MomentCard key={index} moment={moment} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block p-6 rounded-xl bg-white/10 border border-white/20">
            <p className="text-white/90 text-lg mb-2">
              "Och så många fler ögonblick som kommer..."
            </p>
            <p className="text-white/70 italic">
              Varje dag med dig blir ett nytt favoritminne.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function MomentCard({ moment }: { moment: any }) {
  const getIcon = (type: string) => {
    switch(type) {
      case 'milestone': return '🎯';
      case 'date': return '☕';
      case 'adventure': return '🌧️';
      case 'intimate': return '🌙';
      case 'surprise': return '🎁';
      case 'fun': return '🍳';
      default: return '💫';
    }
  };

  return (
    <div className="card bg-white/10 border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="text-3xl">{getIcon(moment.type)}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-handwriting text-white">{moment.title}</h3>
            <span className="text-white/60 text-sm italic">{moment.date}</span>
          </div>
          <p className="text-white/80 leading-relaxed">{moment.description}</p>
        </div>
      </div>
    </div>
  );
}
