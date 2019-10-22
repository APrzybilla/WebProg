/*import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';                 //api
*/

/*Auf- und Zuklappen von Listen. Die Funktion erwartet eine Id von dem Objekt unterhalb*/
function klappen(id){
    if(document.getElementById(id).classList.contains("hidden")){
        document.getElementById(id).classList.remove("hidden");
    }
    else{
        document.getElementById(id).classList.add("hidden");
    }
}

function suchen(){
    console.log("test");
    /*Einfügen des Studenten*/
    /*Einfügen von neuer Zeile an erster Stelle in der Tabelle */
    let neueTr = document.getElementById("Tabellenhead").insertRow(1);

    /*erzeugen der Tabellenspalten*/
    let tdName = document.createElement("td");
    let tdHS = document.createElement("td");
    let tdS = document.createElement("td");
    let tdJG = document.createElement("td");

    /*befüllen der Spalten*/
    tdName.innerHTML = "Platzhalter";
    tdHS.innerHTML = "Platzhalter";
    tdS.innerHTML = "pLatzhalter";
    tdJG.innerHTML  = "Platzhalter";

    /*hinzufügen der Spalten*/
    neueTr.appendChild(tdName);
    neueTr.appendChild(tdHS);
    neueTr.appendChild(tdS);
    neueTr.appendChild(tdJG);


    /*Einfügen der Kalenderwochen*/
    /*Einfügen von neuer Zeile an erster Stelle in der Tabelle*/
    neueTr = document.getElementById("Tabellenbody").insertRow(1);
        
    for(let i = 1; i<53; i++){
        /*erzeugen der Tabellenspalten*/ 
        let tdKW = document.createElement("td");

        tdKW.innerHTML = " ";

        /*Hinzufügen von Klasse "KWs"*/
        tdKW.classList.add("KWs");

        /*hinzufügen der Spalten */
        neueTr.appendChild(tdKW);
    }
}

/*Funktionen, um zwischen den Seiten zu wechseln */
function home(){
    document.getElementById("section_Studenten").classList.add("hidden");
    document.getElementById("section_Studenten").classList.remove("visible");

    document.getElementById("section_PUebersicht").classList.add("hidden");
    document.getElementById("section_PUebersicht").classList.remove("visible");

    document.getElementById("section_SUebersicht").classList.remove("hidden");
    document.getElementById("section_SUebersicht").classList.add("visible");
}

function studenten(){
    document.getElementById("section_SUebersicht").classList.add("hidden");
    document.getElementById("section_SUebersicht").classList.remove("visible");
    
    document.getElementById("section_PUebersicht").classList.add("hidden");
    document.getElementById("section_PUebersicht").classList.remove("visible");
    
    document.getElementById("section_Studenten").classList.remove("hidden");
    document.getElementById("section_Studenten").classList.add("visible");
}

function phasen(){
    document.getElementById("section_SUebersicht").classList.add("hidden");
    document.getElementById("section_SUebersicht").classList.remove("visible");

    document.getElementById("section_Studenten").classList.add("hidden");
    document.getElementById("section_Studenten").classList.remove("visible");

    document.getElementById("section_PUebersicht").classList.remove("hidden");
    document.getElementById("section_PUebersicht").classList.add("visible");
}

