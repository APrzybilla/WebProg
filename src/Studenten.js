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

function klapptabelle(event){
    // Variablen mit eltern und child werden deklariert
    let eltern = document.getElementById(event.target.id).parentElement;
    let kinder = eltern.children;
    // prüfen, ob auf- oder zugeklappt werden soll
    if(kinder[1].style.display == "none"){
        // alle aufklappen
        for(let i = 1; i < kinder.length; i++){
            kinder[i].style.display = "block";
        }
    }
    else{
        // alle zuklappen
        for(let i = 1; i < kinder.length; i++){
            kinder[i].style.display = "none";
        }
    }
}

function klapptabelle_erstellung(){
    // eltern festlegen
    let eltern = document.getElementById("studenten_tabelle");
    let buttoninhalt;
    let button;
    let i;
    let laenge;
    let ul;
    let li;
    let a;
    let students = _db.selectAllStudents().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc){
            //console.log(doc.id, "=>", doc.data().Name);
            i=0;
            laenge = eltern.children.length;
            buttoninhalt = doc.data().Jahrgang;
            do{
                if(typeof eltern.children[0] === 'undefined' || eltern.children[i].id !== "button"+buttoninhalt && eltern.children[i].type === 'button'){
                    // button erstellen
                    button = document.createElement("button");
                    button.type = "button";
                    button.id = "button"+buttoninhalt;
                    button.addEventListener('click', klapptabelle);
                    button.innerHTML = buttoninhalt;
                    eltern.appendChild(button);
                    // liste erstellen
                    ul = document.createElement("ul");
                    ul.classList.add("inhalt");
                    ul.id = "ul"+buttoninhalt;
                    eltern.appendChild(ul);
                    break;
                }
                i++;
            }while(i<laenge);

            ul = document.getElementById("ul" + buttoninhalt);
            li = document.createElement("li");
            li.classList.add("inhalt");
            a = document.createElement("a");
            a.href = "#";
            a.addEventListener('click', kurzprofilBefuellen);
            a.classList.add("inhalt");
            a.id = doc.data().id;
            a.innerHTML = doc.data().Vorname + " " + doc.data().Name;
            li.appendChild(a);
            ul.appendChild(li);
        });
    });
}

function kurzprofilBefuellen(event){
    let student = _db.selectStudentById(event.target.id);
    console.log(student);
    student.then(function(doc){
        console.log(doc.data().Nachname);
        document.querySelector("#profil_nachname label").innerHTML = doc.data().Nachname;
        document.querySelector("#profil_vorname label").innerHTML = doc.data().Vorname;
        document.querySelector("#profil_jahrgang label").innerHTML = doc.data().Jahrgang;
        document.querySelector("#profil_semester label").innerHTML = doc.data().Semester;
        document.querySelector("#profil_hochschule label").innerHTML = doc.data().Hochschule;
        document.querySelector("#profil_studiengang label").innerHTML = doc.data().Studiengang;
        document.querySelector("#profil_geburtstag label").innerHTML = doc.data().Geburtstag;
        document.querySelector("#profil_mitarbeiter_id label").innerHTML = doc.data().id;
        document.querySelector("#profil_notizen label").innerHTML = doc.data().Notizen;
    }).catch(function(error){
        console.log("Student nicht gefunden");
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