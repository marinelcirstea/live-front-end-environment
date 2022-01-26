import React, { useState, useEffect } from "react";
import { updateTooltip } from "../../lib/tooltip";
import s from "./split-pane.module.css";

export default function SplitPane({ children, previewWidth, reversedPositions, ...props }) {
  const [position, setPosition] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(parseInt(e.currentTarget.value));
  };

  useEffect(() => {
    updateTooltip(`${maxWidth - position}px`);
  }, [position]);

  useEffect(() => {
    const width =
      previewWidth === "split"
        ? window.innerWidth / 2
        : previewWidth === "mobile"
        ? window.innerWidth - 400
        : previewWidth === "tablet"
        ? window.innerWidth - 680
        : previewWidth === "desktop"
        ? window.innerWidth - 1024
        : 0;

    if (width < 0) setPosition(0);
    setPosition(width);
  }, [previewWidth]);

  useEffect(() => {
    window.onresize = () => setMaxWidth(window.innerWidth);
    // set values when window becomes available
    setMaxWidth(window.innerWidth);
    setPosition(window.innerWidth / 2);
  }, []);

  return (
    <div {...props} className={s.splitContainer}>
      <div>
        <input
          type="range"
          min={0}
          max={maxWidth}
          value={position}
          className={s.splitSlider}
          onChange={handleChange}
          onMouseOver={() => updateTooltip(`${maxWidth - position} px`)}
          style={{ transform: reversedPositions ? `rotate(180deg)` : "initial" }}
        />
      </div>
      <div className={s.split}>
        <div
          className={s.splitLeft}
          style={{ width: `${position}px`, order: reversedPositions ? 1 : 0 }}
        >
          {children[0]}
        </div>
        <div className={s.splitRight} style={{ width: `${maxWidth - position}px` }}>
          {children[1]}
        </div>
      </div>
    </div>
  );
}
