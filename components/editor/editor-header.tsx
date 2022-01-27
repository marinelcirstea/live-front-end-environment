import s from "./editor-header.module.css";
import { useEditor } from "contexts/editor-context";
import { useAuth } from "contexts/auth-context";

function EditorHeader({ handleDbSave }) {
  const { file, setFile } = useEditor();
  const { user, login } = useAuth();

  return (
    <div className={s.header}>
      <div className={s.pageButtons}>
        <button disabled={file === "html"} onClick={() => setFile("html")} title={"html"}>
          HTML
        </button>

        <button disabled={file === "css"} onClick={() => setFile("css")} title={"css"}>
          CSS
        </button>

        <button
          disabled={file === "javascript"}
          onClick={() => setFile("javascript")}
          title={"javascript"}
        >
          Javascript
        </button>
      </div>

      <div className={s.text}>
        <p>CTRL + S to update preview / ALT + Shift + F to format</p>
      </div>

      <div className={s.saveButtonContainer}>
        Don&lsquo;t forget to
        {user ? (
          <button className={s.saveProjectButton} title="Save to DB" onClick={handleDbSave}>
            <span>Save your project</span>
          </button>
        ) : (
          <button className={s.saveProjectButton} onClick={() => login()}>
            Login and save your work
          </button>
        )}
      </div>
    </div>
  );
}

export default EditorHeader;
