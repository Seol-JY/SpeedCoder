import React, { useEffect, useState, useRef } from "react";

export default function AutoCompletion({ autoWord }) {
  const [comp, setComp] = useState([]);
  const pyKeword  = [
    "def",
    "list",
    "for",
    "while",
    "True",
    "False",
    "return",
  ];
arguments
  useEffect(() => {
    setComp(pyKeword.filter((option) => {
        return option.includes(autoWord.join(''));
    }))
  }, [autoWord])
  
  return  (
    comp.length !== 0 ? <div className="auto-complete">
        <ul>
            {
              comp.map((s, i) => {
                return <li key={i} className={"auto-complete-list"+(i==0?'active':'')} onClick={()=>{}}>{s}</li>
              })
            }
        </ul>
    </div> : ""
  );
}