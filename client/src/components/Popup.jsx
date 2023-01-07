import React, { useEffect, useRef } from "react";
import PopupInner from "./PopupInner";

export default function Popup({ file, finishTrigger, setFinishTrigger }) {
  const tempInput = useRef();

  useEffect(() => {
    tempInput.current.focus();
  }, []);

  return (
    <div className="popup fade-in">
      <input type="text" className="textbox" ref={tempInput}></input>
      <PopupInner
        file={file}
        finishTrigger={finishTrigger}
        setFinishTrigger={setFinishTrigger}
      />
    </div>
  );
}
