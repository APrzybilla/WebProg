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

        //Nav anpassen
        document.querySelector("nav").children[0].classList.remove("bold");
        document.querySelector("nav").children[1].classList.add("bold");
        document.querySelector("nav").children[2].classList.remove("bold");
    }

    onLeave(goon){
        return true;
    }
}

// Functions die im onload ausgeführt werden

// Erstellt die Tabelle für die unterschiedlichen Phasen
function klapptabelle_erstellung(){
    // Eltern festlegen
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

                // Li für button
                button = document.createElement("button");
                button.type = "button";
                button.id = "button"+buttoninhalt; // Beispielinhalt: buttonWirtschaftsinformatik
                button.classList.add("klapptabelle_button");
                button.addEventListener('click', klapptabelle);
                button.innerHTML = "<span class='fas fa-angle-down'></span> " + buttoninhalt;
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
                li.appendChild(ul);

                //li für Button
                li = document.createElement("li");
                ul.appendChild(li);

                // button erstellen
                button = document.createElement("button");
                button.type = "button";
                button.id = "button"+buttoninhalt;
                button.classList.add("klapptabelle_button");
                button.addEventListener('click', klapptabelle);
                button.innerHTML = "<span class='fas fa-angle-right'></span> " + buttoninhalt.slice(-4) + "\t" + "<a id='" + "a" + buttoninhalt + "' class='fas fa-pen aendern'></a>" + "<a class='fas fa-trash muell'></a> ";
                li.appendChild(button);

                //EventListener von Löschen Icon zum Löschen des Jahrgangs
                for(let i = 0; i<document.getElementsByClassName("muell").length; i++){
                    document.getElementsByClassName("aendern")[i].addEventListener("click", changePhase);
                    document.getElementsByClassName("muell")[i].addEventListener("click", deletePhase);
                }
                
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
    // Inhalte werden unter den Jahrgängen eingefügt
    phasen.then(function (querySnapshot) {
        querySnapshot.forEach(function (doc){
            for(let u=0;u<12;u++){
                // Erstellt Zeile und zwei tds für die Inhalte
                tr = document.createElement("tr");
                td1 = document.createElement("td");
                td2 = document.createElement("td");

                // Ein switch-case für jede Phase
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
                        td2.innerHTML = doc.data().Praxis2;
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

                // Inhalte werden dem passenden parent hinzugefügt
                document.getElementById("table"+doc.data().id).appendChild(tr);
                tr.appendChild(td1);
                tr.appendChild(td2);
            }
        });
    });
}

// Functions die nur bei Bedarf ausgeführt werden

// Auf- und zuklappen der Inhalte der Tabelle
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

//Kalenderwoche berechnen
let berechneWoche =(date) =>{
    date = new Date(date);
    let j = date.getFullYear();
    let m = date.getMonth();
    let t = date.getDate();
    let datum = new Date(j, m, t);

    let currentThursday = new Date(datum.getTime() + (date.getDay()-((datum.getDay()+6%7))/86400000));
    let yearOfThursday = currentThursday.getFullYear();
    let firstThursday = new Date(new Date(yearOfThursday,0,4).getTime() +(datum.getDay()-((new Date(yearOfThursday,0,4).getDay()+6) % 7)) / 86400000);

    let weekNumber = Math.floor(1 + 0.5 + (currentThursday.getTime() - firstThursday.getTime()) / 86400000/7);

    return weekNumber;
}

//Formatieren des Datums in 01.01.2019
let datumsausgabe = (date) =>{
    date = new Date(date);
    let tag = String(date.getDate());
    let month = String(date.getMonth()+1);
    if(month.length==1){
        month = "0"+month;
    }
    if(tag.length==1){
        tag = "0"+tag;
    }
    
    return tag + "." + month + "." + date.getFullYear();
}

//Neuer Studiengang wird erstellt
let neuerStudiengang = () =>{
    if(document.getElementById("JahrgangHinzufuegen").innerHTML != "Jahrgang hinzufügen"){
        document.getElementById("JahrgangHinzufuegen").innerHTML = "Jahrgang hinzufügen";
    }
    //Phasen in die Datenbank speichern
    let id = document.getElementById("EingabeStudiengang").value + document.getElementById("EingabeJahrgang").value;

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

    //Tabelle löschen und neu erstellen
    resetAll();

    //Snackbar einzeigen
    var x = document.getElementById("SnackbarJahrgangHinzufuegen");
    x.classList.add("snackbarZeigen");
    setTimeout(function(){ x.classList.remove("snackbarZeigen"); }, 3000);
}

