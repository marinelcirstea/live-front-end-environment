import s from "./editor-buttons.module.css";
import Link from "next/link";
import {
  FaCss3Alt,
  FaDesktop,
  FaExchangeAlt,
  FaHtml5,
  FaMobileAlt,
  FaTabletAlt,
} from "react-icons/fa";
import { BsArrowsFullscreen, BsLayoutSplit } from "react-icons/bs";
import { AiOutlineSave } from "react-icons/ai";
import { IoLogoJavascript } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { useEditor } from "contexts/editor-context";

const editorHeaderButtons = {
  pageButtons: [
    {
      icon: <FaHtml5 />,
      label: "HTML",
      value: "html",
    },
    {
      icon: <IoLogoJavascript />,
      label: "JavaScript",
      value: "javascript",
    },
    {
      icon: <FaCss3Alt />,
      label: "CSS",
      value: "css",
    },
  ],
  previewSettingsButtons: [
    {
      icon: <BsLayoutSplit />,
      label: "Split(equal)",
      value: "split",
    },
    {
      icon: <FaMobileAlt />,
      label: "Mobile(400px)",
      value: "mobile",
    },
    {
      icon: <FaTabletAlt />,
      label: "Tablet(680px)",
      value: "tablet",
    },
    {
      icon: <FaDesktop />,
      label: "Desktop(1024px)",
      value: "desktop",
    },
    {
      icon: <BsArrowsFullscreen />,
      label: "Fullscreen",
      value: "full",
    },
  ],
};

function EditorButtons({
  showSettings,
  setShowSettings,
  previewWidth,
  setPreviewWidth,
  reversedPositions,
  setReversedPositions,
  handleDbSave,
}) {
  const { file, setFile } = useEditor();

  return (
    <div className={s.header}>
      <div className={s.leftButtons}>
        <Link href="/">
          <a title="home">Home</a>
        </Link>
        {/* CHANGE_FILE */}
        {editorHeaderButtons.pageButtons.map((button, index) => (
          <button
            key={index}
            disabled={file === button.value}
            onClick={() => setFile(button.value)}
            title={button.label}
          >
            {button.icon}
          </button>
        ))}
        {/* CHANGE_FILE_END */}

        {/* SAVE_TO_DB */}
        <button title="Save to DB" onClick={handleDbSave}>
          <AiOutlineSave /> <span>Save project</span>
        </button>
        {/* SAVE_TO_DB_END */}
      </div>

      <div className={s.text}>
        <p>CTRL + S to update preview / ALT + Shift + F to format</p>
      </div>

      <div className={s.rightButtons}>
        {/* REVERSED_POSITIONS */}
        <button onClick={() => setReversedPositions(!reversedPositions)} title="Reverse positions">
          <FaExchangeAlt />
        </button>
        {/* REVERSED_POSITIONS_END */}

        {/* PREVIEW_WIDTH */}
        {editorHeaderButtons.previewSettingsButtons.map((button, index) => (
          <button
            key={index}
            onClick={() => setPreviewWidth(button.value)}
            disabled={previewWidth === button.value}
            title={button.label}
          >
            {button.icon}
          </button>
        ))}
        {/* PREVIEW_WIDTH_END */}

        <button onClick={() => setShowSettings(!showSettings)} title="Toggle settings">
          <FiSettings />
        </button>
      </div>
    </div>
  );
}

export default EditorButtons;
