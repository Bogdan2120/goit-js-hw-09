import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  start: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.start.disabled = true;
let isAvaibleDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();

    const chosenTime = selectedDates[0].getTime();
    isAvaibleDate = chosenTime - currentDate;

    if (isAvaibleDate <= 0) {
      Notiflix.Report.failure('ERROR', 'Please choose a date in the future');
      return;
    }

    refs.start.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

class Timer {
  constructor({ onTick }) {
    (this.intervalId = null), (this.isActive = false), (this.onTick = onTick);
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    this.intervalId = setInterval(() => {
      isAvaibleDate -= 1000;
      const deltaTime = this.convertMs(isAvaibleDate);
      this.onTick(deltaTime);

      if (isAvaibleDate <= 0) {
        clearInterval(this.intervalId);
        const deltaTime = this.convertMs(0);
        this.onTick(deltaTime);
      }
    }, 1000);
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    // Remaining seconds
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  onTick: updateTimerFace,
});

refs.start.addEventListener('click', () => timer.start());

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}
