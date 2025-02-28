import "./App.css";
import Editor from "./components/Editor";
import ScreenSizeWarning from "./components/ScreenSizeWarning";
import Sidebar from "./components/Sidebar";
import SidebarButton from "./components/SidebarButton";
import Topbar from "./components/Topbar";
import Popup from "./components/Popup";
import egg from "./utils/egg";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Draggable from "react-draggable";
import ConditionalBanner from "./components/ConditionalBanner";

function App() {
  const [section, setSection] = useState("1");
  const [file, setFile] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("event") === "bisc" ? "ex.py" : "hello.py";
  });
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
    // fetchCounterValue();
    egg();
  }, []);

  // const fetchCounterValue = async () => {
  //   try {
  //     const response = await fetch("/counter");
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch counter value");
  //     }
  //     const data = await response.json();
  //     setCounterValue(data.value);
  //   } catch (error) {
  //     console.error("Failed to fetch counter value:", error);
  //   }
  // };
  // const increaseCounter = async () => {
  //   try {
  //     const response = await fetch(`/counter?amount=${1}`, {
  //       method: "POST",
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to increase counter value");
  //     }
  //     setCounterValue((prevValue) => prevValue + 1);
  //     setButtonClicked(true);
  //   } catch (error) {
  //     console.error("Failed to increase counter value:", error);
  //   }
  // };

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
    alert("ㅎㅇ");
  }

  return (
    <Provider store={store}>
      <ScreenSizeWarning />

      <div
        style={{
          margin: "0 10px 0 0",
          position: "absolute",
          right: "0",
          top: "calc(100vh/2 - 250px)",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      ></div>
      <ConditionalBanner />
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
            <img
              style={{
                position: "absolute",
                right: "10px",
                top: "770px",
                left: "1148px",
                width: "6%",
              }}
              src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fspeedcoder.seol.pro&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&edge_flat=false"
            />

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
