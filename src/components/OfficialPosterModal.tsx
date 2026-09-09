import React from 'react';
import { X, Download, Share2, Sparkles, MapPin, Calendar } from 'lucide-react';

interface OfficialPosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenJoin: () => void;
}

export const OfficialPosterModal: React.FC<OfficialPosterModalProps> = ({ isOpen, onClose, onOpenJoin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#1a110a] border-2 border-[#4a3221] rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3b271b] bg-[#140e08]">
          <div>
            <h3 className="font-display font-black text-lg text-[#fbf8f3]">
              Affiche Officielle du FECAWA 2026
            </h3>
            <p className="text-xs text-[#a89887]">
              Festival des Arts et de la Culture Waama • Natitingou
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#a89887] hover:text-[#fbf8f3] hover:bg-[#2c1d13] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Poster Visual Presentation */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="relative max-w-xl mx-auto aspect-square rounded-2xl overflow-hidden border-2 border-[#d97706]/50 shadow-2xl bg-white select-none">
            
            {/* Left strip */}
            <div className="absolute top-0 bottom-0 left-0 w-[22%] bg-[#1b120c] flex flex-col justify-around items-center py-6 opacity-95">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="w-10 h-10 rounded-full border border-[#d97706]/30 flex items-center justify-center opacity-45">
                  <span className="text-[8px] font-black text-[#d97706]">FCW</span>
                </div>
              ))}
            </div>

            {/* Left center: Sample participant card */}
            <div className="absolute top-[16%] left-[6%] w-[38%] h-[68%] rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-gradient-to-b from-[#2d1e14] to-[#1a110a]">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80"
                alt="Participant officiel exemple"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* "j'y serai" tag on card */}
              <div className="absolute bottom-0 left-0 bg-white pt-1 pb-1.5 px-3 rounded-tr-xl shadow-md">
                <span className="font-script text-xl font-bold text-[#1b120c] block -rotate-3">
                  j’y serai
                </span>
              </div>
            </div>

            {/* Right side: Official Festival visual elements */}
            <div className="absolute top-0 right-0 w-[60%] h-full flex flex-col items-center justify-between py-6 px-4 text-center">
              
              {/* Official Logo (Complete with emblem, typography & cowries) */}
              <div className="w-full flex-1 flex items-center justify-center p-2">
                <img
                  src="/fecawa-official-logo.jpg"
                  alt="Logo officiel FECAWA"
                  className="max-w-[90%] max-h-[260px] sm:max-h-[300px] object-contain drop-shadow-sm"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Dates & Lieu */}
              <div className="space-y-1 pt-2">
                <div className="text-base sm:text-lg font-black text-[#1b120c]">
                  Du 19 au 21 Novembre 2026
                </div>
                <div className="text-lg sm:text-xl font-black text-[#1b120c]">
                  à Natitingou
                </div>
              </div>

              {/* Slogan */}
              <div className="font-script text-2xl sm:text-3xl font-bold text-[#1b120c] pt-1">
                La culture nous rassemble
              </div>
            </div>

          </div>

          {/* Details below poster */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#342419]">
            <div className="text-xs text-[#b8a796] space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 font-bold text-[#fbf8f3]">
                <Calendar className="w-4 h-4 text-[#d97706]" />
                <span>19 – 21 Novembre 2026</span>
                <span className="mx-1">•</span>
                <MapPin className="w-4 h-4 text-[#b91c1c]" />
                <span>Natitingou, Bénin</span>
              </div>
              <p>Source de vérité visuelle et identitaire du festival.</p>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenJoin();
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm bg-gradient-to-r from-[#d97706] to-[#ea580c] text-[#140e0a] shadow-lg hover:scale-105 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Créer mon affiche « J'Y SERAI »</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
