// Renders <App /> to static HTML and injects it into the built index.html, so
// crawlers see the page content without executing JavaScript. React rehydrates
// over this markup on the client; every browser API in the tree is inside an
// effect or an event handler, so nothing runs during renderToString.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { renderToString } from 'react-dom/server';
import React from 'react';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = resolve(root, 'dist/index.html');

const { default: App } = await import(resolve(root, 'src/App.jsx'));

const markup = renderToString(React.createElement(App));

const html = readFileSync(htmlPath, 'utf8');
const target = '<div id="root"></div>';
if (!html.includes(target)) {
  throw new Error(`prerender: could not find ${target} in dist/index.html`);
}

writeFileSync(htmlPath, html.replace(target, `<div id="root">${markup}</div>`));
console.log(`prerender: injected ${markup.length} bytes of markup`);
