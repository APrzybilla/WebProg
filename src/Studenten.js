import stylesheet from "./Studenten.css";
import App from "./app.js";
import DB from "./database.js";

let _app="";
let _db ="";

class Studenten{
    constructor(app){
        this._app = _app;
        _app = this._app;
        _db = app._db;
    }

    onShow(){
        let section = document.querySelector("#section_Studenten").cloneNode(true);

        return {
            className: "section_Studenten",
            main: section.querySelectorAll("section > *"),
        };
    };

    onLoad(){
        klapptabelle_erstellung();
        document.getElementById("neuerStudent").addEventListener("click", studentHinzufuegen);
    }

    onLeave(goon){
        return true;
    }
}

function klapptabelle(aufrufender){
    console.log("klapptabelle");
    // Variable wird von mehreren Seiten aufgerufen
    // Variablen mit parent und child werden deklariert
    let parent = document.getElementById(aufrufender.id).parentElement;
    let children = parent.getElementsByClassName("inhalt");
    // prüfen, ob auf- oder zugeklappt werden soll
    if(children[0].style.display == "none"){
        // alle aufklappen
        for(let i = 0; i < children.length; i++){
            children[i].style.display = "block";
        }
    }
    else{
        // alle zuklappen
        for(let i = 0; i < children.length; i++){
            children[i].style.display = "none";
        }
    }
}

function klapptabelle_erstellung(){
    // parent festlegen
    let parent = document.getElementById("studenten_tabelle");

    // in zukunft mit schleifen arbeiten damit die daten variabel hinzugefügt werden können
    // button erstellen
    parent.innerHTML += '<button type="button_2018" id="button" onclick="klapptabelle(this)">2018</button>"';
    /* Button lässt sich, wie hier geschrieben, leider kein onclick mitgeben --> Saß fragen
    let buttoninhalt = tabelle.querySelector("ul").querySelector("span").innerHTML
    let button = document.createElement("button");
    button.classList.add("inhalt");
    button.type = "button";
    button.id = "button"+buttoninhalt;
    button.onclick = "klapptabelle(this)";
    button.innerHTML = buttoninhalt;
    parent.appendChild(button);
    */

    // inhalt erstellen
    let ul = document.createElement("ul");
    ul.classList.add("inhalt");
        let li = document.createElement("li");
        li.classList.add("inhalt");
        li.innerHTML = "Anika" + " " + "Haushälter";
    ul.appendChild(li);
        li = document.createElement("li");
        li.classList.add("inhalt");
        li.innerHTML = "Martin" + " " + "Sütterlin";
    ul.appendChild(li);
        li = document.createElement("li");
        li.classList.add("inhalt");
        li.innerHTML = "Adrian" + " " + "Przybilla";
    ul.appendChild(li);
    parent.appendChild(ul);

    // florian fragen warum es nicht geht
    document.getElementById("button_2018").addEventListener("click", klapptabelle(this));
}

function studentHinzufuegen(){

    _db.saveStudent(
        {
            "Name" : document.getElementById("profil_nachname").value,
            "Vorname": document.getElementById("profil_vorname").value,
            "Jahrgang": document.getElementById("profil_jahrgang").value,
            "Semester": document.getElementById("profil_semester").value,
            "Hochschule": document.getElementById("profil_hochschule").value,
            "Studiengang": document.getElementById("profil_studiengang").value,
            "Geburtstag": document.getElementById("profil_geburtstag").value,
            "id": document.getElementById("profil_mitarbeiter_id").value,
            "Notizen": document.getElementById("profil_notizen").value
        }
    );

    resetProfilfelder();

    //onClick="studentHinzufuegen();">
}

function resetProfilfelder(){

    document.getElementById("profil_nachname").value="";
    document.getElementById("profil_vorname").value="";
    document.getElementById("profil_jahrgang").value="";
    document.getElementById("profil_semester").value="";
    document.getElementById("profil_hochschule").value="";
    document.getElementById("profil_studiengang").value="";
    document.getElementById("profil_geburtstag").value="";
    document.getElementById("profil_mitarbeiter_id").value="";
    document.getElementById("profil_notizen").value="";
}

export default Studenten;