import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedProject } from './components/FeaturedProject';
import { ProductGrid } from './components/ProductGrid';
import { ColoursFinishes } from './components/ColoursFinishes';
import { ThreeMaterialViewer } from './components/ThreeMaterialViewer';
import { ProjectsPortfolio } from './components/ProjectsPortfolio';
import { ResourcesAndJournal } from './components/ResourcesAndJournal';
import { Footer } from './components/Footer';
import { MoodboardDrawer } from './components/MoodboardDrawer';
import { SampleOrderModal } from './components/SampleOrderModal';
import { SpecSheetModal } from './components/SpecSheetModal';
import { StickyRequestSamplesButton } from './components/StickyRequestSamplesButton';
import {
  FINISH_SWATCHES,
  PRODUCTS_CATALOG,
  PROJECTS_PORTFOLIO,
  ProductItem,
} from './data/materialsData';
import {
  MoodboardState,
  FinishItem,
  createInitialMoodboard,
  toggleFinish,
  removeFinish,
  addFinish,
} from './utils/moodboard';
import { Check } from 'lucide-react';

export default function App() {
  const [moodboard, setMoodboard] = useState<MoodboardState>(() => {
    const initial = createInitialMoodboard('Napa Valley Cantilever Residence');
    initial.selectedFinishes = [FINISH_SWATCHES[0], FINISH_SWATCHES[1]];
    return initial;
  });

  const [isMoodboardOpen, setIsMoodboardOpen] = useState(false);
  const [isSampleOrderModalOpen, setIsSampleOrderModalOpen] = useState(false);
  const [activeSpecProduct, setActiveSpecProduct] = useState<ProductItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const pinnedIds = new Set(moodboard.selectedFinishes.map((f) => f.id));

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTogglePin = (finish: FinishItem) => {
    const { state, isPinned } = toggleFinish(moodboard, finish);
    setMoodboard(state);
    if (isPinned) {
      showToast(`Pinned "${finish.name}" to moodboard`);
    } else {
      showToast(`Removed "${finish.name}" from moodboard`);
    }
  };

  const handleRemoveFinish = (id: string) => {
    const item = moodboard.selectedFinishes.find((f) => f.id === id);
    setMoodboard((prev) => removeFinish(prev, id));
    if (item) {
      showToast(`Removed "${item.name}"`);
    }
  };

  const handleClearMoodboard = () => {
    setMoodboard((prev) => ({ ...prev, selectedFinishes: [] }));
    showToast('Cleared active moodboard palette');
  };

  const handleRenameProject = (newName: string) => {
    setMoodboard((prev) => ({ ...prev, projectName: newName }));
    showToast(`Project schedule renamed to "${newName}"`);
  };

  const handleAddSuggestedFinish = (finish: FinishItem) => {
    const { state, added, error } = addFinish(moodboard, finish);
    if (added) {
      setMoodboard(state);
      showToast(`Pinned "${finish.name}"`);
    } else if (error) {
      showToast(error);
    }
  };

  const handlePinPalette = (materialNames: string[]) => {
    let current = moodboard;
    let addedCount = 0;

    materialNames.forEach((matName) => {
      const foundSwatch = FINISH_SWATCHES.find((s) => s.name.toLowerCase().includes(matName.toLowerCase().slice(0, 8)));
      if (foundSwatch) {
        const res = addFinish(current, foundSwatch);
        if (res.added) {
          current = res.state;
          addedCount++;
        }
      }
    });

    setMoodboard(current);
    if (addedCount > 0) {
      showToast(`Pinned ${addedCount} project finish(es) to moodboard`);
      setIsMoodboardOpen(true);
    } else {
      showToast('All project materials are already pinned');
    }
  };

  const handlePinCurrent3DFinish = (finishName: string) => {
    const found = FINISH_SWATCHES.find((s) => s.name.toLowerCase().includes(finishName.toLowerCase().slice(0, 8)));
    if (found) {
      const { state, added } = addFinish(moodboard, found);
      if (added) {
        setMoodboard(state);
        showToast(`Pinned 3D finish "${found.name}"`);
      } else {
        showToast(`"${found.name}" is already pinned`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0E] text-[#ECEAE5] selection:bg-[#C5A880] selection:text-[#0D0D0E] flex flex-col font-sans">
      {/* Sticky Minimalist Header */}
      <Navbar
        pinnedCount={moodboard.selectedFinishes.length}
        onOpenMoodboard={() => setIsMoodboardOpen(true)}
        onRequestSamples={() => setIsSampleOrderModalOpen(true)}
      />

      {/* Main Content Layout */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onRequestSamples={() => setIsSampleOrderModalOpen(true)}
          onExploreProducts={() => {
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Featured Project Section (Asymmetrical Editorial Spotlight) */}
        <FeaturedProject
          onPinPalette={handlePinPalette}
          onRequestSamples={() => setIsSampleOrderModalOpen(true)}
        />

        {/* 3. Interactive 3D Material & Facade Monolith Studio (Three.js) */}
        <ThreeMaterialViewer onPinCurrentFinish={handlePinCurrent3DFinish} />

        {/* 4. Product Overview & Filterable Product Pages Grid */}
        <ProductGrid
          products={PRODUCTS_CATALOG}
          pinnedIds={pinnedIds}
          onTogglePin={handleTogglePin}
          onOpenSpecSheet={(p) => setActiveSpecProduct(p)}
        />

        {/* 5. Colours & Finishes Swatch Selector */}
        <ColoursFinishes
          swatches={FINISH_SWATCHES}
          pinnedIds={pinnedIds}
          onTogglePin={handleTogglePin}
        />

        {/* 6. Projects Portfolio (Built Commissions) */}
        <ProjectsPortfolio
          projects={PROJECTS_PORTFOLIO}
          onPinPalette={handlePinPalette}
        />

        {/* 7. Technical Resources & Architectural Journal */}
        <ResourcesAndJournal
          onRequestSamples={() => setIsSampleOrderModalOpen(true)}
        />
      </main>

      {/* 8. Footer */}
      <Footer onRequestSamples={() => setIsSampleOrderModalOpen(true)} />

      {/* Sticky Request Samples Floating Action Button */}
      <StickyRequestSamplesButton
        pinnedCount={moodboard.selectedFinishes.length}
        onClick={() => setIsSampleOrderModalOpen(true)}
      />

      {/* Interactive JS-Powered Moodboard Drawer */}
      <MoodboardDrawer
        isOpen={isMoodboardOpen}
        onClose={() => setIsMoodboardOpen(false)}
        moodboard={moodboard}
        onRemoveFinish={handleRemoveFinish}
        onClearMoodboard={handleClearMoodboard}
        onRenameProject={handleRenameProject}
        onRequestSampleBox={() => {
          setIsMoodboardOpen(false);
          setIsSampleOrderModalOpen(true);
        }}
        onAddSuggestedFinish={handleAddSuggestedFinish}
        availableSwatches={FINISH_SWATCHES}
      />

      {/* Sample Request & Consultation Modal (Google Calendar Sync Enabled) */}
      <SampleOrderModal
        isOpen={isSampleOrderModalOpen}
        onClose={() => setIsSampleOrderModalOpen(false)}
        finishes={moodboard.selectedFinishes}
        projectName={moodboard.projectName}
      />

      {/* Architectural Technical Specification Sheet Modal */}
      <SpecSheetModal
        product={activeSpecProduct}
        onClose={() => setActiveSpecProduct(null)}
        isPinned={activeSpecProduct ? pinnedIds.has(`swatch-${activeSpecProduct.id}`) : false}
        onTogglePin={handleTogglePin}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#16161A] border border-[#C5A880] text-[#ECEAE5] px-4 py-3 text-xs font-mono shadow-2xl flex items-center gap-2.5 animate-slide-up">
          <Check className="w-4 h-4 text-[#C5A880] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
