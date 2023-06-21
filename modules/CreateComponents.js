export default class CreateComponents {
  createNode(
    nodeType,
    value = null,
    className = null,
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
}
