const nElm = document.querySelector('#number-n');
const kElm = document.querySelector('#number-k');
const btnElm = document.querySelector('#submitBtn');
const outputElm = document.querySelector('#output');
const totalElm = document.querySelector('#total');
const checkIsValid = value => value === '' || value && Number(value) > 0;
let total = 0;

function find(n, k, list) {
  const lastValue = list.length ? list[list.length - 1] : 0;
  if (n === 0 && k === 0) {
    // answer found
    console.log(list);
    addToOutput(list);
    return;
  }
  if (lastValue > k || n === 0) {
    return;
  }
  for (let i = lastValue + 1; i <= k; ++i) {
    find(n - 1, k - i, [...list, i]);
  }
}

function calculate() {
  // reset
  btnElm.disabled = true;
  clearOutput();
  // init
  const n = nElm.value || 5;
  const k = kElm.value || 15;
  nElm.value = n;
  kElm.value = k;
  // process
  find(n,k,[]);
}

function validate(e, name) {
  const nIsValid = checkIsValid(nElm.value);
  const kIsValid = checkIsValid(kElm.value);

  let isValid = name === 'n' ? nIsValid : kIsValid;
  if (isValid) {
    e.target.classList.remove('is-invalid');
    e.target.classList.remove('is-valid');
    e.target.classList.add('is-valid');
  } else {
    e.target.classList.remove('is-invalid');
    e.target.classList.remove('is-valid');
    e.target.classList.add('is-invalid');
  }

  btnElm.disabled = !nIsValid || !kIsValid;
}

function clearOutput() {
  outputElm.innerHTML = '';
  total = 0;
}

function addToOutput(list) {
  outputElm.innerHTML += `<li>${list}</li>`;
  ++total;
  totalElm.innerHTML = total;
}

