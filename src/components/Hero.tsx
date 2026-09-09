import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Sparkles, ArrowRight, Eye, ShieldAlert } from 'lucide-react';

interface HeroProps {
  onOpenJoin: () => void;
  onOpenPosterModal: () => void;
  participantCount: number;
}

export const Hero: React.FC<HeroProps> = ({ onOpenJoin, onOpenPosterModal, participantCount }) => {
  // Countdown to November 19, 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-11-19T09:00:00Z').getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToFestival = () => {
    const el = document.getElementById('festival');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="accueil" className="relative overflow-hidden pt-6 pb-20 md:py-20 lg:py-24 bg-gradient-to-b from-[#140e0a] via-[#1a120c] to-[#140e0a]">
      {/* Subtle tribal geometric backdrop light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#d97706]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#b91c1c]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text & Primary Actions Column (7 cols on desktop) */}
          <div className="lg:col-span-7 text-left space-y-7">
            {/* Cultural Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2a1b12] border border-[#d97706]/40 text-[#f59e0b] text-xs sm:text-sm font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span>Édition Officielle 2026 • Natitingou, Bénin</span>
            </div>

            {/* Official Title */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-[#fbf8f3] leading-[1.12]">
                FECAWA – <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#fbbf24]">Festival des Arts</span> et de la Culture Waama
              </h1>
              <p className="font-script text-2xl sm:text-3xl md:text-4xl text-[#e8c69f] tracking-wide pt-1">
                « La culture nous rassemble »
              </p>
            </div>

            {/* Presentation based strictly on poster info */}
            <p className="text-base sm:text-lg text-[#d1c2b4] max-w-2xl leading-relaxed font-normal">
              Rejoignez la grande célébration des arts vivants, des traditions séculaires et du patrimoine culturel Waama. 
              Trois journées d’immersion authentique au pied de la chaîne de l’Atacora.
            </p>

            {/* Key Information Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#1e150f] border border-[#3d2a1d] text-[#f1e6da] shadow-sm">
                <Calendar className="w-5 h-5 text-[#d97706]" />
                <span className="text-sm sm:text-base font-bold">Du 19 au 21 Novembre 2026</span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#1e150f] border border-[#3d2a1d] text-[#f1e6da] shadow-sm">
                <MapPin className="w-5 h-5 text-[#b91c1c]" />
                <span className="text-sm sm:text-base font-bold">à Natitingou (Bénin)</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="hero-cta-jy-serai"
                onClick={onOpenJoin}
                className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-extrabold text-base sm:text-lg bg-gradient-to-r from-[#d97706] via-[#ea580c] to-[#d97706] text-[#140e0a] shadow-xl shadow-[#d97706]/30 hover:shadow-[#d97706]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                <span>J’Y SERAI</span>
                <span className="px-2 py-0.5 text-xs font-black bg-[#140e0a] text-[#f59e0b] rounded-md uppercase tracking-wider">
                  Moi aussi
                </span>
              </button>

              <button
                id="hero-cta-decouvrir"
                onClick={scrollToFestival}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-base sm:text-lg text-[#fbf8f3] bg-[#22160f] hover:bg-[#2b1c13] border border-[#4a3424] hover:border-[#d97706]/60 transition-all duration-200"
              >
                <span>Découvrir le festival</span>
                <ArrowRight className="w-4 h-4 text-[#d97706]" />
              </button>
            </div>

            {/* Countdown timer */}
            <div className="pt-4 border-t border-[#342419]">
              <div className="text-xs uppercase font-bold tracking-widest text-[#a89887] mb-3">
                Compte à rebours avant l'ouverture du FECAWA 2026 :
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md">
                {[
                  { label: 'Jours', value: timeLeft.days },
                  { label: 'Heures', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Secondes', value: timeLeft.seconds },
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#1c130d] border border-[#3b281b] rounded-xl py-2 px-1 text-center">
                    <span className="block text-xl sm:text-2xl font-black font-display text-[#f59e0b]">
                      {item.value}
                    </span>
                    <span className="text-[10px] sm:text-xs text-[#a89887] font-medium uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live participation callout */}
            <div className="flex items-center gap-3 text-sm text-[#c4b5a5]">
              <div className="flex -space-x-2 overflow-hidden">
                <span className="inline-block w-8 h-8 rounded-full border-2 border-[#140e0a] bg-[#d97706] text-center leading-7 text-xs font-bold text-[#140e0a]">
                  W
                </span>
                <span className="inline-block w-8 h-8 rounded-full border-2 border-[#140e0a] bg-[#ea580c] text-center leading-7 text-xs font-bold text-white">
                  A
                </span>
                <span className="inline-block w-8 h-8 rounded-full border-2 border-[#140e0a] bg-[#15803d] text-center leading-7 text-xs font-bold text-white">
                  M
                </span>
              </div>
              <span>
                <strong className="text-[#f59e0b] font-bold">{participantCount} personnes</strong> ont déjà confirmé leur présence !
              </span>
            </div>
          </div>

          {/* Official Poster Display Column (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl p-3 bg-gradient-to-br from-[#d97706]/40 via-[#3d2a1d] to-[#1a120c] shadow-2xl shadow-black/80 group">
              
              {/* The Poster Container (High-Resolution Representation matching exact poster layout) */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white shadow-inner select-none">
                
                {/* Left side: dark strip with watermark */}
                <div className="absolute top-0 bottom-0 left-0 w-[22%] bg-[#1b120c] flex flex-col justify-around items-center py-4 opacity-95">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="w-8 h-8 rounded-full border border-[#d97706]/30 flex items-center justify-center opacity-40">
                      <span className="text-[7px] font-black text-[#d97706]">FCW</span>
                    </div>
                  ))}
                </div>

                {/* Left center: Participant spot with white card and "j'y serai" */}
                <div 
                  onClick={onOpenJoin}
                  className="absolute top-[16%] left-[6%] w-[38%] h-[68%] rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-gradient-to-b from-[#2d1e14] to-[#1a110a] cursor-pointer group/card transition-transform duration-300 hover:scale-[1.03]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80"
                    alt="Participant officiel exemple"
                    className="w-full h-full object-cover group-hover/card:brightness-105 transition-all"
                    referrerPolicy="no-referrer"
                  />
                  {/* "j'y serai" badge on card */}
                  <div className="absolute bottom-0 left-0 bg-white pt-1 pb-1.5 px-3 rounded-tr-xl shadow-md">
                    <span className="font-script text-lg sm:text-xl font-bold text-[#1b120c] block -rotate-3">
                      j’y serai
                    </span>
                  </div>

                  {/* Hover interactive prompt */}
                  <div className="absolute inset-0 bg-[#140e0a]/60 opacity-0 group-hover/card:opacity-100 flex flex-col items-center justify-center p-2 text-center transition-opacity">
                    <Sparkles className="w-6 h-6 text-[#f59e0b] mb-1 animate-bounce" />
                    <span className="text-white text-[11px] font-extrabold leading-tight">
                      Mets TA photo ici !
                    </span>
                  </div>
                </div>

                {/* Right side: Official Festival visual elements */}
                <div className="absolute top-0 right-0 w-[60%] h-full flex flex-col items-center justify-between py-5 px-3 text-center">
                  {/* Official Logo (Complete with emblem, typography & cowries) */}
                  <div className="w-full flex-1 flex items-center justify-center p-1">
                    <img
                      src="/fecawa-official-logo.jpg"
                      alt="Logo officiel FECAWA"
                      className="max-w-[88%] max-h-[195px] sm:max-h-[225px] object-contain drop-shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Dates & Lieu */}
                  <div className="space-y-0.5 pt-1">
                    <div className="text-[12px] sm:text-[14px] font-black text-[#1b120c]">
                      Du 19 au 21 Novembre 2026
                    </div>
                    <div className="text-[13px] sm:text-[15px] font-black text-[#1b120c]">
                      à Natitingou
                    </div>
                  </div>

                  {/* Slogan */}
                  <div className="font-script text-base sm:text-xl font-bold text-[#1b120c] pt-0.5">
                    La culture nous rassemble
                  </div>
                </div>

              </div>

              {/* View poster full-screen overlay button */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <button
                  onClick={onOpenPosterModal}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#1e150f] text-[#fbf8f3] border border-[#4a3424] hover:border-[#d97706] shadow-xl hover:scale-105 transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-[#d97706]" />
                  <span>Agrandir l’affiche officielle</span>
                </button>
              </div>

            </div>

            <p className="text-xs text-[#a89887] text-center mt-7 max-w-xs">
              Affiche officielle de référence • Natitingou 2026
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
