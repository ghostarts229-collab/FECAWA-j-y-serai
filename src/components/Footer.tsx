import React from 'react';
import { ShieldCheck, Heart, Sparkles, MapPin, Calendar } from 'lucide-react';

interface FooterProps {
  onOpenJoin: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenJoin, onOpenAdmin }) => {
  return (
    <footer className="bg-[#0f0a07] border-t border-[#2d1e14] text-[#b8a796] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#24170f]">
          
          {/* Col 1: Brand & Slogan (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#d97706] bg-[#ffffff] flex-shrink-0 p-0.5">
                <img
                  src="/fecawa-official-logo.jpg"
                  alt="Logo officiel FECAWA"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-black text-xl text-[#fbf8f3] tracking-wider">
                FECAWA 2026
              </span>
            </div>

            <h3 className="font-bold text-base text-[#fbf8f3]">
              FECAWA – Festival des Arts et de la Culture Waama
            </h3>

            <p className="font-script text-2xl text-[#f59e0b]">
              « La culture nous rassemble »
            </p>

            <p className="text-xs text-[#8f7e70] leading-relaxed max-w-sm">
              Grand rendez-vous culturel, artistique et patrimonial célébrant les arts, la musique, les danses sacrées et les traditions séculaires du peuple Waama.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-[#c4b5a5]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#d97706]" />
                19 au 21 Nov 2026
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#b91c1c]" />
                Natitingou (Bénin)
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Rapide (3 cols) */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-[#fbf8f3]">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#accueil" className="hover:text-[#f59e0b] transition-colors">
                  Accueil du festival
                </a>
              </li>
              <li>
                <a href="#festival" className="hover:text-[#f59e0b] transition-colors">
                  Le Festival & Traditions
                </a>
              </li>
              <li>
                <a href="#jy-serai" className="hover:text-[#f59e0b] transition-colors">
                  Participer : « J’Y SERAI »
                </a>
              </li>
              <li>
                <a href="#participants" className="hover:text-[#f59e0b] transition-colors">
                  Galerie des Festivaliers
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#f59e0b] transition-colors">
                  Contact & Renseignements
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Engagement & Action (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-[#fbf8f3]">
              Rejoindre le mouvement
            </h4>
            <p className="text-xs text-[#8f7e70] leading-relaxed">
              Ajoutez votre photo dès aujourd'hui, générez votre affiche personnalisée et partagez-la sur WhatsApp et les réseaux sociaux.
            </p>
            <button
              onClick={onOpenJoin}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-black text-xs bg-[#d97706] text-[#140e0a] hover:bg-[#f59e0b] shadow-lg transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>AJOUTER MA PHOTO : « J’Y SERAI »</span>
            </button>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6e5e51]">
          <p>
            © 2026 FECAWA – Festival des Arts et de la Culture Waama. Tous droits réservés.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-[#8f7e70] hover:text-[#d97706] transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Accès Organisateur</span>
            </button>
            <span>•</span>
            <span>Natitingou • Bénin</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
