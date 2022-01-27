import s from "./editor-footer.module.css";
import { FaDesktop, FaExchangeAlt, FaMobileAlt, FaTabletAlt } from "react-icons/fa";
import { BsArrowsFullscreen, BsLayoutSplit } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";

interface EditorPageFooterProps {
  showSettings: boolean;
  setShowSettings: (showSettings: boolean) => void;
  previewWidth: string;
  setPreviewWidth: (previewWidth: string) => void;
  reversedPositions: boolean;
  setReversedPositions: (reversedPositions: boolean) => void;
}

const editorHeaderButtons = {
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

const EditorPageFooter: React.FunctionComponent<EditorPageFooterProps> = ({
  showSettings,
  setShowSettings,
  previewWidth,
  setPreviewWidth,
  reversedPositions,
  setReversedPositions,
}) => {
  return (
    <footer className={s.footer}>
      <div className="container">
        <Link href="/">
          <a>&lt;- Go Home</a>
        </Link>
      </div>
      <div className={s.rightButtons}>
        {/* REVERSED_POSITIONS */}
        <button
          className={s.previewSettingsButton}
          onClick={() => setReversedPositions(!reversedPositions)}
          title="Reverse positions"
        >
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
            className={s.previewSettingsButton}
          >
            {button.icon}
          </button>
        ))}
        {/* PREVIEW_WIDTH_END */}

        <button
          className={s.previewSettingsButton}
          onClick={() => setShowSettings(!showSettings)}
          title="Toggle settings"
        >
          <FiSettings />
        </button>
      </div>
    </footer>
  );
};

export default EditorPageFooter;
