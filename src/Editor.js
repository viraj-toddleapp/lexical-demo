import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import "./Editor.css";
import { AutoFocusPlugin } from "./plugins/AutoFocusPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import { DateTimePlugin } from "./plugins/DateTimePlugin/index";
import { DateTimeNode } from "./nodes/DateTimeNode";
import { AiBlock, AiBlockPlugin } from "./nodes/AiBlock";
import { AiBlockHeader, AiBlockHeaderPlugin } from "./nodes/AiBlockHeader";
import { AiBlockSubtext, AiBlockSubtextPlugin } from "./nodes/AiBlockSubtext";

const theme = {
  aiBlock: "editor-aiblock",
  aiBlockHeader: "editor-aiBlockHeader",
  aiBlockSubtext: "editor-aiBlockSubtext",
  // Theme styling goes here
  // ...
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

export default function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [DateTimeNode, AiBlock, AiBlockHeader, AiBlockSubtext],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <DateTimePlugin date={new Date()} />

      <div className="editor-container">
        <div className="editor-inner">
          <PlainTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={
              <div className="editor-placeholder">Enter some text...</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <AiBlockPlugin />
          <AiBlockHeaderPlugin />
          <AiBlockSubtextPlugin />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <TreeViewPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}
