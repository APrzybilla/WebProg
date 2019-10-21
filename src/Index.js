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

/* Navigo; erstmal ignorieren */
/*
var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);
*/