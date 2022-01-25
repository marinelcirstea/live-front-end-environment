// export interface IDefaultSettings {
//   reloadOnChange: {
//     [key: string]: boolean;
//   };
//   darkTheme: boolean;
//   editorSettings: {
//     wordWrap: "on" | "off" | "wordWrapColumn" | "bounded";
//     [key: string]: any;
//   };
// }

// export const defaultSettings: IDefaultSettings = {
//   reloadOnChange: {
//     javascript: false,
//     css: false,
//     html: false,
//   },
//   darkTheme: true,
//   editorSettings: {
//     wordWrap: "on",
//     minimap: { enabled: false },
//     formatOnPaste: true,
//     formatOnType: true,
//     suggestOnTriggerCharacters: true,
//     acceptSuggestionOnEnter: "on",
//     wordBasedSuggestions: true,
//     wordBasedSuggestionsOnlySameLanguage: false,
//     // number of spaces in tab
//     tabSize: 2,
//   },
// };

// const ls = "settings";

// export function setEditorSettings(settings) {
//   const newSettings = JSON.stringify(settings);
//   const current = localStorage.getItem(ls);

//   if (!current) {
//     return localStorage.setItem(ls, newSettings);
//   }

//   if (current !== newSettings) {
//     localStorage.removeItem(ls);
//     return localStorage.setItem(ls, newSettings);
//   }
// }

// export function getEditorSettings() {
//   const hasSettings = localStorage.getItem(ls);
//   if (!hasSettings) {
//     return defaultSettings;
//   }

//   return JSON.parse(hasSettings);
// }

// export function clearEditorSettings() {
//   return localStorage.removeItem(ls);
// }
