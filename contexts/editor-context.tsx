import { createContext, useContext, useState } from "react";

const EditorContext = createContext({
  html: null,
  css: null,
  javascript: null,
  setHtml: (str: string) => {},
  setCss: (str: string) => {},
  setJavascript: (str: string) => {},
});

const EditorProvider = ({ children }) => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [javascript, setJavascript] = useState("");

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
