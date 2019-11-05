import stylesheet from "./PUebersicht.css";
import App from "./app.js";
import DB from "./database.js";

let _app="";
let _db = "";

class Phasenuebersicht{
    constructor(app){
        this._app = _app;
        _app = this._app;
        _db = app._db;
    }

    onShow(){
        let section = document.querySelector("#section_PUebersicht").cloneNode(true);

        return {
            className: "section_PUebersicht",
            main: section.querySelectorAll("section > *"),
        };

    };

    onLoad(){
        //Tabellen erstellen
        klapptabelle_erstellung();
        
        //EventListener von Button "Phase Hinzufügen"
        document.getElementById("PhaseHinzufuegen").addEventListener("click", neuePhase);
        
        //EventListener von Button "Jahrgang Hinzufügen"
        document.getElementById("JahrgangHinzufuegen").addEventListener("click", neuerStudiengang);
    }

    onLeave(goon){
        return true;
    }
}

let neuerStudiengang = () =>{
    //zurücksetzen der Hilfsvariablen hilfeTheorie und hilfePraxis
    hilfeTheorie = 1;
    hilfePraxis = 1;

    //Phasen in die Datenbank speichern
    let id = document.getElementById("EingabeStudiengang").value + document.getElementById("EingabeJahrgang").value;
    console.log(document.getElementById("EingabeStudiengang").value);

    try{
        _db.savePhase(
            {
            "Theorie1": document.getElementById("Theorie1").innerHTML,
            "Theorie2": document.getElementById("Theorie2").innerHTML,
            "Theorie3": document.getElementById("Theorie3").innerHTML,
            "Theorie4": document.getElementById("Theorie4").innerHTML,
            "Theorie5": document.getElementById("Theorie5").innerHTML,
            "Theorie6": document.getElementById("Theorie6").innerHTML,
            "Praxis1": document.getElementById("Praxis1").innerHTML,
            "Praxis2": document.getElementById("Praxis2").innerHTML,
            "Praxis3": document.getElementById("Praxis3").innerHTML,
            "Praxis4": document.getElementById("Praxis4").innerHTML,
            "Praxis5": document.getElementById("Praxis5").innerHTML,
            "Praxis6": document.getElementById("Praxis6").innerHTML,
            "EndeLetztePhase": document.getElementById("PraxisEnde6").innerHTML,
            "id": id
            }
        );
        //Phasentabelle löschen und wieder unsichtbar machen
        deleteTable("Phasentabelle");
        let buttonPhase = document.getElementById("Phasentabelle").querySelector("tr");
        buttonPhase.classList.remove("visible");
        buttonPhase.classList.add("hidden");
    }catch(error){
        alert("Fehlerhafte Eingabe");
        console.log(error);
    };

    
}

//die Tabelle der übergebenen id wird bis auf die Kopfzeile geleert
function deleteTable(id){
    while(document.getElementById(id).rows.length>1){
        document.getElementById(id).deleteRow(1);
    }
}

//Hilfsvariable, die das Vergeben von ids erleichtert. Wird zurückgesetzt, sobald der Jahrgang hinzugefügt wurde
let hilfeTheorie = 1;
let hilfePraxis = 1;

