const tempInput = document.getElementById('tempInput');
const unitSelect = document.getElementById('unitSelect');
const convertBtn = document.getElementById('convertBtn');
const errorDisplay = document.getElementById('errorDisplay');

const celsiusResult = document.getElementById('celsiusResult');
const fahrenheitResult = document.getElementById('fahrenheitResult');
const kelvinResult = document.getElementById('kelvinResult');

const ABSOLUTE_ZERO = {
  C: -273.15,
  F: -459.67,
  K: 0
};

function clearResults() {
  celsiusResult.textContent = '--';
  fahrenheitResult.textContent = '--';
  kelvinResult.textContent = '--';
}

function convertTemperature() {
  const rawValue = tempInput.value.trim();
  const unit = unitSelect.value;
  errorDisplay.textContent = '';

  if (rawValue === '') {
    errorDisplay.textContent = 'Please enter a value.';
    clearResults();
    return;
  }

  const val = Number(rawValue);

  if (isNaN(val)) {
    errorDisplay.textContent = 'Invalid input: Please enter a numeric value.';
    clearResults();
    return;
  }

  if (val < ABSOLUTE_ZERO[unit]) {
    const unitName = unit === 'C' ? '°C' : unit === 'F' ? '°F' : 'K';
    errorDisplay.textContent = `Temperature cannot be below absolute zero (${ABSOLUTE_ZERO[unit]}${unitName}).`;
    clearResults();
    return;
  }

  let c, f, k;

  if (unit === 'C') {
    c = val;
    f = (val * 9 / 5) + 32;
    k = val + 273.15;
  } else if (unit === 'F') {
    c = (val - 32) * (5 / 9);
    f = val;
    k = c + 273.15;
  } else if (unit === 'K') {
    c = val - 273.15;
    f = (c * 9 / 5) + 32;
    k = val;
  }

  celsiusResult.textContent = `${c.toFixed(2)} °C`;
  fahrenheitResult.textContent = `${f.toFixed(2)} °F`;
  kelvinResult.textContent = `${k.toFixed(2)} K`;
}

convertBtn.addEventListener('click', convertTemperature);

tempInput.addEventListener('input', () => {
  if (errorDisplay.textContent) {
    errorDisplay.textContent = '';
  }
});