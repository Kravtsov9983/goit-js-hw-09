
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

startBtn.addEventListener('click', startChanging);
stopBtn.addEventListener('click', stopChanging);

let intervalId;

function startChanging() {
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChanging() {
  clearInterval(intervalId);
}

startBtn.onclick = function() {
  if (startBtn.onclick) {
    startBtn.setAttribute(`disabled`, true)
  }
}

stopBtn.onclick = function() {
  if (stopBtn.onclick) {
    startBtn.removeAttribute(`disabled`)
  }
}
