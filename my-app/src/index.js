import React from 'react';
// import React from './3_virtualDOM/createElement';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
const ele = (
    <div id='A1'>
        <div id='B1'>
            <div id='C1'>C1</div>
            <div id='C2'>C2</div>
        </div>
        <div id='B2'></div>
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
