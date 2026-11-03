import React from 'react';
import { Box, Sparkles } from 'lucide-react';

interface StickyRequestSamplesButtonProps {
  pinnedCount: number;
  onClick: () => void;
}

export const StickyRequestSamplesButton: React.FC<StickyRequestSamplesButtonProps> = ({
  pinnedCount,
  onClick,
}) => {
  return (
    <aside
      className="fixed bottom-6 right-6 z-40 print:hidden transition-transform duration-300"
      aria-label="Floating Sample Request Action"
    >
      <button
        onClick={onClick}
        className="group relative flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 bg-[#101013] hover:bg-[#18181D] text-[#ECEAE5] border border-[#C5A880]/60 hover:border-[#C5A880] shadow-[0_8px_30px_rgb(0,0,0,0.6)] transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0"
        title="Request Physical Specimen Box"
        aria-label={`Request Samples (${pinnedCount} selected)`}
      >
        {/* Subtle gold accent corner indicator */}
        <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#C5A880]" />

        {/* Box Icon with subtle hover rotation */}
        <div className="relative">
          <Box className="w-4 h-4 text-[#C5A880] group-hover:rotate-6 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#C5A880] rounded-none opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Text & Dynamic Counter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#ECEAE5] group-hover:text-[#C5A880] transition-colors whitespace-nowrap">
            <span className="hidden sm:inline">Request </span>Samples
          </span>

          {pinnedCount > 0 && (
            <span className="px-2 py-0.5 bg-[#25221B] text-[#C5A880] text-[11px] font-mono font-bold border border-[#C5A880]/40 shrink-0">
              {pinnedCount}
            </span>
          )}
        </div>

        {/* Sparkle icon */}
        <Sparkles className="w-3.5 h-3.5 text-[#C5A880] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all hidden sm:block" />
      </button>
    </aside>
  );
};
