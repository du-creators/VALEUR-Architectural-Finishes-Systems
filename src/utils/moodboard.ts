/**
 * Pure business logic for Architectural Finishes, Swatch filtering,
 * and Interactive Moodboard curation.
 */

export interface FinishItem {
  id: string;
  name: string;
  category: 'stone' | 'metal' | 'timber' | 'glass' | 'concrete';
  subCategory: string;
  code: string;
  hex: string;
  finishType: 'Honed' | 'Patinated' | 'Brushed' | 'Acid-Etched' | 'Fluted' | 'Natural';
  lrv: number; // Light Reflectance Value 0-100%
  acousticRatingNRC?: number;
  fireRating: 'Class A' | 'Euroclass A1' | 'Non-Combustible';
  leadTimeWeeks: number;
  description: string;
  weightKg: number; // sample tile weight
  image?: string;
}

export interface MoodboardState {
  projectName: string;
  selectedFinishes: FinishItem[];
  notes: string;
}

export const MAX_SAMPLE_BOX_FINISHES = 8;

export function createInitialMoodboard(projectName = 'Untitled Villa Project'): MoodboardState {
  return {
    projectName,
    selectedFinishes: [],
    notes: '',
  };
}

export function addFinish(state: MoodboardState, finish: FinishItem): { state: MoodboardState; added: boolean; error?: string } {
  if (state.selectedFinishes.some((f) => f.id === finish.id)) {
    return { state, added: false, error: 'Finish already pinned to moodboard' };
  }
  if (state.selectedFinishes.length >= MAX_SAMPLE_BOX_FINISHES) {
    return { state, added: false, error: `Maximum of ${MAX_SAMPLE_BOX_FINISHES} finishes allowed in a sample box curation` };
  }
  return {
    state: {
      ...state,
      selectedFinishes: [...state.selectedFinishes, finish],
    },
    added: true,
  };
}

export function removeFinish(state: MoodboardState, finishId: string): MoodboardState {
  return {
    ...state,
    selectedFinishes: state.selectedFinishes.filter((f) => f.id !== finishId),
  };
}

export function toggleFinish(state: MoodboardState, finish: FinishItem): { state: MoodboardState; isPinned: boolean } {
  const exists = state.selectedFinishes.some((f) => f.id === finish.id);
  if (exists) {
    return { state: removeFinish(state, finish.id), isPinned: false };
  }
  const result = addFinish(state, finish);
  return { state: result.state, isPinned: result.added };
}

export function calculateSampleBoxWeight(finishes: FinishItem[]): { totalKg: number; formatted: string } {
  const total = finishes.reduce((acc, f) => acc + (f.weightKg || 0.45), 0);
  const rounded = Math.round(total * 100) / 100;
  return {
    totalKg: rounded,
    formatted: `${rounded.toFixed(2)} kg`,
  };
}

export function filterFinishes(
  finishes: FinishItem[],
  category: string,
  searchQuery: string
): FinishItem[] {
  return finishes.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.finishType.toLowerCase().includes(q) ||
      item.subCategory.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });
}

export function generateSpecSummary(projectName: string, finishes: FinishItem[]): string {
  if (finishes.length === 0) {
    return `Project: ${projectName}\nNo architectural finishes specified yet.`;
  }

  const lines = [
    `SPECIFICATION SCHEDULE: ${projectName.toUpperCase()}`,
    `Prepared via VALEUR Atelier Architectural Specification Engine`,
    `Total Specified Materials: ${finishes.length} item(s)`,
    '-------------------------------------------------------',
  ];

  finishes.forEach((f, idx) => {
    lines.push(
      `${idx + 1}. [${f.code}] ${f.name} — ${f.finishType}`,
      `   Category: ${f.category.toUpperCase()} (${f.subCategory})`,
      `   LRV: ${f.lrv}% | Fire Rating: ${f.fireRating} | Lead Time: ${f.leadTimeWeeks} wks`
    );
  });

  return lines.join('\n');
}
