import React from 'react';
import { ArrowDownRight, Compass, ShieldCheck, Box, Flame } from 'lucide-react';

interface HeroProps {
  onRequestSamples: () => void;
  onExploreProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestSamples, onExploreProducts }) => {
  return (
    <section className="relative w-full bg-[#0D0D0E] pt-12 md:pt-20 pb-16 overflow-hidden">
      {/* Background ambient architectural lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(to right, #eceae5 1px, transparent 1px), linear-gradient(to bottom, #eceae5 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Subtle Editorial Kicker */}
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#C5A880] mb-6">
          <span>Architectural Surface Systems</span>
          <span aria-hidden="true">·</span>
          <span>Engineered for Master Builders & Specifiers</span>
        </div>

        {/* 2-Column Luxury Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch mb-16">
          {/* Left Column: Monumental Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col justify-between pr-0 lg:pr-6">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-editorial font-light text-[#ECEAE5] leading-[1.08] tracking-tight text-balance">
                Permanent Forms in <span className="italic font-normal text-[#C5A880]">Tactile Matter.</span>
              </h1>

              <p className="mt-6 md:mt-8 text-base md:text-lg text-[#A5A39E] font-light leading-relaxed max-w-xl">
                VALEUR engineers French fluted limestones, patinated architectural bronzes, and decarbonized mineral precast systems. Crafted to endure atmospheric weathering and elevate civic envelopes into timeless monuments.
              </p>
            </div>

            {/* CTAs and Atelier Location Strip */}
            <div className="mt-10 pt-8 border-t border-[#232328]">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onRequestSamples}
                  className="px-6 py-3.5 bg-[#C5A880] text-[#0D0D0E] text-xs font-semibold uppercase tracking-widest hover:bg-[#d6ba94] transition-colors flex items-center gap-2"
                >
                  <span>Request Specimen Box</span>
                  <ArrowDownRight className="w-4 h-4" />
                </button>

                <a
                  href="#visualizer"
                  className="px-6 py-3.5 border border-[#3A3A42] text-[#ECEAE5] text-xs font-medium uppercase tracking-widest hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                >
                  Launch 3D Monolith Studio
                </a>

                <a
                  href="#products"
                  className="px-4 py-3.5 text-xs font-mono uppercase tracking-widest text-[#888681] hover:text-[#ECEAE5] transition-colors"
                >
                  View Material Schedule ↓
                </a>
              </div>

              {/* Atelier Studios */}
              <div className="mt-8 flex flex-wrap items-center gap-6 text-[11px] font-mono uppercase tracking-wider text-[#6E6C67]">
                <span>Paris Atelier</span>
                <span aria-hidden="true">·</span>
                <span>Zurich Laboratory</span>
                <span aria-hidden="true">·</span>
                <span>Milan Foundry</span>
                <span aria-hidden="true">·</span>
                <span>New York Studio</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Impact Architectural Photography */}
          <div className="lg:col-span-5 relative group">
            <div className="relative w-full h-[440px] sm:h-[520px] lg:h-full min-h-[480px] bg-[#161619] border border-[#2B2B32] overflow-hidden">
              <img
                src="/src/assets/images/hero_architectural_pavilion_1793708247633.jpg"
                alt="Architectural pavilion featuring monumental fluted limestone and patinated bronze reveals"
                className="w-full h-full object-cover grayscale-[15%] group-hover:scale-102 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0E]/85 via-transparent to-transparent pointer-events-none" />

              {/* Floating Caption Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#111114]/90 border border-[#2A2A30] backdrop-blur-xs">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] mb-1">
                  Built Reference // Zurich Civic Gallery
                </div>
                <div className="text-xs font-light text-[#D5D3CE] leading-relaxed">
                  Monolithic Vaucluse fluted limestone pilasters paired with Aurelia brushed champagne mullions.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency Strip (Architectural Engineering Metrics) */}
        <div className="w-full bg-[#121215] border border-[#232328] p-6 lg:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#C5A880] mb-2">
                <Flame className="w-4 h-4 text-[#C5A880]" />
                <span>Euroclass A1</span>
              </div>
              <div className="text-xl md:text-2xl font-editorial font-medium text-[#ECEAE5]">
                100% Non-Combustible
              </div>
              <div className="text-xs text-[#807E79] font-light mt-1">
                Zero organic polymer additives, fully compliant with high-rise codes.
              </div>
            </div>

            <div className="flex flex-col border-l border-[#232328] pl-6 md:pl-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#C5A880] mb-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>100-Year Life</span>
              </div>
              <div className="text-xl md:text-2xl font-editorial font-medium text-[#ECEAE5]">
                Natural Carbon Neutral
              </div>
              <div className="text-xs text-[#807E79] font-light mt-1">
                Quarried with hydro-powered diamond saws; cradle-to-grave EPD certified.
              </div>
            </div>

            <div className="flex flex-col border-l border-[#232328] pl-6 md:pl-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#C5A880] mb-2">
                <Box className="w-4 h-4 text-[#C5A880]" />
                <span>Dispatch Express</span>
              </div>
              <div className="text-xl md:text-2xl font-editorial font-medium text-[#ECEAE5]">
                48-Hour Specimen Box
              </div>
              <div className="text-xs text-[#807E79] font-light mt-1">
                Curated tactile samples sent direct to architecture and design firms.
              </div>
            </div>

            <div className="flex flex-col border-l border-[#232328] pl-6 md:pl-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#C5A880] mb-2">
                <Compass className="w-4 h-4 text-[#C5A880]" />
                <span>BIM Ready</span>
              </div>
              <div className="text-xl md:text-2xl font-editorial font-medium text-[#ECEAE5]">
                Revit & Archicad
              </div>
              <div className="text-xs text-[#807E79] font-light mt-1">
                Parametric BIM families with physical thermal & reflectance metadata.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
