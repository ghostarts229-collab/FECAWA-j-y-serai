import { Participant } from '../types';
import { INITIAL_PARTICIPANTS } from '../data/initialParticipants';

const STORAGE_KEY = 'fecawa_participants_v1';

export function getStoredParticipants(): Participant[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PARTICIPANTS));
      return INITIAL_PARTICIPANTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PARTICIPANTS));
      return INITIAL_PARTICIPANTS;
    }
    return parsed;
  } catch (err) {
    console.error('Error loading participants:', err);
    return INITIAL_PARTICIPANTS;
  }
}

export function saveParticipants(participants: Participant[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(participants));
  } catch (err) {
    console.error('Error saving participants:', err);
  }
}

export function addParticipant(participant: Participant): Participant[] {
  const current = getStoredParticipants();
  const updated = [participant, ...current];
  saveParticipants(updated);
  return updated;
}

export function updateParticipantStatus(id: string, status: 'approved' | 'pending' | 'rejected'): Participant[] {
  const current = getStoredParticipants();
  const updated = current.map(p => (p.id === id ? { ...p, status } : p));
  saveParticipants(updated);
  return updated;
}

export function updateParticipantName(id: string, name: string): Participant[] {
  const current = getStoredParticipants();
  const updated = current.map(p => (p.id === id ? { ...p, name: name.trim() } : p));
  saveParticipants(updated);
  return updated;
}

export function deleteParticipant(id: string): Participant[] {
  const current = getStoredParticipants();
  const updated = current.filter(p => p.id !== id);
  saveParticipants(updated);
  return updated;
}

export function exportParticipantsToCSV(participants: Participant[]): void {
  const headers = ['ID', 'Nom', 'Ville', 'Statut', 'Date d\'inscription'];
  const rows = participants.map(p => [
    p.id,
    `"${(p.name || 'Anonyme').replace(/"/g, '""')}"`,
    `"${(p.city || '').replace(/"/g, '""')}"`,
    p.status,
    new Date(p.createdAt).toLocaleDateString('fr-FR')
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `fecawa_participants_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
