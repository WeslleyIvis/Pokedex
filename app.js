import Pokedex from './modules/PokeDex.js';

const input = document.querySelector('.inpt-poke');
const section = document.querySelector('.poke-section');

window.addEventListener('keyup', (event) => {
  console.log(event.key);
  section.innerHTML = '';

  //   const pokedex = new Pokedex('lugia', section);
  //   pokedex.initPokemon();
});
