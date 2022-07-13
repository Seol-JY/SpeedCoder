import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import localStore from './utils/localStore';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <div className='mainWrapper'>
      <pre style={{margin:"0", fontSize: "20px", position: "absolute", left: "calc(100vw/2 - 360px)", top: "calc(100vh/2 - 230px)"}}>{`
  _______                          __   ______            __
 |     __|.-----..-----..-----..--|  | |      |.-----..--|  |.-----..----.
 |__     ||  _  ||  -__||  -__||  _  | |   ---||  _  ||  _  ||  -__||   _|
 |_______||   __||_____||_____||_____| |______||_____||_____||_____||__|
          |__|

             _______  __                   __ 
             |_     _||  |--..---.-..-----.|  |--..-----.
               |   |  |     ||  _  ||     ||    < |__ --|
               |___|  |__|__||___._||__|__||__|__||_____|
      `}</pre>

    <button onClick={localStore.insertDummy}style={{margin:"0", fontSize: "20px", position: "absolute", left: "calc(100vw/2)", top: "calc(100vh/2)"}}>makeDummy!</button>
      <App />
    </div>
);
