const nElm = document.querySelector('#number-n');
const kElm = document.querySelector('#number-k');
const sElm = document.querySelector('#number-s');
const tElm = document.querySelector('#number-t');
const btnElm = document.querySelector('#submitBtn');
const outputElm = document.querySelector('#output');
const totalElm = document.querySelector('#total');

const maxValue = 100;
const checkIsValid = value => value === '' || value && Number(value) > 0 && Number(value) <= maxValue;

nElm.max = maxValue;
kElm.max = maxValue;
sElm.max = maxValue;
tElm.max = maxValue;
document.querySelector('#maxValue').innerHTML = maxValue;

let total = 0;
let content = '';

function find(n, k, s, t, list) {
  const lastValue = list.length ? list[list.length - 1] : 0;
  if (n === 0 && k === 0) {
    // answer found
    addToOutput(list);
    return;
  }
  if (lastValue >= k || n === 0 || lastValue > s || lastValue + n > s) {
    return;
  }

  const minSum = ((lastValue + 1 + lastValue + n) * n) >> 1;
  if (minSum > k) {
    return;
  }
  if (minSum === k) {
    if (lastValue + 1 <= t && lastValue + n >= t) return;
    for (let i = lastValue + 1, cnt = 0; cnt < n; ++cnt, ++i) {
      list.push(i);
    }
    addToOutput(list);
    return;
  }

  for (let i = lastValue + 1; i <= k && i <= s; ++i) {
    if (i === t) continue;
    find(n - 1, k - i, s, t, [...list, i]);
  }
}

function calculate() {
  // reset
  clearOutput();
  // init
  const n = Number(nElm.value) || 5;
  const k = Number(kElm.value) || 15;
  const s = Number(sElm.value) || 15;
  const t = Number(tElm.value) || 15;
  // check
  if (n > k || n > maxValue || k > maxValue || s > maxValue || t > maxValue) {
    return;
  }
  // process
  setTimeout(() => {
    find(n,k,s,t,[]);
    updateOutput();
  });
}

function validate(e, name) {
  const nIsValid = checkIsValid(nElm.value);
  const kIsValid = checkIsValid(kElm.value);
  const sIsValid = checkIsValid(sElm.value);
  const tIsValid = checkIsValid(tElm.value);

  let isValid = name === 'n' ? nIsValid : name === 's' ? sIsValid : name === 't' ? tIsValid : kIsValid;
  if (isValid) {
    e.target.classList.remove('is-invalid');
    e.target.classList.remove('is-valid');
    e.target.classList.add('is-valid');
  } else {
    e.target.classList.remove('is-invalid');
    e.target.classList.remove('is-valid');
    e.target.classList.add('is-invalid');
  }

  btnElm.disabled = !nIsValid || !kIsValid || !sIsValid || !tIsValid;
}

function clearOutput() {
  btnElm.disabled = true;
  outputElm.innerHTML = '';
  totalElm.innerHTML = 0;
  content = '';
  total = 0;
}

function addToOutput(list) {
  content += `<li>${list.join(', ')}</li>`;
  ++total;
}

function updateOutput() {
  btnElm.disabled = false;
  totalElm.innerHTML = total;
  outputElm.innerHTML = content;
}
