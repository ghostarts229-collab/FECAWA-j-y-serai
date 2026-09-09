import React from 'react';
import { Camera, Sparkles, CheckCircle2, Share2, Download } from 'lucide-react';

interface JoinSectionProps {
  onOpenJoin: () => void;
  participantCount: number;
}

export const JoinSection: React.FC<JoinSectionProps> = ({ onOpenJoin, participantCount }) => {
  return (
    <section id="jy-serai" className="py-20 md:py-24 bg-[#18100b] relative overflow-hidden border-y border-[#342419]">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#d97706]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#b91c1c]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-[#23170f] via-[#1d130c] to-[#160e09] border-2 border-[#453022] rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden">
          
          {/* Decorative cowrie badge */}
          <div className="flex items-center justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#362114] border border-[#d97706]/40 text-[#f59e0b] text-xs sm:text-sm font-extrabold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-[#f59e0b]" />
              Mobilisation Générale Festival 2026
            </span>
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#fbf8f3] tracking-tight">
              J’Y SERAI ! <span className="text-[#f59e0b]">Et toi ?</span>
            </h2>

            <p className="text-base sm:text-xl text-[#d5c6b7] leading-relaxed">
              Le peuple Waama, les artistes, les gardiens des traditions et les amis de la culture se donnent 
              rendez-vous à Natitingou du 19 au 21 Novembre 2026. <br className="hidden sm:inline" />
              <strong>Affirme ta fierté, rejoins la communauté visuelle des festivaliers et obtiens ton affiche personnalisée !</strong>
            </p>

            {/* 3 Step visual process */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
              <div className="bg-[#2a1a11]/80 border border-[#4a3222] rounded-2xl p-4 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#d97706] text-[#140e0a] font-black text-sm flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#fbf8f3]">J’appuie sur J’Y SERAI</h4>
                  <p className="text-xs text-[#b8a695] mt-0.5">Accède au formulaire rapide et sécurisé.</p>
                </div>
              </div>

              <div className="bg-[#2a1a11]/80 border border-[#4a3222] rounded-2xl p-4 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#d97706] text-[#140e0a] font-black text-sm flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#fbf8f3]">J’ajoute ma photo & mon nom</h4>
                  <p className="text-xs text-[#b8a695] mt-0.5">Depuis ton smartphone ou ton PC.</p>
                </div>
              </div>

              <div className="bg-[#2a1a11]/80 border border-[#4a3222] rounded-2xl p-4 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#d97706] text-[#140e0a] font-black text-sm flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#fbf8f3]">Je télécharge & partage</h4>
                  <p className="text-xs text-[#b8a695] mt-0.5">Mon affiche officielle sur WhatsApp & Facebook.</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="btn-ajouter-ma-photo"
                onClick={onOpenJoin}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black text-lg bg-gradient-to-r from-[#d97706] via-[#ea580c] to-[#d97706] text-[#140e0a] shadow-2xl shadow-[#d97706]/40 hover:shadow-[#d97706]/60 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Camera className="w-6 h-6 text-[#140e0a]" />
                <span>Ajouter ma photo</span>
                <span className="px-2 py-0.5 text-xs font-black bg-[#140e0a] text-[#f59e0b] rounded">
                  J’Y SERAI !
                </span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-[#a89887]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                Gratuit & immédiat
              </span>
              <span className="flex items-center gap-1.5">
                <Download className="w-4 h-4 text-[#f59e0b]" />
                Téléchargement direct HD (1200x1200px)
              </span>
              <span className="flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-[#38bdf8]" />
                Partage en 1 clic sur WhatsApp
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
