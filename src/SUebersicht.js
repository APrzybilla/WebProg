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
        document.getElementById("button_filter").addEventListener("click", suchen);
        window.addEventListener("load", anzeigen());
        
    }

    onLeave(goon){
        return true;
    }
}

function suchen (){
    //Tabelle leeren
    //dient dazu, dass nur die gefundenen Elemente angezeigt werden
    deleteTable("Tabllenhead");
    deleteTable("Tabllenbody");

    //Auslesen der Filtertextfelder
    let Nachname = document.getElementById("filter_nachname").value.toLowerCase();
    let VN = document.getElementById("filter_vorname").value.toLowerCase();
    let Sem = document.getElementById("filter_semester").value.toLowerCase();
    let JG = document.getElementById("filter_jahrgang").value.toLowerCase();

    //Aufrufen aller Studenten
    _db.selectAllStudentsByOrder("Name", "desc").then(function (querySnapshot) {
        //jeden Studenten überprüfen
        querySnapshot.forEach(function(doc){
            //wenn einer der Filter im Studenten beinhaltet wird, wird dieser der Tabelle hinzugefügt
            
            let boolean= false;

            //Überprüfen, ob etwas in den Feldern steht
            if(Nachname!==""){
                //überprüfen, ob das, was im Feld steht, im Studenten vorhanden ist
                //zu Verbesserung der Suche werden die Strings in Kleinbuchstaben verwandelt
                if(doc.data().Name.toLowerCase().indexOf(Nachname)>=0){
                    boolean = true;
                }
            }

            if(VN!==""){
                if(doc.data().Vorname.toLowerCase().indexOf(VN)>=0){
                    boolean = true;
                }
            }

            if(Sem!==""){
                if(doc.data().Semester.toLowerCase().indexOf(Sem)>=0){
                    boolean = true;
                }
            }

            if(JG!==""){
                if(doc.data().Jahrgang.toLowerCase().indexOf(JG)>=0){
                    boolean = true;
                }
            }

            //Überprüfen der Checkboxen DHBW und THM
            if(document.getElementById("checkbox_dhbw").checked){
                if(doc.data().Hochschule.toLowerCase()=="dhbw"){
                    boolean = true;
                }
            }

            if(document.getElementById("checkbox_thm").checked){
                if(doc.data().Hochschule.toLowerCase()=="thm"){
                    boolean = true;
                }
            }

            //Wenn eine der Bedingungen zutrifft, wird der Student der Tabelle hinzugefügt
            if(boolean){
                let Name = doc.data().Name;
                let Vorname = doc.data().Vorname;
                let HS = doc.data().Hochschule;
                let Sem = doc.data().Semester;
                let Jahrgang = doc.data().Jahrgang;

                einfügen(Name, Vorname, HS, Sem, Jahrgang);
            }
        });
    });
}

//die Tabelle der übergebenen id wird bis auf die Kopfzeile geleert
function deleteTable(id){
    while(document.getElementById(id).rows.length>1){
        document.getElementById(id).deleteRow(1);
    }
}

function einfügen (Name, Vorname, HS, Sem, JG){
    //Einfügen des Studenten
    //Einfügen von neuer Zeile an erster Stelle in der Tabelle //
    let neueTr = document.getElementById("Tabellenhead").insertRow(1);

    //erzeugen der Tabellenspalten//
    let tdName = document.createElement("td");
    let tdHS = document.createElement("td");
    let tdS = document.createElement("td");
    let tdJG = document.createElement("td");

    //befüllen der Spalten//
    tdName.innerHTML = Vorname +" " + Name;
    tdHS.innerHTML = HS;
    tdS.innerHTML = Sem;
    tdJG.innerHTML  = JG;

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
    //Tabelle leeren
    //dient dazu, dass die Daten nicht doppelt drinnen stehen
    deleteTable("Tabellenhead");
    deleteTable("Tabellenbody");

    let students = _db.selectAllStudentsByOrder("Name", "desc").then(function (querySnapshot) {
        querySnapshot.forEach(function (doc){
            let Name = doc.data().Name;
            let Vorname = doc.data().Vorname;
            let HS = doc.data().Hochschule;
            let Sem = doc.data().Semester;
            let JG = doc.data().Jahrgang;

            einfügen(Name, Vorname, HS, Sem, JG);
        });
    });
}

export default StartPage;