'use strict';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', events);

function events(event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stateInput = document.querySelector('input[name="state"]:checked');

  const delay = parseInt(delayInput.value, 10);
  const state = stateInput ? stateInput.value : null;

  if (isNaN(delay) || delay <= 0) {
    console.error('Please enter a valid positive delay value.');
    return;
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  promise.then(
    delay => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
      iziToast.show({
        title: '',
        message: `✅ Fulfilled promise in ${delay}ms`,
        messageColor: '#FFFFFF',
        backgroundColor: '#59A10D',
        color: '#326101',
        // iconUrl: '../img/ok.svg',
        iconColor: '#FAFAFB',
        position: 'topRight',
      });
    },
    delay => {
      console.log(`❌ Rejected promise in ${delay}ms`);
      iziToast.show({
        title: '',
        message: `❌ Rejected promise in ${delay}ms`,
        messageColor: '#FFFFFF',
        backgroundColor: '#EF4040',
        color: '#B51B1B',
        // iconUrl: '../img/bi_x-octagon.svg',
        iconColor: '#FAFAFB',
        position: 'topRight',
      });
    }
  );
}
