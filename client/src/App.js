import "./App.css";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import SidebarButton from "./components/SidebarButton";
import Topbar from "./components/Topbar";
import Popup from "./components/Popup";
import egg from "./utils/egg";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Draggable from "react-draggable";

function App() {
  const [section, setSection] = useState("1");
  const [file, setFile] = useState("hello.py");
  const [fileLength, setFileLength] = useState(928);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [daynight, setdaynight] = useState(1);
  const [finishTrigger, setFinishTrigger] = useState(-1);
  const [scale, setScale] = useState(
    Math.min(window.innerWidth / 1400, window.innerHeight / 900)
  );

  useEffect(() => {
    egg();
  }, []);

  const handleResize = () => {
    setScale(Math.min(window.innerWidth / 1400, window.innerHeight / 900));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  function easteregg() {
    alert("안녕하세요!");
  }

  return (
    <Provider store={store}>
      <div className="scale-wrapper" style={{ transform: `scale(${scale})` }}>
        <Draggable onDrag={(e, data) => trackPos(data)}>
          <div className="form no-drag">
            <h1
              onClick={() => {
                setPosition({ x: 0, y: 0 });
              }}
            >
              Speed Coder - Insiders
            </h1>

            <ul className="circlewrapper" onClick={easteregg}>
              <li className="circle">
                <div></div>
              </li>
              <li className="circle">
                <div></div>
              </li>
              <li className="circle">
                <div></div>
              </li>
            </ul>

            <SidebarButton
              setSection={setSection}
              daynight={daynight}
              setdaynight={setdaynight}
            />
            <Sidebar
              section={section}
              file={file}
              setFile={setFile}
              fileLength={fileLength}
              setFinishTrigger={setFinishTrigger}
              daynight={daynight}
            />

            <ul>
              <li>
                <Topbar file={file} />
              </li>
              <li>
                <Editor
                  file={file}
                  fileLength={fileLength}
                  setFileLength={setFileLength}
                  section={section}
                  daynight={daynight}
                  finishTrigger={finishTrigger}
                />
              </li>
            </ul>
          </div>
        </Draggable>
      </div>
      {finishTrigger !== -1 ? (
        <Popup
          file={file}
          finishTrigger={finishTrigger}
          setFinishTrigger={setFinishTrigger}
        />
      ) : (
        ""
      )}
    </Provider>
  );
}

export default App;
