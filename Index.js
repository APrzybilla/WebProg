function suchen(){
    console.log("test");
    var tabellen_id = "ueberschrift_Tabelle";
    var trhtml = document.getElementById(tabellen_id).insertRow(3);
    var tdhtml1 = document.createElement("ul");
    var tdhtml2 = document.createElement("li");
    var tdhtml3 = document.createElement("li");
    var tdhtml4 = document.createElement("li");
    tdhtml1.innerHTML = 'test';
    tdhtml2.innerHTML = 'test';
    tdhtml3.innerHTML = 'test';
    tdhtml4.innerHTML = 'test';
    trhtml.appendChild(tdhtml1);
    trhtml.appendChild(tdhtml2);
    trhtml.appendChild(tdhtml3);
    trhtml.appendChild(tdhtml4);
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