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