import React, { useState, useMemo } from 'react';
import { ProductItem } from '../data/materialsData';
import { FinishItem } from '../utils/moodboard';
import { ProductFilterBar, FilterCriteria } from './ProductFilterBar';
import { Plus, Check, FileText, ArrowUpRight, SearchX } from 'lucide-react';

interface ProductGridProps {
  products: ProductItem[];
  pinnedIds: Set<string>;
  onTogglePin: (finish: FinishItem) => void;
  onOpenSpecSheet: (product: ProductItem) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  pinnedIds,
  onTogglePin,
  onOpenSpecSheet,
}) => {
  const [filters, setFilters] = useState<FilterCriteria>({
    category: 'all',
    material: 'all',
    finish: 'all',
  });

  const handleChangeFilter = (key: keyof FilterCriteria, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      material: 'all',
      finish: 'all',
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      const matchCategory = filters.category === 'all' || p.category === filters.category;

      // Material match
      const matLower = p.material.toLowerCase();
      let matchMaterial = true;
      if (filters.material !== 'all') {
        if (filters.material === 'limestone') matchMaterial = matLower.includes('limestone');
        else if (filters.material === 'bronze') matchMaterial = matLower.includes('bronze');
        else if (filters.material === 'basalt') matchMaterial = matLower.includes('basalt');
        else if (filters.material === 'oak') matchMaterial = matLower.includes('oak');
        else if (filters.material === 'concrete') matchMaterial = matLower.includes('concrete') || matLower.includes('pozzolanic');
      }

      // Finish match
      const finLower = p.finishOption.toLowerCase();
      let matchFinish = true;
      if (filters.finish !== 'all') {
        if (filters.finish === 'honed') matchFinish = finLower.includes('honed');
        else if (filters.finish === 'patinated') matchFinish = finLower.includes('patinated') || finLower.includes('oxidized');
        else if (filters.finish === 'fluted') matchFinish = finLower.includes('fluted') || finLower.includes('ribbed');
        else if (filters.finish === 'brushed') matchFinish = finLower.includes('brushed');
        else if (filters.finish === 'acid-etched') matchFinish = finLower.includes('acid') || finLower.includes('etched');
      }

      return matchCategory && matchMaterial && matchFinish;
    });
  }, [products, filters]);

  const handlePinClick = (p: ProductItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const finish: FinishItem = {
      id: `swatch-${p.id}`,
      name: p.name,
      category: p.category === 'cladding' || p.category === 'monolithic' ? 'stone' : p.category === 'metals' ? 'metal' : 'timber',
      subCategory: p.categoryLabel,
      code: p.specCode.split(' ')[1] || p.id,
      hex: p.swatchHex,
      finishType: p.category === 'metals' ? 'Patinated' : p.category === 'cladding' ? 'Fluted' : 'Honed',
      lrv: p.lrv,
      fireRating: p.fireRating,
      leadTimeWeeks: parseInt(p.leadTime) || 4,
      description: p.description,
      weightKg: 0.55,
      image: p.image,
    };
    onTogglePin(finish);
  };

  return (
    <section id="products" className="w-full bg-[#0D0D0E] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#C5A880] mb-2">
              Catalog // High-Performance Materials
            </div>
            <h2 className="text-3xl md:text-5xl font-editorial font-light text-[#ECEAE5] tracking-tight">
              Architectural Systems & Envelope Cladding
            </h2>
          </div>

          <p className="text-sm text-[#8F8D88] max-w-md font-light leading-relaxed">
            Every material is precision-calibrated for dimensional tolerance, environmental exposure, and acoustic dampening across luxury commercial and private envelopes.
          </p>
        </div>

        {/* Multi-Dimensional Filter Bar Component */}
        <ProductFilterBar
          filters={filters}
          onChangeFilter={handleChangeFilter}
          onResetFilters={handleResetFilters}
          totalCount={products.length}
          filteredCount={filteredProducts.length}
        />

        {/* Product Cards Grid with smooth transitions */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-[#111114] border border-[#232328] p-8">
            <SearchX className="w-10 h-10 text-[#C5A880] mx-auto mb-3 opacity-60" />
            <h4 className="text-lg font-editorial text-[#ECEAE5] mb-2">
              No Architectural Systems Match Your Specific Filter Criteria
            </h4>
            <p className="text-xs text-[#8A8883] mb-6 font-light">
              Try adjusting your category, material, or surface finish selections.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2 bg-[#C5A880] text-[#0D0D0E] text-xs font-mono uppercase tracking-wider font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300">
            {filteredProducts.map((product) => {
              const isPinned = pinnedIds.has(`swatch-${product.id}`);
              return (
                <div
                  key={product.id}
                  onClick={() => onOpenSpecSheet(product)}
                  className="group cursor-pointer bg-[#111114] border border-[#232328] hover:border-[#3D3D46] transition-all duration-300 flex flex-col justify-between animate-fade-in"
                >
                  {/* Image Showcase Container */}
                  <div className="relative w-full h-72 bg-[#18181C] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover grayscale-[10%] group-hover:scale-104 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-transparent pointer-events-none" />

                    {/* Pin to Moodboard Quick Button */}
                    <button
                      onClick={(e) => handlePinClick(product, e)}
                      className={`absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                        isPinned
                          ? 'bg-[#C5A880] text-[#0D0D0E] font-semibold'
                          : 'bg-[#0E0E11]/90 text-[#D5D3CE] hover:bg-[#C5A880] hover:text-[#0D0D0E] border border-[#2B2B32]'
                      }`}
                      title={isPinned ? 'Remove from Moodboard' : 'Pin Finish to Moodboard'}
                      aria-label={`Pin ${product.name} to creative moodboard`}
                    >
                      {isPinned ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Pinned</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Pin Sample</span>
                        </>
                      )}
                    </button>

                    {/* Category Chip */}
                    <div className="absolute bottom-3 left-4 text-[11px] font-mono uppercase tracking-wider text-[#C5A880]">
                      {product.categoryLabel}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono text-[#7D7B76] mb-1.5">
                        {product.specCode}
                      </div>

                      <h3 className="text-xl font-editorial font-medium text-[#ECEAE5] group-hover:text-[#C5A880] transition-colors mb-2">
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#95938E] leading-relaxed line-clamp-2 mb-4 font-light">
                        {product.description}
                      </p>
                    </div>

                    {/* Architectural Specs Row */}
                    <div className="pt-4 border-t border-[#1F1F24]">
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#9B9994] mb-4">
                        <div>
                          <span className="text-[#686662]">Fire:</span> {product.fireRating}
                        </div>
                        <div>
                          <span className="text-[#686662]">LRV:</span> {product.lrv}%
                        </div>
                        <div className="truncate">
                          <span className="text-[#686662]">Origin:</span> {product.origin.split(',')[0]}
                        </div>
                        <div>
                          <span className="text-[#686662]">Lead:</span> {product.leadTime.split(' ')[0]}
                        </div>
                      </div>

                      {/* View Spec Sheet Link */}
                      <div className="flex items-center justify-between text-xs font-mono text-[#C5A880] group-hover:text-[#ECEAE5] transition-colors pt-1">
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Technical Spec</span>
                        </span>
                        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
