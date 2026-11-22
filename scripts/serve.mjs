import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const port=Number(process.env.PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.md':'text/plain; charset=utf-8','.bib':'text/plain; charset=utf-8','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');let name=decodeURIComponent(url.pathname);
    let file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);return res.end();}
    let stat;try{stat=await fs.stat(file);}catch{}
    if(stat?.isDirectory()){if(!name.endsWith('/')){res.writeHead(301,{Location:name+'/'+url.search});return res.end();}file=path.join(file,'index.html');}
    let body;let code=200;try{body=await fs.readFile(file);}catch{body=await fs.readFile(path.join(root,'404.html'));file='404.html';code=404;}
    res.writeHead(code,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(req.method==='HEAD'?undefined:body);
  }catch{res.writeHead(400);res.end('Bad request');}
}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
