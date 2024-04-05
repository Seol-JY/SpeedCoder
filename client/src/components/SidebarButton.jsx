import { useState, useEffect } from "react";

export default function SidebarButton(props) {
  const [daynightico, setdaynightico] = useState("dark_mode");
  const [menustate, setmenustate] = useState("1");

  useEffect(() => {
    checker();
  }, []);

  function checker() {
    if (props.daynight === 1) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        document.documentElement.setAttribute("data-theme", "dark");
        setdaynightico("light_mode");
      }
    } else {
      if (props.daynight % 2 === 1) {
        document.documentElement.setAttribute("data-theme", "dark");
        setdaynightico("light_mode");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        setdaynightico("dark_mode");
      }
    }
  }

  function mailto() {
    window.location.href = "mailto:support@speedcoder.seol.pro";
  }

  return (
    <div className="sidebarbutton">
      <ul>
        <li
          className={"iconwrapper" + (menustate === "1" ? "active" : "")}
          onClick={() => {
            setmenustate("1");
            props.setSection("1");
          }}
        >
          <span className="material-icons">folder_copy</span>
        </li>
        <li
          className={"iconwrapper" + (menustate === "2" ? "active" : "")}
          onClick={() => {
            setmenustate("2");
            props.setSection("2");
          }}
        >
          <span className="material-icons">scoreboard</span>
        </li>
        <li
          className="iconwrapper"
          id="onlymargin"
          onClick={() => {
            props.setdaynight(props.daynight + 1);
            checker();
          }}
        >
          {daynightico}
          <span className="material-icons"></span>
        </li>
        <li className="iconwrapper" onClick={mailto}>
          <span className="material-icons">email</span>
        </li>
      </ul>
    </div>
  );
}
