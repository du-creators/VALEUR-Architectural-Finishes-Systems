import React, { useState } from 'react';
import { MoodboardState, FinishItem, calculateSampleBoxWeight, generateSpecSummary, MAX_SAMPLE_BOX_FINISHES } from '../utils/moodboard';
import { X, Trash2, Copy, Check, Box, Sparkles, Plus, Download, Edit2 } from 'lucide-react';

interface MoodboardDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  moodboard: MoodboardState;
  onRemoveFinish: (id: string) => void;
  onClearMoodboard: () => void;
  onRenameProject: (name: string) => void;
  onRequestSampleBox: () => void;
  onAddSuggestedFinish: (finish: FinishItem) => void;
  availableSwatches: FinishItem[];
}

export const MoodboardDrawer: React.FC<MoodboardDrawerProps> = ({
  isOpen,
  onClose,
  moodboard,
  onRemoveFinish,
  onClearMoodboard,
  onRenameProject,
  onRequestSampleBox,
  onAddSuggestedFinish,
  availableSwatches,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [copiedSchedule, setCopiedSchedule] = useState(false);
  const [projectInput, setProjectInput] = useState(moodboard.projectName);

  if (!isOpen) return null;

  const { totalKg, formatted: formattedWeight } = calculateSampleBoxWeight(moodboard.selectedFinishes);
  const capacityPct = Math.min(100, (moodboard.selectedFinishes.length / MAX_SAMPLE_BOX_FINISHES) * 100);

  const handleCopySchedule = () => {
    const summary = generateSpecSummary(moodboard.projectName, moodboard.selectedFinishes);
    navigator.clipboard.writeText(summary);
    setCopiedSchedule(true);
    setTimeout(() => setCopiedSchedule(false), 2500);
  };

  const handleSaveTitle = () => {
    if (projectInput.trim()) {
      onRenameProject(projectInput.trim());
    }
    setIsEditingTitle(false);
  };

  const unpinnedSuggestions = availableSwatches.filter(
    (s) => !moodboard.selectedFinishes.some((f) => f.id === s.id)
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <aside
        className="relative w-full max-w-xl bg-[#101013] border-l border-[#232328] h-full shadow-2xl flex flex-col z-10 overflow-hidden"
        role="dialog"
        aria-label="Creative Material Moodboard Drawer"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#232328] bg-[#0E0E11] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] mb-1">
              Interactive Curation Drawer
            </div>

            {isEditingTitle ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={projectInput}
                  onChange={(e) => setProjectInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
                  className="bg-[#18181C] border border-[#C5A880] px-2 py-1 text-sm font-editorial text-[#ECEAE5] focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={handleSaveTitle}
                  className="px-2 py-1 bg-[#C5A880] text-[#0D0D0E] text-xs font-semibold"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditingTitle(true)}>
                <h3 className="text-xl font-editorial font-medium text-[#ECEAE5]">
                  {moodboard.projectName}
                </h3>
                <Edit2 className="w-3.5 h-3.5 text-[#6E6C67] group-hover:text-[#C5A880] transition-colors" />
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#8E8C87] hover:text-[#ECEAE5] hover:bg-[#1A1A1E] transition-colors"
            aria-label="Close Moodboard Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Specimen Box Capacity Bar */}
        <div className="px-6 py-3 bg-[#141418] border-b border-[#232328] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-[#9E9C96]">
            <Box className="w-4 h-4 text-[#C5A880]" />
            <span>Sample Box Capacity:</span>
            <span className="text-[#ECEAE5] font-semibold">
              {moodboard.selectedFinishes.length} / {MAX_SAMPLE_BOX_FINISHES} Finishes
            </span>
          </div>
          <div className="text-[#C5A880] font-medium">
            Est. Weight: {formattedWeight}
          </div>
        </div>

        {/* Capacity Progress Track */}
        <div className="w-full h-1 bg-[#1C1C22]">
          <div
            className="h-full bg-[#C5A880] transition-all duration-300"
            style={{ width: `${capacityPct}%` }}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {moodboard.selectedFinishes.length === 0 ? (
            /* Empty State */
            <div className="py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#16161A] border border-[#2B2B32] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#C5A880]" />
              </div>
              <h4 className="text-lg font-editorial text-[#ECEAE5] mb-2">
                Your Moodboard is Empty
              </h4>
              <p className="text-xs text-[#8A8883] max-w-xs mx-auto mb-8 font-light leading-relaxed">
                Click "Pin Sample" on any material card, 3D monolith finish, or colour swatch to curate your architectural palette.
              </p>

              {/* Suggestions */}
              {unpinnedSuggestions.length > 0 && (
                <div className="text-left bg-[#141418] border border-[#232328] p-4 max-w-sm mx-auto">
                  <div className="text-[10px] font-mono uppercase text-[#C5A880] mb-3">
                    Recommended Atelier Finishes:
                  </div>
                  <div className="space-y-2">
                    {unpinnedSuggestions.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => onAddSuggestedFinish(s)}
                        className="flex items-center justify-between p-2 bg-[#1A1A1F] hover:bg-[#222228] border border-[#272730] cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-3.5 h-3.5" style={{ backgroundColor: s.hex }} />
                          <div className="text-xs text-[#ECEAE5]">{s.name}</div>
                        </div>
                        <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Palette Color Ribbon Preview */}
              <div className="bg-[#141418] border border-[#232328] p-4">
                <div className="text-[10px] font-mono uppercase text-[#7A7873] mb-2 flex items-center justify-between">
                  <span>Architectural Harmony Palette</span>
                  <span>{moodboard.selectedFinishes.length} Finishes</span>
                </div>
                <div className="flex h-10 w-full border border-black/40 overflow-hidden">
                  {moodboard.selectedFinishes.map((f) => (
                    <div
                      key={f.id}
                      className="flex-1 transition-all hover:scale-105 relative group"
                      style={{ backgroundColor: f.hex }}
                      title={`${f.name} (${f.finishType})`}
                    />
                  ))}
                </div>
              </div>

              {/* Pinned Finishes List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono uppercase text-[#7A7873]">
                  <span>Specified Finishes</span>
                  <button
                    onClick={onClearMoodboard}
                    className="text-[#96948F] hover:text-[#FF6B6B] transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {moodboard.selectedFinishes.map((finish) => (
                  <div
                    key={finish.id}
                    className="p-3 bg-[#141418] border border-[#232328] hover:border-[#33333C] transition-all flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 border border-black/40 shrink-0"
                        style={{ backgroundColor: finish.hex }}
                      />
                      <div>
                        <div className="text-xs font-mono text-[#8E8C87]">
                          {finish.code} · {finish.finishType}
                        </div>
                        <div className="text-sm font-medium text-[#ECEAE5]">
                          {finish.name}
                        </div>
                        <div className="text-[11px] font-mono text-[#6E6C67]">
                          LRV: {finish.lrv}% · Weight: {finish.weightKg} kg · {finish.fireRating}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveFinish(finish.id)}
                      className="p-2 text-[#6E6C67] hover:text-[#FF6B6B] transition-colors"
                      title="Remove from moodboard"
                      aria-label={`Remove ${finish.name} from moodboard`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Drawer Actions Footer */}
        {moodboard.selectedFinishes.length > 0 && (
          <div className="p-6 border-t border-[#232328] bg-[#0E0E11] space-y-3">
            <button
              onClick={onRequestSampleBox}
              className="w-full py-3.5 bg-[#C5A880] text-[#0D0D0E] text-xs font-semibold uppercase tracking-wider hover:bg-[#d6ba94] transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Box className="w-4 h-4" />
              <span>Order Physical Specimen Box ({moodboard.selectedFinishes.length} Finishes)</span>
            </button>

            <button
              onClick={handleCopySchedule}
              className="w-full py-3 border border-[#303038] hover:border-[#52525C] text-[#ECEAE5] text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              {copiedSchedule ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Specification Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Copy CSI/AIA Specification Schedule</span>
                </>
              )}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
