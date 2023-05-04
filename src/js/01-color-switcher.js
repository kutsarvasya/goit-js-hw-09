const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
let timeId = null;

startBtnEl.addEventListener('click', e => {
  e.target.disabled = true;
  stopBtnEl.disabled = false;
  timeId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtnEl.addEventListener('click', e => {
  e.target.disabled = true;
  startBtnEl.disabled = false;
  clearInterval(timeId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
