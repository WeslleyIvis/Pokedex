import Pokedex from './modules/Pokedex.js';

const pokeAPI = new Pokedex('.content', { className: 'pokedex-content' });
let data = null;
let currentPokemon = null;

//if (!data) data = pokeAPI.fetchPokemons(8);
await pokeAPI.fetchPokeGeration();

// Create select & event
const select = pokeAPI.creatorNode.createSelectOpotions(
  null,
  pokeAPI.gerations,
);
document.querySelector('.pokedex-options').appendChild(select);

pokeAPI.selectGeration(select);

// Search Pokemon & write pokemon
const pokemon = async (name) => {
  document.querySelector('.span-notfound').innerText = 'Await...';
  const poke = await pokeAPI.fetchPokemonName(name);
  if (poke) {
    document.documentElement.scrollTop = 0;
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

let cancelScroll = true;

const handleScroll = async () => {
  if (cancelScroll && document.querySelector('.pokedex-content').firstChild) {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    cancelScroll = false;

    if (scrollTop + clientHeight > scrollHeight - 300) {
      await pokeAPI.fetchPokeGeration();
    }

    setTimeout(() => {
      cancelScroll = true;
    }, 50);
  }
};

window.addEventListener('scroll', handleScroll);

events('.search-poke', '.box-search button');
