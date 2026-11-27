export const serviceStatuses = ['Completed', 'Pending', 'Appointed'];

export function serviceCategory(record) {
  return record.type === 'Artifact evaluation' ? 'artifacts' : record.role === 'Area chair' ? 'chairs' : 'reviewing';
}

export const completedService = records => records.filter(record => record.status === 'Completed');
export const activeService = records => records.filter(record => record.status !== 'Completed');
export const completedReviews = records => completedService(records).filter(record => serviceCategory(record) === 'reviewing');
export const paperReviews = records => records.filter(record => serviceCategory(record) === 'reviewing' && record.papers !== null);
export const committeeAppointments = records => records.filter(record => serviceCategory(record) === 'reviewing' && record.papers === null);

export function serviceWorkload(record) {
  if (record.papers === null) return '-';
  const unit = record.workloadUnit || (serviceCategory(record) === 'artifacts' ? 'artifact' : serviceCategory(record) === 'chairs' ? 'submission' : 'paper');
  return `${record.papers} ${unit}${record.papers === 1 ? '' : 's'}`;
}

export function serviceSummary(records) {
  return {
    roles: records.length,
    completedRoles: completedService(records).length,
    activeRoles: activeService(records).length,
    manuscriptReviewCount: paperReviews(records).reduce((total, record) => total + record.papers, 0),
    areaChairSubmissionCount: records.filter(record => serviceCategory(record) === 'chairs').reduce((total, record) => total + (record.papers ?? 0), 0),
    completedReviewCount: completedReviews(records).reduce((total, record) => total + record.papers, 0),
    pendingReviewCount: records.filter(record => record.status === 'Pending' && serviceCategory(record) === 'reviewing').reduce((total, record) => total + (record.papers ?? 0), 0),
    artifactRoles: records.filter(record => serviceCategory(record) === 'artifacts').length,
  };
}

export function serviceSections(records) {
  return [
    { id: 'appointments', title: 'Committee appointments', records: committeeAppointments(records) },
    { id: 'chairs', title: 'Area-chair work', records: records.filter(record => serviceCategory(record) === 'chairs') },
    { id: 'reviewing', title: 'Paper reviewing & program committees', records: paperReviews(records) },
    { id: 'artifacts', title: 'Artifact evaluation', records: records.filter(record => serviceCategory(record) === 'artifacts') },
  ].filter(section => section.records.length);
}
