import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import {join} from 'node:path';
let checked=0;const broken=[];const pages=[];
function walk(dir){for(const name of readdirSync(dir)){const file=join(dir,name);if(statSync(file).isDirectory())walk(file);else if(name.endsWith('.html')){pages.push(file);const html=readFileSync(file,'utf8');for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){const raw=match[1];const url=raw.split(/[?#]/)[0];if(url.startsWith('/')&&!url.startsWith('//')){checked++;if(!existsSync(join('out',decodeURIComponent(url))))broken.push({file,url});}}}}}
walk('out');console.log(JSON.stringify({pages:pages.length,checked,broken},null,2));if(broken.length)process.exitCode=1;
