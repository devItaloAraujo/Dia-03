import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import './style.css';

const button = document.getElementsByClassName('button')[0];
const container = document.querySelector('.container');
const input = document.getElementById('input-coin');

const getDiv = (object) => {
  const keys = Object.keys(object);
  keys.forEach((element) => {
    const pair = document.createElement('div');
    const mil = 1000;
    const decimais = 3;
    pair.innerHTML = `${element}- ${(Math.round(object[element] * mil)
      / mil).toFixed(decimais)}`;
    container.appendChild(pair);
  });
};

button.addEventListener('click', () => {
  let rates;
  const moeda = input.value;
  container.innerHTML = '';

  fetch(`https://api.exchangerate.host/latest?base=${moeda}`)
    .then((response) => response.json())
    .then((data) => {
      rates = data.rates;
      const keys = Object.keys(rates);

      if (input.value === '') {
        Swal.fire({
          title: 'Ops ...',
          text: 'Você precisa passar uma moeda',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else if (!keys.includes(input.value)) {
        Swal.fire({
          title: 'Ops ...',
          text: 'Moeda não existente!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        const h2 = document.createElement('h2');
        container.appendChild(h2);
        h2.innerHTML = `Valores referentes a 1 ${moeda}`;
        getDiv(rates);
      }
    });
});
