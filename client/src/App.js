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

  const increaseCounter = async (amount) => {
    try {
      const response = await fetch(`/counter?amount=${amount}`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to increase counter value");
      }
      setCounterValue((prevValue) => prevValue + amount);
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
    alert("안녕하세요!");
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
          height: "70px",
          width: "300px",
          backgroundColor: "#f0f0f0",
          borderRadius: "10px",
        }}
      >
        <h1 style={{ position: "static" }}>Counter Value: {counterValue}</h1>
        <button onClick={() => increaseCounter(1)}>Increase by 1</button>
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
