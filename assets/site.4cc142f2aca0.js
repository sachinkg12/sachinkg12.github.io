const menus = [...document.querySelectorAll('.mobile-menu')];
function closeMenus() { menus.forEach(menu => { menu.open = false; }); }
document.addEventListener('click', event => {
  if (event.target.closest('.mobile-menu a') || !event.target.closest('.mobile-menu')) closeMenus();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    const open = menus.find(menu => menu.open);
    closeMenus();
    open?.querySelector('summary').focus();
  }
});

const groups = [...document.querySelectorAll('[data-paper-group]')];
const records = [...document.querySelectorAll('[data-paper]')];
const search = document.querySelector('#paper-search');
const filters = [...document.querySelectorAll('[data-status-filter]')];
const results = document.querySelector('#paper-results');
const empty = document.querySelector('#no-papers');
let status = 'all';
if (search) {
  const requested = new URL(location.href).searchParams.get('status');
  if (filters.some(button => button.dataset.statusFilter === requested)) status = requested;
  function filterPapers() {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    for (const record of records) {
      const matches = (status === 'all' || record.dataset.status === status) && (!query || record.dataset.search.includes(query));
      record.hidden = !matches;
      if (matches) visible++;
    }
    for (const group of groups) group.hidden = ![...group.querySelectorAll('[data-paper]')].some(record => !record.hidden);
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.statusFilter === status)));
    results.textContent = `${visible} ${visible === 1 ? 'paper' : 'papers'}`;
    empty.hidden = visible > 0;
  }
  filters.forEach(button => button.addEventListener('click', () => {
    status = button.dataset.statusFilter;
    const url = new URL(location.href);
    if (status === 'all') url.searchParams.delete('status'); else url.searchParams.set('status', status);
    history.replaceState(null, '', url);
    filterPapers();
  }));
  search.addEventListener('input', filterPapers);
  filterPapers();
}

const toast = document.querySelector('#copy-status');
let toastTimer;
document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(value);
      else {
        const input = document.createElement('textarea');
        input.value = value; input.style.position = 'fixed'; input.style.opacity = '0';
        document.body.append(input); input.select();
        const copied = document.execCommand('copy'); input.remove();
        if (!copied) throw new Error('Clipboard unavailable');
      }
      toast.textContent = 'Citation copied';
    } catch {
      toast.textContent = 'Copy unavailable. Use the citation download instead.';
    }
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 3500);
  });
});
document.querySelector('[data-print]')?.addEventListener('click', () => window.print());

// Preserve bookmarks from the original Docsify learning-notes site.
if (location.pathname === '/' && location.hash.startsWith('#/')) {
  location.replace('/notes/' + location.hash);
}
