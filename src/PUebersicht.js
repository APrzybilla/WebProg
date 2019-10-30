import stylesheet from "./PUebersicht.css";

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
        //EventListener von Button "Phase Hinzufügen"
        document.getElementById("PhaseHinzufuegen").addEventListener("click", neuePhase);
        document.getElementById("JahrgangHinzufuegen").addEventListener("click", neuerStudiengang);
    }

    onLeave(goon){
        return true;
    }
}

let neuerStudiengang = () =>{
    //Phasentabelle löschen und wieder unsichtbar machen
    deleteTable("Phasentabelle");
    let buttonPhase = document.getElementById("Phasentabelle").querySelector("tr");
    buttonPhase.classList.remove("visible");
    buttonPhase.classList.add("hidden");

    //zurücksetzen der Hilfsvariablen hilfeTheorie und hilfePraxis
    hilfeTheorie = 1;
    hilfePraxis = 1;

    //Phasen in die Datenbank speichern
    _db.savePhase({
        "Theorie1" : document.getElementById("Theorie1").value,
        "Theorie2": document.getElementById("Theorie2").value,
        "Theorie3": document.getElementById("Theorie3").value,
        "Theorie4": document.getElementById("Theorie4").value,
        "Theorie5": document.getElementById("Theorie5").value,
        "Theorie6": document.getElementById("Theorie6").value,
        "Praxis1": document.getElementById("Praxis1").value,
        "Praxis2": document.getElementById("Praxis2").value,
        "Praxis3": document.getElementById("Praxis3").value,
        "Praxis4": document.getElementById("Praxis4").value,
        "Praxis5": document.getElementById("Praxis5").value,
        "Praxis6": document.getElementById("Praxis6").value,
        "EndeLetztePhase": document.getElementById("PraxisEnde6").value,
        "id": document.getElementById("EingabeStudiengang").value + document.getElementById("EingabeJahrgang").value
    });    
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
    tdVon.innerHTML = document.getElementById("Startdatum").value;
    tdBis.innerHTML = document.getElementById("Enddatum").value;
    tdStart.innerHTML = berechneWoche(document.getElementById("Startdatum").value);        
    tdEnd.innerHTML = berechneWoche(document.getElementById("Enddatum").value);
    tdBearb.appendChild(bearb);
    tdLoe.appendChild(loe);
    
    //ids vergeben
    if(tdPhase.value=="Theorie"){
        tdVon.id = tdPhase.value + hilfeTheorie;
        tdBis.id = tdPhase.value + "Ende" + hilfeTheorie;
        hilfeTheorie++;
    } else if(tdPhase.value=="Praxis"){
        tdVon.id = tdPhase.value + hilfePraxis;
        tdBis.id = tdPhase.value + "Ende" + hilfePraxis;
        hilfePraxis++;
    }
    

    //hinzufügen der Spalten //
    neueTr.appendChild(tdPhase);
    neueTr.appendChild(tdVon);
    neueTr.appendChild(tdBis);
    neueTr.appendChild(tdStart);
    neueTr.appendChild(tdEnd);
    neueTr.appendChild(tdBearb);
    neueTr.appendChild(tdLoe);
}

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
export default Phasenuebersicht;