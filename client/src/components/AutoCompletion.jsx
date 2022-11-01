import React, { useEffect, useRef } from "react";

export default function AutoCompletion({ atuoWord }) {

  return  (
    <div className="auto-complete">
        <ul>
            <li>ddddd</li>
            <li>ddddd</li>
            {/* {
              filename.map((s, i) => {
                return <li key={i} className={"sidebarsection-list"+(filestate===s?'active':'')} onClick={()=>{props.setFile(s); setFilestate(s)}}><IconGenerator file={s} height={"13px"} />{s}</li>
              })
            } */}
        </ul>
    </div>
  );
}
