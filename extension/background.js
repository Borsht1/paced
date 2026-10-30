'use strict';
// Keeps the toolbar badge current and fires alerts, without needing the Paced tab.
// In Chrome this is a service worker; in Firefox and Zen, manifest.json loads shared.js first.
if (typeof importScripts === 'function') importScripts('shared.js');

const TICK = 'paced-tick', ALERT = 'paced-alert:';

const loadClock = async () => (await api.storage.local.get('clock')).clock || null;

async function paint(clock) {
  const v = describe(clock);
  await api.action.setBadgeText({ text: v.badge });
  await api.action.setBadgeBackgroundColor({ color: v.color });
  if (api.action.setBadgeTextColor) await api.action.setBadgeTextColor({ color: '#FFFFFF' });
  await api.action.setTitle({ title: v.title });
}

async function schedule(clock) {
  await api.alarms.clearAll();
  const now = Date.now();
  if (!clock) return;
  if (clock.idleMin) api.idle.setDetectionInterval(clock.idleMin * 60);
  (clock.alerts || []).forEach((a, i) => { if (a.at > now) api.alarms.create(ALERT + i, { when: a.at }); });
  if (clock.endsAt != null && !clock.paused && !clock.stopped) api.alarms.create(TICK, { periodInMinutes: 0.5 });
}

async function fire(i) {
  const clock = await loadClock(), alert = clock && clock.alerts && clock.alerts[i];
  if (!alert) return;
  // An open Paced tab sends its own alerts. This covers a closed tab, or one that can't send notifications.
  if (clock.pageNotifies && await livePacedTab(clock)) return;
  await api.notifications.create('paced-alert', {
    type: 'basic', iconUrl: api.runtime.getURL('icons/icon128.png'), title: alert.title, message: alert.body
  });
}

// Tells the open Paced tab when you stop using the computer and when you're back. The tab decides what to pause.
async function reportIdle(state) {
  const clock = await loadClock();
  if (!clock || clock.kind !== 'step') return;
  const tab = await livePacedTab(clock);
  if (!tab) return;
  try { await api.tabs.sendMessage(tab.id, { act: 'idle', state }); } catch (e) {}
}
api.idle.onStateChanged.addListener(reportIdle);

api.runtime.onMessage.addListener((m, sender) => {
  if (!m || !('clock' in m)) return;
  const clock = m.clock && { ...m.clock, url: sender.url };
  return api.storage.local.set({ clock }).then(() => Promise.all([paint(clock), schedule(clock)])).then(() => undefined);
});

api.alarms.onAlarm.addListener(async alarm => {
  if (alarm.name.startsWith(ALERT)) await fire(+alarm.name.slice(ALERT.length));
  const clock = await loadClock();
  await paint(clock);
  // A step can start by itself while you're already idle, and then no change of state will arrive.
  if (alarm.name === TICK && clock && clock.idleMin) {
    const idle = await api.idle.queryState(clock.idleMin * 60);
    if (idle !== 'active') await reportIdle(idle);
  }
});

api.notifications.onClicked.addListener(async id => {
  api.notifications.clear(id);
  await showPaced(await loadClock());
});

const restart = async () => { const clock = await loadClock(); await paint(clock); await schedule(clock); };
api.runtime.onStartup.addListener(restart);
api.runtime.onInstalled.addListener(restart);
