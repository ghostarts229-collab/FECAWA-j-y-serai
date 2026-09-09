import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Upload, Camera, ZoomIn, Check, Download, 
  Share2, MessageCircle, Facebook, Copy, CheckCircle2, AlertCircle, RefreshCw
} from 'lucide-react';
import { Participant } from '../types';
import { validateImageFile, compressAndReadFile, generateFecawaPoster } from '../utils/imageUtils';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onParticipantAdded: (newParticipant: Participant) => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose, onParticipantAdded }) => {
  const [step, setStep] = useState<'upload' | 'adjust' | 'success'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [zoom, setZoom] = useState<number>(1);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [consent, setConsent] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [generatedPosterUrl, setGeneratedPosterUrl] = useState<string>('');
  const [createdParticipant, setCreatedParticipant] = useState<Participant | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset modal when opened
  useEffect(() => {
    if (isOpen) {
      setStep('upload');
      setSelectedFile(null);
      setPhotoPreview('');
      setName('');
      setCity('');
      setZoom(1);
      setOffsetX(0);
      setOffsetY(0);
      setErrorMessage('');
      setGeneratedPosterUrl('');
      setCreatedParticipant(null);
      setCopiedLink(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileChange = async (file: File) => {
    setErrorMessage('');
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Fichier invalide');
      return;
    }

    try {
      setIsProcessing(true);
      const compressedDataUrl = await compressAndReadFile(file);
      setSelectedFile(file);
      setPhotoPreview(compressedDataUrl);
      setStep('adjust');
    } catch (err) {
      setErrorMessage('Erreur lors du traitement de l\'image. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleConfirmParticipation = async () => {
    if (!photoPreview) {
      setErrorMessage('Veuillez ajouter une photo.');
      return;
    }

    if (!consent) {
      setErrorMessage('Veuillez accepter les conditions de publication de votre photo.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      // Generate HD custom poster
      const posterDataUrl = await generateFecawaPoster({
        photoUrl: photoPreview,
        name: name.trim() || 'Festivalier Waama',
        zoom,
        offsetX,
        offsetY,
      });

      setGeneratedPosterUrl(posterDataUrl);

      const newPart: Participant = {
        id: `part-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        name: name.trim() || 'Festivalier Waama',
        city: city.trim() || 'Natitingou',
        photoUrl: photoPreview,
        posterUrl: posterDataUrl,
        status: 'approved', // Auto-moderated to approved, with admin override
        createdAt: new Date().toISOString(),
        role: 'Festivalier confirmé',
      };

      setCreatedParticipant(newPart);
      onParticipantAdded(newPart);
      setStep('success');
    } catch (err) {
      console.error(err);
      setErrorMessage('Erreur lors de la génération de l\'affiche. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadPoster = () => {
    if (!generatedPosterUrl) return;
    const link = document.createElement('a');
    const safeName = (name.trim() || 'festivalier').toLowerCase().replace(/[^a-z0-9]/g, '_');
    link.download = `FECAWA_2026_JY_SERAI_${safeName}.jpg`;
    link.href = generatedPosterUrl;
    link.click();
  };

  const shareText = `Moi aussi j'y serai au FECAWA (Festival des Arts et de la Culture Waama) du 19 au 21 Novembre 2026 à Natitingou ! Rejoins le mouvement et crée ton affiche officielle ici : ${window.location.href}`;

  const handleShareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#1d140e] border-2 border-[#4a3221] rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3b271b] bg-[#170f0a]">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-[#d97706]/20 border border-[#d97706]/40 flex items-center justify-center text-[#f59e0b] font-black text-sm">
              FCW
            </span>
            <div>
              <h3 className="font-display font-black text-lg text-[#fbf8f3]">
                {step === 'success' ? 'Ton affiche est prête !' : 'Confirmer ma participation : « J’Y SERAI »'}
              </h3>
              <p className="text-xs text-[#a89887]">
                FECAWA 2026 • 19 au 21 Novembre 2026 à Natitingou
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#a89887] hover:text-[#fbf8f3] hover:bg-[#2c1d13] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {errorMessage && (
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-950/70 border border-red-800/80 text-red-200 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: UPLOAD */}
          {step === 'upload' && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h4 className="text-xl font-black font-display text-[#fbf8f3]">
                  Ajoute ta photo pour rejoindre la communauté
                </h4>
                <p className="text-sm text-[#c4b5a5] max-w-md mx-auto">
                  Prends un selfie ou choisis ta plus belle photo depuis ton smartphone ou ordinateur.
                </p>
              </div>

              {/* Upload Dropzone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="group border-2 border-dashed border-[#573b28] hover:border-[#d97706] bg-[#231710]/60 hover:bg-[#2a1a12] rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileChange(e.target.files[0]);
                    }
                  }}
                />

                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#d97706]/15 border border-[#d97706]/30 flex items-center justify-center text-[#f59e0b] group-hover:scale-110 transition-transform">
                  <Camera className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <p className="text-base font-bold text-[#fbf8f3]">
                    Clique pour choisir ta photo ou glisse-la ici
                  </p>
                  <p className="text-xs text-[#a89887]">
                    Formats acceptés : JPG, JPEG, PNG, WebP (Max 15 Mo)
                  </p>
                </div>

                <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2e1d13] text-[#f59e0b] text-xs font-bold border border-[#4d3220]">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Parcourir mes photos</span>
                </div>
              </div>

              {/* Cultural encouragement quote */}
              <p className="font-script text-center text-lg text-[#e8c69f]">
                « La culture nous rassemble » — Faisons rayonner le FECAWA ensemble !
              </p>
            </div>
          )}

          {/* STEP 2: ADJUST & DETAILS */}
          {step === 'adjust' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                
                {/* Photo Preview in Official FECAWA card frame */}
                <div className="sm:col-span-5 flex flex-col items-center">
                  <span className="text-xs font-bold text-[#a89887] uppercase tracking-wider mb-2">
                    Aperçu sur l'affiche
                  </span>
                  <div className="relative w-48 h-64 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-[#1b120c]">
                    <div 
                      className="w-full h-full flex items-center justify-center overflow-hidden"
                      style={{
                        transform: `scale(${zoom}) translate(${offsetX}px, ${offsetY}px)`
                      }}
                    >
                      <img
                        src={photoPreview}
                        alt="Aperçu"
                        className="w-full h-full object-cover transition-transform"
                      />
                    </div>
                    {/* "j'y serai" tag on card */}
                    <div className="absolute bottom-0 left-0 bg-white pt-1 pb-1 px-3 rounded-tr-xl shadow-md">
                      <span className="font-script text-lg font-bold text-[#1b120c] block">
                        j’y serai
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-3 flex items-center gap-1.5 text-xs text-[#d97706] hover:underline font-semibold"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Changer de photo</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileChange(e.target.files[0]);
                      }
                    }}
                  />
                </div>

                {/* Form fields */}
                <div className="sm:col-span-7 space-y-4">
                  {/* Zoom slider */}
                  <div className="space-y-1.5 bg-[#251810] p-3.5 rounded-2xl border border-[#3f291a]">
                    <div className="flex justify-between items-center text-xs font-bold text-[#c4b5a5]">
                      <span className="flex items-center gap-1.5">
                        <ZoomIn className="w-3.5 h-3.5 text-[#f59e0b]" />
                        Zoom & Cadrage
                      </span>
                      <span>{Math.round(zoom * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="2.5"
                      step="0.05"
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="w-full accent-[#d97706] cursor-pointer"
                    />
                  </div>

                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#d5c6b7]">
                      Nom et Prénom <span className="text-[#a89887] font-normal">(Recommandé)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Barnabé Kouagou"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={40}
                      className="w-full px-4 py-3 rounded-xl bg-[#251810] border border-[#4a3221] text-[#fbf8f3] placeholder-[#8a7a6c] focus:outline-none focus:border-[#d97706] text-sm"
                    />
                  </div>

                  {/* City Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#d5c6b7]">
                      Ville ou Région <span className="text-[#a89887] font-normal">(Optionnel)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Natitingou, Cotonou, Parakou, Paris..."
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      maxLength={35}
                      className="w-full px-4 py-3 rounded-xl bg-[#251810] border border-[#4a3221] text-[#fbf8f3] placeholder-[#8a7a6c] focus:outline-none focus:border-[#d97706] text-sm"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-[#d97706] rounded cursor-pointer"
                    />
                    <span className="text-xs text-[#b8a695] leading-relaxed">
                      J’autorise le FECAWA à afficher ma photo dans la galerie publique des participants et sur mon affiche personnalisée. (Retrait possible à tout moment).
                    </span>
                  </label>
                </div>

              </div>

              {/* Action button */}
              <div className="pt-3 border-t border-[#382417] flex justify-end gap-3">
                <button
                  onClick={() => setStep('upload')}
                  className="px-5 py-3 rounded-xl text-xs font-bold text-[#c4b5a5] hover:bg-[#2a1b12]"
                >
                  Retour
                </button>
                <button
                  onClick={handleConfirmParticipation}
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-7 py-3 rounded-xl font-black text-sm bg-gradient-to-r from-[#d97706] to-[#ea580c] text-[#140e0a] shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Génération de ton affiche...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Confirmer ma participation</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS & GENERATED POSTER */}
          {step === 'success' && (
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-950/80 border border-green-700/60 text-green-300 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                Participation enregistrée avec succès !
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-black font-display text-[#fbf8f3]">
                  Félicitations {createdParticipant?.name} !
                </h4>
                <p className="text-sm text-[#c4b5a5]">
                  Ton affiche officielle personnalisée est prête. Télécharge-la et partage-la sur tes réseaux pour inviter tes amis !
                </p>
              </div>

              {/* High-res generated poster preview */}
              <div className="relative max-w-sm mx-auto aspect-square rounded-2xl overflow-hidden border-2 border-[#d97706]/60 shadow-2xl bg-white">
                {generatedPosterUrl ? (
                  <img
                    src={generatedPosterUrl}
                    alt="Mon affiche personnalisée FECAWA 2026"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-500">
                    Chargement de l'affiche...
                  </div>
                )}
              </div>

              {/* Primary Actions: Download & Share */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadPoster}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-extrabold text-sm bg-gradient-to-r from-[#d97706] to-[#ea580c] text-[#140e0a] shadow-lg shadow-[#d97706]/30 hover:scale-105 active:scale-95 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger l’image HD</span>
                </button>

                <button
                  onClick={handleShareWhatsApp}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#25D366] text-white hover:bg-[#20ba59] shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Statut & WhatsApp</span>
                </button>

                <button
                  onClick={handleShareFacebook}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-bold text-sm bg-[#1877F2] text-white hover:bg-[#166fe5] transition-all"
                  title="Partager sur Facebook"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </button>
              </div>

              {/* Copy link button */}
              <div className="flex items-center justify-center gap-2 pt-1">
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 text-xs text-[#d97706] hover:text-[#f59e0b] font-bold py-1.5 px-3 rounded-lg hover:bg-[#2c1d13] transition-colors"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Lien copié dans le presse-papiers !' : 'Copier le message et le lien d’invitation'}</span>
                </button>
              </div>

              <div className="pt-4 border-t border-[#342419]">
                <button
                  onClick={() => {
                    onClose();
                    const el = document.getElementById('participants');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-[#c4b5a5] hover:text-[#fbf8f3] underline"
                >
                  Voir ma photo dans la galerie des festivaliers →
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
