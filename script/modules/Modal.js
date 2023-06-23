export default class Modal {
  closeModal(node) {
    const closeEvent = node.addEventListener('click', (event) => {
      document
        .querySelector('.modal')
        .parentNode.removeChild(document.querySelector('.modal'));
    });
  }
}
