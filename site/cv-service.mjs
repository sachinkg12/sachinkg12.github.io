import { committeeAppointments, paperReviews, completedService, serviceCategory, serviceSummary, serviceWorkload } from './service.mjs';

const e = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const list = rows => `<ul class="space-y-3 list-disc pl-5 text-muted leading-[1.75] marker:text-forest">${rows.map(row => `<li>${row}</li>`).join('')}</ul>`;

export function renderCvService(records) {
  const reviews = paperReviews(records);
  const chairs = completedService(records).filter(record => serviceCategory(record) === 'chairs');
  const artifacts = completedService(records).filter(record => serviceCategory(record) === 'artifacts');
  const appointments = committeeAppointments(records);
  const summary = serviceSummary(records);
  const yearLabel = (rows, completed=false) => [...new Set(rows.map(record => completed ? (record.completedYear || record.date?.slice(0,4)) : (record.year || record.date?.slice(0,4))).filter(Boolean).map(String))].sort().join(', ');
  const groups = new Map();
  for (const record of reviews) {
    if (!groups.has(record.parent)) groups.set(record.parent, []);
    groups.get(record.parent).push(`${e(record.title)} (${record.papers})`);
  }
  const chairCards = chairs.map(record => `<article class="rounded-2xl bg-leaf/35 border border-[#d9e1c1] p-6 sm:p-7 mb-6"><div class="flex flex-wrap gap-4 justify-between items-start mb-3"><div><p class="font-mono text-xs text-forest mb-2">Area chair · ${e(record.date?.slice(0,4))}</p><h3 class="text-xl font-medium">${e(record.title)} · ${e(record.scope)}</h3></div><span class="bg-white rounded-full border border-[#cdd7b7] px-3 py-1 text-sm">${e(serviceWorkload(record))}</span></div><p class="text-[16px] leading-[1.75] text-muted">${e(record.description)}</p></article>`).join('');
  const reviewerCard = `<article class="border border-line rounded-2xl p-6 sm:p-7 mb-6"><div class="flex gap-5 items-start mb-5"><strong class="text-[48px] leading-none tracking-[-.05em] font-display font-medium">${summary.manuscriptReviewCount}</strong><div><h3 class="text-lg font-medium mb-1">Manuscript reviews</h3><p class="text-sm text-muted">${reviews.length} tracks</p></div></div><p class="text-[15px] leading-[1.75] text-muted mb-5">Manuscript reviewing across ${reviews.length} conference, workshop, journal, and symposium tracks.</p>${list([...groups.entries()].map(([parent, entries]) => `${e(parent)}: ${entries.join('; ')}`))}</article>`;
  const appointmentCard = `<article class="border border-line rounded-2xl p-6 sm:p-7 mb-6"><p class="font-mono text-xs text-forest mb-2">Committee appointments</p><h3 class="text-xl font-medium mb-5">${e(yearLabel(appointments))} reviewer & committee roles</h3><ul class="divide-y divide-line">${appointments.map(record => `<li data-cv-appointment="${e(record.id)}" class="py-3 text-[15px] leading-[1.7]"><a id="appointment-${e(record.id)}" href="${e(record.writeup || record.url)}" class="hover:underline underline-offset-4">${e(record.role)} · ${e(record.title)}</a><p class="text-sm text-muted mt-1">${e(record.scope)}${record.dateLabel ? ` · ${e(record.dateLabel)}` : ''} · ${e(serviceWorkload(record))}</p></li>`).join('')}</ul></article>`;
  const artifactCard = `<article class="border border-line rounded-2xl p-6 sm:p-7"><p class="font-mono text-xs text-forest mb-2">Artifact evaluation · ${e(yearLabel(artifacts))}</p><h3 class="text-xl font-medium mb-5">Software artifacts & reproducibility</h3>${list(artifacts.map(record => `${e(record.title)}: ${e(serviceWorkload(record))}${record.note ? `. ${e(record.note)}` : ''}`))}<p class="text-sm text-muted leading-[1.75] mt-5">Artifact evaluation is listed separately from manuscript peer review. Where the recorded work covers smoke-test evaluations, that scope is retained.</p></article>`;
  return `<section id="service" aria-labelledby="service-title" class="scroll-mt-28 mb-20"><header class="mb-7 flex flex-wrap items-end justify-between gap-3"><h2 id="service-title" class="text-[32px] sm:text-[36px] tracking-[-.045em] leading-[1.15] font-display font-medium">Research <span class="font-serif italic">service</span></h2></header>${chairCards}${reviewerCard}${appointmentCard}${artifactCard}</section>`;
}
