import React from 'react';
import { Filter, RotateCcw, ChevronDown } from 'lucide-react';

export interface FilterCriteria {
  category: string;
  material: string;
  finish: string;
}

interface ProductFilterBarProps {
  filters: FilterCriteria;
  onChangeFilter: (key: keyof FilterCriteria, value: string) => void;
  onResetFilters: () => void;
  totalCount: number;
  filteredCount: number;
}

export const ProductFilterBar: React.FC<ProductFilterBarProps> = ({
  filters,
  onChangeFilter,
  onResetFilters,
  totalCount,
  filteredCount,
}) => {
  const isFiltered = filters.category !== 'all' || filters.material !== 'all' || filters.finish !== 'all';

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'cladding', label: 'Stone Cladding & Facades' },
    { value: 'metals', label: 'Architectural Metals' },
    { value: 'timber', label: 'Acoustic Wood' },
    { value: 'monolithic', label: 'Monolithic Surfaces' },
  ];

  const materialOptions = [
    { value: 'all', label: 'All Materials' },
    { value: 'limestone', label: 'Limestone' },
    { value: 'bronze', label: 'Architectural Bronze' },
    { value: 'basalt', label: 'Alpine Basalt' },
    { value: 'oak', label: 'European Oak' },
    { value: 'concrete', label: 'Mineral Concrete' },
  ];

  const finishOptions = [
    { value: 'all', label: 'All Finishes' },
    { value: 'honed', label: 'Honed & Silk-Touch' },
    { value: 'patinated', label: 'Hand-Patinated' },
    { value: 'fluted', label: 'Fluted & Ribbed' },
    { value: 'brushed', label: 'Satin Brushed' },
    { value: 'acid-etched', label: 'Acid-Etched Micro-Pores' },
  ];

  return (
    <div className="w-full bg-[#121216] border border-[#232328] p-5 mb-10 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1E1E24] mb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#C5A880]">
          <Filter className="w-3.5 h-3.5" />
          <span>Multi-Criteria Specification Filters</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#8E8C87]">
          <span>
            Showing <strong className="text-[#ECEAE5]">{filteredCount}</strong> of {totalCount} systems
          </span>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1.5 text-[#C5A880] hover:text-[#ECEAE5] transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* 3 Dropdown / Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 1. Category */}
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-wider text-[#7E7C77] mb-1.5">
            Category
          </label>
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => onChangeFilter('category', e.target.value)}
              className="w-full appearance-none bg-[#16161B] border border-[#282830] hover:border-[#3E3E48] focus:border-[#C5A880] text-[#ECEAE5] text-xs font-mono px-3.5 py-2.5 pr-8 focus:outline-none transition-colors cursor-pointer"
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#7E7C77] absolute right-3 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* 2. Material */}
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-wider text-[#7E7C77] mb-1.5">
            Material
          </label>
          <div className="relative">
            <select
              value={filters.material}
              onChange={(e) => onChangeFilter('material', e.target.value)}
              className="w-full appearance-none bg-[#16161B] border border-[#282830] hover:border-[#3E3E48] focus:border-[#C5A880] text-[#ECEAE5] text-xs font-mono px-3.5 py-2.5 pr-8 focus:outline-none transition-colors cursor-pointer"
            >
              {materialOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#7E7C77] absolute right-3 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* 3. Finish */}
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-wider text-[#7E7C77] mb-1.5">
            Surface Finish
          </label>
          <div className="relative">
            <select
              value={filters.finish}
              onChange={(e) => onChangeFilter('finish', e.target.value)}
              className="w-full appearance-none bg-[#16161B] border border-[#282830] hover:border-[#3E3E48] focus:border-[#C5A880] text-[#ECEAE5] text-xs font-mono px-3.5 py-2.5 pr-8 focus:outline-none transition-colors cursor-pointer"
            >
              {finishOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#7E7C77] absolute right-3 top-3.5 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
