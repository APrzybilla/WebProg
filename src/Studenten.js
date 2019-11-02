import stylesheet from "./Studenten.css";
import App from "./app.js";
import DB from "./database.js";
import { DH_UNABLE_TO_CHECK_GENERATOR } from "constants";

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

function klapptabelle_erstellung(){
    // eltern festlegen
    let eltern = document.getElementById("studenten_tabelle");
    let buttoninhalt, button, i, laenge, ul, li, a, hoechsterJahrgang = 0;
    let students = _db.selectAllStudentsByOrder("Jahrgang");

    students.then(function (querySnapshot) {
        querySnapshot.forEach(function (doc){
            buttoninhalt = doc.data().Jahrgang;
            
            // Es wird ein Button erstellt, wenn noch keiner für den Jahrgang vorhanden ist
            if(document.getElementById("button"+buttoninhalt) === null){
                // Listeneintrag für die Unterteilung in einen Jahrgang
                li = document.createElement("li");
                li.id = "li"+buttoninhalt;
                eltern.appendChild(li);

                // Unterteilung des Jahrgangs in Button und Inhalt
                ul = document.createElement("ul");
                ul.id = "ul" + buttoninhalt;
                ul.classList.add = "oberstesElement_tabelle";
                li.appendChild(ul);
                li = document.createElement("li");
                ul.appendChild(li);

                // button erstellen
                button = document.createElement("button");
                button.type = "button";
                button.id = "button"+buttoninhalt;
                button.classList.add("klapptabelle_button");
                button.addEventListener('click', klapptabelle);
                button.innerHTML = "<span class='fas fa-angle-right'></span> " + buttoninhalt;
                li.appendChild(button);
            }
        });
    });
    students.then(function (querySnapshot) {
        querySnapshot.forEach(function (doc){
            buttoninhalt = doc.data().Jahrgang;

            ul = document.getElementById("ul" + buttoninhalt);
            li = document.createElement("li");
            li.classList.add("inhalt");
            li.style.display = "none";
            a = document.createElement("a");
            a.href = "#";
            a.addEventListener('click', kurzprofilBefuellen);
            a.classList.add("inhalt");
            a.id = doc.data().id;
            a.innerHTML = "<span class='fas fa-pen'></span> " + doc.data().Vorname + " " + doc.data().Name;
            li.appendChild(a);
            ul.appendChild(li);
        });
    });
}

function klapptabelle(event){
    // Variablen mit eltern und child werden deklariert
    let eltern = document.getElementById(event.target.id).parentElement.parentElement;
    let kinder = eltern.children;
    // prüfen, ob auf- oder zugeklappt werden soll
    if(kinder[1].style.display == "none"){
        kinder[0].querySelector("span").className = "";
        kinder[0].querySelector("span").setAttribute("class", "fas fa-angle-down");
        // alle aufklappen
        for(let i = 1; i < kinder.length; i++){
            kinder[i].style.display = "block";
        }
    }
    else{
        kinder[0].querySelector("span").className = "";
        kinder[0].querySelector("span").setAttribute("class", "fas fa-angle-right")
        // alle zuklappen
        for(let i = 1; i < kinder.length; i++){
            kinder[i].style.display = "none";
        }
    }
}

function kurzprofilBefuellen(event){
    let students = _db.selectAllStudents().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc){
            if(doc.data().id == event.target.id){
                document.querySelector("#profil_nachname").parentElement.children[1].innerHTML = doc.data().Name;
                document.querySelector("#profil_vorname").parentElement.children[1].innerHTML = doc.data().Vorname;
                document.querySelector("#profil_jahrgang").parentElement.children[1].innerHTML = doc.data().Jahrgang;
                document.querySelector("#profil_semester").parentElement.children[1].innerHTML = doc.data().Semester;
                document.querySelector("#profil_hochschule").parentElement.children[1].innerHTML = doc.data().Hochschule;
                document.querySelector("#profil_studiengang").parentElement.children[1].innerHTML = doc.data().Studiengang;
                document.querySelector("#profil_geburtstag").parentElement.children[1].innerHTML = doc.data().Geburtstag;
                document.querySelector("#profil_mitarbeiter_id").parentElement.children[1].innerHTML = doc.id;
                document.querySelector("#profil_notizen").parentElement.children[1].innerHTML = doc.data().Notizen;
            }
        });
    });
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