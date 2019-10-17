"use strict"

/*Jahrgang hinzufügen*/
document.querySelector('#JahrgangHinzufuegen').addEventListener('click', ad_row);

function ad_row(){
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