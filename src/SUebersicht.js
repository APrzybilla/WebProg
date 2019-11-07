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

        //Aufrufen der Tabelle mit allen Studenten
        anzeigen();

        //Erzeugen der Tabelle mit Kalenderwochen, etc.
        tabelleUebersichtErzeugen();

        //Füllt die Tabelle mit den Phasen; setTimeout damit die Seite erst lädt und dann die Function ausgeführt wird
        setTimeout(zusammenführenStudenten, 500);
    }

    onLeave(goon){
        return true;
    }
}

// Functions die im onload ausgeführt werden

//Alle Studenten in der Tabelle anzeigen
function anzeigen(){
    //Alle Studenten rückwärts aufrufen
    let students = _db.selectAllStudentsByOrderBackwards("Name").then(function (querySnapshot) {
        querySnapshot.forEach(function (doc){
            //Alle notwendigen Daten in Variablen speichern
            let name = doc.data().Name;
            let vorname = doc.data().Vorname;
            let hs = doc.data().Hochschule;
            let sem = doc.data().Semester;
            let jg = doc.data().Jahrgang;
            let id = doc.data().id;

            //Student mit gespeicherten Variablen der Tabelle hinzufügen
            einfügen(name, vorname, hs, sem, jg, id);
        });
    });
}

//Anzeigen des Grundgerüsts der Tabelle
function tabelleUebersichtErzeugen(){
    let trStudent = document.getElementById("Tabellenhead").insertRow(0);
    let th = document.createElement("th");
    th.colSpan=4;
    th.innerHTML = "Studenten";
    trStudent.appendChild(th);
    
    //aktuelles Datum holen
    let d = new Date();
    //aktuelle Kalenderwoche in i speichern
    let i = berechneWoche(d.getDate() + "." + (d.getMonth() +1) + "."  + d.getFullYear());

    //Hilfsvariable, in der später das höchste Jahr stehen soll
    let h = 0;
    _db.selectAllPhases().then(function (querySnapshot) {
        //Alle Studiengänge überprüfen und das Ende des spätesten Studiengang in h speichern
        querySnapshot.forEach(function(doc){
            if(h<doc.data().EndeLetztePhase.split(".")[2]){
                h = doc.data().EndeLetztePhase.split(".")[2];
            }
        });

        //neue Tabellenzeile erstellen, in der die Jahre stehen sollen
        let trJahr = document.getElementById("Tabellenbody").insertRow(0);
        //neue Tabellenzeile erstellen, in der die KWs stehen sollen
        let trKW = document.getElementById("Tabellenbody").insertRow(1);
        
        for(let j = d.getFullYear(); j<=h; j++){
            //Überprüfen, wie viele Wochen das Jahr hat
            let k = berechneWoche(("31.12."+j));

            //Erzeugen der th in der Zeile für die Jahre
            th = document.createElement("th");
            th.colSpan = (k-i+1);
            th.innerHTML = j;
            trJahr.appendChild(th);
            //Erzeugen der Kalenderwochen für das Jahr.
            //Im ersten Jahr beginnen die Kalenderwochen mit der aktuellen Woche (vorher in i festgelegt)
            while(i<=k){
                th = document.createElement("th");
                //Bei den Zahlen 1-9 wird eine 0 vorher angehängt, sodass die Zahlen 01-09 gehen
                if(i.toString().length==1){
                    th.innerHTML = "KW0" + i;
                } else {
                    th.innerHTML = "KW" + i;
                }
                //id setzt sich zusammen aus "k", Jahr und Wochennummer
                //Woche 45 in 2019 sieht dann so aus: k201945
                th.id = "k"+j+i;
                trKW.appendChild(th);
                //i wird um eins erhöht, dass alle Wochen hinzugefügt werden.
                i++;
            }
            
            
            i = 1;
        }
        
    });    
}
    

