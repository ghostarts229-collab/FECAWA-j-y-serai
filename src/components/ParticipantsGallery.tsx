import React, { useState } from 'react';
import { Search, Heart, Sparkles, Filter, Eye, UserPlus } from 'lucide-react';
import { Participant } from '../types';

interface ParticipantsGalleryProps {
  participants: Participant[];
  onOpenJoin: () => void;
  onSelectParticipant: (p: Participant) => void;
}

export const ParticipantsGallery: React.FC<ParticipantsGalleryProps> = ({
  participants,
  onOpenJoin,
  onSelectParticipant,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Only display approved participants in public gallery
  const publicParticipants = participants.filter(
    (p) => p.status === 'approved' || p.status === undefined
  );

  const filteredParticipants = publicParticipants.filter((p) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      p.name.toLowerCase().includes(term) ||
      (p.city && p.city.toLowerCase().includes(term))
    );
  });

  return (
    <section id="participants" className="py-20 md:py-24 bg-[#140e0a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#24170f] border border-[#d97706]/40 text-[#f59e0b] text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Communauté des Festivaliers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#fbf8f3] tracking-tight">
            ILS ONT DIT : <span className="text-[#f59e0b]">« J’Y SERAI ! »</span>
          </h2>

          <p className="text-base sm:text-lg text-[#c4b5a5]">
            Déjà <strong className="text-[#f59e0b] font-bold">{publicParticipants.length} festivaliers</strong> ont officialisé leur présence. 
            Rejoins la galerie officielle et fais flotter l'étendard de la culture Waama !
          </p>

          {/* Search bar & Add CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8f7e70]" />
              <input
                type="text"
                placeholder="Rechercher un participant ou une ville..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#1d140e] border border-[#3f2a1b] text-[#fbf8f3] placeholder-[#8f7e70] focus:outline-none focus:border-[#d97706] text-sm"
              />
            </div>

            <button
              onClick={onOpenJoin}
              className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black text-sm bg-[#d97706] text-[#140e0a] hover:bg-[#f59e0b] shadow-lg hover:scale-105 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>Moi aussi</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid (Mobile: 2 cols, Tablet: 3 cols, Desktop: 4 to 5 cols) */}
        {filteredParticipants.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
            {filteredParticipants.map((participant) => (
              <div
                key={participant.id}
                onClick={() => onSelectParticipant(participant)}
                className="group relative bg-[#1c130d] border border-[#3b271b] hover:border-[#d97706]/70 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#d97706]/10 transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Square Photo with Smooth Rounded Top */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#24170f]">
                  <img
                    src={participant.photoUrl}
                    alt={participant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140e0a] via-transparent to-transparent opacity-80" />

                  {/* "J'Y SERAI" Badge in bottom-left */}
                  <div className="absolute bottom-2 left-2 bg-[#ffffff] text-[#140e0a] px-2.5 py-0.5 rounded-lg shadow-md flex items-center gap-1">
                    <span className="font-script text-sm sm:text-base font-extrabold -rotate-2">
                      j’y serai
                    </span>
                  </div>

                  {/* Hover view overlay icon */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm p-1.5 rounded-full text-[#f59e0b]">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#fbf8f3] group-hover:text-[#f59e0b] transition-colors truncate">
                      {participant.name}
                    </h3>
                    {participant.city && (
                      <p className="text-xs text-[#a89887] truncate">
                        {participant.city}
                      </p>
                    )}
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#312015] flex items-center justify-between text-[10px] text-[#8a796a]">
                    <span>{participant.role || 'Festivalier'}</span>
                    <span className="text-[#d97706] font-semibold">Voir affiche →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty search state */
          <div className="text-center py-16 bg-[#1b120c] rounded-3xl border border-[#3b271b] p-8 max-w-md mx-auto space-y-4">
            <Heart className="w-12 h-12 text-[#d97706]/40 mx-auto" />
            <h4 className="text-lg font-bold text-[#fbf8f3]">Aucun participant trouvé</h4>
            <p className="text-xs text-[#a89887]">
              Aucun résultat pour « {searchTerm} ». Sois le premier de ta ville à t'enregistrer !
            </p>
            <button
              onClick={onOpenJoin}
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#d97706] text-[#140e0a]"
            >
              Ajouter ma photo
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
