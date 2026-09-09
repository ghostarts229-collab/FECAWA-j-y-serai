import React, { useState } from 'react';
import { Menu, X, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenJoin: () => void;
  onOpenAdmin: () => void;
  participantCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoin, onOpenAdmin, participantCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Le Festival', href: '#festival' },
    { name: 'J’y serai', href: '#jy-serai' },
    { name: 'Participants', href: '#participants', badge: participantCount > 0 ? participantCount : undefined },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScroll = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#140e0a]/90 backdrop-blur-md border-b border-[#342419]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Title */}
          <a
            href="#accueil"
            onClick={(e) => { e.preventDefault(); handleScroll('#accueil'); }}
            className="flex items-center gap-3.5 group text-left"
          >
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-[#d97706] shadow-md shadow-[#d97706]/20 bg-[#ffffff] flex-shrink-0 flex items-center justify-center p-0.5">
              <img
                src="/fecawa-official-logo.jpg"
                alt="Logo officiel FECAWA"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-2xl tracking-wider text-[#fbf8f3] group-hover:text-[#f59e0b] transition-colors">
                  FECAWA
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-bold bg-[#d97706]/20 text-[#f59e0b] border border-[#d97706]/40 rounded-full">
                  2026
                </span>
              </div>
              <p className="text-[11px] text-[#c4b5a5] font-medium tracking-tight hidden md:block">
                Festival des Arts et de la Culture Waama
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleScroll(link.href); }}
                className="relative px-3.5 py-2 text-sm font-semibold text-[#e2d5c8] hover:text-[#f59e0b] transition-colors rounded-lg hover:bg-[#251912]"
              >
                <span>{link.name}</span>
                {link.badge !== undefined && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold bg-[#d97706] text-[#140e0a] rounded-full">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              title="Accès Organisateur (Modération)"
              className="p-2 text-[#a89887] hover:text-[#f59e0b] hover:bg-[#251912] rounded-lg transition-colors"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenJoin}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm bg-gradient-to-r from-[#d97706] via-[#ea580c] to-[#d97706] text-[#140e0a] shadow-lg shadow-[#d97706]/25 hover:shadow-[#d97706]/40 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 text-[#140e0a]" />
              <span>J’Y SERAI</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenJoin}
              className="sm:hidden px-3.5 py-1.5 rounded-full font-bold text-xs bg-[#d97706] text-[#140e0a] shadow-md"
            >
              J’Y SERAI
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#e2d5c8] hover:bg-[#251912] focus:outline-none"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#f59e0b]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#342419] bg-[#1a120c] px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleScroll(link.href); }}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-[#f1e6da] hover:bg-[#261a12] hover:text-[#f59e0b] transition-colors"
            >
              <span>{link.name}</span>
              {link.badge !== undefined && (
                <span className="px-2 py-0.5 text-xs font-bold bg-[#d97706] text-[#140e0a] rounded-full">
                  {link.badge}
                </span>
              )}
            </a>
          ))}

          <div className="pt-3 border-t border-[#342419] flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenJoin(); }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-extrabold text-base bg-gradient-to-r from-[#d97706] to-[#ea580c] text-[#140e0a] shadow-lg"
            >
              <Heart className="w-5 h-5 fill-current" />
              <span>CONFIRMER : « J’Y SERAI »</span>
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-[#a89887] hover:text-[#f59e0b] hover:bg-[#251912]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Espace Organisateur (Administration)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
