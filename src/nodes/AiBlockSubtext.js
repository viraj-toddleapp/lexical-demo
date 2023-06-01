import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  ElementNode,
  createCommand,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";

export class AiBlockSubtext extends ElementNode {
  static getType() {
    return "aiBlockSubtext";
  }

  static clone(node) {
    return new AiBlockSubtext(node.__key);
  }

  createDOM(config) {
    const element = document.createElement("div");
    element.className = config.theme.aiBlockSubtext;
    return element;
  }

  updateDOM() {
    return false;
  }
}

export const $createAiBlockSubtextNode = () => {
  return new AiBlockSubtext();
};

export const $isAiBlockSubtextNode = (node) => {
  return node instanceof AiBlockSubtext;
};

export const INSERT_AIBLOCKSUBTEXT_COMMAND = createCommand(
  "insertAiBlockSubtext"
);

export const AiBlockSubtextPlugin = () => {
  const [editor] = useLexicalComposerContext();
  if (!editor.hasNodes([AiBlockSubtext])) {
    throw new Error("error");
  }
  editor.registerCommand(
    INSERT_AIBLOCKSUBTEXT_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, $createAiBlockSubtextNode);
      }
      return true;
    },
    COMMAND_PRIORITY_LOW
  );
  return null;
};
