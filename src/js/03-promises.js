import Notiflix from 'notiflix';

const refs = {
  formEls: document.querySelector('.form'),
  firstDelay: document.querySelector('input[name=delay]'),
  delayStep: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
};

refs.formEls.addEventListener('submit', onCatFunction);

function onCycleFunction(amount, delay, step) {
  for (let i = 1; i <= amount; i += 1) {
    let total = delay + step * (i - 1);
    createPromise(i, total)
      .then(({ position, delay }) => {
        return Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        return Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function onCatFunction(event) {
  event.preventDefault();
  const amount = Number(event.target.amount.value);
  const delay = Number(event.target.delay.value);
  const step = Number(event.target.step.value);

  onCycleFunction(amount, delay, step);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}