//Erstellt eine neue Phase
let neuePhase = () =>{
    //Hilfsvariable, die das Vergeben von ids erleichtert. Wird zurückgesetzt, sobald der Jahrgang hinzugefügt wurde
    let hilfeTheorie = 1;
    let hilfePraxis = 1;
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
    let tdLoe = document.createElement("td");

    //Von und Bis überprüfen
    if(document.getElementById("Startdatum").value>document.getElementById("Enddatum").value){
        alert("Das Ende der Phase liegt vor dem Beginn.")
        return;
    }

    //Button löschen erstellen
    let loe = document.createElement("a");
    loe.setAttribute("class", "fas fa-trash muell");

    //befüllen der Spalten
    tdPhase.innerHTML = document.getElementById("DropDownPhase").value;
    tdVon.innerHTML = datumsausgabe(document.getElementById("Startdatum").value);
    tdBis.innerHTML = datumsausgabe(document.getElementById("Enddatum").value);
    tdStart.innerHTML = berechneWoche(document.getElementById("Startdatum").value);        
    tdEnd.innerHTML = berechneWoche(document.getElementById("Enddatum").value);
    tdLoe.appendChild(loe);
    
    //ids vergeben, soll am Ende Theorie1, Theorie2, ... und auch mit Praxis heißen
    //überprüfen, ob es eine Theorie- oder Praxisphase ist
    if(tdPhase.innerHTML=="Theorie"){
        //überprüfen, welche Zahl noch frei ist
        while(document.getElementById(tdPhase.innerHTML + hilfeTheorie)!=null){
            let h = document.getElementById(tdPhase.innerHTML + hilfeTheorie).innerHTML.split(".");
            let h1 = document.getElementById("Startdatum").value.split("-");
            if(new Date(h1[0], (h1[1]-1), h1[2])<new Date(h[0], (h[1]-1), h[2])){
                document.getElementById(tdPhase.innerHTML + hilfeTheorie).id = "Theorie" + ++hilfeTheorie;
            } else {
                hilfeTheorie++;
            }
        }
        if(hilfeTheorie>6){
            alert("Es wurden bereits genug Theoriephasen eingegeben");
            return;
        } else {
            tdVon.id = tdPhase.innerHTML + hilfeTheorie;
            tdBis.id = tdPhase.innerHTML + "Ende" + hilfeTheorie;
        }
    } else if(tdPhase.innerHTML=="Praxis"){
        while(document.getElementById(tdPhase.innerHTML + hilfePraxis)!=null){
            let h = document.getElementById(tdPhase.innerHTML + hilfePraxis).innerHTML.split(".");
            let h1 = document.getElementById("Startdatum").value.split("-");
            if(new Date(h1[0], (h1[1]-1), h1[2])<new Date(h[0], (h[1]-1), h[2])){
                document.getElementById(tdPhase.innerHTML + hilfePraxis).id = "Praxis" + ++hilfePraxis;
                console.log(document.getElementById(tdPhase.innerHTML + hilfePraxis).id);
            }else{
                hilfePraxis++;
            }
            
        }
        if(hilfePraxis>6){
            alert("Es wurden bereits genug Praxisphasen eingegeben");
            return;
        } else {
            tdVon.id = tdPhase.innerHTML + hilfePraxis;
            tdBis.id = tdPhase.innerHTML + "Ende" + hilfePraxis;
        }
        
    }

    //hinzufügen der Spalten //
    neueTr.appendChild(tdPhase);
    neueTr.appendChild(tdVon);
    neueTr.appendChild(tdBis);
    neueTr.appendChild(tdStart);
    neueTr.appendChild(tdEnd);
    neueTr.appendChild(tdLoe);

    //Hinzufügen von EventListener der Buttons
    loe.addEventListener("click", loeschen);
}

//die Tabelle der übergebenen id wird bis auf die Kopfzeile geleert
function deleteTable(id){
    while(document.getElementById(id).rows.length>1){
        document.getElementById(id).deleteRow(1);
    }
}

// Phase löschen
function deletePhase(event){
    let bool = window.confirm("Soll der Studiengang " + event.target.parentElement.id.substring(6, event.target.parentElement.id.length-4) + " " + event.target.parentElement.id.substring(event.target.parentElement.id.length-4, event.target.parentElement.id.length) + " wirklich gelöscht werden?");
    
    // löscht die ersten 6 chars der id --> Beispiel-id: buttonWirtschaftsinformatik2018
    if(bool){
        let id = event.target.parentElement.id.substring(6);
        _db.deletePhaseById(id);
        // Popup-alert als Bestätigung
        window.alert("Die Phase wurde gelöscht.");

        //Tabelle löschen und neu erstellen
        resetAll();
    } else {
        return;
    }
}

