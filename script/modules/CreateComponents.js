export default class CreateComponents {
  createNode(
    nodeType,
    className = null,
    text = null,
    src = { attribute: null, value: null },
  ) {
    const node = document.createElement(nodeType);
    text ? (node.innerText = text) : null;
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

  createSelectOpotions(selectId = null, data = []) {
    let select = selectId;

    !selectId ? (select = this.createNode('select', 'select-geration')) : null;

    select.title = 'select-geration';
    select.id = 'select-g';

    data.forEach((element) => {
      const option = this.createNode('option', null, element.name, {
        attribute: 'value',
        value: element.name,
      });
      select.appendChild(option);
    });
    return select;
  }

  toggleClass(node) {
    node.classList.toggle('disable');
  }
}
