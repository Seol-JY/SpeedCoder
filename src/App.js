import './App.css'
import Editor from "./components/Editor"
import Sidebar from "./components/Sidebar"
import SidebarButton from "./components/SidebarButton"
import Topbar from "./components/Topbar"
import { useState } from 'react'


function App() {
  const [section, setSection] = useState("1");
  const [file, setFile] = useState("sample1.py");
  const [cpm, setCpm] =useState("0000");
  const [wrongchr,setWrongchr] = useState("000");


  function easteregg() {
    alert("누르지마!!");
  }

  return (
    <div className="form no-drag">
      <h1>
        Speed Coder - Insiders
      </h1>
      <ul className='circlewrapper' onClick={easteregg}>
        <li className='circle'><div></div></li>
        <li className='circle'><div></div></li>
        <li className='circle'><div></div></li>
      </ul>
      
      <SidebarButton setSection={setSection}/>
      <Sidebar section={section} file={file} setFile={setFile} cpm={cpm} wrongchr={wrongchr}/>

      <ul>
        <li><Topbar file={file}/></li>
        <li><Editor setCpm={setCpm} setWrongchr={setWrongchr}/></li>
      </ul>
      
    </div>
  );
}

export default App;
