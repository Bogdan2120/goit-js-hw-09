import Notiflix, { Loading } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
const refs = {
  form: document.querySelector('.form'),
};

const formData = {};

refs.form.addEventListener('change', e => {
  formData[e.target.name] = e.target.value;
});

refs.form.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  const firstDelay = Number(formData.delay);
  const delayStep = Number(formData.step);
  const amount = Number(formData.amount);

  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, i * delayStep + firstDelay)
      .then(({ position, delay }) => {
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  e.target.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
