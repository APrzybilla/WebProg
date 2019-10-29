import stylesheet from "./SUebersicht.css";
import DB from "./database.js";
import App from "./app.js";

let _app="";
let _db = "";

class StartPage{
    constructor(app){
        this._app = _app;
        _app = this._app;
        _db = app._db;

    }

    onShow(){
        let section = document.querySelector("#section_SUebersicht").cloneNode(true);

        return {
            className: "section_SUebersicht",
            main: section.querySelectorAll("section > *"),
        };
    };

    onLoad(){
        //EventListener von Suchen-Button
        document.getElementById("button_filter").addEventListener("click", suchen());
        window.addEventListener("load", anzeigen());
        
    }

    onLeave(goon){
        return true;
    }
}

function suchen() {

}

function einfügen (){
    //Einfügen des Studenten//
    //Einfügen von neuer Zeile an erster Stelle in der Tabelle //
    let neueTr = document.getElementById("Tabellenhead").insertRow(1);

    //erzeugen der Tabellenspalten//
    let tdName = document.createElement("td");
    let tdHS = document.createElement("td");
    let tdS = document.createElement("td");
    let tdJG = document.createElement("td");

    //befüllen der Spalten//
    tdName.innerHTML = "Platzhalter";
    tdHS.innerHTML = "Platzhalter";
    tdS.innerHTML = "pLatzhalter";
    tdJG.innerHTML  = "Platzhalter";

    //hinzufügen der Spalten//
    neueTr.appendChild(tdName);
    neueTr.appendChild(tdHS);
    neueTr.appendChild(tdS);
    neueTr.appendChild(tdJG);


    //Einfügen der Kalenderwochen//
    //Einfügen von neuer Zeile an erster Stelle in der Tabelle//
    neueTr = document.getElementById("Tabellenbody").insertRow(1);
        
    for(let i = 1; i<53; i++){
        //erzeugen der Tabellenspalten// 
        let tdKW = document.createElement("td");

        tdKW.innerHTML = " ";

        //Hinzufügen von Klasse "KWs"//
        tdKW.classList.add("KWs");

        //hinzufügen der Spalten //
        neueTr.appendChild(tdKW);
    }
}

function anzeigen(){
    console.log("anzeigen");
    let students = _db.selectAllStudents().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc){
            console.log(doc.id, "=>", doc.data().Name);
        });
    });
}

export default StartPage;