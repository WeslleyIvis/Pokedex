export default class Modal {
  closeModal(node, scrollTop) {
    const closeEvent = node.addEventListener('click', (event) => {
      document
        .querySelector('.modal')
        .parentNode.removeChild(document.querySelector('.modal'));

      if (document.querySelector('.pokedex-content')) {
        document.querySelector('.pokedex-content').classList.toggle('disable');
      }

      document.documentElement.scrollTop = scrollTop;
    });
  }
}
