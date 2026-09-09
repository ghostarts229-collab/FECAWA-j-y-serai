import React, { useState } from 'react';
import { 
  MapPin, Phone, MessageSquare, Send, CheckCircle2, 
  Share2, ShieldCheck, Mail, Facebook, Trash2, HelpCircle 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    category: 'Information générale',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [deleteRequest, setDeleteRequest] = useState({
    participantName: '',
    contactInfo: '',
    reason: '',
  });
  const [deleteSubmitted, setDeleteSubmitted] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.emailOrPhone || !formData.message) return;
    setFormSubmitted(true);
  };

  const handleDeleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deleteRequest.participantName) return;
    setDeleteSubmitted(true);
  };

  // Preset WhatsApp link for the festival
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent("Bonjour le comité d'organisation du FECAWA 2026, je vous contacte depuis le site officiel pour avoir des informations.")}`;

  return (
    <section id="contact" className="py-20 md:py-24 bg-[#140e0a] relative border-t border-[#342419]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#24170f] border border-[#d97706]/40 text-[#f59e0b] text-xs sm:text-sm font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Échanges & Renseignements</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#fbf8f3] tracking-tight">
            CONTACTEZ LE <span className="text-[#f59e0b]">FECAWA</span>
          </h2>

          <p className="text-base sm:text-lg text-[#c4b5a5]">
            Pour toute question concernant le festival, les stands d’exposition, les prestations artistiques 
            ou le partenariat, le comité d’organisation est à votre écoute à Natitingou.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Official Details & Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Location Card */}
            <div className="bg-[#1c130d] border border-[#3b271b] rounded-3xl p-6 sm:p-7 space-y-4">
              <h3 className="text-xl font-bold text-[#fbf8f3] flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-[#d97706]" />
                <span>Siège & Ville Hôte</span>
              </h3>
              <p className="text-sm text-[#b8a796] leading-relaxed">
                <strong>Natitingou</strong>, Département de l’Atacora, République du Bénin.<br />
                Au carrefour des arts et de la culture Waama.
              </p>
              <div className="pt-2 text-xs text-[#a89887] border-t border-[#311f14]">
                Dates officielles : <strong>19 au 21 Novembre 2026</strong>
              </div>
            </div>

            {/* WhatsApp Direct Action Card */}
            <div className="bg-gradient-to-br from-[#1b2b1d] to-[#121c13] border border-[#23582c] rounded-3xl p-6 sm:p-7 space-y-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">Canal Direct WhatsApp</h4>
                  <p className="text-xs text-green-300">Réponse rapide de l’équipe d’accueil</p>
                </div>
              </div>
              <p className="text-xs text-green-100/80 leading-relaxed">
                Rejoignez le canal officiel ou envoyez un message direct pour vos questions de voyage, hébergement et stands.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm bg-[#25D366] text-zinc-950 hover:bg-[#20ba59] transition-all"
              >
                <span>Ouvrir WhatsApp FECAWA</span>
              </a>
            </div>

            {/* Privacy & Photo Deletion Notice */}
            <div className="bg-[#1e140e] border border-[#3b271b] rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#f59e0b] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Protection des données & Image</span>
              </div>
              <p className="text-xs text-[#a89887] leading-relaxed">
                Conformément aux règles de confidentialité, vous disposez d'un droit total de retrait de votre photo de la galerie à tout moment.
              </p>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-1.5 text-xs font-bold text-[#d97706] hover:underline"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Demander la suppression d'une photo</span>
              </button>
            </div>

          </div>

          {/* Right Column: Contact Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#1c130d] border border-[#3b271b] rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-950 border border-green-700/80 flex items-center justify-center mx-auto text-green-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#fbf8f3]">Message bien reçu !</h3>
                <p className="text-sm text-[#b8a796] max-w-md mx-auto">
                  Merci de votre intérêt pour le FECAWA 2026. Le comité d’organisation prendra contact avec vous dans les plus brefs délais.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', emailOrPhone: '', category: 'Information générale', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#2b1c13] text-[#d97706] hover:bg-[#382419]"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-[#fbf8f3]">Écrire au Comité d’Organisation</h3>
                  <p className="text-xs text-[#a89887] mt-1">
                    Remplissez ce formulaire pour poser une question ou formuler une demande de partenariat.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase text-[#c4b5a5]">Nom complet *</label>
                    <input
                      type="text"
                      required
                      placeholder="Votre nom et prénom"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#251810] border border-[#442e1e] text-[#fbf8f3] placeholder-[#7d6c5e] focus:outline-none focus:border-[#d97706] text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase text-[#c4b5a5]">Email ou Téléphone *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: +229 ... ou email@domaine.com"
                      value={formData.emailOrPhone}
                      onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#251810] border border-[#442e1e] text-[#fbf8f3] placeholder-[#7d6c5e] focus:outline-none focus:border-[#d97706] text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#c4b5a5]">Objet de la demande</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#251810] border border-[#442e1e] text-[#fbf8f3] focus:outline-none focus:border-[#d97706] text-sm cursor-pointer"
                  >
                    <option value="Information générale">Information générale sur le festival</option>
                    <option value="Participation Festivalier">Participation & Voyage à Natitingou</option>
                    <option value="Troupe / Artiste">Artiste, Groupe traditionnel ou Troupe</option>
                    <option value="Stand / Artisanat">Stand d'artisanat ou restauration</option>
                    <option value="Partenariat / Sponsor">Partenariat, Mécénat ou Sponsoring</option>
                    <option value="Presse / Média">Presse, Reportage & Accréditation Média</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#c4b5a5]">Votre message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Précisez votre demande ou question..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#251810] border border-[#442e1e] text-[#fbf8f3] placeholder-[#7d6c5e] focus:outline-none focus:border-[#d97706] text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#d97706] to-[#ea580c] text-[#140e0a] shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer mon message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

      {/* Photo Deletion Request Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1d140e] border border-[#4a3221] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl relative">
            <h3 className="text-lg font-bold text-[#fbf8f3] flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-400" />
              <span>Demande de retrait de photo</span>
            </h3>

            {deleteSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto" />
                <p className="text-sm text-[#d5c6b7]">
                  Votre demande de retrait a été enregistrée. L’administrateur procédera à la modération dans les plus brefs délais.
                </p>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteSubmitted(false);
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#d97706] text-[#140e0a]"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={handleDeleteSubmit} className="space-y-4 text-xs">
                <p className="text-[#a89887] leading-relaxed">
                  Indiquez le nom sous lequel la photo a été publiée afin que nous puissions la masquer ou la supprimer immédiatement.
                </p>
                <div className="space-y-1">
                  <label className="font-bold text-[#c4b5a5]">Nom renseigné lors de la participation *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Barnabé K."
                    value={deleteRequest.participantName}
                    onChange={(e) => setDeleteRequest({ ...deleteRequest, participantName: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#251810] border border-[#442e1e] text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#c4b5a5]">Votre contact (pour confirmation)</label>
                  <input
                    type="text"
                    placeholder="Téléphone ou email"
                    value={deleteRequest.contactInfo}
                    onChange={(e) => setDeleteRequest({ ...deleteRequest, contactInfo: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#251810] border border-[#442e1e] text-white"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 rounded-xl text-[#a89887] hover:bg-[#281a11]"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl font-bold bg-red-800 text-white hover:bg-red-700"
                  >
                    Demander le retrait
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
