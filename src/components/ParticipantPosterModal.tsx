import React, { useState, useEffect } from 'react';
import { X, Download, Share2, MessageCircle, Facebook, Copy, Check, RefreshCw } from 'lucide-react';
import { Participant } from '../types';
import { generateFecawaPoster } from '../utils/imageUtils';

interface ParticipantPosterModalProps {
  participant: Participant | null;
  onClose: () => void;
}

export const ParticipantPosterModal: React.FC<ParticipantPosterModalProps> = ({ participant, onClose }) => {
  const [posterUrl, setPosterUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!participant) {
      setPosterUrl('');
      return;
    }

    if (participant.posterUrl) {
      setPosterUrl(participant.posterUrl);
      setLoading(false);
      return;
    }

    setLoading(true);
    generateFecawaPoster({
      photoUrl: participant.photoUrl,
      name: participant.name,
      zoom: 1,
    })
      .then((url) => {
        setPosterUrl(url);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Poster generation failed:', err);
        setLoading(false);
      });
  }, [participant]);

  if (!participant) return null;

  const handleDownload = () => {
    if (!posterUrl) return;
    const safeName = participant.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const link = document.createElement('a');
    link.download = `FECAWA_2026_JY_SERAI_${safeName}.jpg`;
    link.href = posterUrl;
    link.click();
  };

  const shareText = `${participant.name} sera au FECAWA du 19 au 21 Novembre 2026 à Natitingou ! Rejoins la célébration : ${window.location.href}`;

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#1d140e] border-2 border-[#4a3221] rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3b271b] bg-[#160e0a]">
          <div>
            <h3 className="font-display font-black text-lg text-[#fbf8f3]">
              Affiche de {participant.name}
            </h3>
            <p className="text-xs text-[#a89887]">
              {participant.city ? `${participant.city} • ` : ''}Confirmé(e) pour le FECAWA 2026
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#a89887] hover:text-[#fbf8f3] hover:bg-[#2c1d13] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Poster Canvas Display */}
        <div className="p-6 space-y-5 text-center">
          <div className="relative max-w-md mx-auto aspect-square rounded-2xl overflow-hidden border border-[#d97706]/40 shadow-2xl bg-white">
            {loading ? (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-zinc-600 bg-zinc-100">
                <RefreshCw className="w-8 h-8 animate-spin text-[#d97706]" />
                <span className="text-xs font-bold">Génération haute définition...</span>
              </div>
            ) : posterUrl ? (
              <img
                src={posterUrl}
                alt={`Affiche FECAWA de ${participant.name}`}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500">
                Aperçu non disponible
              </div>
            )}
          </div>

          {/* Download & Share Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleDownload}
              disabled={loading || !posterUrl}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-extrabold text-sm bg-gradient-to-r from-[#d97706] to-[#ea580c] text-[#140e0a] shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger l’affiche HD</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-[#25D366] text-white hover:bg-[#20ba59] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleFacebook}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm bg-[#1877F2] text-white hover:bg-[#166fe5] transition-all"
              title="Partager sur Facebook"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
            </button>
          </div>

          {/* Copy message button */}
          <div className="pt-1">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs text-[#d97706] hover:text-[#f59e0b] font-bold py-1 px-3 rounded-lg hover:bg-[#2a1a12] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Message copié !' : 'Copier le lien & texte d’invitation'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
