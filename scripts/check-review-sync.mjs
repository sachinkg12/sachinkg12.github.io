import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { serviceSummary, serviceCategory } from '../site/service.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const writingRoot = process.argv[2];
if (!writingRoot) throw Error('Pass the writing-site checkout path as the first argument.');
const matter = createRequire(path.resolve(writingRoot, 'package.json'))('gray-matter');
const data = JSON.parse(fs.readFileSync(path.join(root, 'content/portfolio.json'), 'utf8'));
const entries = fs.readdirSync(path.join(writingRoot, 'content/activity')).filter(name => /\.mdx?$/.test(name)).map(name => matter(fs.readFileSync(path.join(writingRoot, 'content/activity', name), 'utf8')).data);
const published = entries.filter(record => record.type === 'reviewing' && !record.upcoming && (record.date instanceof Date ? record.date.toISOString().slice(0,10) : record.date) <= data.updated);
const bySlug = new Map(published.map(record => [record.slug, record]));
const errors = [];
for (const record of data.service) {
  const writing = bySlug.get(record.id);
  if (!writing) { errors.push(`Missing writing-site record: ${record.id}`); continue; }
  if ((writing.reviewCount ?? null) !== record.papers) errors.push(`Different paper counts: ${record.id}`);
  if (writing.reviewStatus !== record.status) errors.push(`Different service statuses: ${record.id}`);
  const kind = {reviewing: 'manuscript', chairs: 'area-chair', artifacts: 'artifact'}[serviceCategory(record)];
  if (writing.reviewKind !== kind) errors.push(`Different workload kinds: ${record.id}`);
}
for (const record of published) if (!data.service.some(service => service.id === record.slug)) errors.push(`Missing portfolio role: ${record.slug}`);
if (published.some(record => /cpal/i.test(record.slug)) || data.service.some(record => /cpal/i.test(record.id))) errors.push('CPAL must stay unpublished and outside the portfolio.');
if (errors.length) throw Error(errors.join('\n'));
console.log(JSON.stringify({asOf: data.updated, alignedRoles: data.service.length, writingReviewRecords: published.length, cpalExcluded: true, ...serviceSummary(data.service)}, null, 2));
