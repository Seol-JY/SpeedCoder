import { useEffect, useState } from "react";
import Debug from "./Debug";
import LeaderBoard from "./LeaderBoard"
import IconGenerator from "./IconGenerator";

export default function Sidebar(props) {
  const [filestate, setFilestate] = useState("sample1.py");
  const filename = ["sample1.py", "hello.txt"];
  useEffect(()=> {
    if(props.section==="1") {
      setFilestate(filestate);
      props.setFile(filestate);
    }
    else if(props.section==="2") {
      props.setFile("Ranking");
    }
  }, [props.section])
  if (props.section === "1") {
    return(
      <div className="sidebar">
          <ul><li className="sidebarsection-header">EXPLORER</li></ul>
          <ul className="sidebarsection-explorer">
            {
              filename.map((s, i) => {
                return <li key={i} className={"sidebarsection-list"+(filestate===s?'active':'')} onClick={()=>{props.setFile(s); setFilestate(s)}}><IconGenerator file={s} height={"13px"} />{s}</li>
              })
            }
          </ul>
          <ul>
            <li className="sidebarsection-header">DEBUG</li>
            <li><Debug filestate={filestate} fileLength={props.fileLength} setFinishTrigger={props.setFinishTrigger}/></li>
          </ul> 
      </div>
    )
  } else if (props.section === "2") {
    return(
      <div className="sidebar">
        <ul><li className="sidebarsection-header">RANKING</li></ul>
        <LeaderBoard />
      </div>
    )
  }
}