"use strict";
//JS File for the Main Window

import stylesheet from "./index.css";
import App from "./app.js";
import DB from "./database.js";

//When DOM ready
window.addEventListener("load", ()=>{
    //start Application
    let app = new App();
    app.start();
});


