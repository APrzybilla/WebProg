function suchen(){
    console.log("test");
    /*Einfügen von neue Zeile an erster Stelle in der Tabelle*/
    let neueTr = document.getElementById("Phasentabelle").insertRow(1);
        
    for(let i = 1; i<53; i++){
        /*erzeugen der Tabellenspalten*/ 
        let tdKW = document.createElement("td");

        /*hinzufügen der Spalten */
        neueTr.appendChild(tdKW);

        /*Hinzufügen von Klasse "KWs"*/
        tdKW.classList.add("KWs");
    }
        
    /*
    let auswahl;
    if(document.getElementById("checkbox_dhbw").checked && document.getElementById("checkbox_thm").checked){
        auswahl = 2;
    }
    elseif(document.getElementById("checkbox_dhbw").checked){
        auswahl = "dhbw";
    }
    elseif(document.getElementById("checkbox_thm").checked){
        auswahl = "thm";
    }
    else{
        auswahl = 0;
    }
    */
}
/*
function neueZeile(){
    var nummer = 1;
    var tabellen_id = "t1";
    var trhtml = document.getElementById("tabelleUebersicht").insertRow(nummer);
    var tdhtml1 = document.createElement("td");
    var tdhtml2 = document.createElement("td");
    var tdhtml3 = document.createElement("td");
    tdhtml1.innerHTML = 'test';
    tdhtml2.innerHTML = 'test';
    tdhtml3.innerHTML = 'test';
    trhtml.appendChild( tdhtml1 );
    trhtml.appendChild( tdhtml2 );
    trhtml.appendChild( tdhtml3 );
}*/