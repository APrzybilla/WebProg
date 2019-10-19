"use strict"

/*EventListener für Button Jahrgang hinzufügen */
document.getElementById("JahrgangHinzufuegen").addEventListener("click", () => {
    console.log("ad_row");
});

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