function zusammenführenStudenten(){

    _db.selectAllStudents().then(function (querySnapshot) {

        querySnapshot.forEach(function(stud){
            //let zeile = document.getElementById(stud.data().id).parentElement.rowIndex;
            //let zusammengefuegt = stud.data().Studiengang + stud.data().Jahrgang;

            _db.selectPhaseById(stud.data().Studiengang + stud.data().Jahrgang).then(function(phas){
                try{
                    let t = berechneWoche(phas.data().Theorie1);
                    let p = berechneWoche(phas.data().Praxis1);
                    let h = p;
                    if(p<t){
                        h = t + p;
                    }
                    console.log(stud.data().Name + " " + t + " " + p);
                    for(let i = t; i<h; i++){
                        document.getElementById("KW" + i + stud.data().id).style.backgroundColor = "#85cdca";
                    }
                }
                catch(exception){}
            });

            /*_db.selectAllPhases().then(function(querySnapshot){
                querySnapshot
                
                    let theorie1 = doc.data().Theorie1;
                    let theorie2 = doc.data().Theorie2;
                    let theorie3 = doc.data().Theorie3;
                    let theorie4 = doc.data().Theorie4;
                    let theorie5 = doc.data().Theorie5;
                    let theorie6 = doc.data().Theorie6;

                    let praxis1 = doc.data().Praxis1;
                    let praxis2 = doc.data().Praxis2;
                    let praxis3 = doc.data().Praxis3;
                    let praxis4 = doc.data().Praxis4;
                    let praxis5 = doc.data().Praxis5;
                    let praxis6 = doc.data().Praxis6;

                    let endeLetztePhase = doc.data().EndeLetztePhase;
            });*/
        });    
    });
}

// Functions die nur bei Bedarf ausgeführt werden

//Suchen von Studenten. Wird aktiviert, wenn der Suchen-Button geklickt wurde
function suchen (){
    //Tabelle leeren
    //dient dazu, dass nur die gefundenen Elemente angezeigt werden
    deleteTable("Tabellenhead");
    deleteTable("Tabellenbody");

    //Auslesen der Filtertextfelder und in Kleinbuchstaben verwandeln
    let nachanme = document.getElementById("filter_nachname").value.toLowerCase();
    let vn = document.getElementById("filter_vorname").value.toLowerCase();
    let sem = document.getElementById("filter_semester").value.toLowerCase();
    let jg = document.getElementById("filter_jahrgang").value.toLowerCase();

    //Überprüfen, ob ein Filter aktiviert ist. Wenn nicht wird die komplette Tabelle angezeigt
    if(nachanme=="" && vn=="" && sem=="" && jg=="" && !document.getElementById("checkbox_thm").checked && !document.getElementById("checkbox_dhbw").checked){
        anzeigen();
    } else {
        //Aufrufen aller Studenten rückwärts
        _db.selectAllStudentsByOrderBackwards("Name").then(function (querySnapshot) {
            //jeden Studenten überprüfen
            querySnapshot.forEach(function(doc){
                //wenn einer der Filter im Studenten beinhaltet wird, wird dieser der Tabelle hinzugefügt

                //Flag, der anzeigt, ob ein Filter auf den Studenten zutrifft
                let flag = false;

                //Überprüfen, ob etwas in den Feldern steht
                if(nachanme!==""){
                    //überprüfen, ob das, was im Feld steht, im Studenten vorhanden ist
                    //zu Verbesserung der Suche werden die Strings in Kleinbuchstaben verwandelt
                    //Der Vorgang wird in allen folgenden if-Schleifen wiederholt
                    if(doc.data().Name.toLowerCase().indexOf(nachanme)>=0){
                        flag = true;
                    }
                }

                if(vn!==""){
                    if(doc.data().Vorname.toLowerCase().indexOf(vn)>=0){
                        flag = true;
                    }
                }

                if(sem!==""){
                    if(doc.data().Semester.toLowerCase().indexOf(sem)>=0){
                        flag = true;
                    }
                }

                if(jg!==""){
                    if(doc.data().Jahrgang.toLowerCase().indexOf(jg)>=0){
                        flag = true;
                    }
                }

                //Überprüfen der Checkboxen DHBW und THM
                if(document.getElementById("checkbox_dhbw").checked){
                    if(doc.data().Hochschule.toLowerCase()=="dhbw"){
                        flag = true;
                    }
                }
                if(document.getElementById("checkbox_thm").checked){
                    if(doc.data().Hochschule.toLowerCase()=="thm"){
                        flag = true;
                    }
                }

                //Wenn mindestens eine der Bedingungen zutrifft, wird der Student der Tabelle hinzugefügt
                if(flag){
                    //Speichern der Daten in Variablen
                    let name = doc.data().Name;
                    let vorname = doc.data().Vorname;
                    let hs = doc.data().Hochschule;
                    let sem = doc.data().Semester;
                    let jahrgang = doc.data().Jahrgang;
                    let id = doc.data().id;

                    //Hinzufügen des Studenten mit den Variablen
                    einfügen(name, vorname, hs, sem, jahrgang, id);
                }
            });
        });
    }
}

