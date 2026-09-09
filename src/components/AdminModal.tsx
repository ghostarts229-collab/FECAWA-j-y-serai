import React, { useState } from 'react';
import { 
  X, ShieldCheck, Check, Ban, Trash2, Edit3, Download, 
  Search, FileSpreadsheet, Lock, AlertCircle, RefreshCw 
} from 'lucide-react';
import { Participant, FilterStatus } from '../types';
import { exportParticipantsToCSV } from '../utils/storage';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  participants: Participant[];
  onUpdateStatus: (id: string, status: 'approved' | 'pending' | 'rejected') => void;
  onUpdateName: (id: string, newName: string) => void;
  onDeleteParticipant: (id: string) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  participants,
  onUpdateStatus,
  onUpdateName,
  onDeleteParticipant,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default secret PIN for festival committee organizers
    if (pin === 'fecawa2026' || pin === 'admin' || pin === '2026') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Code PIN incorrect. (Indice : fecawa2026)');
    }
  };

  const handleStartEdit = (p: Participant) => {
    setEditingId(p.id);
    setEditingName(p.name);
  };

  const handleSaveEdit = (id: string) => {
    if (editingName.trim()) {
      onUpdateName(id, editingName.trim());
    }
    setEditingId(null);
  };

  const handleDownloadSinglePhoto = (photoUrl: string, name: string) => {
    const link = document.createElement('a');
    link.download = `photo_${name.replace(/[^a-z0-9]/gi, '_')}.jpg`;
    link.href = photoUrl;
    link.click();
  };

  const filteredList = participants
    .filter((p) => {
      if (filter === 'all') return true;
      return p.status === filter;
    })
    .filter((p) => {
      const term = searchTerm.toLowerCase();
      return p.name.toLowerCase().includes(term) || (p.city && p.city.toLowerCase().includes(term));
    });

  const countApproved = participants.filter((p) => p.status === 'approved').length;
  const countPending = participants.filter((p) => p.status === 'pending').length;
  const countRejected = participants.filter((p) => p.status === 'rejected').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#1d140e] border-2 border-[#4a3221] rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3b271b] bg-[#160f0a]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#d97706]/20 border border-[#d97706]/40 flex items-center justify-center text-[#f59e0b]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-[#fbf8f3]">
                Espace Organisateur • Modération FECAWA 2026
              </h3>
              <p className="text-xs text-[#a89887]">
                Gestion des participations « J’Y SERAI »
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

        {/* Not Authenticated Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#261911] border border-[#d97706]/40 flex items-center justify-center mx-auto text-[#f59e0b]">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-[#fbf8f3]">Accès Restreint</h4>
              <p className="text-xs text-[#a89887] mt-1">
                Espace réservé aux organisateurs du festival pour valider, modérer ou supprimer des participations.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1 text-left">
                <label className="block text-xs font-bold uppercase text-[#c4b5a5]">Code PIN Organisateur</label>
                <input
                  type="password"
                  placeholder="Entrez le code..."
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#251810] border border-[#4a3221] text-white text-center tracking-widest text-lg focus:outline-none focus:border-[#d97706]"
                  autoFocus
                />
              </div>

              {pinError && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>{pinError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#d97706] to-[#ea580c] text-[#140e0a] shadow-lg hover:scale-105 transition-all"
              >
                Déverrouiller la modération
              </button>

              <p className="text-[11px] text-[#8c7a6b]">
                Code PIN par défaut : <code className="text-[#f59e0b] font-mono">fecawa2026</code>
              </p>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Stat Counters & CSV Export */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#231710] p-4 sm:p-5 rounded-2xl border border-[#3d2a1c]">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1.5 rounded-xl bg-[#1b120c] border border-[#382315] text-xs font-bold text-[#fbf8f3]">
                  Total : <strong className="text-[#f59e0b]">{participants.length}</strong>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-green-950/60 border border-green-800 text-xs font-bold text-green-300">
                  Validés : {countApproved}
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-800 text-xs font-bold text-amber-300">
                  En attente : {countPending}
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-red-950/60 border border-red-800 text-xs font-bold text-red-300">
                  Refusés/Masqués : {countRejected}
                </span>
              </div>

              <button
                onClick={() => exportParticipantsToCSV(participants)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#2d1e14] hover:bg-[#38261a] text-[#f59e0b] border border-[#4d3320] transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Exporter en CSV</span>
              </button>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 bg-[#251810] p-1 rounded-xl border border-[#3b271a] w-full sm:w-auto overflow-x-auto">
                {(['all', 'approved', 'pending', 'rejected'] as FilterStatus[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                      filter === tab
                        ? 'bg-[#d97706] text-[#140e0a] shadow'
                        : 'text-[#a89887] hover:text-[#fbf8f3]'
                    }`}
                  >
                    {tab === 'all' && 'Tous'}
                    {tab === 'approved' && 'Validés'}
                    {tab === 'pending' && 'En attente'}
                    {tab === 'rejected' && 'Refusés'}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8c7a6b]" />
                <input
                  type="text"
                  placeholder="Filtrer par nom..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#251810] border border-[#3b271a] text-xs text-white placeholder-[#8c7a6b] focus:outline-none focus:border-[#d97706]"
                />
              </div>
            </div>

            {/* Table of Participants */}
            <div className="border border-[#382518] rounded-2xl overflow-hidden bg-[#18100b]">
              <div className="overflow-x-auto max-h-[440px]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#20140d] text-[#c4b5a5] border-b border-[#382518] sticky top-0 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="py-3 px-4">Participant</th>
                      <th className="py-3 px-4">Ville</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Statut</th>
                      <th className="py-3 px-4 text-right">Actions de Modération</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a1b12] text-[#fbf8f3]">
                    {filteredList.map((p) => (
                      <tr key={p.id} className="hover:bg-[#231710]/50 transition-colors">
                        
                        {/* Name & Photo */}
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img
                            src={p.photoUrl}
                            alt={p.name}
                            className="w-10 h-10 rounded-xl object-cover border border-[#442e1e]"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            {editingId === p.id ? (
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="text"
                                  value={editingName}
                                  onChange={(e) => setEditingName(e.target.value)}
                                  className="px-2 py-1 rounded bg-[#2c1d13] border border-[#d97706] text-xs text-white"
                                  autoFocus
                                />
                                <button
                                  onClick={() => handleSaveEdit(p.id)}
                                  className="p-1 rounded bg-green-700 text-white"
                                >
                                  <Check className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="p-1 rounded bg-[#38261a] text-zinc-400"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold">{p.name}</span>
                                <button
                                  onClick={() => handleStartEdit(p)}
                                  className="text-[#8c7a6b] hover:text-[#d97706]"
                                  title="Modifier le nom"
                                >
                                  <Edit3 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                            <span className="text-[10px] text-[#8c7a6b] font-mono">{p.id}</span>
                          </div>
                        </td>

                        {/* City */}
                        <td className="py-3 px-4 text-[#b8a695]">
                          {p.city || '—'}
                        </td>

                        {/* Date */}
                        <td className="py-3 px-4 text-[#8c7a6b]">
                          {new Date(p.createdAt).toLocaleDateString('fr-FR')}
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              p.status === 'approved'
                                ? 'bg-green-950/80 text-green-300 border border-green-800'
                                : p.status === 'pending'
                                ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                                : 'bg-red-950/80 text-red-300 border border-red-800'
                            }`}
                          >
                            {p.status === 'approved' && 'Validé'}
                            {p.status === 'pending' && 'En attente'}
                            {p.status === 'rejected' && 'Refusé / Masqué'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Approve */}
                            {p.status !== 'approved' && (
                              <button
                                onClick={() => onUpdateStatus(p.id, 'approved')}
                                title="Valider la participation"
                                className="p-1.5 rounded-lg bg-green-950/60 hover:bg-green-900 border border-green-700 text-green-400"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {/* Reject / Hide */}
                            {p.status !== 'rejected' && (
                              <button
                                onClick={() => onUpdateStatus(p.id, 'rejected')}
                                title="Masquer / Refuser la participation"
                                className="p-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900 border border-amber-700 text-amber-400"
                              >
                                <Ban className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {/* Download original image */}
                            <button
                              onClick={() => handleDownloadSinglePhoto(p.photoUrl, p.name)}
                              title="Télécharger la photo"
                              className="p-1.5 rounded-lg bg-[#271911] hover:bg-[#342217] border border-[#442d1e] text-[#c4b5a5]"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete entry */}
                            <button
                              onClick={() => {
                                if (window.confirm(`Supprimer définitivement la participation de ${p.name} ?`)) {
                                  onDeleteParticipant(p.id);
                                }
                              }}
                              title="Supprimer définitivement"
                              className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-[#8c7a6b] pt-2">
              <span>{filteredList.length} participants affichés</span>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-[#d97706] hover:underline"
              >
                Verrouiller la session
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
