#!/bin/sh
set -eu

rm -rf dist
mkdir -p dist/assets

cp index.html menu.html spaces.html events.html corporate-catering.html visit.html dist/
cp app.js enhancements.css styles.css llms.txt robots.txt sitemap.xml dist/
cp _headers dist/
cp assets/* dist/assets/

node -e 'const fs=require("fs"); const pages=["index.html","menu.html","spaces.html","events.html","corporate-catering.html","visit.html"]; const refs=pages.flatMap(p=>{const s=fs.readFileSync(p,"utf8"); return [...s.matchAll(/(?:src|href)=["'"'"']([^#"'"'"']+)["'"'"']/g)].map(m=>m[1]).filter(x=>!/^https?:|^mailto:|^tel:|^data:|^javascript:|^#/.test(x));}); const bad=refs.filter(x=>!fs.existsSync(x)); if(bad.length){console.error("Missing local references: "+bad.join(", ")); process.exit(1)}'