let neuePhase = () =>{       
    //sichtbar machen der Tabelle//
    let buttonPhase = document.getElementById("Phasentabelle").querySelector("tr");
    buttonPhase.classList.remove("hidden");
    buttonPhase.classList.add("visible");

    //Einfügen von neue Zeile an erster Stelle in der Tabelle//
    let neueTr = document.getElementById("Phasentabelle").insertRow(1);
        
    //erzeugen der Tabellenspalten// 
    let tdPhase = document.createElement("td");
    let tdVon = document.createElement("td");
    let tdBis = document.createElement("td");
    let tdStart = document.createElement("td");
    let tdEnd = document.createElement("td");
    let tdBearb = document.createElement("td");
    let tdLoe = document.createElement("td");

    //Buttons bearbeiten und löschen erstellen//
    let bearb = document.createElement("input");
    bearb.type = "button"
    bearb.classList.add("Buttons");
    bearb.value = "Bearbeiten";
    let loe = document.createElement("input");
    loe.type = "button";
    loe.classList.add("Buttons");
    loe.value = "Löschen";

    //befüllen der Spalten//
    tdPhase.innerHTML = document.getElementById("DropDownPhase").value;
    tdVon.innerHTML = datumsausgabe(document.getElementById("Startdatum").value);
    tdBis.innerHTML = datumsausgabe(document.getElementById("Enddatum").value);
    tdStart.innerHTML = berechneWoche(document.getElementById("Startdatum").value);        
    tdEnd.innerHTML = berechneWoche(document.getElementById("Enddatum").value);
    tdBearb.appendChild(bearb);
    tdLoe.appendChild(loe);
    
    //ids vergeben
    console.log((tdPhase.innerHTML + hilfeTheorie));
    if(tdPhase.innerHTML=="Theorie"){
        tdVon.id = tdPhase.innerHTML + hilfeTheorie;
        tdBis.id = tdPhase.innerHTML + "Ende" + hilfeTheorie;
        hilfeTheorie++;
        console.log("ifTheorie " + hilfeTheorie );
    } else if(tdPhase.innerHTML=="Praxis"){
        tdVon.id = tdPhase.innerHTML + hilfePraxis;
        tdBis.id = tdPhase.innerHTML + "Ende" + hilfePraxis;
        hilfePraxis++;
        console.log("ifPraxis " + hilfePraxis);
    }
    console.log("id: " + tdVon.id);
    

    //hinzufügen der Spalten //
    neueTr.appendChild(tdPhase);
    neueTr.appendChild(tdVon);
    neueTr.appendChild(tdBis);
    neueTr.appendChild(tdStart);
    neueTr.appendChild(tdEnd);
    neueTr.appendChild(tdBearb);
    neueTr.appendChild(tdLoe);

    //Hinzufügen von EventListener der Buttons
    bearb.addEventListener('click', bearbeiten);
    loe.addEventListener("click", loeschen);
}

//EventListener von bearbeiten-Button
let bearbeiten = (event) =>{
    let el = event.target;
    while(el.nodeName !== "TR"){
        el = el.parentElement; // el enthält als Wert die Zeile (tr) des aufrufenden Elements
    }
    
    //füllen der Spalten in das Dokument
    document.getElementById("DropDownPhase").value = el.children[0].innerHTML;
        let date = el.children[1].innerHTML;
        document.getElementById("Startdatum").value = date.split(".")[2] + "-" + date.split(".")[1] + "-" + date.split(".")[0];
        date = el.children[2].innerHTML;
        document.getElementById("Enddatum").value = date.split(".")[2] + "-" + date.split(".")[1] + "-" + date.split(".")[0];

}

//EventListener von löschen-Button
let loeschen = (event) =>{
    let el = event.target;
    while(el.nodeName !== "TR"){
        el = el.parentElement;
    }
    el = el.rowIndex;
    
    document.getElementById("Phasentabelle").deleteRow(el);
    if(document.getElementById("Phasentabelle").children[1]===undefined){
        //Phasentabelle wieder unsichtbar machen, wenn die letzte Zeile gelöscht wurde
        let buttonPhase = document.getElementById("Phasentabelle").querySelector("tr");
        buttonPhase.classList.remove("visible");
        buttonPhase.classList.add("hidden");
    }
}

