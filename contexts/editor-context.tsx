import { createContext, useContext, useState, useEffect } from "react";

const EditorContext = createContext({
  html: null,
  css: null,
  javascript: null,
  setHtml: () => {},
  setCss: () => {},
  setJavascript: () => {},
});

const EditorProvider = ({ children }) => {
  const [html, setHtml] = useState(null);
  const [css, setCss] = useState(null);
  const [javascript, setJavascript] = useState(null);

  // useEffect(() => {

  // }, [html, css, javascript]);

  return (
    <EditorContext.Provider
      value={{
        html,
        css,
        javascript,
        setHtml,
        setCss,
        setJavascript,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

const useEditor = () => useContext(EditorContext);

export { EditorProvider, useEditor };
