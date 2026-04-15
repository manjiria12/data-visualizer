// ── TABS ─────────────────────────────────
function showTab(name) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('panel-' + name).classList.add('active');

  const labels = {
    stack:'⬆ Stack',
    queue:'➡ Queue',
    bubble:'⟳ Bubble Sort',
    selection:'✦ Selection Sort'
  };

  document.querySelectorAll('.tab').forEach(t => {
    if (t.textContent.trim() === labels[name]) t.classList.add('active');
  });
}

// ── STACK ────────────────────────────────
const CLRS = ['c0','c1','c2','c3','c4','c5'];
let stack = [], sColorIdx = 0;

function renderStack(msg) {
  const vis = document.getElementById('stack-visual');
  vis.innerHTML = stack.length === 0
    ? '<span class="empty-note">// stack is empty</span>'
    : '';

  stack.forEach(item => {
    const el = document.createElement('div');
    el.className = 'ds-item ' + item.c;
    el.textContent = item.v;
    vis.appendChild(el);
  });

  document.getElementById('stack-step').textContent = msg;
}

function stackPush() {
  const v = document.getElementById('stack-val').value.trim();
  if (!v) return;
  stack.push({ v, c: CLRS[sColorIdx++ % CLRS.length] });
  renderStack(`Pushed ${v}`);
}

function stackPop() {
  if (!stack.length) return;
  const item = stack.pop();
  renderStack(`Popped ${item.v}`);
}

function stackReset() {
  stack = [];
  sColorIdx = 0;
  renderStack('Reset');
}

// ── QUEUE ────────────────────────────────
let queue = [], qColorIdx = 0;

function renderQueue(msg) {
  const vis = document.getElementById('queue-visual');
  vis.innerHTML = queue.length === 0
    ? '<span class="empty-note">// queue is empty</span>'
    : '';

  queue.forEach(item => {
    const el = document.createElement('div');
    el.className = 'ds-item ' + item.c;
    el.textContent = item.v;
    vis.appendChild(el);
  });

  document.getElementById('queue-step').textContent = msg;
}

function queueEnqueue() {
  const v = document.getElementById('queue-val').value.trim();
  if (!v) return;
  queue.push({ v, c: CLRS[qColorIdx++ % CLRS.length] });
  renderQueue(`Enqueued ${v}`);
}

function queueDequeue() {
  if (!queue.length) return;
  const item = queue.shift();
  renderQueue(`Dequeued ${item.v}`);
}

function queueReset() {
  queue = [];
  qColorIdx = 0;
  renderQueue('Reset');
}

// ── SORT HELPERS ─────────────────────────
function makeArr(n = 14) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 80) + 12);
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function getMs(id) {
  return Math.round(720 / parseInt(document.getElementById(id).value));
}

function drawBars(containerId, arr) {
  const wrap = document.getElementById(containerId);
  wrap.innerHTML = '';
  const mx = Math.max(...arr);

  arr.forEach(v => {
    const bar = document.createElement('div');
    bar.className = 'bar default';
    bar.style.height = Math.round((v / mx) * 170) + 'px';
    wrap.appendChild(bar);
  });
}

// ── BUBBLE SORT ─────────────────────────
let bArr = makeArr();

function bubbleShuffle() {
  bArr = makeArr();
  drawBars('bubble-bars', bArr);
}

function bubbleReset() {
  bubbleShuffle();
}

async function bubbleToggle() {
  for (let i = 0; i < bArr.length; i++) {
    for (let j = 0; j < bArr.length - i - 1; j++) {
      if (bArr[j] > bArr[j + 1]) {
        [bArr[j], bArr[j + 1]] = [bArr[j + 1], bArr[j]];
        drawBars('bubble-bars', bArr);
        await delay(200);
      }
    }
  }
}

// ── SELECTION SORT ──────────────────────
let sArr = makeArr();

function selShuffle() {
  sArr = makeArr();
  drawBars('sel-bars', sArr);
}

function selReset() {
  selShuffle();
}

async function selToggle() {
  for (let i = 0; i < sArr.length; i++) {
    let min = i;
    for (let j = i + 1; j < sArr.length; j++) {
      if (sArr[j] < sArr[min]) min = j;
    }
    [sArr[i], sArr[min]] = [sArr[min], sArr[i]];
    drawBars('sel-bars', sArr);
    await delay(200);
  }
}

// INIT
bubbleShuffle();
selShuffle();
