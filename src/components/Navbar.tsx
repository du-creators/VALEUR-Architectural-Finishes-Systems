import React, { useState } from 'react';
import { Menu, X, Sparkles, FolderOpen } from 'lucide-react';

interface NavbarProps {
  pinnedCount: number;
  onOpenMoodboard: () => void;
  onRequestSamples: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  pinnedCount,
  onOpenMoodboard,
  onRequestSamples,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0D0D0E]/95 border-b border-[#232328] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single wordmark in display face */}
        <a
          href="#"
          className="text-xl md:text-2xl font-editorial font-light tracking-widest text-[#ECEAE5] hover:text-[#C5A880] transition-colors whitespace-nowrap shrink-0"
        >
          VALEUR <span className="text-xs font-mono tracking-normal text-[#8E8C87] ml-1">ATELIER</span>
        </a>

        {/* Zone 2: Clean single-line text links with subtle hover underlines */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium uppercase tracking-wider text-[#9E9C96]">
          <a href="#products" className="hover:text-[#ECEAE5] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C5A880]">
            Products
          </a>
          <a href="#finishes" className="hover:text-[#ECEAE5] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C5A880]">
            Colours & Finishes
          </a>
          <a href="#visualizer" className="hover:text-[#ECEAE5] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C5A880]">
            3D Studio
          </a>
          <a href="#projects" className="hover:text-[#ECEAE5] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C5A880]">
            Projects
          </a>
          <a href="#resources" className="hover:text-[#ECEAE5] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C5A880]">
            Technical Resources
          </a>
          <a href="#journal" className="hover:text-[#ECEAE5] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C5A880]">
            Journal
          </a>
        </nav>

        {/* Zone 3: Primary Action & Moodboard Drawer Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Moodboard Pin Indicator */}
          <button
            onClick={onOpenMoodboard}
            className="relative flex items-center gap-2 px-3.5 py-2 bg-[#18181C] hover:bg-[#202026] text-[#ECEAE5] text-xs font-mono uppercase tracking-wider border border-[#2B2B32] transition-colors"
            title="Open Creative Moodboard Drawer"
            aria-label={`Open Creative Moodboard Drawer with ${pinnedCount} pinned finishes`}
          >
            <FolderOpen className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="hidden sm:inline">Moodboard</span>
            <span className="px-1.5 py-0.2 bg-[#2D281F] text-[#C5A880] text-[11px] font-bold border border-[#C5A880]/40">
              {pinnedCount}
            </span>
          </button>

          {/* Primary High-End CTA */}
          <button
            onClick={onRequestSamples}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-[#C5A880] text-[#0D0D0E] text-xs font-semibold uppercase tracking-wider hover:bg-[#d4b993] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0D0D0E]" />
            <span>Request Samples</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#9E9C96] hover:text-[#ECEAE5] border border-[#232328]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F0F12] border-b border-[#232328] px-6 py-6 animate-fade-in">
          <div className="flex flex-col gap-4 text-sm font-medium tracking-wide uppercase text-[#B5B3AD]">
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#1E1E24] hover:text-[#C5A880]"
            >
              Products & Facades
            </a>
            <a
              href="#finishes"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#1E1E24] hover:text-[#C5A880]"
            >
              Colours & Tactile Finishes
            </a>
            <a
              href="#visualizer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#1E1E24] hover:text-[#C5A880]"
            >
              3D Material Monolith
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#1E1E24] hover:text-[#C5A880]"
            >
              Architectural Projects
            </a>
            <a
              href="#resources"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#1E1E24] hover:text-[#C5A880]"
            >
              CAD / BIM Resources
            </a>
            <a
              href="#journal"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#1E1E24] hover:text-[#C5A880]"
            >
              Architectural Journal
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestSamples();
                }}
                className="w-full py-3 bg-[#C5A880] text-[#0D0D0E] text-xs font-semibold tracking-wider uppercase text-center"
              >
                Request Specimen Sample Box
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
