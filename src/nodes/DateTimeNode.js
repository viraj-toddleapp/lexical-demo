import { TextNode } from "lexical";

export class DateTimeNode extends TextNode {
  static getType() {
    return "date-time-node";
  }

  static clone(node) {
    return new DateTimeNode(node.__key);
  }

  constructor(text, key) {
    super(text, key);
    this.__style = "color: red;";
  }

  //   static importJSON(serializedNode) {
  //     const node = $createDateTimeNode(serializedNode.text);
  //     node.setFormat(serializedNode.format);
  //     node.setDetail(serializedNode.detail);
  //     node.setMode(serializedNode.mode);
  //     node.setStyle(serializedNode.style);
  //     return node;
  //   }

  //   exportJSON() {
  //     return {
  //       ...super.exportJSON(),
  //       type: DateTimeNode.getType(),
  //       className: this.getClassName(),
  //     };
  //   }
  createDOM(config) {
    const element = super.createDOM(config);
    element.style = this.__style;
    return element;
  }

  updateDOM(prevNode, dom, config) {
    const isUpdated = super.updateDOM(prevNode, dom, config);
    if (prevNode.__style !== this.__style) {
      dom.style = this.__style;
    }
    return isUpdated;
  }

  getClassName() {
    const self = this.getLatest();
    return self.__className;
  }
}

export function $createDateTimeNode(text) {
  return new DateTimeNode(text);
}

export function $isDateTimeNode(node) {
  return node instanceof DateTimeNode;
}
