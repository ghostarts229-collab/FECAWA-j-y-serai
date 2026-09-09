import React from 'react';
import { Calendar, MapPin, Sparkles, Award, Shield, Music, Compass, ChevronRight } from 'lucide-react';

interface AboutFestivalProps {
  onOpenJoin: () => void;
}

export const AboutFestival: React.FC<AboutFestivalProps> = ({ onOpenJoin }) => {
  // Information structured and clearly editable as required
  const festivalSymbols = [
    {
      title: 'Le Guerrier et la Dignité Waama',
      description:
        'Au centre de l’emblème officiel, le personnage en habit traditionnel illustre la bravoure, la noblesse et l’identité intemporelle du peuple Waama.',
      icon: Shield,
    },
    {
      title: 'Le Chasse-Mouche Rituel',
      description:
        'Tenu avec fierté, cet attribut sacré rythme les danses initiatiques et symbolise l’autorité coutumière, la paix et la bénédiction ancestrale.',
      icon: Award,
    },
    {
      title: 'Les Trois Cauris Emblématiques',
      description:
        'Disposés sous le logo officiel, les cauris incarnent la richesse spirituelle, la prospérité, l’hospitalité chaleureuse et l’authenticité africaine.',
      icon: Sparkles,
    },
    {
      title: 'Le Tambour et les Rythmes de l’Atacora',
      description:
        'Les percussions sacrées convoquent la mémoire des ancêtres et font vibrer les vallées et collines de Natitingou dans une allégresse partagée.',
      icon: Music,
    },
  ];

  // Modifiable program structure for official announcements
  const programPillars = [
    {
      day: 'Jour 1 • 19 Nov 2026',
      title: 'Ouverture Solennelle & Parades',
      summary: 'Arrivée des délégations, bénédiction rituelle des sages, grande parade carnavalesque dans les rues de Natitingou et ouverture du village artisanal.',
      tag: 'Cérémonie & Rituels',
    },
    {
      day: 'Jour 2 • 20 Nov 2026',
      title: 'Danses Sacrées & Gastronomie',
      summary: 'Compétitions de danses traditionnelles Waama, foire des mets du terroir, ateliers de transmission pour les jeunes et causeries patrimoniales.',
      tag: 'Traditions & Terroir',
    },
    {
      day: 'Jour 3 • 21 Nov 2026',
      title: 'Grand Concert de Clôture',
      summary: 'Gala culturel, remise des prix aux artistes et artisans d’excellence, et méga-concert réunissant les plus grands chantres de la musique Waama.',
      tag: 'Grande Scène',
    },
  ];

  return (
    <section id="festival" className="py-20 md:py-24 bg-[#18100b] relative overflow-hidden border-t border-[#342419]">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#d97706]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2a1a11] border border-[#d97706]/40 text-[#f59e0b] text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Présentation Officielle</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#fbf8f3] tracking-tight">
            LE FESTIVAL <span className="text-[#f59e0b]">FECAWA</span>
          </h2>

          <p className="font-script text-2xl sm:text-3xl text-[#e8c69f]">
            « La culture nous rassemble »
          </p>

          <p className="text-base sm:text-lg text-[#c4b5a5] leading-relaxed">
            Le <strong>Festival des Arts et de la Culture Waama (FECAWA)</strong> est la plus prestigieuse 
            vitrine culturelle dédiée à la sauvegarde, la valorisation et la célébration vivante du génie artistique 
            et des traditions du peuple Waama à Natitingou.
          </p>
        </div>

        {/* Key Official Facts Card */}
        <div className="bg-[#20140d] border border-[#3d291b] rounded-3xl p-6 sm:p-8 md:p-10 mb-16 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-[#382417]">
            <div className="space-y-2 pb-4 md:pb-0 md:pr-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#d97706]">Événement</span>
              <h3 className="text-xl font-black text-[#fbf8f3]">FECAWA 2026</h3>
              <p className="text-xs sm:text-sm text-[#a89887]">
                Festival des Arts et de la Culture Waama, berceau de fraternité et de communion intergénérationnelle.
              </p>
            </div>

            <div className="space-y-2 py-4 md:py-0 md:px-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#d97706]">Dates Officielles</span>
              <h3 className="text-xl font-black text-[#fbf8f3]">Du 19 au 21 Novembre 2026</h3>
              <p className="text-xs sm:text-sm text-[#a89887]">
                Trois jours intenses de festivités, de partage, de spectacles vivants et de ferveur populaire.
              </p>
            </div>

            <div className="space-y-2 pt-4 md:pt-0 md:pl-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#d97706]">Lieu Officiel</span>
              <h3 className="text-xl font-black text-[#fbf8f3]">Natitingou, Bénin</h3>
              <p className="text-xs sm:text-sm text-[#a89887]">
                Capitale de l’Atacora, au cœur des paysages grandioses et de l'hospitalité légendaire du peuple Waama.
              </p>
            </div>
          </div>
        </div>

        {/* The 4 Cultural Symbols from the Official Poster */}
        <div className="space-y-6 mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-black font-display text-[#fbf8f3]">
                Logo & Symboles de l’Événement Officiel
              </h3>
              <p className="text-sm text-[#a89887] mt-1">
                L’identité visuelle officielle du FECAWA traduit fidèlement les valeurs fondamentales de la communauté Waama.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-[#24170f] border border-[#442c1d] rounded-2xl px-4 py-2.5">
              <img
                src="/fecawa-official-logo.jpg"
                alt="Logo officiel FECAWA"
                className="w-12 h-12 object-contain bg-white rounded-lg p-0.5 shadow-sm"
              />
              <div>
                <div className="text-xs font-black text-[#fbf8f3]">Logo Officiel FECAWA</div>
                <div className="text-[11px] text-[#f59e0b]">Source de vérité & identité sacrée</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {festivalSymbols.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#1e130c] border border-[#3b271b] hover:border-[#d97706]/50 rounded-2xl p-6 space-y-3 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#d97706]/15 border border-[#d97706]/30 flex items-center justify-center text-[#f59e0b]">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-[#fbf8f3]">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-[#b8a796] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modifiable Program Overview */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h3 className="text-2xl font-black font-display text-[#fbf8f3]">
                Programme Prévisionnel des 3 Jours
              </h3>
              <p className="text-sm text-[#a89887] mt-1">
                Aperçu des grands temps forts du FECAWA 2026 à Natitingou.
              </p>
            </div>
            <button
              onClick={onOpenJoin}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#f59e0b] hover:underline"
            >
              <span>Participer au programme avec « J’Y SERAI »</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {programPillars.map((prog, idx) => (
              <div
                key={idx}
                className="bg-[#20140d] border border-[#3f2b1d] rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-[#d97706]/50 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#d97706] tracking-wide">
                      {prog.day}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#332014] text-[#e5d5c5] border border-[#4d3221]">
                      {prog.tag}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-[#fbf8f3]">{prog.title}</h4>
                  <p className="text-xs sm:text-sm text-[#b8a796] leading-relaxed">
                    {prog.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#311f14] text-[11px] text-[#8f7d6e]">
                  Lieu : Natitingou (Espaces officiels du festival)
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
