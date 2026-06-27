import test from 'node:test';
import assert from 'node:assert/strict';
import { getReleaseStatus } from '../utils/releaseStatus.js';

test('returns planned when no steps are completed', () => {
  const steps = [{ completed: false }, { completed: false }];

  assert.equal(getReleaseStatus(steps), 'planned');
});

test('returns done when all steps are completed', () => {
  const steps = [{ completed: true }, { completed: true }];

  assert.equal(getReleaseStatus(steps), 'done');
});

test('returns ongoing when some steps are completed', () => {
  const steps = [{ completed: true }, { completed: false }];

  assert.equal(getReleaseStatus(steps), 'ongoing');
});
