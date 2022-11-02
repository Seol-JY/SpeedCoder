import React, { useEffect, useState, useRef } from "react";

export default function AutoCompletion({ autoEnter, setAutoEnter, useAutoComplete, setUseAutoComplete, keyEvent, setKeyEvent, autoWord, userInput, setUserInput }) {
  const [comp, setComp] = useState([]);
  const [autoIndex, setAutoIndex] = useState(0);
  const pyKeword  = [
    "def",
    "list",
    "for",
    "while",
    "True",
    "False",
    "return",
    "t",
    "te",
    "tes",
    "ttty",
    "yyyy",
    "solution",
    "public",
    "class",
    "System.out.println()",
    "static",
    "void",
  ];

  useEffect(() => {
    switch (keyEvent) {
      case "ArrowUp":
        if (autoIndex==0) {
          setAutoIndex(comp.length-1);
        } else {
          setAutoIndex(autoIndex-1);
        }
        setKeyEvent("")
        break;
      case "ArrowDown":
        if (autoIndex==comp.length-1 ) {
          setAutoIndex(0);
        } else {
          setAutoIndex(autoIndex+1);
        }
        setKeyEvent("")
      case "":
        setKeyEvent("")
    }
  }, [keyEvent])

  useEffect(() => {
    if (autoWord.length!==0) {
      setComp(pyKeword.filter((option) => {
        return option.includes(autoWord.join(''));
      }))
    } else {
      setComp([]);
    }
  }, [autoWord])

  useEffect(() => {
    if (comp.length === 0) {
      setUseAutoComplete(false);
    } else {
      setUseAutoComplete(true);
    }
    setAutoIndex(0);
  }, [comp])

  useEffect(()=>{
    if (autoEnter) {
      console.log("Enter");
      console.log(userInput);
      setUserInput(userInput.slice(0, -1*autoWord.length)+comp[autoIndex]);
      setAutoEnter(false);
    }
  }, [autoEnter])

  return  (
    useAutoComplete && comp.length!=0 &&autoWord.length!==0 ? <div className="auto-complete">
        <ul>
            {
              comp.map((s, i) => {
                return <li key={i} className={"auto-complete-list"+(i==autoIndex?'active':'')} onClick={()=>{}}>{s}</li>
              })
            }
        </ul>
    </div> : ""
  );
}
