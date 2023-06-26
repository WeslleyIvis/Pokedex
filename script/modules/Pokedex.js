import CreateComponents from './CreateComponents.js';
import Modal from './Modal.js';
export default class Pokedex {
  constructor(main, nodoPokedex = { className: '' }) {
    this.creatorNode = new CreateComponents();
    this.modal = new Modal();
    this.container = document.querySelector(main);
    this.sectionPokedex = this.creatorNode.createNode(
      'section',
      nodoPokedex.className,
    );
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
    this.generations = [
      {
        geration: 'kanto',
        quantityPokedex: {
          start: 1,
          end: 151,
        },
      },
      {
        geration: 'jhoto',
        quantityPokedex: {
          start: 152,
          end: 99,
        },
      },
      {
        geration: 'hoenn',
        quantityPokedex: {
          start: 252,
          end: 386,
        },
      },
      {
        geration: 'sinnoh',
        quantityPokedex: {
          start: 387,
          end: 493,
        },
      },
      {
        geration: 'unova',
        quantityPokedex: {
          start: 494,
          end: 649,
        },
      },
      {
        geration: 'kalos',
        quantityPokedex: {
          start: 650,
          end: 721,
        },
      },
      {
        geration: 'alola',
        quantityPokedex: {
          start: 722,
          end: 809,
        },
      },
      {
        geration: 'galar',
        quantityPokedex: {
          start: 810,
          end: 898,
        },
      },
    ];
    this.gerationStart = 0;
    this.gerationCount = this.setCountGeration();
  }

