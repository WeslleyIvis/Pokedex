import CreateComponents from './CreateComponents.js';
import Modal from './Modal.js';
export default class Pokedex {
  constructor(section) {
    this.generator = new CreateComponents();
    this.modal = new Modal();
    this.container = document.querySelector(section);
    this.dataPokedex = [];
    this.typeColors = [
      {
        type: 'fire',
        color: 'rgba(255, 113, 17)',
      },
      {
        type: 'water',
        color: 'rgba(113, 126, 254)',
      },
      {
        type: 'grass',
        color: 'rgba(58, 203, 1)',
      },
      {
        type: 'bug',
        color: 'rgba(156, 195, 33)',
      },
      {
        type: 'poison',
        color: 'rgba(175, 1 ,204)',
      },
      {
        type: 'normal',
        color: 'rgba(172, 171, 141)',
      },
      {
        type: 'flying',
        color: 'rgba(168 ,144, 254)',
      },
      {
        type: 'psychic',
        color: 'rgba(255, 80 ,155)',
      },
      {
        type: 'fighting',
        color: 'rgba(120, 0 ,0)',
      },
      {
        type: 'electric',
        color: 'rgba(254, 213, 37)',
      },
      {
        type: 'ground',
        color: 'rgb(229 188 98)',
      },
      {
        type: 'fairy',
        color: 'rgb(248 165 209)',
      },
      {
        type: 'ice',
        color: 'rgb(136 150 237)',
      },
      {
        type: 'rock',
        color: 'rgb(196 145 0)',
      },
      {
        type: 'dragon',
        color: 'rgb(102 35 239)',
      },
      {
        type: 'ghost',
        color: 'rgb(102 58 147)',
      },
      {
        type: 'steel',
        color: 'rgb(90 142 162)',
      },
      {
        type: 'dark',
        color: 'rgb(90 84 101)',
      },
    ];
  }

  async fetchPokemons(limitPokedex) {
    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limitPokedex}`,
    ).then((r) => r.json());
    const dataPokemon = data.results;
    const loading = this.generator.createNode('div', 'loader');
    this.container.appendChild(loading);

    for (const pokemon of dataPokemon) {
      const pokemonDetails = await this.fetchPokemonsStatus(pokemon.url);
      this.dataPokedex.push(pokemonDetails);
    }

    this.container.appendChild(this.createPokedex(this.dataPokedex));
    this.container.removeChild(document.querySelector('.loader'));

    console.log(this.dataPokedex);

    return this.dataPokedex;
  }

  async fetchPokemonsStatus(url) {
    const r = await fetch(url);
    const data = await r.json();
    return data;
  }

  async fetchPokemonName(name) {
    const pokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`,
    )
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
          'poke-name',
          element.name.charAt(0).toUpperCase() + element.name.slice(1),
        ),
      );
      cardPokemon.appendChild(
        this.generator.createNode('span', 'poke-id', element.id),
      );
      const boxIMG = this.generator.createNode('div', 'poke-box-img');
      boxIMG.appendChild(
        this.generator.createNode('img', 'poke-img', null, {
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

    // Get element color
    const pokeColor = this.getColorElementColor(element.types[0].type.name);
    contentImage.style.backgroundImage = `linear-gradient(to top, transparent 0%, ${pokeColor} 100%)`;

    // Arrow button
    const arrow = this.generator.createButton('←', 'modal-arrow');
    this.modal.closeModal(arrow);

    contentImage.appendChild(arrow);

    // Id pokedex
    contentImage.appendChild(
      this.generator.createNode(
        'div',
        'modal-id-pokedex',
        `# ${element.id.toString().padStart(4, '0')}`,
      ),
    );

    // Content image
    const image = this.generator.createNode('div', 'modal-cont-img');
    image.appendChild(
      this.generator.createNode('img', 'modal-poke-img', null, {
        attribute: 'src',
        value: element.sprites.other['official-artwork'].front_default,
      }),
    );

    contentImage.appendChild(image);

    // Button get shiny pokemon
    const buttonShiny = this.generator.createButton(null, 'button-shiny');
    buttonShiny.appendChild(
      this.generator.createNode('img', '', undefined, {
        attribute: 'src',
        value: 'https://static.thenounproject.com/png/3386874-200.png',
      }),
    );

    this.toggleImageShiny(buttonShiny, image.firstChild, element);
    contentImage.appendChild(buttonShiny);

    // H1 name pokemon
    contentStatus.appendChild(
      this.generator.createNode(
        'h1',
        'modal-poke-name',
        element.name.charAt(0).toUpperCase() + element.name.slice(1),
      ),
    );

    // Content Type elements pokemon
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

    // Weight & Height
    const pokeSize = this.generator.createNode('div', 'size-pokemon');
    pokeSize.appendChild(
      this.generator.createNode('span', 'weight', `${element.weight / 10} KG`),
    );
    pokeSize.appendChild(
      this.generator.createNode('span', 'height', `${element.height / 10} M`),
    );

    contentStatus.appendChild(pokeSize);

    // Status bar
    const baseStatus = this.generator.createNode('div', 'modal-base-status');
    baseStatus.appendChild(
      this.generator.createNode('h2', null, 'Base Status'),
    );

    const boxStatus = this.generator.createNode('div', 'box-status');

    element.stats.forEach((status) => {
      boxStatus.appendChild(
        this.generator.createNode('span', null, status.stat.name),
      );
      const statusBar = this.generator.createNode('div', 'status-bar');
      const statusAmount = this.generator.createNode(
        'div',
        status.stat.name,
        `${status.base_stat} / 300`,
      );

      let valueStatus = (status.base_stat * 100) / 300;
      if (valueStatus <= 40) valueStatus += 8;

      statusAmount.style.width = valueStatus + '%';
      statusBar.appendChild(statusAmount);
      boxStatus.appendChild(statusBar);
    });

    baseStatus.appendChild(boxStatus);
    contentStatus.appendChild(baseStatus);
    componentModal.appendChild(contentImage);
    componentModal.appendChild(contentStatus);
    modal.appendChild(componentModal);

    return modal;
  }

  getColorElementColor(element) {
    let pokeColor = '';
    this.typeColors.forEach(({ type, color }) => {
      if (element === type) pokeColor = color;
    });

    return pokeColor;
  }

  toggleImageShiny(nodeEvent, nodeMod, { sprites }) {
    nodeEvent.addEventListener('click', () => {
      if (nodeMod.src === sprites.other['official-artwork'].front_default) {
        nodeMod.src = sprites.other['official-artwork'].front_shiny;
      } else if (
        nodeMod.src === sprites.other['official-artwork'].front_shiny
      ) {
        nodeMod.src = sprites.other['official-artwork'].front_default;
      }

      nodeEvent.classList.toggle('bg-color-yellow');
    });
  }
}
