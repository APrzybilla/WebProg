import stylesheet from "./SUebersicht.css";
import DB from "./database.js";
import App from "./app.js";
import { timeout } from "q";

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
        anzeigen();
        setTimeout(zusammenführenStudenten, 1000);
    }

    onLeave(goon){
        return true;
    }
}

function suchen (){
    //Tabelle leeren
    //dient dazu, dass nur die gefundenen Elemente angezeigt werden
    deleteTable("Tabellenhead");
    deleteTable("Tabellenbody");

    //Auslesen der Filtertextfelder und in Kleinbuchstaben verwandeln
    let Nachname = document.getElementById("filter_nachname").value.toLowerCase();
    let VN = document.getElementById("filter_vorname").value.toLowerCase();
    let Sem = document.getElementById("filter_semester").value.toLowerCase();
    let JG = document.getElementById("filter_jahrgang").value.toLowerCase();

    //Überprüfen, ob ein Filter aktiviert ist. Wenn nicht wird die komplette Tabelle angezeigt
    if(Nachname=="" && VN=="" && Sem=="" && JG=="" && !document.getElementById("checkbox_thm").checked && !document.getElementById("checkbox_dhbw").checked){
        anzeigen();
    } else {
        //Aufrufen aller Studenten rückwärts
        _db.selectAllStudentsByOrderBackwards("Name").then(function (querySnapshot) {
            //jeden Studenten überprüfen
            querySnapshot.forEach(function(doc){

                //wenn einer der Filter im Studenten beinhaltet wird, wird dieser der Tabelle hinzugefügt
                let boolean= false;

                //Überprüfen, ob etwas in den Feldern steht
                if(Nachname!==""){
                    //überprüfen, ob das, was im Feld steht, im Studenten vorhanden ist
                    //zu Verbesserung der Suche werden die Strings in Kleinbuchstaben verwandelt
                    //Der Vorgang wird in allen folgenden if-Schleifen wiederholt
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
                    //Speichern der Daten in Variablen
                    let Name = doc.data().Name;
                    let Vorname = doc.data().Vorname;
                    let HS = doc.data().Hochschule;
                    let Sem = doc.data().Semester;
                    let Jahrgang = doc.data().Jahrgang;
                    let id = doc.data().id;

                    //Hinzufügen des Studenten mit den Variablen
                    einfügen(Name, Vorname, HS, Sem, Jahrgang, id);
                }
            });
        });
    }
}

//die Tabelle der übergebenen id wird bis auf die Kopfzeile geleert
function deleteTable(id){
    while(document.getElementById(id).rows.length>1){
        document.getElementById(id).deleteRow(1);
    }
}


//Übergebenen Student der Tabelle an erster Stelle hinzufügen
function einfügen (Name, Vorname, HS, Sem, JG, id){
    //Einfügen des Studenten
    //Einfügen von neuer Zeile an erster Stelle in der Tabelle //
    let neueTr = document.getElementById("Tabellenhead").insertRow(1);

    //erzeugen der Tabellenspalten//
    let tdName = document.createElement("td");
    let tdHS = document.createElement("td");
    let tdS = document.createElement("td");
    let tdJG = document.createElement("td");

    //Vergeben von Klassen, damit auf der Handyversion nur der Name angezeigt wird
    tdHS.classList.add("handyUnsichtbar");
    tdS.classList.add("handyUnsichtbar");
    tdJG.classList.add("handyUnsichtbar");

    let ank = '<a href = "/Studentenuebersicht/Studenten/' + id + '" navigo>';

    //befüllen der Spalten//
    tdName.innerHTML = ank + Vorname + " " + Name + '</a>';
    tdHS.innerHTML = HS;
    tdS.innerHTML = Sem;
    tdJG.innerHTML  = JG;

    //hinzufügen der Spalten//
    neueTr.appendChild(tdName);
    neueTr.appendChild(tdHS);
    neueTr.appendChild(tdS);
    neueTr.appendChild(tdJG);


    //Einfügen von neuer Zeile an erster Stelle in der Tabelle//
    neueTr = document.getElementById("Tabellenbody").insertRow(1);
        
    for(let i = 1; i<53; i++){
        
        //erzeugen der Tabellenspalten// 
        let tdKW = document.createElement("td");

        //Leere Benennung, damit die Spaltengröße leichter einheitlich zu machen ist
        tdKW.innerHTML = " ";

        //Hinzufügen von Klasse "KWs"//
        tdKW.classList.add("KWs");
        tdKW.id = "KW" + i + Vorname + Nachname;

        //hinzufügen der Spalten //
        neueTr.appendChild(tdKW);
    }
}

//Alle Studenten in der Tabelle anzeigen
function anzeigen(){
    //Tabelle leeren
    //dient dazu, dass die Daten nicht doppelt drinnen stehen
    deleteTable("Tabellenhead");
    deleteTable("Tabellenbody");

    //Alle Studenten rückwärts aufrufen
    let students = _db.selectAllStudentsByOrderBackwards("Name").then(function (querySnapshot) {
        querySnapshot.forEach(function (doc){
            //Alle notwendigen Daten in Variablen speichern
            let Name = doc.data().Name;
            let Vorname = doc.data().Vorname;
            let HS = doc.data().Hochschule;
            let Sem = doc.data().Semester;
            let JG = doc.data().Jahrgang;
            let id = doc.data().id;

            //Student mit gespeicherten Variablen der Tabelle hinzufügen
            einfügen(Name, Vorname, HS, Sem, JG, id);
        });
    });
}

function zusammenführenStudenten(){
    
    _db.selectAllStudents().then(function (querySnapshot) {

        querySnapshot.forEach(function(doc){
            let row = document.getElementById(doc.data().Vorname + doc.data().Name).parentElement.rowIndex;
            let studiengang = doc.data().Studiengang;
            let jahrgang = doc.data().Jahrgang;

            let zusammengefuegt = studiengang + jahrgang;

            _db.selectPhaseById(zusammengefuegt);

            
        });    
    });
}

//Kalenderwoche berechnen
let berechneWoche =(date) =>{
    date = new Date(date);
    let j = date.getFullYear();
    let m = date.getMonth()+1;
    let t = date.getDate();
    let datum = new Date(j, m, t);

    let currentThursday = new Date(datum.getTime() + (date.getDay()-((datum.getDay()+6%7))/86400000));
    let yearOfThursday = currentThursday.getFullYear();
    let firstThursday = new Date(new Date(yearOfThursday,0,4).getTime() +(datum.getDay()-((new Date(yearOfThursday,0,4).getDay()+6) % 7)) / 86400000);

    let weekNumber = Math.floor(1 + 0.5 + (currentThursday.getTime() - firstThursday.getTime()) / 86400000/7);

    return weekNumber;
}

export default StartPage;