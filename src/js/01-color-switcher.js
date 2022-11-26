const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  body: document.body,
};

refs.start.addEventListener('click', onClickStart);
refs.stop.addEventListener('click', onClickStop);

const CHANGE_TIME = 1000;
let timerId = null;

function onClickStart() {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, CHANGE_TIME);
  refs.start.disabled = true;
}

function onClickStop() {
  clearInterval(timerId);
  refs.start.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
