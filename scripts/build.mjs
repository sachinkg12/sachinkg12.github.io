import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {serviceStatuses} from '../site/service.mjs';
import {home,projectsPage,researchPage,speakingPage,aboutPage,cvPage,projectPage,notFound,bibtex,researchServicePage} from '../site/templates.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'dist');
const d=JSON.parse(await fs.readFile(path.join(root,'content/portfolio.json'),'utf8'));
// Changed browser assets get new URLs, so returning visitors load matching styles and scripts.
const browserAssets=[];
d.assets={};
for(const [key,source] of [['css','site.css'],['js','site.js'],['cvCss','cv.css'],['cvJs','cv.js']]){
  const bytes=await fs.readFile(path.join(root,'site',source));
  const extension=path.extname(source);
  const name=`${path.basename(source,extension)}.${createHash('sha256').update(bytes).digest('hex').slice(0,12)}${extension}`;
  browserAssets.push({source,name,bytes});
  d.assets[key]='/assets/'+name;
}
const cvTemplate=await fs.readFile(path.join(root,'site/cv.html'),'utf8');
if(new Set(d.projects.map(p=>p.slug)).size!==d.projects.length)throw Error('Duplicate project slug');
if(new Set(d.papers.map(p=>p.id)).size!==d.papers.length)throw Error('Duplicate paper ID');
for(const p of d.papers) {
  if(!['Published','Accepted','Preprint'].includes(p.status))throw Error('Unrecognized paper status: '+p.id);
  if(!p.title||!p.authors||!p.url?.startsWith('https://'))throw Error('Incomplete paper: '+p.id);
}
if(new Set(d.service.map(s=>s.id)).size!==d.service.length)throw Error('Duplicate research-service record');
for(const s of d.service){
  if(!serviceStatuses.includes(s.status)||!s.url?.startsWith('https://')||(!s.date&&!s.dateLabel))throw Error('Invalid service record: '+s.id);
  if(s.papers===null?s.status!=='Appointed':!Number.isInteger(s.papers)||s.papers<0)throw Error('Invalid service workload: '+s.id);
}
await fs.rm(out,{recursive:true,force:true});await fs.mkdir(out,{recursive:true});
const pages=new Map([['/',home(d)],['/projects/',projectsPage(d)],['/research/',researchPage(d)],['/research-service/',researchServicePage(d)],['/speaking/',speakingPage(d)],['/about/',aboutPage(d)],['/cv/',cvPage(d,cvTemplate)],['/404.html',notFound(d)]]);
for(const p of d.projects)pages.set(`/projects/${p.slug}/`,projectPage(p,d));
for(const [url,html]of pages){const dest=path.join(out,url.endsWith('/')?url+'index.html':url);await fs.mkdir(path.dirname(dest),{recursive:true});await fs.writeFile(dest,html);}
await fs.mkdir(path.join(out,'assets'),{recursive:true});
// Explicit public assets keep design references, source records, and unused artwork out of the deployed site.
const assets=['sachin-gupta.webp','sachin-gupta.jpg','sachin-desk-illustration.webp','heaplens-intellij-histogram.webp','heaplens-intellij-secondary.webp','favicon.svg','social-card.svg','social-card.png'];
for(const asset of assets)await fs.copyFile(path.join(root,'assets',asset),path.join(out,'assets',asset));
for(const {source,name,bytes} of browserAssets){
  await fs.writeFile(path.join(out,'assets',name),bytes);
  // Preserve the original URLs for older cached pages.
  await fs.writeFile(path.join(out,'assets',source),bytes);
}
await fs.mkdir(path.join(out,'citations'),{recursive:true});
for(const p of d.papers)await fs.writeFile(path.join(out,'citations',p.id+'.bib'),bibtex(p));
await fs.writeFile(path.join(out,'citations/all.bib'),d.papers.map(bibtex).join('\n'));
// Preserve both the original content paths and a working /notes/ Docsify archive.
await fs.mkdir(path.join(out,'notes'),{recursive:true});
for(const folder of ['ai','docker']){
  await fs.cp(path.join(root,folder),path.join(out,folder),{recursive:true});
  await fs.cp(path.join(root,folder),path.join(out,'notes',folder),{recursive:true});
}
for(const name of ['README.md','_sidebar.md'])await fs.copyFile(path.join(root,'legacy',name),path.join(out,'notes',name));
let notes=await fs.readFile(path.join(root,'legacy/index.html'),'utf8');
notes=notes.replace("name: 'Learning Docs',","name: 'Learning Docs',\n    basePath: '/notes/',").replace('href="favicon.ico"','href="/assets/favicon.svg"');
await fs.writeFile(path.join(out,'notes/index.html'),notes);
await fs.writeFile(path.join(out,'.nojekyll'),'');
await fs.writeFile(path.join(out,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: https://sachinkg12.github.io/sitemap.xml\n');
await fs.writeFile(path.join(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...pages.keys()].filter(p=>p!=='/404.html').map(p=>`<url><loc>https://sachinkg12.github.io${p}</loc><lastmod>${d.updated}</lastmod></url>`).join('')}</urlset>\n`);
await fs.writeFile(path.join(out,'build-info.json'),JSON.stringify({updated:d.updated,projects:d.projects.length,papers:d.papers.length,statuses:Object.fromEntries(['Published','Accepted','Preprint'].map(s=>[s,d.papers.filter(p=>p.status===s).length])),talks:d.talks.length,researchServiceRoles:d.service.length,mentorRecognitions:d.mentorship.recognitions.length},null,2)+'\n');
console.log(`Built ${pages.size} pages · ${d.projects.length} projects · ${d.papers.length} papers · ${d.talks.length} talks`);
