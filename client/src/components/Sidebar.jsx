import { useEffect, useState } from "react";
import Debug from "./Debug";
import LeaderBoard from "./LeaderBoard";
import IconGenerator from "./IconGenerator";
export default function Sidebar(props) {
  const [filestate, setFilestate] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("event") === "bisc" ? "ex.py" : "hello.py";
  });

  const [isEventMode, setIsEventMode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const event = params.get("event");
    setIsEventMode(event?.toLowerCase() === "bisc");
  }, []);

  const filename = [
    "hello.py",
    "ex.py",
    "print.c",
    "sha256.java",
    "test.java",
    "server.js",
    "RectangleArea.java",
    "say_hello.py",
    "Example.java",
    "Fibonacci.java",
  ];

  useEffect(() => {
    if (props.section === "1" && isEventMode) {
      setFilestate(filestate);
      props.setFile(filestate);
    }
  }, [props.section]);

  useEffect(() => {
    if (props.section === "1" && !isEventMode) {
      setFilestate(filestate);
      props.setFile(filestate);
    } else if (props.section === "2") {
      props.setFile("Statistics");
    }
  }, [props.section]);
  if (props.section === "1") {
    return (
      <div className="sidebar">
        <ul>
          <li className="sidebarsection-header">EXPLORER</li>
        </ul>
        <ul className="sidebarsection-explorer">
          {filename.map((s, i) => {
            return (
              <li
                key={i}
                className={
                  "sidebarsection-list" + (filestate === s ? "active" : "")
                }
                onClick={() => {
                  props.setFile(s);
                  setFilestate(s);
                }}
              >
                <IconGenerator file={s} height={"13px"} />
                {s}
              </li>
            );
          })}
        </ul>
        <ul>
          <li className="sidebarsection-header">DEBUG</li>
          <li>
            <Debug
              filestate={filestate}
              fileLength={props.fileLength}
              setFinishTrigger={props.setFinishTrigger}
            />
          </li>
        </ul>
      </div>
    );
  } else if (props.section === "2") {
    return (
      <div className="sidebar">
        <ul>
          <li className="sidebarsection-header">RANKING</li>
        </ul>
        <LeaderBoard daynight={props.daynight} />
      </div>
    );
  }
}
