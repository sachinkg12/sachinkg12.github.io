import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { serviceSummary, serviceWorkload, serviceSections } from '../site/service.mjs';
import { renderCvService } from '../site/cv-service.mjs';

test('public totals include all paper workloads while preserving completion metadata', () => {
  const records = [
    { status: 'Completed', type: 'Peer review', role: 'Peer reviewer', papers: 3 },
    { status: 'Pending', type: 'Peer review', role: 'Peer reviewer', papers: 10 },
    { status: 'Appointed', type: 'Peer review', role: 'Program committee member', papers: null },
    { status: 'Completed', type: 'Artifact evaluation', role: 'Artifact evaluator', papers: 2 },
    { status: 'Completed', type: 'Peer review', role: 'Area chair', papers: 5 },
  ];
  const result = serviceSummary(records);
  assert.equal(result.completedReviewCount, 3);
  assert.equal(result.pendingReviewCount, 10);
  assert.equal(result.manuscriptReviewCount, 13);
  assert.equal(result.areaChairSubmissionCount, 5);
  assert.equal(result.activeRoles, 2);
  assert.equal(serviceSections(records).find(section => section.id === 'reviewing').records.length, 2);
  assert.equal(serviceSections(records)[0].records.length, 1);
});

test('unknown appointment workloads remain unknown and recorded scope is preserved', () => {
  assert.equal(serviceWorkload({papers: null}), '-');
  assert.equal(serviceWorkload({papers: 3, status: 'Pending'}), '3 papers');
  assert.equal(serviceWorkload({papers: 2, workloadUnit: 'smoke-test evaluation'}), '2 smoke-test evaluations');
});

test('the reconciled service inventory and CV include every active role without CPAL', () => {
  const records = JSON.parse(readFileSync(new URL('../content/portfolio.json', import.meta.url))).service;
  const summary = serviceSummary(records);
  assert.equal(summary.roles, 29);
  assert.equal(summary.completedReviewCount, 64);
  assert.equal(summary.pendingReviewCount, 3);
  assert.equal(summary.manuscriptReviewCount, 67);
  assert.equal(summary.activeRoles, 3);
  assert.equal(records.find(r => r.id === 'southeastcon-2027').papers, 10);
  assert.equal(records.some(r => /cpal/i.test(r.id)), false);
  const html = renderCvService(records);
  for (const record of records.filter(r => r.papers === null)) {
    assert.ok(html.includes(`data-cv-appointment="${record.id}"`));
  }
  assert.ok(html.includes('IEEE SoutheastCon 2027 (10)'));
  assert.ok(html.includes('The Web Conference 2027 (3)'));
  assert.ok(html.includes('22 tracks</p>'));
  assert.ok(!html.includes('pending'));
  assert.ok(!html.includes('Count not recorded'));
  assert.ok(!html.includes('Completed manuscript reviews'));
  assert.ok(!html.includes('eBay'));
  assert.ok(html.includes('2 smoke-test evaluations'));
});
