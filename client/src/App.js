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
  const [buttonClicked, setButtonClicked] = useState(false);
  const [scale, setScale] = useState(
    Math.min(window.innerWidth / 1400, window.innerHeight / 900)
  );
  const [counterValue, setCounterValue] = useState(0);

  useEffect(() => {
    fetchCounterValue();
    egg();
  }, []);

  const fetchCounterValue = async () => {
    try {
      const response = await fetch("/counter");
      if (!response.ok) {
        throw new Error("Failed to fetch counter value");
      }
      const data = await response.json();
      setCounterValue(data.value);
    } catch (error) {
      console.error("Failed to fetch counter value:", error);
    }
  };
  const increaseCounter = async () => {
    try {
      const response = await fetch(`/counter?amount=${1}`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to increase counter value");
      }
      setCounterValue((prevValue) => prevValue + 1);
      setButtonClicked(true);
    } catch (error) {
      console.error("Failed to increase counter value:", error);
    }
  };

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
    alert("Remove the window");
  }

  return (
    <Provider store={store}>
      <div
        style={{
          margin: "0",
          fontSize: "20px",
          position: "absolute",
          left: "calc(100vw/2 - 150px)",
          top: "calc(100vh/2 - 100px)",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "100px",
          width: "300px",
          backgroundColor: "var(--topbar-background-color)",
          borderRadius: "10px",
          transition: "background-color 0.3s",
          flexDirection: "column",
        }}
      >
        <h1 style={{ position: "static" }}>
          Number of clicks: {counterValue.toLocaleString("ko-KR")}
        </h1>
        {buttonClicked || (
          <button
            onClick={() => {
              increaseCounter();
              setButtonClicked(true);
            }}
            className="sidebarsection-list"
            style={{
              width: "120px",
              height: "40px",
              border: "0.8px solid darkgray",
              borderRadius: "10px",
            }}
          >
            Can you press it?
          </button>
        )}
      </div>
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
