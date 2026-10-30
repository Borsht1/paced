'use strict';
// Runs inside the Paced page and passes messages between it and the extension.
const ext = globalThis.browser || globalThis.chrome;

window.addEventListener('message', e => {
  if (e.source !== window || !e.data || e.data.from !== 'paced-page') return;
  try { ext.runtime.sendMessage({ clock: e.data.clock }); } catch (err) {} // the extension was reloaded
});

ext.runtime.onMessage.addListener(m => {
  if (m && m.act) window.postMessage({ from: 'paced-ext', act: m.act, state: m.state }, '*');
});

window.postMessage({ from: 'paced-ext', hello: true, idle: true }, '*');