window.addEventListener("load", () => {
    console.log("Load");

    /*EventListener vom Button "Jahrgang hinzufügen" */
    document.getElementById("JahrgangHinzufuegen").addEventListener("click", () =>{
        console.log("Jahrgang Listener");
        /*Sichtbar machen der Tabelle, wenn das erste Mal ausgeführt wird*/
        document.getElementById("Phasenliste").classList.add("visible");
        document.getElementById("Phasenliste").classList.remove("hidden");

        /*Erzeugen des Punktes für Studiengänge, falls der Studiengang noch nicht vorhanden ist*/
        if(document.getElementById(document.getElementById("EingabeStudiengang").value).value===null){
            let ul = document.getElementById("Phasenliste");
            let li = document.createElement("li");                              /*neues Listenelement erzeugen*/
            li.id=document.getElementById("EingabeStudiengang").value;          /*li die ID vergeben. ID ist der Name des Studiengangs*/
            ul.appendChild(li);                                                 /*der ul das neue Listenelement hinzufügen*/
            let ulJahrgang = document.createElement("ul");                      /*neue ul erzeugen, damit die Jahrgänge hinzugefügt werden können*/
            li.appendChild(ulJahrgang);                                         /*die neuerzeugte ul wird dem eben erstellten li hinzugefügt*/
            ulJahrgang.id="Jahrgang" + document.getElementById("EingabeStudiengang").value;
        }

        /*Erzeugen des Jahrgangs, falls er noch nicht vorhanden ist*/
        if(document.getElementById(document.getElementById("EingabeJahrgang").value).value===null){
            let li = document.createElement("li");
            li.id=document.getElementById("EingabeStudiengang").value + document.getElementById("EingabeJahrgang");

            let ul = document.getElementById("Jahrgang " + document.getElementById("EingabeStudiengang").value);
            ul.appendChild(li);
        }

    });

    /*EventListener vom Button "Phase hinufügen"*/
    document.getElementById("PhaseHinzufuegen").addEventListener("click", () => {
        console.log("Phasen Listener");
        
        /*sichtbar machen der Tabelle*/
        let buttonPhase = document.getElementById("Phasentabelle").querySelector("tr");
        buttonPhase.classList.remove("hidden");
        buttonPhase.classList.add("visible");

        /*Einfügen von neue Zeile an erster Stelle in der Tabelle*/
        let neueTr = document.getElementById("Phasentabelle").insertRow(1);
        
        /*erzeugen der Tabellenspalten*/ 
        let tdPhase = document.createElement("td");
        let tdVon = document.createElement("td");
        let tdBis = document.createElement("td");
        let tdStart = document.createElement("td");
        let tdEnd = document.createElement("td");
        let tdBearb = document.createElement("td");
        let tdLoe = document.createElement("td");

        /*Buttons bearbeiten und löschen erstellen*/
        let bearb = document.createElement("input");
        bearb.type = "button"
        bearb.classList.add("Buttons");
        bearb.value = "Bearbeiten";
        let loe = document.createElement("input");
        loe.type = "button";
        loe.classList.add("Buttons");
        loe.value = "Löschen";

        /*befüllen der Spalten*/
        tdPhase.innerHTML = document.getElementById("DropDownPhase").value;
        tdVon.innerHTML = document.getElementById("Startdatum").value;
        tdBis.innerHTML = document.getElementById("Enddatum").value;
        console.log(document.getElementById("Startdatum").value);
        tdStart.innerHTML = berechneWoche(document.getElementById("Startdatum").value);        
        tdEnd.innerHTML = berechneWoche(document.getElementById("Enddatum").value);
        tdBearb.appendChild(bearb);
        tdLoe.appendChild(loe);

        /*hinzufügen der Spalten */
        neueTr.appendChild(tdPhase);
        neueTr.appendChild(tdVon);
        neueTr.appendChild(tdBis);
        neueTr.appendChild(tdStart);
        neueTr.appendChild(tdEnd);
        neueTr.appendChild(tdBearb);
        neueTr.appendChild(tdLoe);
        
        /*Hinzufügen von Listeners zu Bearbeiten und Löschen Buttons */
        bearb.addEventListener(() =>{
            if(tdPhase=="Theorie"){
                document.getElementById("DropDownPhase").value = "Theorie";
            }
            else{
                document.getElementById("DropDownPhase").value = "Praxis";
            }
        });
        loe.addEventListener(() =>{

        });
    });
});

let berechneWoche =(date) =>{

    console.log("berechneWoche")
    date = new Date(date);
    let j = date.getFullYear();
    let m = date.getMonth()+1;
    let t = date.getDate();
    let datum = new Date(j, m, t);
    console.log(date);

    let currentThursday = new Date(datum.getTime() + (date.getDay()-((datum.getDay()+6%7))*86400000));
    let yearOfThursday = currentThursday.getFullYear();
    let firstThursday = new Date(new Date(yearOfThursday,0,4).getTime() +(datum.getDay()-((new Date(yearOfThursday,0,4).getDay()+6) % 7)) * 86400000);

    let weekNumber = Math.floor(1 + 0.5 + (currentThursday.getTime() - firstThursday.getTime()) / 86400000/7);

    return weekNumber;
}