function changePhase(event){
    //eltern ist die ul, in der ein li der Button ist und ein li, das die tabelle mit den Inhalten beinhaltet
    let eltern = event.target.parentElement.parentElement.parentElement;
    //kinder enthält als Liste die tr's der Tabelle -> kinder[0] gibt Theorie1: xx.xx.xxxx aus, Kinder[1] gibt Praxis1.... aus
    let kinder = eltern.children[1].firstChild.children;

    //setzt den Text des Button "Jahrgang hinzufügen" auf "Jahrgang ändern"
    document.getElementById("JahrgangHinzufuegen").innerHTML = "Jahrgang ändern";
    //setzt die Texte für den Studiengang und Jahrgang
    document.getElementById("EingabeStudiengang").value = eltern.parentElement.id.match(/[a-zA-Z]+/g)[0].substring(2);
    document.getElementById("EingabeJahrgang").value = eltern.parentElement.id.match(/\d+/g);
    
    //Zählervariable -> wird nur bei jedem 2. Schleifendurchlauf erhöht
    let u = 1;
    //Schleife läuft 1 mal je Zeile der Tabelle durch
    for(let i = 0; i<kinder.length;i++){
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
        let tdLoe = document.createElement("td");

        //Button löschen erstellen//
        let loe = document.createElement("a");
        loe.setAttribute("class", "fas fa-trash muell");

        //befüllen der Spalten//
        tdPhase.innerHTML = kinder[i].id.match(/[a-zA-Z]+/g)[1];
        tdVon.innerHTML = kinder[i].children[1].innerHTML;
        //Datum-String in ein richtiges Datum umwandeln
        let date = kinder[i].children[1].innerHTML.split(".");
        date = new Date(date[2], date[1], date[0]);
        //KW mit Datum berechnen
        tdStart.innerHTML = berechneWoche(date);
        //wenn i+1 (also nur beim letzten Durchlauf) nicht findbar ist, dann soll der catch ausgeführt werden
        try{
            tdBis.innerHTML = kinder[i+1].children[1].innerHTML;
            //Datum-String in ein richtiges Datum umwandeln
            date = kinder[i+1].children[1].innerHTML.split(".");
            date = new Date(date[2], date[1], date[0]);
            //KW mit Datum berechnen
            tdEnd.innerHTML = berechneWoche(date);
        }
        catch(exception){
            //enhält id einer Phase -> beispiel: BWL2018
            let id = eltern.parentElement.id.substring(2);
            _db.selectPhaseById(id).then(function (doc) {
                //setzt letzte "Bis" der letzten Phase
                tdBis.innerHTML = doc.data().EndeLetztePhase;
                //Datum-String in ein richtiges Datum umwandeln
                date = doc.data().EndeLetztePhase.split(".");
                date = new Date(date[2], date[1], date[0]);
                //KW mit Datum berechnen
                tdEnd.innerHTML = berechneWoche(date);
            });
        }
        tdLoe.appendChild(loe);

        tdVon.id = tdPhase.innerHTML + u;
        tdBis.id = tdPhase.innerHTML + "Ende" + u;

        //hinzufügen der Spalten //
        neueTr.appendChild(tdPhase);
        neueTr.appendChild(tdVon);
        neueTr.appendChild(tdBis);
        neueTr.appendChild(tdStart);
        neueTr.appendChild(tdEnd);
        neueTr.appendChild(tdLoe);

        //Hinzufügen von EventListener der Buttons
        loe.addEventListener("click", loeschen);

        //wird bei jedem 2. Schleifendurchlauf erhöht
        if(i%2 == 1){
            u++;
        }
    }
}

//EventListener von löschen-Button
let loeschen = (event) =>{
    // Das aufrufende Element wird in el gespeichert
    let el = event.target;
    while(el.nodeName !== "TR"){
        el = el.parentElement;
    }
    el = el.rowIndex;

    // Zeile löschen
    document.getElementById("Phasentabelle").deleteRow(el);
}

//Tabelle löschen und neu erstellen
function resetAll(){
    let parent = document.getElementById("phasen_tabelle");
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
    klapptabelle_erstellung();
}

export default Phasenuebersicht;