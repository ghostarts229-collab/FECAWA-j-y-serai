import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { JoinSection } from './components/JoinSection';
import { ParticipantsGallery } from './components/ParticipantsGallery';
import { AboutFestival } from './components/AboutFestival';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { JoinModal } from './components/JoinModal';
import { OfficialPosterModal } from './components/OfficialPosterModal';
import { ParticipantPosterModal } from './components/ParticipantPosterModal';
import { AdminModal } from './components/AdminModal';
import { Participant } from './types';
import { 
  getStoredParticipants, 
  addParticipant, 
  updateParticipantStatus, 
  updateParticipantName, 
  deleteParticipant 
} from './utils/storage';
import { Sparkles, Camera } from 'lucide-react';

export default function App() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isOfficialPosterOpen, setIsOfficialPosterOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load participants from storage
  useEffect(() => {
    const loaded = getStoredParticipants();
    setParticipants(loaded);
  }, []);

  const handleParticipantAdded = (newParticipant: Participant) => {
    const updated = addParticipant(newParticipant);
    setParticipants(updated);
  };

  const handleUpdateStatus = (id: string, status: 'approved' | 'pending' | 'rejected') => {
    const updated = updateParticipantStatus(id, status);
    setParticipants(updated);
  };

  const handleUpdateName = (id: string, newName: string) => {
    const updated = updateParticipantName(id, newName);
    setParticipants(updated);
  };

  const handleDeleteParticipant = (id: string) => {
    const updated = deleteParticipant(id);
    setParticipants(updated);
  };

  const approvedCount = participants.filter(
    (p) => p.status === 'approved' || p.status === undefined
  ).length;

  return (
    <div className="min-h-screen bg-[#140e0a] text-[#fbf8f3] font-sans antialiased selection:bg-[#d97706] selection:text-white flex flex-col">
      {/* Navbar */}
      <Navbar
        onOpenJoin={() => setIsJoinOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        participantCount={approvedCount}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onOpenJoin={() => setIsJoinOpen(true)}
          onOpenPosterModal={() => setIsOfficialPosterOpen(true)}
          participantCount={approvedCount}
        />

        {/* Join Section: J'Y SERAI ! Et toi ? */}
        <JoinSection
          onOpenJoin={() => setIsJoinOpen(true)}
          participantCount={approvedCount}
        />

        {/* Participants Gallery */}
        <ParticipantsGallery
          participants={participants}
          onOpenJoin={() => setIsJoinOpen(true)}
          onSelectParticipant={(p) => setSelectedParticipant(p)}
        />

        {/* About Festival Section */}
        <AboutFestival onOpenJoin={() => setIsJoinOpen(true)} />

        {/* Contact & Security Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenJoin={() => setIsJoinOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Persistent Mobile Floating CTA Button */}
      <div className="fixed bottom-5 right-5 z-30 lg:hidden">
        <button
          onClick={() => setIsJoinOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-full font-black text-sm bg-gradient-to-r from-[#d97706] via-[#ea580c] to-[#d97706] text-[#140e0a] shadow-2xl shadow-[#d97706]/50 border border-white/20 active:scale-95 transition-all"
        >
          <Camera className="w-4 h-4 text-[#140e0a]" />
          <span>J’Y SERAI</span>
        </button>
      </div>

      {/* Modals */}
      <JoinModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        onParticipantAdded={handleParticipantAdded}
      />

      <OfficialPosterModal
        isOpen={isOfficialPosterOpen}
        onClose={() => setIsOfficialPosterOpen(false)}
        onOpenJoin={() => setIsJoinOpen(true)}
      />

      <ParticipantPosterModal
        participant={selectedParticipant}
        onClose={() => setSelectedParticipant(null)}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        participants={participants}
        onUpdateStatus={handleUpdateStatus}
        onUpdateName={handleUpdateName}
        onDeleteParticipant={handleDeleteParticipant}
      />
    </div>
  );
}
