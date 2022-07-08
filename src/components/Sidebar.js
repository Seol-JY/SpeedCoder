import { useEffect, useState } from "react";
import Debug from "./Debug";



export default function Sidebar(props) {

  const [filestate, setFilestate] = useState("sample1.py");
  if (props.section === "1") {
    return(
      <div className="sidebar">
        <ul>
          <li className="sidebarsection-header">EXPLORER</li>
          <li className={"sidebarsection-list"+(filestate==="sample1.py"?'active':'')} onClick={()=>{props.setFile("sample1.py"); setFilestate("sample1.py")}}>sample1.py</li>
          <li className={"sidebarsection-list"+(filestate==="sample2.js"?'active':'')} onClick={()=>{props.setFile("sample2.js"); setFilestate("sample2.js")}}>sample2.js</li>
          <li className={"sidebarsection-list"+(filestate==="sample3.js"?'active':'')} onClick={()=>{props.setFile("sample3.js"); setFilestate("sample3.js")}}>sample3.js</li>
          <li className="sidebarsection-list"></li>
          <li className="sidebarsection-list"></li>
          <li className="sidebarsection-list"></li>
          <li className="sidebarsection-list"></li>
          <li className="sidebarsection-list"></li>
          <li className="sidebarsection-list"></li>
          <li className="sidebarsection-list"></li>
          <li className="sidebarsection-list"></li>
          <li className="sidebarsection-list"></li>
          <li className="sidebarsection-list"></li>
          <li className="sidebarsection-list"></li>
          <li className="sidebarsection-list"></li>
          <li className="sidebarsection-list"></li>
          <li className="sidebarsection-list"></li>
          <li className="sidebarsection-list"></li>
          <li className="sidebarsection-list"></li>
          <li className="sidebarsection-header">DEBUG</li>
          <li><Debug filestate={filestate} fileLength={props.fileLength} setFinishTrigger={props.setFinishTrigger}/></li>
        </ul>
      </div>
    )
  } else if (props.section === "2") {
    return(
      <div className="sidebar">
        <ul>
          <li className="sidebarsection-header">RANKING</li>
          <li>
            <div className="sidebarsection-rank">
              <p>Comming Soon!</p>
            </div>
          </li>
        </ul>
      </div>
    )
  }
    
}