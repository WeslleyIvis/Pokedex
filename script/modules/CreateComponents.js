export default class CreateComponents {
  createNode(
    nodeType,
    className = null,
    value = null,
    src = { attribute: null, value: null },
  ) {
    const node = document.createElement(nodeType);
    value ? (node.innerText = value) : null;
    className ? node.classList.add(className) : null;
    src.attribute && src.value
      ? node.setAttribute(src.attribute, src.value)
      : null;

    return node;
  }

  createButton(
    value = null,
    className = null,
    attribute = { type: null, value: null },
  ) {
    const node = document.createElement('button');
    node.type = 'button';
    value ? (node.innerText = value) : null;
    className ? node.classList.add(className) : null;
    attribute.type && attribute.value
      ? node.setAttribute(attribute.type, attribute.value)
      : null;

    return node;
  }

  toggleClass(node) {
    node.classList.toggle('disable');
  }
}
