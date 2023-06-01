import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  ElementNode,
  createCommand,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";

export class AiBlock extends ElementNode {
  static getType() {
    return "aiBlock";
  }

  static clone(node) {
    return new AiBlock(node.__key);
  }

  createDOM(config) {
    const element = document.createElement("div");
    const childElement = document.createElement("div");
    childElement.textContent = "123";
    element.append(childElement);
    element.className = config.theme.aiBlock;
    return element;
  }

  updateDOM() {
    return false;
  }
}

export const $createAiBlockNode = () => {
  return new AiBlock();
};

export const $isAiBlockNode = (node) => {
  return node instanceof AiBlock;
};

export const INSERT_AIBLOCK_COMMAND = createCommand("insertAiBlock");

export const AiBlockPlugin = () => {
  const [editor] = useLexicalComposerContext();
  if (!editor.hasNodes([AiBlock])) {
    throw new Error("error");
  }
  editor.registerCommand(
    INSERT_AIBLOCK_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, $createAiBlockNode);
      }
      return true;
    },
    COMMAND_PRIORITY_LOW
  );
  return null;
};
