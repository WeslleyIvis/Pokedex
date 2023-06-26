import Pokedex from './modules/Pokedex.js';

const pokeAPI = new Pokedex('.content', { className: 'pokedex-content' });
let data = null;
let currentPokemon = null;

//if (!data) data = pokeAPI.fetchPokemons(8);
await pokeAPI.fetchPokeGeration(pokeAPI.gerationStart, 0, 1);

// Create select & event
const select = pokeAPI.creatorNode.createSelectOpotions(
  null,
  pokeAPI.generations,
);
document.querySelector('.pokedex-options').appendChild(select);
pokeAPI.selectGeration(select);

// Search Pokemon & write pokemon
const pokemon = async (name) => {
  document.querySelector('.span-notfound').innerText = 'Await...';
  const poke = await pokeAPI.fetchPokemonName(name);
  if (poke) {
    document.querySelector('.span-notfound').innerText = '';
    const componentPokemon = pokeAPI.createPokemon(poke);

    document.querySelector('main').appendChild(componentPokemon);

    const pokedex = document.querySelector('.pokedex-content');
    if (pokedex) pokeAPI.creatorNode.toggleClass(pokedex);

    return componentPokemon;
  } else {
    document.querySelector('.span-notfound').innerText =
      'Name or ID pokedex not found';
    return null;
  }
};

// Search Events
const events = (inputTxt, button) => {
  let searchNamePokemon = '';

  document.querySelector(inputTxt).addEventListener('keyup', (event) => {
    searchNamePokemon = event.target.value;
    if (event.key === 'Enter') currentPokemon = pokemon(searchNamePokemon);
  });

  document.querySelector(button).addEventListener('click', () => {
    if (searchNamePokemon) currentPokemon = pokemon(searchNamePokemon);
  });
};

events('.search-poke', '.box-search button');

window.addEventListener('scroll', (event) => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  console.log(scrollTop, scrollHeight, clientHeight);
});
