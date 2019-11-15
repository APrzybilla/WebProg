"use strict";
//JS Datei für das Hauptfenster

import stylesheet from "./index.css";
import App from "./app.js";
import DB from "./database.js";

//Wenn DOM ist bereit
window.addEventListener("load", ()=>{
    //starte Anwendung
    let app = new App();
    app.start();
});


