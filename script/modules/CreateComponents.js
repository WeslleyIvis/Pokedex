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
}