//Formatieren des Datums in 01.01.2019
let datumsausgabe = (date) =>{
    date = new Date(date);
    let tag = String(date.getDate());
    let month = String(date.getMonth());
    if(month.length==1){
        month = "0"+month;
    }
    if(tag.length==1){
        tag = "0"+tag;
    }
    
    console.log(tag);
    
    return tag + "." + month + "." + date.getFullYear();
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

function klapptabelle_erstellung(){
    // eltern festlegen
    let eltern = document.getElementById("phasen_tabelle");
    let buttoninhalt, button, ul, li, table, tr, td1, td2, img;

    let phasen = _db.selectAllPhases();
    // Erste Aufteilung für die Studiengänge
    phasen.then(function (querySnapshot) {
        querySnapshot.forEach(function (doc){
            buttoninhalt = doc.data().id.slice(0,-4); // letzte 4 chars werden weggeschnitten

            if(document.getElementById("button"+buttoninhalt) === null){
                // Liste erstellen
                li = document.createElement("li");
                li.id = "li" + buttoninhalt; // Beispielinhalt: liWirtschaftsinformatik
                eltern.appendChild(li);

                // Liste, als Aufteilung für Button und inhalt
                ul = document.createElement("ul");
                ul.id = "ul" + buttoninhalt; // Beispielinhalt: ulWirtschaftsinformatik
                ul.classList.add("oberstesElement_tabelle");
                li.appendChild(ul);
                li = document.createElement("li");
                ul.appendChild(li);

                // li für button
                button = document.createElement("button");
                button.type = "button";
                button.id = "button"+buttoninhalt; // Beispielinhalt: buttonWirtschaftsinformatik
                button.classList.add("klapptabelle_button");
                button.addEventListener('click', klapptabelle);
                button.innerHTML = "<i class='fas fa-angle-right'></i> " + buttoninhalt;
                li.appendChild(button);
            }
        });
    });

    // Zweite Aufteilung für Jahrgänge
    phasen.then(function (querySnapshot) {
        querySnapshot.forEach(function (doc){
            buttoninhalt = doc.data().id;
            eltern = document.getElementById("ul" + buttoninhalt.slice(0,-4)); // entfernt die letzten 4 chars von buttoninhalt

            if(document.getElementById("button"+buttoninhalt) === null){
                // Listeneintrag für Wirtschaftsinformatik 2018
                li = document.createElement("li");
                li.id = "li" + doc.data().id;
                eltern.appendChild(li);

                // Aufteilung für Button und inhalt
                ul = document.createElement("ul");
                ul.id = "";
                li.appendChild(ul);

                //li für Button
                li = document.createElement("li");
                li.id = "";
                ul.appendChild(li);

                // button erstellen
                button = document.createElement("button");
                button.type = "button";
                button.id = "button"+buttoninhalt;
                button.classList.add("klapptabelle_button");
                button.addEventListener('click', klapptabelle);
                button.innerHTML = "<span class='fas fa-angle-right'></span> " + buttoninhalt.slice(-4) + " <a class='fas fa-trash muell'></a> ";
                li.appendChild(button);

                //EventListener von Löschen Icon zum Löschen des Jahrgangs
                console.log(document.getElementsByClassName("muell"));
                for(let i = 0; i<document.getElementsByClassName("muell").length; i++){
                    document.getElementsByClassName("muell")[i].addEventListener("click", deletePhase);
                }
                //img.addEventListener("click", deletePhase());
                
                //li für Button
                li = document.createElement("li");
                li.style.display = "none";
                ul.appendChild(li);

                // Tabelle erstellen
                table = document.createElement("table");
                table.classList.add("inhalt");
                table.id = "table"+buttoninhalt;
                li.appendChild(table);
            }
        });
    });
    phasen.then(function (querySnapshot) {
        querySnapshot.forEach(function (doc){
            for(let u=0;u<12;u++){
                tr = document.createElement("tr");
                tr.classList.add("inhalt");
                td1 = document.createElement("td");
                td1.classList.add("inhalt");
                td2 = document.createElement("td");
                td2.classList.add("inhalt");

                switch (u){
                    case 0: 
                        tr.id = "tr" + doc.data().id + "Theorie1";
                        td2.id = "td" + doc.data().id + "Theorie1";
                        td1.innerHTML = "Theorie 1:";
                        td2.innerHTML = doc.data().Theorie1;
                        break;
                    case 1: 
                        tr.id = "tr" + doc.data().id + "Praxis1";
                        td2.id = "td" + doc.data().id + "Praxis1";
                        td1.innerHTML = "Praxis 1:";
                        td2.innerHTML = doc.data().Praxis1;
                        break;
                    case 2:
                        tr.id = "tr" + doc.data().id + "Theorie2";
                        td2.id = "td" + doc.data().id + "Theorie2";
                        td1.innerHTML = "Theorie 2:";
                        td2.innerHTML = doc.data().Theorie2;
                        break;
                    case 3:
                        tr.id = "tr" + doc.data().id + "Praxis2";
                        td2.id = "td" + doc.data().id + "Praxis2";
                        td1.innerHTML = "Praxis 2:";
                        td2.innerHTML = doc.data().Praxis1;
                        break;
                    case 4:
                        tr.id = "tr" + doc.data().id + "Theorie3";
                        td2.id = "td" + doc.data().id + "Theorie3";
                        td1.innerHTML = "Theorie 3:";
                        td2.innerHTML = doc.data().Theorie3;
                        break;
                    case 5:
                        tr.id = "tr" + doc.data().id + "Praxis3";
                        td2.id = "td" + doc.data().id + "Praxis3";
                        td1.innerHTML = "Praxis 3:";
                        td2.innerHTML = doc.data().Praxis3;
                        break;
                    case 6:
                        tr.id = "tr" + doc.data().id + "Theorie4";
                        td2.id = "td" + doc.data().id + "Theorie4";
                        td1.innerHTML = "Theorie 4:";
                        td2.innerHTML = doc.data().Theorie4;
                        break;
                    case 7:
                        tr.id = "tr" + doc.data().id + "Praxis4";
                        td2.id = "td" + doc.data().id + "Praxis4";
                        td1.innerHTML = "Praxis 4:";
                        td2.innerHTML = doc.data().Praxis4;
                        break;
                    case 8:
                        tr.id = "tr" + doc.data().id + "Theorie5";
                        td2.id = "td" + doc.data().id + "Theorie5";
                        td1.innerHTML = "Theorie 5:";
                        td2.innerHTML = doc.data().Theorie5;
                        break;
                    case 9:
                        tr.id = "tr" + doc.data().id + "Praxis5";
                        td2.id = "td" + doc.data().id + "Praxis5";
                        td1.innerHTML = "Praxis 5:";
                        td2.innerHTML = doc.data().Praxis5;
                        break;
                    case 10:
                        tr.id = "tr" + doc.data().id + "Theorie6";
                        td2.id = "td" + doc.data().id + "Theorie6";
                        td1.innerHTML = "Theorie 6:";
                        td2.innerHTML = doc.data().Theorie6;
                        break;
                    case 11:
                        tr.id = "tr" + doc.data().id + "Praxis6";
                        td2.id = "td" + doc.data().id + "Praxis6";
                        td1.innerHTML = "Praxis 6:";
                        td2.innerHTML = doc.data().Praxis6;
                        break;
                }
                document.getElementById("table"+doc.data().id).appendChild(tr);
                tr.appendChild(td1);
                tr.appendChild(td2);
            }
        });
    });
}

function klapptabelle(event){
    // Variablen mit eltern und child werden deklariert
    let eltern;
    if(event.target.tagName === "SPAN"){
        eltern = document.getElementById(event.target.parentElement.id).parentElement.parentElement;
    }
    else{
        eltern = document.getElementById(event.target.id).parentElement.parentElement;
    }
    let kinder = eltern.children;
    
    // prüfen, ob auf- oder zugeklappt werden soll
    if(kinder[1].style.display == "none"){
        // class ändern, damit der Pfeil in eine andere Richtung zeigt
        kinder[0].querySelector("span").className = "";
        kinder[0].querySelector("span").setAttribute("class", "fas fa-angle-down");
        // alle aufklappen
        for(let i = 1; i < kinder.length; i++){
            kinder[i].style.display = "block";
        }
    }
    else{
        // class ändern, damit der Pfeil in eine andere Richtung zeigt
        kinder[0].querySelector("span").className = "";
        kinder[0].querySelector("span").setAttribute("class", "fas fa-angle-right");
        // alle zuklappen
        for(let i = 1; i < kinder.length; i++){
            kinder[i].style.display = "none";
        }
    }
}

function deletePhase(event){
    let id = event.target.parentElement.id.substring(6);
    _db.deletePhaseById(id);
    window.alert("Die Phase wurde gelöscht.");
}

export default Phasenuebersicht;