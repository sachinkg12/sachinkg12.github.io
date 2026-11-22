"""Check public output, bibliography coverage, navigation, and preserved notes."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
from collections import Counter
import json

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'dist'
data = json.loads((ROOT / 'content/portfolio.json').read_text())
errors = []

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = []; self.links = []; self.images = []; self.h1 = 0
        self.anchor_depth = 0; self.nested = False; self.canonical = []; self.lang = None
        self.paper_ids = []; self.service_ids = []; self.resources = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag == 'html': self.lang = a.get('lang')
        if tag == 'h1': self.h1 += 1
        if tag == 'a':
            self.nested |= self.anchor_depth > 0; self.anchor_depth += 1
            self.links.append(a.get('href', ''))
        if tag == 'img': self.images.append(a)
        if tag == 'link' and a.get('rel') == 'stylesheet': self.resources.append(a.get('href', ''))
        if tag == 'script' and a.get('src'): self.resources.append(a['src'])
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical.append(a.get('href'))
        if 'data-paper' in a: self.paper_ids.append(a['id'])
        if 'data-service-id' in a: self.service_ids.append(a['data-service-id'])
    def handle_endtag(self, tag):
        if tag == 'a': self.anchor_depth -= 1

pages = {}
for file in OUT.rglob('*.html'):
    if 'notes' in file.relative_to(OUT).parts: continue
    page = Page(); page.feed(file.read_text()); pages[file] = page
    rel = str(file.relative_to(OUT))
    if page.lang != 'en': errors.append(f'{rel}: missing English document language')
    if page.h1 != 1: errors.append(f'{rel}: expected one main heading, got {page.h1}')
    if len(page.canonical) != 1 or not page.canonical[0].startswith('https://sachinkg12.github.io/'):
        errors.append(f'{rel}: incorrect canonical destination')
    if page.nested: errors.append(f'{rel}: nested links')
    duplicates = [i for i,n in Counter(page.ids).items() if n > 1]
    if duplicates: errors.append(f'{rel}: duplicate IDs {duplicates}')
    for href in page.links:
        if not href or href == '#': errors.append(f'{rel}: empty link')
        u = urlsplit(href)
        if u.scheme or u.netloc: continue
        target = (OUT / unquote(u.path).lstrip('/')) if u.path.startswith('/') else file.parent / unquote(u.path)
        if not u.path: target = file
        if target.is_dir(): target = target / 'index.html'
        if not target.is_file(): errors.append(f'{rel}: broken local link {href}')
        elif u.fragment and target.suffix == '.html' and 'notes' not in target.relative_to(OUT).parts:
            other = pages.get(target)
            if other is None:
                other = Page(); other.feed(target.read_text())
            if unquote(u.fragment) not in other.ids: errors.append(f'{rel}: missing fragment {href}')
    for image in page.images:
        if 'alt' not in image: errors.append(f'{rel}: image without alternate text')
        if not image.get('src', '').startswith('/assets/'): errors.append(f'{rel}: nonlocal product image')
        elif not (OUT / image['src'].lstrip('/')).is_file(): errors.append(f'{rel}: missing image {image["src"]}')
    for resource in page.resources:
        u = urlsplit(resource)
        if not u.scheme and not u.netloc and not (OUT / unquote(u.path).lstrip('/')).is_file():
            errors.append(f'{rel}: missing stylesheet or script {resource}')

# Every known paper must appear exactly once on the home and complete research page.
expected = {'paper-' + paper['id'] for paper in data['papers']}
for route in ['index.html', 'research/index.html']:
    actual = pages[OUT / route].paper_ids
    if set(actual) != expected or len(actual) != len(expected):
        errors.append(f'{route}: incomplete or duplicate bibliography')
for project in data['projects']:
    if not (OUT / 'projects' / project['slug'] / 'index.html').is_file(): errors.append('Missing project detail: '+project['slug'])
for folder in ['ai','docker']:
    for original in (ROOT / folder).rglob('*.md'):
        relative = original.relative_to(ROOT / folder)
        for preserved in [OUT / folder / relative, OUT / 'notes' / folder / relative]:
            if not preserved.is_file() or preserved.read_bytes() != original.read_bytes():
                errors.append('Original note changed or missing: '+str(preserved.relative_to(OUT)))
for paper in data['papers']:
    if not (OUT / 'citations' / (paper['id']+'.bib')).is_file(): errors.append('Missing citation: '+paper['id'])
if any((OUT / p).exists() for p in ['.git','.superdesign','content','docs','CNAME']):
    errors.append('Nonpublic source or custom-domain configuration included in output')
if 'heaplens-intellij-histogram.webp' not in (OUT/'index.html').read_text(): errors.append('Home does not use light IntelliJ screenshot')
if 'Reliable AI Agents: Regression Testing and Runtime Tool Contracts' not in (OUT/'speaking/index.html').read_text(): errors.append('SCIS keynote missing')
# Preserve each supplied service role, including repeated venues with different duties.
service_expected = {s['id'] for s in data['service']}
service_actual = pages[OUT / 'research-service/index.html'].service_ids
if set(service_actual) != service_expected or len(service_actual) != len(service_expected):
    errors.append('Research-service page omits or duplicates a supplied role')
for route in ['index.html', 'about/index.html', 'cv/index.html']:
    html = (OUT / route).read_text()
    for recognition in data['mentorship']['recognitions']:
        if recognition['displayDate'] not in html or recognition['highlight'] not in html:
            errors.append(f'{route}: missing mentorship recognition')
for row in data['service']:
    if any(k in row for k in ['email','contact','chair','deadline','letterReceived','wos']):
        errors.append('Nonpublic tracking fields copied into portfolio service data')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'Validated {len(pages)} pages, {len(data["papers"])} distinct papers, all local links/assets, and preserved learning notes.')
