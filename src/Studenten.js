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
    let profil_nachname = document.getElementById("profil_nachname").value;
    let profil_vorname = document.getElementById("profil_vorname").value;
    let profil_jahrgang = document.getElementById("profil_jahrgang").value;
    let profil_semester = document.getElementById("profil_semester").value;
    let profil_hochschule = document.getElementById("profil_hochschule").value;
    let profil_studiengang = document.getElementById("profil_studiengang").value;
    let profil_geburtstag = document.getElementById("profil_geburtstag").value;
    let profil_mitarbeiter_id = document.getElementById("profil_mitarbeiter_id").value;
    let profil_notizen = document.getElementById("profil_notizen").value;

    saveStudent(
        {
            "Name" : profil_nachname,
            "Vorname": profil_vorname,
            "Jahrgang": profil_jahrgang,
            "Semester": profil_semester,
            "Hochschule": profil_hochschule,
            "Studiengang": profil_studiengang,
            "Geburtstag": profil_geburtstag,
            "id": profil_mitarbeiter_id,
            "Notizen": profil_notizen
        }
    );
}

export default Studenten;