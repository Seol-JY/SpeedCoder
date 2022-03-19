import './App.css';
import Editor from "./components/Editor"
import Sidebar from "./components/Sidebar"
import SidebarButton from "./components/SidebarButton"
import Topbar from "./components/Topbar"



function App() {

  function easteregg() {
    alert("장식인데요");
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
      
      <SidebarButton />
      
      <Sidebar />
      <ul>
        <li><Topbar /></li>
        <li><Editor /></li>
      </ul>
      
    </div>
  );
}

export default App;
