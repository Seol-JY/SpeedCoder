import './App.css'
import Editor from "./components/Editor"
import Sidebar from "./components/Sidebar"
import SidebarButton from "./components/SidebarButton"
import Topbar from "./components/Topbar"
import { useState } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  const [section, setSection] = useState("1");
  const [file, setFile] = useState("sample1.py");


  function easteregg() {
    alert("누르지마!!");
  }

  return (
    <Provider store={store}>
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
      <Sidebar section={section} file={file} setFile={setFile}/>

      <ul>
        <li><Topbar file={file}/></li>
        <li><Editor/></li>
      </ul>
      
    </div>
    </Provider>
  );
}

export default App;
