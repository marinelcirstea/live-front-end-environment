import s from "./index.module.css";
//
import { useEffect, useState } from "react";
import { emmetHTML, emmetCSS } from "emmet-monaco-es";
import cssFormatMonaco from "css-format-monaco";
//
import { getGeneratedPageURL } from "lib/blob";
//
import Editor from "@monaco-editor/react";
import EditorHeader from "./editor-header";
import EditorSettings from "./editor-settings";
import SplitPane from "components/editor/split-pane";
import { useEditor } from "contexts/editor-context";
import EditorPageFooter from "./editor-footer";

export default function EditorComponent({ onSave }) {
  const [blobUrl, setBlobUrl] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [previewWidth, setPreviewWidth] = useState("split");
  const [reversedPositions, setReversedPositions] = useState(false);

  const { file, settings, filesContent, setFilesContent } = useEditor();

  const updatePreview = () => setBlobUrl(getGeneratedPageURL(filesContent));

  const handleEditorDidMount = () => {
    emmetHTML();
    emmetCSS();
    cssFormatMonaco();
    updatePreview();
  };

  const handleEditorChange = (value: string) => {
    setFilesContent(value);
  };

  useEffect(() => {
    if (settings.reloadOnChange[file]) updatePreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesContent]);

  useEffect(() => {
    window.onkeydown = save;

    return () => (window.onkeydown = null);
  });

  const save = (e: KeyboardEvent) => {
    if (e.key === "s" && e.ctrlKey) {
      e.preventDefault();
      updatePreview();
    }
  };

  const handleDbSave = () => onSave(filesContent);

  return (
    <div className={s.editorPage}>
      <EditorHeader handleDbSave={handleDbSave} />
      <EditorSettings style={{ display: showSettings ? "block" : "none" }} />

      <SplitPane
        style={{ height: "100%" }}
        previewWidth={previewWidth}
        reversedPositions={reversedPositions}
      >
        <Editor
          theme={settings.theme}
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          path={file}
          defaultLanguage={file}
          defaultValue={filesContent[file]}
          options={settings.editorSettings}
        />

        {/* This is all we need to preview the changes */}
        <iframe className={s.editorPreview} frameBorder="0" src={blobUrl} />
      </SplitPane>
      <EditorPageFooter
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        previewWidth={previewWidth}
        setPreviewWidth={setPreviewWidth}
        reversedPositions={reversedPositions}
        setReversedPositions={setReversedPositions}
      />
    </div>
  );
}
