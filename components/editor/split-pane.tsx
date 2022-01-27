import React, { useState, useEffect } from "react";
import s from "./split-pane.module.css";

export default function SplitPane({ children, previewWidth, reversedPositions, ...props }) {
  const [position, setPosition] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleResize = () => {
    setIsDragging(true);
    window.onmouseup = clearListener;
    window.onmousemove = (e: MouseEvent) => {
      setPosition(reversedPositions ? maxWidth - e.clientX : e.clientX);
    };
  };

  // cleanup
  const clearListener = () => {
    setIsDragging(false);
    window.onmousemove = null;
    window.onmouseup = null;
  };

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
      <div className={s.split}>
        <div
          className={s.splitLeft}
          style={{ width: `${position}px`, order: reversedPositions ? 2 : 0 }}
        >
          {children[0]}
        </div>
        <div className={s.resizer} onMouseDown={handleResize} style={{ order: 1 }}></div>
        <div
          className={s.splitRight}
          style={{ width: `${maxWidth - position}px`, order: reversedPositions ? 0 : 2 }}
        >
          {/* <div className={s.outputContainer}> */}
          {/*
           * This is needed if the mouse gets over the frame when dragging
           * because the mouse context will change on to the iframe
           * and the 'move' event will be lost in our context.
           *
           * To fix it, we need to drag something from our context over the iframe.
           * In this case, a span. At least we can use it to show the width.
           */}
          <span style={{ zIndex: isDragging ? 10 : -1 }}>{maxWidth - position}px</span>

          {children[1]}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
