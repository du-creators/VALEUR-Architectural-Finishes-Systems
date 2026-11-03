import React, { useState } from 'react';
import { FinishItem, filterFinishes } from '../utils/moodboard';
import { Sparkles, Check, Plus, Sun, SlidersHorizontal, Info } from 'lucide-react';

interface ColoursFinishesProps {
  swatches: FinishItem[];
  pinnedIds: Set<string>;
  onTogglePin: (finish: FinishItem) => void;
}

export const ColoursFinishes: React.FC<ColoursFinishesProps> = ({
  swatches,
  pinnedIds,
  onTogglePin,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSwatch, setActiveSwatch] = useState<FinishItem>(swatches[0]);
  const [lightAngle, setLightAngle] = useState<number>(45);

  const categories = [
    { key: 'all', label: 'All Finishes' },
    { key: 'stone', label: 'French & Alpine Stone' },
    { key: 'metal', label: 'Patinated Bronze & Alloys' },
    { key: 'timber', label: 'Fumed Timber' },
    { key: 'concrete', label: 'Mineral Concrete' },
  ];

  const filtered = filterFinishes(swatches, selectedCategory, '');

  const isPinned = pinnedIds.has(activeSwatch.id);

  return (
    <section id="finishes" className="w-full bg-[#0F0F12] py-20 px-6 border-t border-[#232328]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#C5A880] mb-2">
              Palette // Tactile Materials & Swatches
            </div>
            <h2 className="text-3xl md:text-5xl font-editorial font-light text-[#ECEAE5] tracking-tight">
              Colours, Patinas & Surface Finishes
            </h2>
          </div>

          <p className="text-sm text-[#8F8D88] max-w-md font-light leading-relaxed">
            Formulated with zero synthetic plasticizers. Every pigment is mineral-derived, allowing stone, bronze, and concrete surfaces to breathe and age gracefully.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-[#232328]">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 text-xs font-medium tracking-wide uppercase whitespace-nowrap transition-colors shrink-0 ${
                selectedCategory === cat.key
                  ? 'bg-[#C5A880] text-[#0D0D0E] font-semibold'
                  : 'bg-[#141417] text-[#8E8C87] hover:text-[#ECEAE5] border border-[#232328]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Interactive Dual-Panel Swatch Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Swatch Selector Grid (8 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {filtered.map((swatch) => {
              const isSelected = activeSwatch.id === swatch.id;
              const isItemPinned = pinnedIds.has(swatch.id);

              return (
                <div
                  key={swatch.id}
                  onClick={() => setActiveSwatch(swatch)}
                  className={`group cursor-pointer p-4 bg-[#141418] border transition-all duration-200 relative flex flex-col justify-between h-44 ${
                    isSelected
                      ? 'border-[#C5A880] ring-1 ring-[#C5A880]/30 shadow-lg'
                      : 'border-[#232328] hover:border-[#383842]'
                  }`}
                >
                  {/* Swatch Color Block */}
                  <div
                    className="w-full h-16 border border-black/40 relative overflow-hidden transition-transform group-hover:scale-102"
                    style={{ backgroundColor: swatch.hex }}
                  >
                    {/* Simulated tactile texture sheen */}
                    <div
                      className="absolute inset-0 opacity-25 mix-blend-overlay"
                      style={{
                        backgroundImage: `linear-gradient(${lightAngle}deg, rgba(255,255,255,0.7) 0%, transparent 60%)`,
                      }}
                    />
                  </div>

                  <div className="mt-3">
                    <div className="text-[10px] font-mono text-[#8E8C87] truncate">
                      {swatch.code}
                    </div>
                    <div className="text-xs font-medium text-[#ECEAE5] truncate group-hover:text-[#C5A880] transition-colors">
                      {swatch.name}
                    </div>
                    <div className="text-[11px] font-mono text-[#6A6965] mt-1 flex items-center justify-between">
                      <span>{swatch.finishType}</span>
                      <span>LRV {swatch.lrv}%</span>
                    </div>
                  </div>

                  {/* Pinned Indicator badge */}
                  {isItemPinned && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-[#C5A880]" title="Pinned in Moodboard" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Active Swatch Tactile Macro Inspector (5 cols) */}
          <div className="lg:col-span-5 bg-[#141418] border border-[#2B2B32] p-6 lg:p-8">
            <div className="flex items-center justify-between text-xs font-mono uppercase text-[#C5A880] pb-4 border-b border-[#232328] mb-6">
              <span>Tactile Finish Inspection</span>
              <span>{activeSwatch.code}</span>
            </div>

            {/* Macro Preview Surface */}
            <div className="relative w-full h-56 border border-[#232328] overflow-hidden mb-6 flex items-center justify-center">
              <div
                className="w-full h-full relative"
                style={{ backgroundColor: activeSwatch.hex }}
              >
                {/* Dynamic solar angle reflection overlay */}
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-300"
                  style={{
                    background: `linear-gradient(${lightAngle}deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 45%, transparent 70%)`,
                  }}
                />

                <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#0E0E11]/85 border border-[#232328] backdrop-blur-xs flex items-center justify-between">
                  <div className="text-xs font-mono text-[#D5D3CE]">
                    {activeSwatch.finishType} Surface
                  </div>
                  <div className="text-xs font-mono text-[#C5A880]">
                    LRV {activeSwatch.lrv}% Reflectance
                  </div>
                </div>
              </div>
            </div>

            {/* Light angle slider simulator */}
            <div className="mb-6 p-4 bg-[#0E0E11] border border-[#232328]">
              <div className="flex items-center justify-between text-xs font-mono uppercase text-[#888681] mb-2">
                <span className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Grazing Light Incidence</span>
                </span>
                <span className="text-[#ECEAE5]">{lightAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={lightAngle}
                onChange={(e) => setLightAngle(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#232328] accent-[#C5A880] rounded-none appearance-none cursor-pointer"
                aria-label="Adjust grazing light angle"
              />
            </div>

            {/* Active Details */}
            <h3 className="text-2xl font-editorial font-medium text-[#ECEAE5] mb-2">
              {activeSwatch.name}
            </h3>
            <p className="text-xs text-[#9E9C96] leading-relaxed font-light mb-6">
              {activeSwatch.description}
            </p>

            {/* Technical Metadata Row */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono p-4 bg-[#101013] border border-[#232328] mb-6">
              <div>
                <span className="text-[#6E6C67]">Category:</span>{' '}
                <span className="text-[#ECEAE5] uppercase">{activeSwatch.category}</span>
              </div>
              <div>
                <span className="text-[#6E6C67]">Fire Rating:</span>{' '}
                <span className="text-[#ECEAE5]">{activeSwatch.fireRating}</span>
              </div>
              <div>
                <span className="text-[#6E6C67]">Lead Time:</span>{' '}
                <span className="text-[#ECEAE5]">{activeSwatch.leadTimeWeeks} Weeks</span>
              </div>
              <div>
                <span className="text-[#6E6C67]">Sample Weight:</span>{' '}
                <span className="text-[#ECEAE5]">{activeSwatch.weightKg} kg</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onTogglePin(activeSwatch)}
                className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                  isPinned
                    ? 'bg-[#2A261F] text-[#C5A880] border border-[#C5A880]'
                    : 'bg-[#C5A880] text-[#0D0D0E] hover:bg-[#d6ba94]'
                }`}
              >
                {isPinned ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Pinned in Moodboard</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Pin to Creative Moodboard</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
