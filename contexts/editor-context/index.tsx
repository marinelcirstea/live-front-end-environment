import { createContext, useContext, useEffect, useReducer } from "react";
import { KeysOfModel } from "types";
import { initialState } from "./initial-state";
import { Action, Dispatch, EditorProviderProps, IFilesContent, ISettings, State } from "./types";

const EditorStateContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined
);

function editorReducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case "SET_FILE": {
      return { ...state, file: action.payload };
    }

    case "SET_FILES_CONTENT": {
      if (typeof action.payload === "string") {
        return { ...state, filesContent: { ...state.filesContent, [state.file]: action.payload } };
      } else {
        return { ...state, filesContent: action.payload };
      }
    }

    case "SET_SETTINGS": {
      return { ...state, settings: { ...state.settings, ...action.payload } };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function EditorProvider({ children }: EditorProviderProps) {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  useEffect(() => {
    const fromLocalOrInitialState = getEditorSettings();
    dispatch({ type: "SET_SETTINGS", payload: fromLocalOrInitialState });
  }, []);

  const value = { state, dispatch };
  return <EditorStateContext.Provider value={value}>{children}</EditorStateContext.Provider>;
}

function useEditor() {
  const context = useContext(EditorStateContext);
  if (context === undefined) {
    throw new Error("useEditor must be used within a EditorProvider");
  }
  const { state, dispatch } = context;

  /**
   * If a string is provided, the state will update the content of that file.
   *
   * If an object is provided, the state will update the content of all files.
   *
   * @param content string | object: { html: string, css: string, javascript:string }
   */
  const setFilesContent = (content: string | IFilesContent) => {
    dispatch({ type: "SET_FILES_CONTENT", payload: content });
  };

  const setFile = (file: string) => {
    dispatch({ type: "SET_FILE", payload: file });
  };

  const setSettings = (setting: KeysOfModel<ISettings>) => {
    dispatch({ type: "SET_SETTINGS", payload: setting });

    // the state is updated, update localStorage
    setEditorSettings({ ...state.settings, ...setting });
  };

  const clearSettings = () => {
    dispatch({ type: "SET_SETTINGS", payload: initialState.settings });
    clearEditorSettings();
  };

  return { ...state, setFile, setFilesContent, setSettings, clearSettings };
}

const ls = "settings";

async function setEditorSettings(settings: ISettings) {
  const newSettings = JSON.stringify(settings);
  const current = localStorage.getItem(ls);

  if (!current) {
    return localStorage.setItem(ls, newSettings);
  }

  if (current !== newSettings) {
    localStorage.removeItem(ls);
    localStorage.setItem(ls, newSettings);
  }
}

export function getEditorSettings() {
  const hasSettings = localStorage.getItem(ls);
  if (!hasSettings) {
    return initialState.settings;
  }

  return JSON.parse(hasSettings);
}

export function clearEditorSettings() {
  return localStorage.removeItem(ls);
}

export { EditorProvider, useEditor };
