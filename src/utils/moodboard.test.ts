import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createInitialMoodboard,
  addFinish,
  removeFinish,
  toggleFinish,
  calculateSampleBoxWeight,
  filterFinishes,
  generateSpecSummary,
  FinishItem,
  MAX_SAMPLE_BOX_FINISHES,
} from './moodboard';

const sampleStone: FinishItem = {
  id: 'limestone-fluted-01',
  name: 'Vaucluse Honed Fluted Limestone',
  category: 'stone',
  subCategory: 'Architectural Cladding',
  code: 'STN-VAU-09',
  hex: '#D7CEBE',
  finishType: 'Fluted',
  lrv: 58,
  fireRating: 'Euroclass A1',
  leadTimeWeeks: 6,
  description: 'Linear fluted French limestone panels.',
  weightKg: 0.65,
};

const sampleBronze: FinishItem = {
  id: 'bronze-patina-02',
  name: 'Nocturne Blackened Bronze',
  category: 'metal',
  subCategory: 'Extrusions & Profiles',
  code: 'MTL-BRZ-44',
  hex: '#2B2520',
  finishType: 'Patinated',
  lrv: 12,
  fireRating: 'Non-Combustible',
  leadTimeWeeks: 4,
  description: 'Hand-rubbed architectural bronze.',
  weightKg: 0.45,
};

test('createInitialMoodboard sets project name and empty array', () => {
  const mb = createInitialMoodboard('Kyoto Villa');
  assert.equal(mb.projectName, 'Kyoto Villa');
  assert.equal(mb.selectedFinishes.length, 0);
});

test('addFinish appends finish and guards against duplicates', () => {
  let mb = createInitialMoodboard();
  const res1 = addFinish(mb, sampleStone);
  assert.equal(res1.added, true);
  assert.equal(res1.state.selectedFinishes.length, 1);

  // Attempt duplicate
  const res2 = addFinish(res1.state, sampleStone);
  assert.equal(res2.added, false);
  assert.equal(res2.state.selectedFinishes.length, 1);
});

test('addFinish enforces maximum cap of sample box finishes', () => {
  let mb = createInitialMoodboard();
  for (let i = 0; i < MAX_SAMPLE_BOX_FINISHES; i++) {
    const item: FinishItem = {
      ...sampleStone,
      id: `finish-${i}`,
      name: `Finish ${i}`,
    };
    const res = addFinish(mb, item);
    assert.equal(res.added, true);
    mb = res.state;
  }
  assert.equal(mb.selectedFinishes.length, MAX_SAMPLE_BOX_FINISHES);

  // Adding one more exceeds cap
  const overflowRes = addFinish(mb, sampleBronze);
  assert.equal(overflowRes.added, false);
  assert.ok(overflowRes.error?.includes('Maximum'));
});

test('removeFinish removes specified finish by id', () => {
  let mb = createInitialMoodboard();
  mb = addFinish(mb, sampleStone).state;
  mb = addFinish(mb, sampleBronze).state;
  assert.equal(mb.selectedFinishes.length, 2);

  const updated = removeFinish(mb, sampleStone.id);
  assert.equal(updated.selectedFinishes.length, 1);
  assert.equal(updated.selectedFinishes[0].id, sampleBronze.id);
});

test('toggleFinish pins and unpins seamlessly', () => {
  let mb = createInitialMoodboard();
  const res1 = toggleFinish(mb, sampleStone);
  assert.equal(res1.isPinned, true);
  assert.equal(res1.state.selectedFinishes.length, 1);

  const res2 = toggleFinish(res1.state, sampleStone);
  assert.equal(res2.isPinned, false);
  assert.equal(res2.state.selectedFinishes.length, 0);
});

test('calculateSampleBoxWeight tallies weights accurately', () => {
  const weight = calculateSampleBoxWeight([sampleStone, sampleBronze]);
  assert.equal(weight.totalKg, 1.1);
  assert.equal(weight.formatted, '1.10 kg');
});

test('filterFinishes filters by category and search keyword', () => {
  const items = [sampleStone, sampleBronze];
  const stonesOnly = filterFinishes(items, 'stone', '');
  assert.equal(stonesOnly.length, 1);
  assert.equal(stonesOnly[0].id, sampleStone.id);

  const searched = filterFinishes(items, 'all', 'bronze');
  assert.equal(searched.length, 1);
  assert.equal(searched[0].id, sampleBronze.id);
});

test('generateSpecSummary outputs formatted schedule with metadata', () => {
  const summary = generateSpecSummary('Monolith Pavilion', [sampleStone, sampleBronze]);
  assert.ok(summary.includes('MONOLITH PAVILION'));
  assert.ok(summary.includes('STN-VAU-09'));
  assert.ok(summary.includes('MTL-BRZ-44'));
});
