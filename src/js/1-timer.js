'use strict';
// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const selector = document.querySelector('#datetime-picker');
const btn = document.querySelector('button');

let userSelectedDate;

btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] <= new Date()) {
      // window.alert('Please choose a date in the future');
      iziToast.show({
        title: '',
        message: 'Please choose a date in the future',
        messageColor: '#FFFFFF',
        backgroundColor: '#EF4040',
        color: '#B51B1B',
        iconUrl: './bi_x-octagon.svg',
        iconColor: '#FAFAFB',
        position: 'topRight',
      });
      btn.disabled = true;
    } else {
      btn.disabled = false;
      updateUserSelectedDate(selectedDates[0]);
    }
  },
};

const datePicker = flatpickr(selector, options);

function updateUserSelectedDate(selectedDate) {
  userSelectedDate = selectedDate;

  class Timer {
    #time = userSelectedDate - Date.now();
    #elementDays;
    #elementHovers;
    #elementMinutes;
    #elementSeconds;
    constructor(Days, Hovers, Minutes, Seconds) {
      this.#elementDays = document.querySelector(Days);
      this.#elementHovers = document.querySelector(Hovers);
      this.#elementMinutes = document.querySelector(Minutes);
      this.#elementSeconds = document.querySelector(Seconds);
      this.#render();
    }

    start() {
      const intervalId = setInterval(() => {
        this.#time -= 1000;
        btn.disabled = true;
        if (this.#time <= 0) {
          clearInterval(intervalId);
        } else {
          this.#render();
        }
      }, 1000);
    }

    stop() {}

    #convertMs(ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      // Remaining days
      const days = this.pad(Math.floor(ms / day));
      // Remaining hours
      const hours = this.pad(Math.floor((ms % day) / hour));
      // Remaining minutes
      const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
      // Remaining seconds
      const seconds = this.pad(
        Math.floor((((ms % day) % hour) % minute) / second)
      );

      return { days, hours, minutes, seconds };
    }

    pad(value) {
      return String(value).padStart(2, '0');
    }

    #render() {
      const { days, hours, minutes, seconds } = this.#convertMs(this.#time);

      this.#elementDays.textContent = `${days}`;
      this.#elementHovers.textContent = `${hours}`;
      this.#elementMinutes.textContent = `${minutes}`;
      this.#elementSeconds.textContent = `${seconds}`;
    }
  }

  const timer = new Timer(
    'span[data-days]',
    'span[data-hours]',
    'span[data-minutes]',
    'span[data-seconds]'
  );

  btn.addEventListener('click', timer.start.bind(timer));
}
