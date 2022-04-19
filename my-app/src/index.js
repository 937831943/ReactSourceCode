import React from 'react';
// import React from './3_virtualDOM/createElement';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
let style = { border: '3px solid red', margin: '5px' }
const ele = (
    <div id='A1' style={style}>
        A1
        <div id='B1' style={style}>
            B1
            <div id='C1' style={style}>C1</div>
            <div id='C2' style={style}>C2</div>
        </div>
        <div id='B2' style={style}>B1</div>
    </div>
)
console.log(ele);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    ele
    // <React.StrictMode>
    //     <></>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
