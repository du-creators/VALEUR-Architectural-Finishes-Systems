import React from 'react';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onRequestSamples: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRequestSamples }) => {
  return (
    <footer className="w-full bg-[#09090B] border-t border-[#1F1F24] text-[#ECEAE5] pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Callout Strip for Architects */}
        <div className="p-8 md:p-12 bg-[#101013] border border-[#232328] mb-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#C5A880] mb-2">
              Practice Partnership // Bespoke Fabrication
            </div>
            <h3 className="text-2xl md:text-3xl font-editorial font-light text-[#ECEAE5]">
              Specifying a Monumental or Custom Envelope?
            </h3>
            <p className="mt-2 text-xs md:text-sm text-[#8E8C87] max-w-xl font-light">
              Our facade engineers and stone quarry masters collaborate directly with design teams on custom fluted extrusions, mockups, and seismic windload testing.
            </p>
          </div>

          <button
            onClick={onRequestSamples}
            className="px-7 py-3.5 bg-[#C5A880] text-[#0D0D0E] text-xs font-semibold uppercase tracking-wider hover:bg-[#d6ba94] transition-colors whitespace-nowrap shrink-0"
          >
            Request Specimen Consultation
          </button>
        </div>

        {/* 4 Atelier Locations & Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#1C1C22]">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-editorial font-light tracking-widest text-[#ECEAE5] mb-4">
              VALEUR <span className="text-xs font-mono tracking-normal text-[#8E8C87]">ATELIER</span>
            </div>
            <p className="text-xs text-[#8E8C87] font-light leading-relaxed max-w-sm mb-6">
              Precision-quarried French limestones, hand-patinated architectural bronze mullions, and low-carbon pozzolanic mineral surfaces for enduring architecture.
            </p>
            <div className="text-xs font-mono text-[#6E6C67]">
              CSI MasterFormat™ Division 04 & 05 Certified Supplier
            </div>
          </div>

          {/* Atelier Hubs */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#C5A880] mb-4">
              European Ateliers
            </div>
            <div className="space-y-4 text-xs font-light text-[#9A9893]">
              <div>
                <strong className="text-[#ECEAE5] font-normal block font-mono text-[11px]">PARIS ATELIER</strong>
                <span>18 Place Vendôme, 75001 Paris</span>
              </div>
              <div>
                <strong className="text-[#ECEAE5] font-normal block font-mono text-[11px]">ZURICH LAB</strong>
                <span>Limmatquai 42, 8001 Zurich</span>
              </div>
              <div>
                <strong className="text-[#ECEAE5] font-normal block font-mono text-[11px]">MILAN FOUNDRY</strong>
                <span>Via Tortona 27, 20144 Milano</span>
              </div>
            </div>
          </div>

          {/* Americas & Asia */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#C5A880] mb-4">
              Americas & Asia
            </div>
            <div className="space-y-4 text-xs font-light text-[#9A9893]">
              <div>
                <strong className="text-[#ECEAE5] font-normal block font-mono text-[11px]">NEW YORK STUDIO</strong>
                <span>140 Grand Street, SoHo, NY 10013</span>
              </div>
              <div>
                <strong className="text-[#ECEAE5] font-normal block font-mono text-[11px]">TOKYO OFFICE</strong>
                <span>Minami-Aoyama, Minato-ku, Tokyo</span>
              </div>
              <div className="pt-2 text-xs font-mono text-[#8E8C87]">
                T: +1 (212) 840-2910
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#C5A880] mb-4">
              Specification Links
            </div>
            <ul className="space-y-2 text-xs font-mono text-[#8E8C87]">
              <li>
                <a href="#products" className="hover:text-[#ECEAE5] transition-colors">Material Schedule</a>
              </li>
              <li>
                <a href="#finishes" className="hover:text-[#ECEAE5] transition-colors">Tactile Finishes</a>
              </li>
              <li>
                <a href="#visualizer" className="hover:text-[#ECEAE5] transition-colors">3D Monolith Studio</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#ECEAE5] transition-colors">Built Commissions</a>
              </li>
              <li>
                <a href="#resources" className="hover:text-[#ECEAE5] transition-colors">BIM / Revit Library</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Standards */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6E6C67]">
          <div>
            © {new Date().getFullYear()} VALEUR Architectural Systems SA. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>ISO 9001 Quality Management</span>
            <span>·</span>
            <span>EPD Cradle-to-Grave Verified</span>
            <span>·</span>
            <span>AIA CES Approved Provider</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