//Übergebenen Student der Tabelle an erster Stelle hinzufügen
function einfügen (name, vorname, hs, sem, jg, id){
    //Einfügen des Studenten
    //Einfügen von neuer Zeile an erster Stelle in der Tabelle //
    let neueTr = document.getElementById("Tabellenhead").insertRow(2);

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
    tdName.innerHTML = ank + vorname + " " + name + '</a>';
    tdName.id = id;
    tdHS.innerHTML = hs;
    tdS.innerHTML = sem;
    tdJG.innerHTML  = jg;

    //hinzufügen der Spalten//
    neueTr.appendChild(tdName);
    neueTr.appendChild(tdHS);
    neueTr.appendChild(tdS);
    neueTr.appendChild(tdJG);


    //Einfügen von neuer Zeile an erster Stelle in der Tabelle//
    neueTr = null;
    neueTr = document.getElementById("Tabellenbody").insertRow(0);
    let td = document.createElement("td");
    //aktuelles Datum holen
    let d = new Date();
    //aktuelle Kalenderwoche in i speichern
    let i = berechneWoche(d.getDate() + "." + (d.getMonth() +1) + "."  + d.getFullYear());
    
    let h = 0;
    _db.selectAllPhases().then(function (querySnapshot) {
        querySnapshot.forEach(function(doc){
            if(h<doc.data().EndeLetztePhase.split(".")[2]){
                h = doc.data().EndeLetztePhase.split(".")[2];
            }
        });
        for(let j = 2019; j<=h; j++){
            //Überprüfen, wie viele Wochen das Jahr hat
            let k = berechneWoche(("31.12."+j));
            while(i<=k){
                td = document.createElement("td");
                td.innerHTML = " " ;
                td.id = "k"+j+i+id;
                
                neueTr.appendChild(td);
                i++;
            }
            i = 1;
        }
    });
}

//die Tabelle der übergebenen id wird bis auf die Kopfzeile geleert
function deleteTable(id){
    while(document.getElementById(id).rows.length>1){
        document.getElementById(id).deleteRow(1);
    }
}

//Kalenderwoche berechnen
let berechneWoche =(date) =>{
    date = date.split(".");
    let j = date[2];
    let m = date[1]-1;
    let t = date[0];
    let datum = new Date(j, m, t);
    
    let currentThursday = new Date(datum.getTime() + (date[0]-((datum.getDay()+6%7))/86400000));
    let yearOfThursday = currentThursday.getFullYear();
    let firstThursday = new Date(new Date(yearOfThursday,0,4).getTime() +(datum.getDay()-((new Date(yearOfThursday,0,4).getDay()+6) % 7)) / 86400000);

    let weekNumber = Math.floor(1 + 0.5 + (currentThursday.getTime() - firstThursday.getTime()) / 86400000/7);
    return weekNumber;
}

export default StartPage;