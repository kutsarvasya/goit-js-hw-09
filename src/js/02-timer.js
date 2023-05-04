import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateInputEl = document.querySelector('#datetime-picker');
const startBtnTimerEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtnTimerEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notiflix.Notify.info('Please choose a date in the future');
      startBtnTimerEl.disabled = true;
    } else {
      startBtnTimerEl.disabled = false;
    }
  },
};

flatpickr(dateInputEl, options);
// console.log(options.onClose(dateT));
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

startBtnTimerEl.addEventListener('click', onTimerForClick);

function onTimerForClick() {
  startBtnTimerEl.disabled = true;
  dateInputEl.disabled = true;
  const selectedDate = new Date(dateInputEl.value);
  const currentDate = new Date();
  let gap = selectedDate - currentDate;
  const intervalId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(gap);
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
    gap -= 1000;
    if (gap <= 0) {
      clearInterval(intervalId);
      dateInputEl.disabled = false;
      return;
    }
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}
