import s from "./index.module.css";
//
import { useEffect, useState } from "react";
import { emmetHTML, emmetCSS } from "emmet-monaco-es";
import cssFormatMonaco from "css-format-monaco";
//
import { defaultSettings, getEditorSettings, setEditorSettings } from "lib/editor/settings";
import { getGeneratedPageURL } from "lib/blob";
//
import Editor, { useMonaco } from "@monaco-editor/react";
import EditorButtons from "./editor-buttons";
import EditorSettings from "./editor-settings";
import SplitPane from "components/editor/split-pane";

export default function EditorComponent({ data, onSave }) {
  const [file, setFile] = useState("html");
  const [blobUrl, setBlobUrl] = useState("");
  const [fileContent, setFileContent] = useState(data);
  const [settings, setSettings] = useState({ ...defaultSettings });
  const [showSettings, setShowSettings] = useState(false);
  const [previewWidth, setPreviewWidth] = useState("split");
  const [reversedPositions, setReversedPositions] = useState(false);
  const monaco = useMonaco();
  const handleEditorDidMount = () => {
    emmetHTML();
    emmetCSS();
    cssFormatMonaco();
    monaco.editor.getModels().forEach((model) => {
      model.updateOptions({ tabSize: 2 });
    });
  };

  const updatePreview = () => setBlobUrl(getGeneratedPageURL(fileContent));

  const handleEditorChange = (value: string) => {
    setFileContent({ ...fileContent, [file]: value });
  };

  useEffect(() => {
    // set the url for the first time
    updatePreview();

    // replace the default settings with the saved ones
    // if they exist
    setSettings({ ...getEditorSettings() });
  }, []);

  useEffect(() => setEditorSettings(settings), [settings]);

  useEffect(() => {
    if (settings.reloadOnChange[file]) updatePreview();

    window.onkeydown = save;
    return () => {
      window.onkeydown = null;
    };
  }, [fileContent]);

  const save = (e: KeyboardEvent) => {
    if (e.key === "s" && e.ctrlKey) {
      e.preventDefault();
      updatePreview();
    }
  };

  const handleDbSave = (e: MouseEvent) => {
    e.preventDefault();
    onSave(fileContent);
  };

  return (
    <div className={s.editorPage}>
      <EditorButtons
        file={file}
        setFile={setFile}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        previewWidth={previewWidth}
        setPreviewWidth={setPreviewWidth}
        reversedPositions={reversedPositions}
        setReversedPositions={setReversedPositions}
        handleDbSave={handleDbSave}
      />
      <EditorSettings
        settings={settings}
        setSettings={setSettings}
        style={{ display: showSettings ? "block" : "none" }}
      />

      <SplitPane
        style={{ height: "100%" }}
        previewWidth={previewWidth}
        reversedPositions={reversedPositions}
      >
        <Editor
          theme={settings.darkTheme ? "vs-dark" : "vs-light"}
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          path={file}
          defaultLanguage={file}
          defaultValue={fileContent[file]}
          options={settings.editorSettings}
        />

        <iframe className={s.editorPreview} frameBorder="0" src={blobUrl} />
      </SplitPane>
    </div>
  );
}
