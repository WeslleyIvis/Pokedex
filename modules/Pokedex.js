export default class Pokedex {
  constructor(pokemon, section) {
    this.pokemon = pokemon.toLowerCase();
    this.container = section;
    this.data = {};
  }

  async getPokemonAPI(pokemon) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((r) => r.json())
      .then((data) => {
        this.data.pokemon = data;
        this.getPokemonStatus(this.data.pokemon.species.url);
      })
      .catch((error) => console.error({ error: error }));
  }

  async getPokemonStatus(url) {
    await fetch(url)
      .then((r) => r.json())
      .then((status) => {
        this.data.status = status;
        this.__createInterfacePokemon();
      });
  }

  __createInterfacePokemon() {
    console.log(this.data);

    this.container.appendChild(this.createNode('h1', this.data.pokemon.name));
    this.container.appendChild(
      this.createNode(
        'img',
        null,
        'poke-img',
        this.data.pokemon.sprites.other.dream_world.front_default,
      ),
    );
    this.container.appendChild(
      this.createNode('p', `Pokedex N°: ${this.data.pokemon.id}`),
    );
    this.container.appendChild(
      this.createNode('p', this.data.status.generation.name),
    );

    this.data.pokemon.types.forEach((element) => {
      this.container.appendChild(
        this.createNode('span', `| ${element.type.name} `),
      );
    });

    console.log(this.data.status.generation.name);
  }

  createNode(nodeType, value = null, className = null, src = null) {
    const node = document.createElement(nodeType);
    value ? (node.innerText = value) : null;
    className ? node.classList.add(className) : null;
    src ? node.setAttribute('src', src) : null;

    return node;
  }

  initPokemon() {
    this.getPokemonAPI(this.pokemon);
  }
}
