'use strict';
// Used by both the background script and the popup.
const api = globalThis.browser || globalThis.chrome;
const PACED_URL = 'https://borsht1.github.io/paced/';
const PACED_PAGES = ['https://borsht1.github.io/paced/*', 'http://localhost/*', 'http://127.0.0.1/*'];

function fmtClock(sec) {
  const past = sec <= -1;
  sec = Math.abs(Math.trunc(sec));
  const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
  return (past ? '+' : '') + (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(s).padStart(2, '0');
}

// A badge only fits about four characters: 25m, +3m, 2h.
function shortTime(sec) {
  const m = sec < 0 ? Math.max(1, Math.floor(-sec / 60)) : Math.ceil(sec / 60);
  const text = m < 100 ? m + 'm' : Math.floor(m / 60) + 'h';
  return (sec < 0 ? '+' : '') + text;
}

// What the shared clock means right now. The page sends fixed times, so this stays right after the tab closes.
function describe(clock, now = Date.now()) {
  if (!clock) return { mode: 'idle', badge: '', color: '#2E43C2', title: 'Paced: nothing running' };
  if (clock.paused) return { mode: 'paused', badge: 'II', color: '#5D645F', left: clock.left, title: `Paused: ${clock.label}` };
  if (clock.stopped || (clock.stopAt && now >= clock.stopAt)) return { mode: 'stopped', badge: '!', color: '#B53A27', title: `Stopped: ${clock.label}. Open Paced.` };
  if (clock.endsAt == null) return { mode: 'running', badge: '...', color: '#2E43C2', title: clock.label };
  const left = (clock.endsAt - now) / 1000, over = left < 0;
  const color = over ? '#B53A27' : clock.kind === 'break' ? '#1D7650' : '#2E43C2';
  return { mode: over ? 'over' : 'running', badge: shortTime(left), color, left, title: `${clock.label}: ${fmtClock(left)}${over ? ' over' : ' left'}` };
}

// A Paced tab that can still act for itself: open, and not put to sleep by the browser.
async function livePacedTab(clock) {
  if (!clock || !clock.url) return null;
  const page = url => (url || '').split(/[?#]/)[0];
  const tabs = await api.tabs.query({ url: PACED_PAGES });
  return tabs.find(t => page(t.url) === page(clock.url) && !t.discarded && !t.frozen) || null;
}

async function showPaced(clock) {
  const tab = await livePacedTab(clock);
  if (!tab) return api.tabs.create({ url: (clock && clock.url) || PACED_URL });
  await api.tabs.update(tab.id, { active: true });
  await api.windows.update(tab.windowId, { focused: true });
  try { await api.tabs.sendMessage(tab.id, { act: 'show' }); } catch (e) {}
}
