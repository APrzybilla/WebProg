"use strict"


window.addEventListener("load", () => {
    console.log("Load");

    /*EventListener vom Button "Jahrgang hinzufügen" */
    document.getElementById("JahrgangHinzufuegen").addEventListener("click", () =>{
        console.log("Jahrgang Listener");
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





/*Jahrgang hinzufügen*/

/*function ad_row(){
    let nummer = 1;
    let tabellen_id = "TabellePhasen";
    let trhtml = document.getElementById( tabellen_id ).insertRow( nummer );
    let tdhtml1 = document.createElement( "td" );
    let tdhtml2 = document.createElement( "td" );
    let tdhtml3 = document.createElement( "td" );
    if (document.getElementById('DH').checked) {
        tdhtml1.innerHTML = document.getElementById('DH').value;
    }
    else{
        tdhtml1.innerHTML = document.getElementById('THM').value;
    }
    tdhtml2.innerHTML = document.getElementById('EingabeStudiengang').value;
    tdhtml3.innerHTML = document.getElementById('EingabeJahrgang').value;
    trhtml.appendChild( tdhtml1 );
    trhtml.appendChild( tdhtml2 );
    trhtml.appendChild( tdhtml3 );
}

function reset (){
    $("#EingabeJahrgang").val("");
    $("#EingabeStudiengang").val("");
    $("input[name='Uni']:checked").prop("checked", false);
    $("#NeuePhase").html("");
}
*/