type Action =
  | { type: "SET_FILE"; payload: string }
  | { type: "SET_FILES_CONTENT"; payload: string | IFilesContent }
  | { type: "SET_SETTINGS"; payload: KeysOfModel<ISettings> }
  | { type: "" };

type Dispatch = (action: Action) => void;
interface State {
  settings: ISettings;
  file: string;
  filesContent: IFilesContent;
}
interface EditorProviderProps {
  children: React.ReactNode;
}

interface IFilesContent {
  html: string;
  css: string;
  javascript: string;
}

interface ISettings {
  reloadOnChange: {
    html: boolean;
    css: boolean;
    javascript: boolean;
  };
  theme: "vs-dark" | "vs-light";
  editorSettings: IEditorSettings;
}

interface IEditorSettings {
  wordWrap: "on" | "off" | "wordWrapColumn" | "bounded";
  minimap: { enabled: boolean };
  formatOnPaste: boolean;
  formatOnType: boolean;
  suggestOnTriggerCharacters: boolean;
  acceptSuggestionOnEnter: "on" | "off" | "smart";
  // number of spaces in a tab
  // isn't working unless we call a forced update on the instance
  // but we'll leave it here, just for reference
  tabSize: number;
}
