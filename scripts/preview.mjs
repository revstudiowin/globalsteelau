import {createServer} from 'node:http';
import {createReadStream,existsSync,statSync} from 'node:fs';
import {resolve,join,extname,sep} from 'node:path';
const root=resolve('out');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.ttf':'font/ttf','.txt':'text/plain','.json':'application/json','.ico':'image/x-icon'};
createServer((req,res)=>{let path;try{path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}let file=resolve(root,'.'+path);if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403).end();return;}if(existsSync(file)&&statSync(file).isDirectory())file=join(file,'index.html');if(!existsSync(file)){res.writeHead(404,{'Content-Type':'text/html; charset=utf-8','X-Robots-Tag':'noindex, nofollow'});createReadStream(join(root,'404.html')).on('error',()=>res.destroy()).pipe(res);return;}res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','X-Robots-Tag':'noindex, nofollow'});createReadStream(file).on('error',()=>res.destroy()).pipe(res);}).listen(3000,'127.0.0.1',()=>console.log('Global Steel preview: http://localhost:3000'));

