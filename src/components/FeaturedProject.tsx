import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, MapPin, Calendar, Ruler, Award, Check, X, Layers } from 'lucide-react';

interface FeaturedProjectProps {
  onPinPalette: (materials: string[]) => void;
  onRequestSamples: () => void;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  onPinPalette,
  onRequestSamples,
}) => {
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'drawings' | 'materials'>('overview');

  const featuredMaterials = [
    'Vaucluse Honed Fluted Limestone Cladding',
    'Nocturne Hand-Patinated Bronze Mullions',
    'Valser Smoked Volcanic Basalt Floors',
    'Cast Optiwhite Linear Fluted Glass',
  ];

  return (
    <section className="relative w-full bg-[#0E0E11] py-24 px-6 border-t border-b border-[#232328] overflow-hidden">
      {/* Subtle architectural hairline grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(to right, #eceae5 1px, transparent 1px), linear-gradient(to bottom, #eceae5 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Tag */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A880]">
            <span>Featured Built Commission</span>
            <span aria-hidden="true">·</span>
            <span>2025 Architectural Digest Honor</span>
          </div>
          <div className="text-xs font-mono text-[#7D7B76]">
            Case Study // No. 04
          </div>
        </div>

        {/* Asymmetrical Luxury Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Monumental Visual Frame (7 cols) */}
          <div className="lg:col-span-7 relative group">
            <div className="relative w-full h-[460px] sm:h-[560px] lg:h-full min-h-[500px] bg-[#161619] border border-[#2B2B32] overflow-hidden">
              <img
                src="/src/assets/images/project_brutalist_villa_1793708249447.jpg"
                alt="Cantilevered residence in St. Helena featuring monolithic precast concrete and patinated bronze reveals"
                className="w-full h-full object-cover grayscale-[8%] group-hover:scale-103 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E11]/90 via-transparent to-transparent pointer-events-none" />

              {/* Floating Architectural Badge */}
              <div className="absolute top-6 left-6 bg-[#111114]/90 border border-[#2B2B32] px-3.5 py-1.5 backdrop-blur-xs flex items-center gap-2">
                <span className="w-2 h-2 bg-[#C5A880]" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#ECEAE5]">
                  St. Helena, California
                </span>
              </div>

              {/* Bottom Inset Caption */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#111114]/90 border border-[#2A2A30] backdrop-blur-xs">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#9E9C96]">
                  <span>Structural Cantilever: 8.4 Meters</span>
                  <span className="text-[#C5A880]">LEED Platinum Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Specifications (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <div className="flex items-center gap-4 text-xs font-mono text-[#8E8C87] mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Napa Valley Foothills</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Completed 2025</span>
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-light text-[#ECEAE5] leading-[1.12] tracking-tight mb-4 text-balance">
                The Napa Valley Cantilever Residence
              </h2>

              <div className="text-xs font-mono uppercase text-[#A5A39E] mb-6">
                Architecture: Kappe & Associates Architects
              </div>

              <p className="text-sm md:text-base text-[#9E9C96] font-light leading-relaxed mb-6">
                Suspended over an ancient hillside olive grove, this 750 m² private gallery villa resolves extreme seismic demands through massive post-tensioned mineral concrete cantilevers, balanced by continuous ribbons of VALEUR hand-patinated Nocturne bronze mullions and French fluted limestone.
              </p>

              {/* Key Technical Invariants Strip */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-[#141418] border border-[#232328] mb-8 text-xs font-mono">
                <div>
                  <span className="text-[#6E6C67] block text-[10px] uppercase">Envelope Area</span>
                  <span className="text-[#ECEAE5]">1,420 m² Cladding</span>
                </div>
                <div>
                  <span className="text-[#6E6C67] block text-[10px] uppercase">Thermal Transmittance</span>
                  <span className="text-[#ECEAE5]">U = 0.85 W/m²K</span>
                </div>
                <div>
                  <span className="text-[#6E6C67] block text-[10px] uppercase">Fire Rating</span>
                  <span className="text-[#ECEAE5]">Euroclass A1 Non-Comb.</span>
                </div>
                <div>
                  <span className="text-[#6E6C67] block text-[10px] uppercase">Acoustic Separation</span>
                  <span className="text-[#ECEAE5]">STC 54 / Rw 52 dB</span>
                </div>
              </div>
            </div>

            {/* Actions: View Case Study & Pin Palette */}
            <div className="pt-6 border-t border-[#232328] flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => setCaseStudyOpen(true)}
                className="px-6 py-3.5 bg-[#C5A880] text-[#0D0D0E] text-xs font-semibold uppercase tracking-wider hover:bg-[#d6ba94] transition-colors flex items-center justify-center gap-2"
              >
                <span>View Full Case Study</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onPinPalette(featuredMaterials)}
                className="px-5 py-3.5 border border-[#383842] text-[#ECEAE5] hover:border-[#C5A880] hover:text-[#C5A880] text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Pin Project Palette</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Full Modal */}
      {caseStudyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
            onClick={() => setCaseStudyOpen(false)}
            aria-hidden="true"
          />

          <div
            className="relative w-full max-w-4xl bg-[#111114] border border-[#2B2B32] shadow-2xl p-6 md:p-10 z-10 max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-label="Napa Valley Cantilever Residence Case Study"
          >
            <button
              onClick={() => setCaseStudyOpen(false)}
              className="absolute top-6 right-6 p-2 text-[#7E7C77] hover:text-[#ECEAE5] hover:bg-[#1A1A20] transition-colors"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="pb-6 border-b border-[#232328] mb-6">
              <div className="text-xs font-mono uppercase tracking-widest text-[#C5A880] mb-2">
                Monograph & Case Study // No. 04
              </div>
              <h3 className="text-2xl md:text-4xl font-editorial font-light text-[#ECEAE5] mb-2">
                Napa Valley Cantilever Residence
              </h3>
              <div className="text-xs font-mono text-[#8E8C87]">
                Kappe & Associates Architects · St. Helena, CA · 750 m² Enclosed
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 pb-4 mb-6 border-b border-[#232328]">
              {(['overview', 'drawings', 'materials'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeTab === tab
                      ? 'bg-[#C5A880] text-[#0D0D0E] font-semibold'
                      : 'bg-[#16161B] text-[#8E8C87] hover:text-[#ECEAE5]'
                  }`}
                >
                  {tab === 'overview' ? 'Design Narrative' : tab === 'drawings' ? 'Architectural Plans' : 'Specified Envelope'}
                </button>
              ))}
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6 text-xs md:text-sm text-[#9E9C96] font-light leading-relaxed">
                <div className="w-full h-72 bg-[#18181C] overflow-hidden border border-[#232328]">
                  <img
                    src="/src/assets/images/project_brutalist_villa_1793708249447.jpg"
                    alt="Cantilever detail view"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p>
                  The brief called for a structure that touched the volcanic hillside terrain as lightly as possible while withstanding severe coastal seismic zone 4 lateral drift. The architect engineered an 8.4-meter post-tensioned cantilever box beam that projects out towards the valley horizon.
                </p>
                <p>
                  VALEUR collaborated early in schematic design to provide customized thermal-break Nocturne bronze curtain wall mullions capable of supporting triple-glazed low-iron panels up to 3.8 meters in height without supplemental structural steel columns.
                </p>
              </div>
            )}

            {/* Tab 2: Drawings */}
            {activeTab === 'drawings' && (
              <div className="space-y-6">
                <div className="p-8 bg-[#0D0D10] border border-[#232328] font-mono text-xs">
                  <div className="text-[#C5A880] uppercase mb-4 flex items-center justify-between">
                    <span>Wall Section Detail // North Elevation</span>
                    <span>Scale 1:20</span>
                  </div>
                  <div className="h-64 border border-[#2B2B32] flex items-center justify-center p-6 bg-[#09090C] text-center">
                    <div className="space-y-3">
                      <Layers className="w-8 h-8 text-[#C5A880] mx-auto opacity-70" />
                      <div className="text-xs text-[#ECEAE5] font-mono">
                        CONCEALED KERF ANCHOR DETAIL [DWG-NV-04]
                      </div>
                      <div className="text-[11px] text-[#6E6C67] max-w-sm">
                        Continuous 3mm stainless bracket system anchoring 30mm Vaucluse fluted limestone panels to reinforced concrete substrate with 50mm ventilated air gap.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Materials */}
            {activeTab === 'materials' && (
              <div className="space-y-4">
                <div className="text-xs font-mono uppercase text-[#C5A880] mb-2">
                  Materials Specified Across Envelope:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {featuredMaterials.map((mat, i) => (
                    <div key={i} className="p-4 bg-[#141418] border border-[#232328] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 bg-[#C5A880]" />
                        <span className="text-xs font-medium text-[#ECEAE5]">{mat}</span>
                      </div>
                      <Check className="w-4 h-4 text-[#C5A880]" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="mt-8 pt-6 border-t border-[#232328] flex items-center justify-between">
              <button
                onClick={() => {
                  onPinPalette(featuredMaterials);
                  setCaseStudyOpen(false);
                }}
                className="px-6 py-2.5 bg-[#C5A880] text-[#0D0D0E] text-xs font-semibold uppercase tracking-wider hover:bg-[#d6ba94] transition-colors"
              >
                Pin All 4 Materials to Moodboard
              </button>

              <button
                onClick={() => {
                  setCaseStudyOpen(false);
                  onRequestSamples();
                }}
                className="px-5 py-2.5 border border-[#383842] text-[#ECEAE5] text-xs font-mono uppercase hover:border-[#C5A880] transition-colors"
              >
                Request Sample Specimen Kit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
