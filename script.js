// Tabs
function showTab(name) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + name).classList.add('active');
}

// STACK
let stack = [];

function stackPush() {
  const v = document.getElementById('stack-val').value;
  stack.push(v);
  renderStack("Pushed " + v);
}

function stackPop() {
  if (!stack.length) return;
  const v = stack.pop();
  renderStack("Popped " + v);
}

function stackReset() {
  stack = [];
  renderStack("Reset");
}

function renderStack(msg) {
  document.getElementById('stack-visual').innerHTML = stack.join(" , ");
  document.getElementById('stack-step').innerText = msg;
}

// QUEUE
let queue = [];

function queueEnqueue() {
  const v = document.getElementById('queue-val').value;
  queue.push(v);
  renderQueue("Enqueued " + v);
}

function queueDequeue() {
  if (!queue.length) return;
  const v = queue.shift();
  renderQueue("Dequeued " + v);
}

function queueReset() {
  queue = [];
  renderQueue("Reset");
}

function renderQueue(msg) {
  document.getElementById('queue-visual').innerHTML = queue.join(" , ");
  document.getElementById('queue-step').innerText = msg;
}

// SORT HELPERS
function makeArr(n = 10) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 100));
}

// BUBBLE SORT
let bArr = makeArr();

function bubbleShuffle() {
  bArr = makeArr();
  drawBars("bubble-bars", bArr);
}

function bubbleReset() {
  bubbleShuffle();
}

async function bubbleToggle() {
  for (let i = 0; i < bArr.length; i++) {
    for (let j = 0; j < bArr.length - i - 1; j++) {
      if (bArr[j] > bArr[j + 1]) {
        [bArr[j], bArr[j + 1]] = [bArr[j + 1], bArr[j]];
        drawBars("bubble-bars", bArr);
        await new Promise(r => setTimeout(r, 200));
      }
    }
  }
}

// SELECTION SORT
let sArr = makeArr();

function selShuffle() {
  sArr = makeArr();
  drawBars("sel-bars", sArr);
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
    drawBars("sel-bars", sArr);
    await new Promise(r => setTimeout(r, 200));
  }
}

// DRAW BARS
function drawBars(id, arr) {
  const el = document.getElementById(id);
  el.innerHTML = "";
  arr.forEach(v => {
    const bar = document.createElement("div");
    bar.style.height = v + "px";
    bar.style.width = "20px";
    bar.style.display = "inline-block";
    bar.style.margin = "2px";
    bar.style.background = "purple";
    el.appendChild(bar);
  });
}

// init
bubbleShuffle();
selShuffle();
