'use strict';
const $ = id => document.getElementById(id);
const KINDS = { step: 'Working on', break: 'On a break', gap: 'Between steps' };
let clock = null, live = null;

function draw() {
  const v = describe(clock);
  $('kind').textContent = clock ? KINDS[clock.kind] : 'Paced';
  $('label').textContent = clock ? clock.label : 'Nothing running';
  const time = v.mode === 'paused' ? fmtClock(v.left) : v.left != null ? fmtClock(v.left) : '';
  $('time').hidden = !time;
  $('time').textContent = time;
  $('time').className = v.mode === 'over' ? 'over' : clock && clock.kind === 'break' ? 'break' : '';
  const note = v.mode === 'stopped' ? 'The timer stopped. Open Paced to decide what’s next.'
    : v.mode === 'paused' ? 'Paused.'
    : clock && !live ? 'The Paced tab is closed. Open it to control the timer.' : '';
  $('note').hidden = !note;
  $('note').textContent = note;
  $('actions').hidden = !(live && clock && clock.kind === 'step');
  $('pause').hidden = v.mode === 'stopped';
  $('pause').textContent = v.mode === 'paused' ? 'Resume' : 'Pause';
  $('break-actions').hidden = !(live && clock && clock.kind === 'break' && v.mode === 'over');
}

async function refresh() {
  clock = (await api.storage.local.get('clock')).clock || null;
  live = await livePacedTab(clock);
  draw();
}

const send = act => { if (live) api.tabs.sendMessage(live.id, { act }); };
$('done').addEventListener('click', () => send('done'));
$('pause').addEventListener('click', () => send('pause'));
$('back').addEventListener('click', () => send('back'));
$('open').addEventListener('click', async () => { await showPaced(clock); window.close(); });

api.storage.onChanged.addListener(refresh);
refresh();
setInterval(draw, 1000);
