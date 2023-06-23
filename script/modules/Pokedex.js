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
    return this.dataPokedex;
  }

  async fetchPokemonsStatus(url) {
    const r = await fetch(url);
    const data = await r.json();
    return data;
  }

  async fetchPokemonName(name) {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((pokemon) => pokemon.json())
      .catch((err) => console.log(err));

    console.log(pokemon);
    return pokemon;
  }

  createPokedex(data) {
    const content = this.generator.createNode('section', `pokedex-content`);

    data.forEach((element, i) => {
      const cardPokemon = this.generator.createNode('div', `pokedex-card`);
      // \/ Pinta o background dos cards com a cor do elemento do pokemon
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
      const boxIMG = this.generator.createNode('div', 'poke-box-img');
      boxIMG.appendChild(
        this.generator.createNode('img', 'poke-img', {
          attribute: 'src',
          value: element.sprites.other['official-artwork'].front_default,
        }),
      );
      const boxTYPES = this.generator.createNode('div', 'poke-types');
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
    return content;
  }

  createPokemon(element) {
    const modal = this.generator.createNode('section', 'modal');
    const componentModal = this.generator.createNode('div', 'comp-modal');
    const contentImage = this.generator.createNode('div', 'modal-poke-image');
    const contentStatus = this.generator.createNode('div', 'modal-poke-status');

    contentImage.appendChild(
      this.generator.createNode('button', 'modal-arrow', '←'),
    );
    contentImage.appendChild(
      this.generator.createNode(
        'div',
        'modal-id-pokedex',
        `# ${element.id.toString().padStart(4, '0')}`,
      ),
    );

    const image = this.generator.createNode('div', 'modal-cont-img');
    image.appendChild(
      this.generator.createNode('img', 'modal-poke-img', null, {
        attribute: 'src',
        value: element.sprites.other['official-artwork'].front_default,
      }),
    );
    contentImage.appendChild(image);

    contentStatus.appendChild(
      this.generator.createNode(
        'h1',
        'modal-poke-name',
        element.name.charAt(0).toUpperCase() + element.name.slice(1),
      ),
    );
    const types = this.generator.createNode('div', 'modal-types');
    element.types.forEach((element) => {
      types.appendChild(
        this.generator.createNode(
          'span',
          element.type.name,
          element.type.name.charAt(0).toUpperCase() +
            element.type.name.slice(1),
        ),
      );
    });

    contentStatus.appendChild(types);

    const pokeSize = this.generator.createNode('div', 'size-pokemon');
    pokeSize.appendChild(
      this.generator.createNode('span', 'weight', `${element.weight / 10} KG`),
    );
    pokeSize.appendChild(
      this.generator.createNode('span', 'height', `${element.height} M`),
    );

    contentStatus.appendChild(pokeSize);

    const baseStatus = this.generator.createNode('div', 'modal-base-status');
    baseStatus.appendChild(
      this.generator.createNode('h2', null, 'Base Status'),
    );

    const boxStatus = this.generator.createNode('div', 'box-status');

    let sizeWindow = window.innerWidth;

    if (sizeWindow <= 375) sizeWindow = 8;
    else if (sizeWindow <= 500) sizeWindow = 6.5;
    else sizeWindow = 0;

    element.stats.forEach((status) => {
      boxStatus.appendChild(
        this.generator.createNode('span', null, status.stat.name),
      );
      const statusBar = this.generator.createNode('div', 'status-bar');
      const statusAmount = this.generator.createNode(
        'div',
        status.stat.name,
        `${status.base_stat} / 200`,
      );

      statusAmount.style.width =
        (status.base_stat * 100) / 200 + sizeWindow + '%';
      statusBar.appendChild(statusAmount);
      boxStatus.appendChild(statusBar);
    });

    baseStatus.appendChild(boxStatus);
    contentStatus.appendChild(baseStatus);
    componentModal.appendChild(contentImage);
    componentModal.appendChild(contentStatus);
    modal.appendChild(componentModal);

    console.log(modal);

    return modal;
  }
}