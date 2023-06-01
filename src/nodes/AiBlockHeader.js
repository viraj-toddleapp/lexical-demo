import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  ElementNode,
  createCommand,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";

export class AiBlockHeader extends ElementNode {
  static getType() {
    return "aiBlockHeader";
  }

  static clone(node) {
    return new AiBlockHeader(node.__key);
  }

  createDOM(config) {
    const element = document.createElement("div");
    element.className = config.theme.aiBlockHeader;
    return element;
  }

  updateDOM() {
    return false;
  }
}

export const $createAiBlockHeaderNode = () => {
  return new AiBlockHeader();
};

export const $isAiBlockHeaderNode = (node) => {
  return node instanceof AiBlockHeader;
};

export const INSERT_AIBLOCKHEADER_COMMAND = createCommand(
  "insertAiBlockHeader"
);

export const AiBlockHeaderPlugin = () => {
  const [editor] = useLexicalComposerContext();
  if (!editor.hasNodes([AiBlockHeader])) {
    throw new Error("error");
  }
  editor.registerCommand(
    INSERT_AIBLOCKHEADER_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, $createAiBlockHeaderNode);
      }
      return true;
    },
    COMMAND_PRIORITY_LOW
  );
  return null;
};
