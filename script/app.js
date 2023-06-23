import Pokedex from './modules/Pokedex.js';

const pokeAPI = new Pokedex('.content');
let data = null;
let currentPokemon = null;

if (!data) data = pokeAPI.fetchPokemons(20);

const pokemon = async (name) => {
  document.querySelector('.span-notfound').innerText = 'Await...';
  const poke = await pokeAPI.fetchPokemonName(name);
  if (poke) {
    document.querySelector('.span-notfound').innerText = '';
    const componentPokemon = pokeAPI.createPokemon(poke);

    document.querySelector('main').appendChild(componentPokemon);

    const pokedex = document.querySelector('.pokedex-content');
    if (pokedex) pokeAPI.generator.disableNode(pokedex);

    return componentPokemon;
  } else {
    document.querySelector('.span-notfound').innerText =
      'Name or ID pokedex not found';
    return null;
  }
};

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