  async fetchPokeGeration(start, end) {
    this.dataPokedex = [];

    const loading = this.creatorNode.createNode('div', 'loader');
    this.container.appendChild(loading);

    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${this.gerationStart}&limit=${this.gerationCount}`,
    )
      .then((data) => data.json())
      .catch((err) => console.error(err));

    const results = data.results;
    this.gerationStart += this.gerationCount;

    for (const pokemon of results) {
      const pokemonDetails = await this.fetchPokemonsStatus(pokemon.url);
      this.dataPokedex.push(pokemonDetails);
    }

    this.container.removeChild(document.querySelector('.loader'));
    this.container.appendChild(
      this.createPokedex(this.dataPokedex, this.sectionPokedex),
    );

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

  setCountGeration(value = null) {
    if (value) return value;
    else {
      //PC version loading pokemons
      if (window.innerWidth > 1070) value = 8;
      //Mobile version loading pokemons
      else if (window.innerWidth <= 425) value = 3;
      //Tablet / Ipad version loading pokemons
      else value = 6;
      return value;
    }
  }

  createPokedex(data, contentNode) {
    const content = contentNode;

    data.forEach((element, i) => {
      const cardPokemon = this.creatorNode.createNode('div', `pokedex-card`);
      // \/ Pinta o background dos cards com a cor do elemento do pokemon
      //cardPokemon.classList.add(`${element.types[0].type.name}`);
      cardPokemon.appendChild(
        this.creatorNode.createNode(
          'h1',
          // deixa a primeira letra em Maiusculo
          'poke-name',
          element.name.charAt(0).toUpperCase() + element.name.slice(1),
        ),
      );
      cardPokemon.appendChild(
        this.creatorNode.createNode('span', 'poke-id', element.id),
      );
      const boxIMG = this.creatorNode.createNode('div', 'poke-box-img');
      boxIMG.appendChild(
        this.creatorNode.createNode('img', 'poke-img', null, {
          attribute: 'src',
          value: element.sprites.other['official-artwork'].front_default,
        }),
      );
      const boxTYPES = this.creatorNode.createNode('div', 'poke-types');
      element.types.forEach((element) => {
        boxTYPES.appendChild(
          this.creatorNode.createNode(
            'span',
            element.type.name,
            element.type.name,
          ),
        );
      });
      cardPokemon.appendChild(boxIMG);
      cardPokemon.appendChild(boxTYPES);

      this.selectPokemon(cardPokemon, element);

      content.appendChild(cardPokemon);
    });
    console.dir(content);
    return content;
  }

  createPokemon(element) {
    const modal = this.creatorNode.createNode('section', 'modal');
    const componentModal = this.creatorNode.createNode('div', 'comp-modal');
    const contentImage = this.creatorNode.createNode('div', 'modal-poke-image');
    const contentStatus = this.creatorNode.createNode(
      'div',
      'modal-poke-status',
    );

    // Get element color
    const pokeColor = this.getColorElementColor(element.types[0].type.name);
    contentImage.style.backgroundImage = `linear-gradient(to top, transparent 0%, ${pokeColor} 100%)`;

    // Arrow button
    const arrow = this.creatorNode.createButton('←', 'modal-arrow');
    this.modal.closeModal(arrow);

    contentImage.appendChild(arrow);

    // Id pokedex
    contentImage.appendChild(
      this.creatorNode.createNode(
        'div',
        'modal-id-pokedex',
        `# ${element.id.toString().padStart(4, '0')}`,
      ),
    );

    // Content image
    const image = this.creatorNode.createNode('div', 'modal-cont-img');
    image.appendChild(
      this.creatorNode.createNode('img', 'modal-poke-img', null, {
        attribute: 'src',
        value: element.sprites.other['official-artwork'].front_default,
      }),
    );

    contentImage.appendChild(image);

    // Button get shiny pokemon
    const buttonShiny = this.creatorNode.createButton(null, 'button-shiny');
    buttonShiny.appendChild(
      this.creatorNode.createNode('img', '', undefined, {
        attribute: 'src',
        value: 'https://static.thenounproject.com/png/3386874-200.png',
      }),
    );

    this.toggleImageShiny(buttonShiny, image.firstChild, element);
    contentImage.appendChild(buttonShiny);

    // H1 name pokemon
    contentStatus.appendChild(
      this.creatorNode.createNode(
        'h1',
        'modal-poke-name',
        element.name.charAt(0).toUpperCase() + element.name.slice(1),
      ),
    );

    // Content Type elements pokemon
    const types = this.creatorNode.createNode('div', 'modal-types');
    element.types.forEach((element) => {
      types.appendChild(
        this.creatorNode.createNode(
          'span',
          element.type.name,
          element.type.name.charAt(0).toUpperCase() +
            element.type.name.slice(1),
        ),
      );
    });

    contentStatus.appendChild(types);

    // Weight & Height
    const pokeSize = this.creatorNode.createNode('div', 'size-pokemon');
    pokeSize.appendChild(
      this.creatorNode.createNode(
        'span',
        'weight',
        `${element.weight / 10} KG`,
      ),
    );
    pokeSize.appendChild(
      this.creatorNode.createNode('span', 'height', `${element.height / 10} M`),
    );

    contentStatus.appendChild(pokeSize);

    // Status bar
    const baseStatus = this.creatorNode.createNode('div', 'modal-base-status');
    baseStatus.appendChild(
      this.creatorNode.createNode('h2', null, 'Base Status'),
    );

    const boxStatus = this.creatorNode.createNode('div', 'box-status');

    element.stats.forEach((status) => {
      boxStatus.appendChild(
        this.creatorNode.createNode('span', null, status.stat.name),
      );
      const statusBar = this.creatorNode.createNode('div', 'status-bar');
      const statusAmount = this.creatorNode.createNode(
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

  selectPokemon(node, dataPokemon) {
    node.addEventListener('click', (event) => {
      console.dir(node);
      this.createSelectedPokemon(dataPokemon, this.sectionPokedex);
    });
  }

  async createSelectedPokemon(pokemon, nodeDisable = null) {
    const organism = this.createPokemon(pokemon);

    this.container.appendChild(organism);

    nodeDisable ? this.creatorNode.toggleClass(nodeDisable) : null;
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

  selectGeration(node) {
    node.addEventListener('change', () => {
      console.dir(node);
      console.log(node.value);
    });
  }
}
