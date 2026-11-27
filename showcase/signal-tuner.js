/* Stay Tuned v0.1 — only episode references live here; Descript remains the audio host. */
(() => {
  'use strict';
  const root = document.getElementById('stay-tuned');
  if (!root) return;
  // Add each newly approved episode here. No duplicates of audio files or transcripts.
  const channels = [
    {position:0, code:'01', label:'Undecided Users', title:'Why AI Must Respect Undecided Users',
     note:'The choice to wait — and why trustworthy AI should respect it.', duration:'25:03',
     embed:'https://share.descript.com/embed/bh4rw9XWpwD', share:'https://share.descript.com/view/bh4rw9XWpwD'},
    {position:50, code:'02', label:'Evidence Ledgers', title:'Why AI Agents Need Evidence Ledgers',
     note:'Evidence, accountability, and the conditions for trusting AI agents.', duration:'23:30',
     embed:'https://share.descript.com/embed/QdcPZ1jsEZV', share:'https://share.descript.com/view/QdcPZ1jsEZV'},
    {position:100, code:'03', label:'Agent Trust Architecture', title:'Fixing AI Bottlenecks with Agent Trust Architecture',
     note:'Truth, Trust, Practice, and knowing when a system should hold.', duration:'45:20',
     embed:'https://share.descript.com/embed/AhV3svZ7pmH', share:'https://share.descript.com/view/AhV3svZ7pmH'}
  ];
  const el = id => document.getElementById(id);
  const dial = el('tuner-dial'), listen = el('tuner-listen'), player = el('tuner-player');
  const frame = el('tuner-frame'), close = el('tuner-close'), name = el('tuner-player-name');
  const direct = el('tuner-direct'), duration = el('tuner-duration'), sound = el('tuner-sound');
  const stations = el('tuner-stations');
  for (let i = 0; i <= 40; i++) el('tuner-ticks').append(document.createElement('span'));
  channels.forEach((channel,index) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'tuner-station';
    button.setAttribute('aria-pressed', String(index === 0));
    const code = document.createElement('span');
    code.className = 'tuner-station-code'; code.textContent = 'CH ' + channel.code;
    const label = document.createElement('span'); label.textContent = channel.label;
    button.append(code,label);
    button.addEventListener('click', () => { dial.value = channel.position; render(channel.position); stopNoise(); });
    stations.append(button);
  });
  const stationButtons = [...stations.querySelectorAll('button')];
  let selected = 0, soundEnabled = true, context = null, source = null, gain = null;
  function stopNoise() {
    if (source) { try { source.stop(); } catch (_) {} source.disconnect(); source = null; }
    if (gain) { gain.disconnect(); gain = null; }
  }
  function startNoise() {
    if (!soundEnabled || source) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      context = context || new AC();
      if (context.state === 'suspended') context.resume().catch(() => {});
      const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * .35), context.sampleRate);
      const samples = buffer.getChannelData(0);
      for (let i = 0; i < samples.length; i++) samples[i] = (Math.random() * 2 - 1) * .55;
      source = context.createBufferSource(); source.buffer = buffer; source.loop = true;
      const filter = context.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 3900;
      gain = context.createGain(); gain.gain.value = .018;
      source.connect(filter).connect(gain).connect(context.destination); source.start();
    } catch (_) { stopNoise(); }
  }
  function closePlayer(restoreFocus = true) {
    if (player.hidden) return;
    frame.removeAttribute('src'); // unload the existing iframe: stops playback
    player.hidden = true;
    listen.hidden = false;
    listen.setAttribute('aria-expanded','false');
    if (restoreFocus) listen.focus();
  }
  function render(value) {
    const val = Number(value);
    const next = channels.findIndex(channel => Math.abs(channel.position - val) <= 7);
    if (next !== selected && !player.hidden) closePlayer(false);
    selected = next;
    const tuned = next >= 0;
    const channel = tuned ? channels[next] : null;
    el('tuner-light').classList.toggle('searching', !tuned);
    el('tuner-status-text').textContent = tuned ? 'Signal found' : 'Searching';
    el('tuner-caption').textContent = tuned ? 'Now tuned' : 'Between signals';
    el('tuner-number').textContent = tuned ? 'CH ' + channel.code : '···';
    el('tuner-title').textContent = tuned ? channel.title : 'Between channels — static';
    el('tuner-note').textContent = tuned ? channel.note : 'Keep turning the dial until you find a signal.';
    listen.disabled = !tuned;
    if (tuned) stopNoise();
    else startNoise();
    stationButtons.forEach((button,i) => button.setAttribute('aria-pressed', String(tuned && i === next)));
  }
  dial.addEventListener('input', () => render(dial.value));
  for (const type of ['change','pointerup','keyup','blur']) dial.addEventListener(type, stopNoise);
  sound.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    sound.setAttribute('aria-pressed', String(soundEnabled));
    sound.textContent = soundEnabled ? '◖)) Static FX on' : '◖× Static FX off';
    if (!soundEnabled) stopNoise();
  });
  listen.addEventListener('click', () => {
    if (selected < 0 || !player.hidden) return;
    stopNoise();
    const channel = channels[selected];
    name.textContent = channel.title; name.title = channel.title;
    direct.href = channel.share; duration.textContent = channel.duration;
    frame.title = channel.title + ' — Descript audio player';
    listen.hidden = true; listen.setAttribute('aria-expanded','true');
    player.hidden = false;
    frame.src = channel.embed; // load only on an explicit user click
    close.focus();
  });
  close.addEventListener('click', () => closePlayer());
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !player.hidden) closePlayer();
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopNoise(); });
  window.addEventListener('pagehide', () => { stopNoise(); closePlayer(false); });
  render(0); // initial selection without autoplay
})();
