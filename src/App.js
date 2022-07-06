import './App.css'
import Editor from "./components/Editor"
import Sidebar from "./components/Sidebar"
import SidebarButton from "./components/SidebarButton"
import Topbar from "./components/Topbar"
import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import Draggable from "react-draggable";


function App() {
  const [section, setSection] = useState("1");
  const [file, setFile] = useState("sample1.py");
  const [fileLength, setFileLength] = useState(928);
  const [position, setPosition] = useState({ x: 0, y: 0 }); 
  const [daynight, setdaynight] = useState(1);
  const [finishTrigger, setFinishTrigger] = useState(0);
  const trackPos = (data) => {
	  setPosition({ x: data.x, y: data.y }); 
  };

  function easteregg() {
    alert("누르지마!!");
  };

  return (
    <Provider store={store}>
      <Draggable onDrag={(e, data) => trackPos(data)} >
        <div className="form no-drag">
          <h1 onClick={ ()=>{ setPosition({ x: 0, y: 0 })}}>
            Speed Coder - Insiders
          </h1>
          <ul className='circlewrapper' onClick={easteregg}>
            <li className='circle'><div></div></li>
            <li className='circle'><div></div></li>
            <li className='circle'><div></div></li>
          </ul>
          
          <SidebarButton setSection={setSection} daynight={daynight} setdaynight={setdaynight}/>
          <Sidebar section={section} file={file} setFile={setFile} fileLength={fileLength} setFinishTrigger={setFinishTrigger}/>

          <ul>
            <li><Topbar file={file}/></li>
            <li><Editor file={file} setFileLength={setFileLength} section={section} daynight={daynight} finishTrigger={finishTrigger}/></li>
          </ul>
          
        </div>
      </Draggable>
    </Provider>
  );
}

export default App;
