import React, { useState } from 'react';
import { ProductItem } from '../data/materialsData';
import { FinishItem } from '../utils/moodboard';
import { X, Download, FileText, Check, ShieldCheck, Box, Layers, Sparkles } from 'lucide-react';

interface SpecSheetModalProps {
  product: ProductItem | null;
  onClose: () => void;
  isPinned: boolean;
  onTogglePin: (finish: FinishItem) => void;
}

export const SpecSheetModal: React.FC<SpecSheetModalProps> = ({
  product,
  onClose,
  isPinned,
  onTogglePin,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!product) return null;

  const handleDownload = (format: string) => {
    setDownloadSuccess(`Generated ${product.name} ${format} package`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handlePin = () => {
    const finish: FinishItem = {
      id: `swatch-${product.id}`,
      name: product.name,
      category: product.category === 'cladding' || product.category === 'monolithic' ? 'stone' : product.category === 'metals' ? 'metal' : 'timber',
      subCategory: product.categoryLabel,
      code: product.specCode.split(' ')[1] || product.id,
      hex: product.swatchHex,
      finishType: product.category === 'metals' ? 'Patinated' : product.category === 'cladding' ? 'Fluted' : 'Honed',
      lrv: product.lrv,
      fireRating: product.fireRating,
      leadTimeWeeks: parseInt(product.leadTime) || 4,
      description: product.description,
      weightKg: 0.55,
      image: product.image,
    };
    onTogglePin(finish);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-4xl bg-[#111114] border border-[#2B2B32] shadow-2xl p-6 md:p-10 z-10 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-label={`Architectural Technical Specification for ${product.name}`}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#7E7C77] hover:text-[#ECEAE5] hover:bg-[#1A1A20] transition-colors"
          aria-label="Close Specification Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#232328] mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#C5A880] mb-2">
              Technical Specification Schedule // {product.specCode}
            </div>
            <h2 className="text-2xl md:text-4xl font-editorial font-light text-[#ECEAE5] mb-2">
              {product.name}
            </h2>
            <div className="text-xs font-mono text-[#8E8C87]">
              Origin: {product.origin} · Standard Lead Time: {product.leadTime}
            </div>
          </div>

          <button
            onClick={handlePin}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider shrink-0 transition-colors ${
              isPinned
                ? 'bg-[#2A261F] text-[#C5A880] border border-[#C5A880]'
                : 'bg-[#C5A880] text-[#0D0D0E] hover:bg-[#d6ba94]'
            }`}
          >
            {isPinned ? (
              <>
                <Check className="w-4 h-4" />
                <span>Pinned to Moodboard</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Pin to Creative Moodboard</span>
              </>
            )}
          </button>
        </div>

        {/* Download Feedback */}
        {downloadSuccess && (
          <div className="p-3 mb-6 bg-[#1A1A20] border border-[#C5A880] text-[#ECEAE5] text-xs font-mono flex items-center gap-2">
            <Check className="w-4 h-4 text-[#C5A880]" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* 2-Column Specs Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
          {/* Left: Product Image & Features (5 cols) */}
          <div className="md:col-span-5">
            <div className="w-full h-64 bg-[#18181C] border border-[#232328] overflow-hidden mb-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="text-xs font-mono uppercase text-[#C5A880] mb-3">
              Performance Engineering Attributes
            </div>
            <ul className="space-y-2 mb-6">
              {product.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#B5B3AD] font-light leading-relaxed">
                  <span className="w-1.5 h-1.5 bg-[#C5A880] mt-1 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Technical Specification Table (7 cols) */}
          <div className="md:col-span-7">
            <div className="bg-[#141418] border border-[#232328] overflow-hidden">
              <div className="px-5 py-3 bg-[#18181D] border-b border-[#232328] text-xs font-mono uppercase text-[#8E8C87]">
                Physical & Mechanical Invariants
              </div>

              <div className="divide-y divide-[#202026] text-xs font-mono">
                <div className="px-5 py-3 flex justify-between">
                  <span className="text-[#8E8C87]">Material Composition:</span>
                  <span className="text-[#ECEAE5] text-right">{product.material}</span>
                </div>
                <div className="px-5 py-3 flex justify-between">
                  <span className="text-[#8E8C87]">Surface Finish Option:</span>
                  <span className="text-[#ECEAE5] text-right">{product.finishOption}</span>
                </div>
                <div className="px-5 py-3 flex justify-between">
                  <span className="text-[#8E8C87]">Compressive Strength:</span>
                  <span className="text-[#ECEAE5]">{product.compressiveStrength}</span>
                </div>
                <div className="px-5 py-3 flex justify-between">
                  <span className="text-[#8E8C87]">Thermal Conductivity:</span>
                  <span className="text-[#ECEAE5]">{product.thermalConductivity}</span>
                </div>
                <div className="px-5 py-3 flex justify-between">
                  <span className="text-[#8E8C87]">Fire Reaction Rating:</span>
                  <span className="text-[#ECEAE5]">{product.fireRating}</span>
                </div>
                <div className="px-5 py-3 flex justify-between">
                  <span className="text-[#8E8C87]">Light Reflectance Value (LRV):</span>
                  <span className="text-[#C5A880]">{product.lrv}%</span>
                </div>
                <div className="px-5 py-3 flex justify-between">
                  <span className="text-[#8E8C87]">Standard Dimensions:</span>
                  <span className="text-[#ECEAE5] text-right">{product.dimensionsStandard}</span>
                </div>
                <div className="px-5 py-3 flex justify-between">
                  <span className="text-[#8E8C87]">Weight per Surface Area:</span>
                  <span className="text-[#ECEAE5]">{product.weightPerM2}</span>
                </div>
              </div>
            </div>

            {/* LEED & Environmental Credits */}
            <div className="mt-4 p-4 bg-[#141418] border border-[#232328]">
              <div className="text-[11px] font-mono uppercase text-[#C5A880] mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>LEED v4.1 & Green Building Contributions</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.leedCredits.map((credit, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-[#1C1C22] text-[11px] font-mono text-[#D5D3CE] border border-[#2A2A32]"
                  >
                    {credit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CAD / BIM Digital Assets Strip */}
        <div className="pt-6 border-t border-[#232328]">
          <div className="text-xs font-mono uppercase tracking-widest text-[#8E8C87] mb-4">
            BIM Objects & Technical Specification Downloads
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleDownload('Revit (.RFA)')}
              className="p-3 bg-[#16161B] hover:bg-[#1E1E24] border border-[#282830] hover:border-[#3E3E48] text-left transition-colors group flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-mono text-[#ECEAE5] group-hover:text-[#C5A880] transition-colors">
                  Revit Family (.RFA)
                </div>
                <div className="text-[10px] font-mono text-[#6E6C67]">
                  Parametric 3D Model
                </div>
              </div>
              <Download className="w-4 h-4 text-[#6E6C67] group-hover:text-[#C5A880] transition-colors" />
            </button>

            <button
              onClick={() => handleDownload('CSI MasterFormat Spec (.DOCX)')}
              className="p-3 bg-[#16161B] hover:bg-[#1E1E24] border border-[#282830] hover:border-[#3E3E48] text-left transition-colors group flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-mono text-[#ECEAE5] group-hover:text-[#C5A880] transition-colors">
                  CSI 3-Part Spec (.DOCX)
                </div>
                <div className="text-[10px] font-mono text-[#6E6C67]">
                  AIA Architectural Section
                </div>
              </div>
              <Download className="w-4 h-4 text-[#6E6C67] group-hover:text-[#C5A880] transition-colors" />
            </button>

            <button
              onClick={() => handleDownload('4K PBR Seamless Maps (.ZIP)')}
              className="p-3 bg-[#16161B] hover:bg-[#1E1E24] border border-[#282830] hover:border-[#3E3E48] text-left transition-colors group flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-mono text-[#ECEAE5] group-hover:text-[#C5A880] transition-colors">
                  4K PBR Texture Maps (.ZIP)
                </div>
                <div className="text-[10px] font-mono text-[#6E6C67]">
                  Albedo, Normal, Roughness
                </div>
              </div>
              <Download className="w-4 h-4 text-[#6E6C67] group-hover:text-[#C5A880] transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
