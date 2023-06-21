import Pokedex from './modules/PokeDex.js';

const poke = new Pokedex('.content');

poke.fetchPokemons(151);
