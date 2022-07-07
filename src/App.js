import './App.css'
import Editor from "./components/Editor"
import Sidebar from "./components/Sidebar"
import SidebarButton from "./components/SidebarButton"
import Topbar from "./components/Topbar"
import Popup from "./components/Popup"
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
  const [finishTrigger, setFinishTrigger] = useState(-1);

  useEffect(()=>{
    console.log(`
%c███████╗██████╗ ███████╗███████╗██████╗ 
%c██╔════╝██╔══██╗██╔════╝██╔════╝██╔══██╗
%c███████╗██████╔╝█████╗  █████╗  ██║  ██║
%c╚════██║██╔═══╝ ██╔══╝  ██╔══╝  ██║  ██║
%c███████║██║     ███████╗███████╗██████╔╝
%c╚══════╝╚═╝     ╚══════╝╚══════╝╚═════╝ 
%c ██████╗ ██████╗ ██████╗ ███████╗██████╗ 
%c██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔══██╗
%c██║     ██║   ██║██║  ██║█████╗  ██████╔╝
%c██║     ██║   ██║██║  ██║██╔══╝  ██╔══██╗
%c╚██████╗╚██████╔╝██████╔╝███████╗██║  ██║
%c ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
https://github.com/Seol-JY
`, "color:#22577A", "color:#38A3A5", "color:#57CC99", "color:#80ED99", "color:#99FFED", "color:#FFFFFF", "color:#22577A", "color:#38A3A5", "color:#57CC99", "color:#80ED99", "color:#99FFED", "color:#FFFFFF")
},[])

  const trackPos = (data) => {
	  setPosition({ x: data.x, y: data.y }); 
  };

  function easteregg() {
    alert("누르지마!!");
  };

  return (
    <Provider store={store}>
      <Draggable onDrag={(e, data) => trackPos(data) } >
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
      <Popup finishTrigger={finishTrigger} setFinishTrigger={setFinishTrigger}/>
    </Provider>
  );
}

export default App;
