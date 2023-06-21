import CreateComponents from './CreateComponents.js';

export default class Pokedex {
  constructor(section) {
    this.generator = new CreateComponents();
    this.container = document.querySelector(section);
    this.dataPokedex = [];
  }

  async fetchPokemons(limitPokedex) {
    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limitPokedex}`,
    ).then((r) => r.json());
    const dataPokemon = data.results;

    for (const pokemon of dataPokemon) {
      const pokemonDetails = await this.fetchPokemonsStatus(pokemon.url);
      this.dataPokedex.push(pokemonDetails);
    }

    console.log(this.dataPokedex);
    this.container.appendChild(this.createPokedex(this.dataPokedex));
  }

  async fetchPokemonsStatus(url) {
    const r = await fetch(url);
    const data = await r.json();
    return data;
  }

  createPokedex(data) {
    const content = this.generator.createNode(
      'section',
      null,
      `pokedex-content`,
    );

    data.forEach((element, i) => {
      const cardPokemon = this.generator.createNode(
        'div',
        null,
        `pokedex-card`,
      );
      //cardPokemon.classList.add(`${element.types[0].type.name}`);
      cardPokemon.appendChild(
        this.generator.createNode(
          'h1',
          // deixa a primeira letra em Maiusculo
          element.name.charAt(0).toUpperCase() + element.name.slice(1),
          'poke-name',
        ),
      );
      cardPokemon.appendChild(
        this.generator.createNode('span', element.id, 'poke-id'),
      );
      const boxIMG = this.generator.createNode('div', null, 'poke-box-img');
      boxIMG.appendChild(
        this.generator.createNode('img', null, 'poke-img', {
          attribute: 'src',
          value: element.sprites.other['official-artwork'].front_default,
        }),
      );
      const boxTYPES = this.generator.createNode('div', null, 'poke-types');
      element.types.forEach((element) => {
        boxTYPES.appendChild(
          this.generator.createNode(
            'span',
            element.type.name,
            element.type.name,
          ),
        );
      });
      cardPokemon.appendChild(boxIMG);
      cardPokemon.appendChild(boxTYPES);
      content.appendChild(cardPokemon);
    });
    console.log(content);
    return content;
  }
}
