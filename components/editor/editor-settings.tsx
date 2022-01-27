// This could use some refactoring.. when I have time..

import { useEditor } from "contexts/editor-context";
import s from "./editor-settings.module.css";

function EditorSettings({ ...props }) {
  const { settings, setSettings } = useEditor();

  const setReloadOnChange = (fileName: string) => {
    setSettings({
      reloadOnChange: {
        ...settings.reloadOnChange,
        [fileName]: !settings.reloadOnChange[fileName],
      },
    });
  };

  const setEditorSettings = (key: string, val: any = null) => {
    setSettings({
      ...settings,
      editorSettings: {
        ...settings.editorSettings,
        [key]: val ?? !settings.editorSettings[key],
      },
    });
  };

  return (
    <div className={s.settings} {...props}>
      {/* RELOAD_ON_CHANGE_START */}

      <h3>Reload On Change:</h3>

      <div>
        <label htmlFor="reloadJsOnChange">
          <input
            type="checkbox"
            id="reloadJsOnChange"
            checked={settings.reloadOnChange["javascript"]}
            onChange={() => setReloadOnChange("javascript")}
          />
          JavaScript
        </label>
      </div>

      <div>
        <label htmlFor="reloadCssOnChange">
          <input
            type="checkbox"
            id="reloadCssOnChange"
            checked={settings.reloadOnChange["css"]}
            onChange={() => setReloadOnChange("css")}
          />
          CSS
        </label>
      </div>

      <div>
        <label htmlFor="reloadHtmlOnChange">
          <input
            type="checkbox"
            id="reloadHtmlOnChange"
            checked={settings.reloadOnChange["html"]}
            onChange={() => setReloadOnChange("html")}
          />
          HTML
        </label>
      </div>
      {/* RELOAD_ON_CHANGE_END */}

      {/* EDITOR_CONFIG_START */}
      <h3>Editor config</h3>

      <div>
        <p>Theme</p>
        <label htmlFor="editorDark">
          <input
            type="radio"
            id="editorDark"
            checked={settings.theme === "vs-dark"}
            onChange={() => setSettings({ theme: "vs-dark" })}
            style={{ marginRight: "5px" }}
          />
          Dark
        </label>

        <label htmlFor="editorLight">
          <input
            type="radio"
            id="editorLight"
            checked={settings.theme === "vs-light"}
            onChange={() => setSettings({ theme: "vs-light" })}
            style={{ marginLeft: "10px", marginRight: "5px" }}
          />
          Light
        </label>
      </div>

      <div>
        <label htmlFor="editorMinimap">
          <input
            type="checkbox"
            id="editorMinimap"
            checked={settings.editorSettings.minimap.enabled}
            onChange={() =>
              setEditorSettings("minimap", { enabled: !settings.editorSettings.minimap.enabled })
            }
          />
          Minimap
        </label>
      </div>

      <div>
        <label htmlFor="editorWordWrap">
          <input
            type="checkbox"
            id="editorWordWrap"
            checked={settings.editorSettings.wordWrap === "on"}
            onChange={() =>
              setEditorSettings(
                "wordWrap",
                settings.editorSettings.wordWrap === "off" ? "on" : "off"
              )
            }
          />
          Word Wrap
        </label>
      </div>

      <div>
        <label htmlFor="editorFormatOnType">
          <input
            type="checkbox"
            id="editorFormatOnType"
            checked={settings.editorSettings.formatOnType}
            onChange={() => setEditorSettings("formatOnType")}
          />
          Format on type
        </label>
      </div>

      <div>
        <label htmlFor="editorFormatOnPaste">
          <input
            type="checkbox"
            id="editorFormatOnPaste"
            checked={settings.editorSettings.formatOnPaste}
            onChange={() => setEditorSettings("formatOnPaste")}
          />
          Format on paste
        </label>
      </div>
    </div>
  );
}

export default EditorSettings;
