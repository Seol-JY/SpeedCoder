import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
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
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
