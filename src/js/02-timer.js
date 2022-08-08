import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const secondEl = document.querySelector('span[data-seconds]');
const minuteEl = document.querySelector('span[data-minutes]');
const hourEl = document.querySelector('span[data-hours]');
const dayEl = document.querySelector('span[data-days]');
const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

startBtn.setAttribute(`disabled`, true)

startBtn.addEventListener('click', startChanging)
input.addEventListener(`change`, fail)

function startChanging() {
  const a = input.value
  const deadline = new Date(a)
  const today = new Date()
  const ms = deadline - today
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    startBtn.setAttribute(`disabled`, true)

  const timerId = setTimeout(startChanging, 1000)

  if (seconds === 0 && minutes === 0 && hours === 0 && days === 0) {
    secondEl.textContent = "00"
    minuteEl.textContent = "00"
    hourEl.textContent = "00"
    dayEl.textContent = "00"
    clearInterval(timerId)
  } else {
    secondEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
    minuteEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
    hourEl.textContent = hours < 10 ? `0${hours}` : hours;
    dayEl.textContent = days < 10 ? `0${days}` : days;
  }

return { deadline, today }
}

function fail() {
  const a = input.value
  const deadline = new Date(a)
  const today = new Date()
  if ( deadline > today) {
  startBtn.removeAttribute(`disabled`)
  }else {
    Notiflix.Notify.failure("Please choose a date in the future");
    startBtn.setAttribute(`disabled`, true)
    secondEl.textContent = "00"
    minuteEl.textContent = "00"
    hourEl.textContent = "00"
    dayEl.textContent = "00"
  }
}




flatpickr(input, {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
})

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

