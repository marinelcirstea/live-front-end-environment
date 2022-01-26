import { ISettings, State } from "./types";

const editorDefaultFileValues = {
  javascript: `console.log('Hello, world!');`,
  css: `@import url("https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css");
  *::before,
  *::after,
  * {
      box-sizing: border-box;
      margin: 0 !important;
      padding: 0;
  }
  
  .my-class {
      background-color: red;
  }`,
  html: '<h1 class="my-class">Hello, World!</h1>',
};

const defaultSettings: ISettings = {
  reloadOnChange: {
    javascript: false,
    css: false,
    html: false,
  },
  theme: "vs-dark",
  editorSettings: {
    wordWrap: "on",
    minimap: { enabled: false },
    formatOnPaste: true,
    formatOnType: true,
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: "on",
    // number of spaces in a tab
    // isn't working unless we call a forced update on the instance
    // but we'll leave it here, just for reference
    tabSize: 2,
  },
};

export const initialState: State = {
  settings: defaultSettings,
  file: "html",
  filesContent: editorDefaultFileValues,
};
