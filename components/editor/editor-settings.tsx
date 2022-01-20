import s from "./editor-settings.module.css";

function EditorSettings({ settings, setSettings, ...props }) {
  const setReloadOnChange = (fileName) => {
    setSettings({
      ...settings,
      reloadOnChange: {
        ...settings.reloadOnChange,
        [fileName]: !settings.reloadOnChange[fileName],
      },
    });
  };

  const setEditorSettings = (key, val = null) => {
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
        <label htmlFor="editorTheme">
          <input
            type="checkbox"
            id="editorTheme"
            checked={settings.darkTheme}
            onChange={() => setSettings({ ...settings, darkTheme: !settings.darkTheme })}
          />
          Dark Theme
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
