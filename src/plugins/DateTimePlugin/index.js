import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $insertNodes,
  TextNode,
  $getSelection,
  $getRoot,
  $createTextNode,
} from "lexical";
import { DateTimeNode } from "../../nodes/DateTimeNode";
import "./index.css";
import {
  $createAiBlockNode,
  INSERT_AIBLOCK_COMMAND,
} from "../../nodes/AiBlock";
import { $createAiBlockHeaderNode } from "../../nodes/AiBlockHeader";
import { $createAiBlockSubtextNode } from "../../nodes/AiBlockSubtext";

function DateTimeComponent({
  date,
  onCalendarIconClick,
  onAiBlockButtonClick,
}) {
  return (
    <div className="date-time-plugin">
      <button
        className="ui button"
        type="button"
        aria-label="insert date and time"
        title="insert date and time"
        onClick={onCalendarIconClick}
      >
        <i className="icon calendar" />
      </button>
      {date?.toLocaleString()}

      <button
        className="ui button"
        type="button"
        onClick={onAiBlockButtonClick}
      >
        Ai block
      </button>
    </div>
  );
}

function useDateTimeComponent(editor, date) {
  const onCalendarIconClick = () => {
    editor.update(() => {
      const node = new DateTimeNode(date.toLocaleString());
      const nodes = [node, new TextNode(" ")];

      const selection = $getSelection();
      if (selection?.getTextContent()) {
        console.log("Text Selected", selection.getTextContent());
        selection.insertNodes(nodes);
      } else {
        $insertNodes(nodes);
      }
    });
  };

  const onAiBlockButtonClick = () => {
    // editor.dispatchCommand(INSERT_AIBLOCK_COMMAND, "undefined");
    editor.update(() => {
      const root = $getRoot();
      root.append(
        $createAiBlockNode().append(
          $createAiBlockHeaderNode().append($createTextNode("This is header")),
          $createAiBlockSubtextNode().append($createTextNode("This is subtext"))
        )
      );
    });
  };

  return (
    <DateTimeComponent
      onCalendarIconClick={onCalendarIconClick}
      onAiBlockButtonClick={onAiBlockButtonClick}
      date={date}
    />
  );
}

export function DateTimePlugin({ date = new Date() }) {
  const [editor] = useLexicalComposerContext();
  return useDateTimeComponent(editor, date);
}
