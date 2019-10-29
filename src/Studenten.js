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
    // Variablen mit oberstesElement und child werden deklariert
    let oberstesElement = document.getElementById(event.target.id).oberstesElementElement;
    let children = oberstesElement.children;
    // prüfen, ob auf- oder zugeklappt werden soll
    if(children[0].style.display == "none"){
        // alle aufklappen
        for(let i = 1; i < children.length; i++){
            children[i].style.display = "block";
        }
    }
    else{
        // alle zuklappen
        for(let i = 1; i < children.length; i++){
            children[i].style.display = "none";
        }
    }
}

function klapptabelle_erstellung(){
    // oberstesElement festlegen
    let oberstesElement = document.getElementById("studenten_tabelle");
    let buttoninhalt;
    let button;
    let i;
    let laenge;
    let ul;
    let li;
    let students = _db.selectAllStudents().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc){
            //console.log(doc.id, "=>", doc.data().Name);
            i=0;
            laenge = oberstesElement.children.length;
            ul = 'undefined';
            buttoninhalt = doc.data().Jahrgang;
            do{
                if(typeof oberstesElement.children[0] === 'undefined' || oberstesElement.children[i].id !== "button"+buttoninhalt && oberstesElement.children[i].type === 'button'){
                    // button erstellen
                    button = document.createElement("button");
                    button.type = "button";
                    button.id = "button"+buttoninhalt;
                    button.addEventListener('click', klapptabelle);
                    button.innerHTML = buttoninhalt;
                    oberstesElement.appendChild(button);
                    // liste erstellen
                    ul = document.createElement("ul");
                    ul.classList.add("inhalt");
                    ul.id = "ul"+buttoninhalt;
                    oberstesElement.appendChild(ul);
                    break;
                }
                i++;
            }while(i<laenge);

            if(typeof ul === 'undefined'){
                ul = oberstesElement.getElementById("ul" + buttoninhalt);
            }

            li = document.createElement("li");
            li.classList.add("inhalt");
            li.innerHTML = doc.data().vorname + " " + doc.data().name;
            ul.appendChild(li);
        });
    });
    //alt
    /*
    buttoninhalt = "2018";
    let button = document.createElement("button");
    button.type = "button";
    button.id = "button"+buttoninhalt;
    button.addEventListener('click', klapptabelle);
    button.innerHTML = buttoninhalt;
    oberstesElement.appendChild(button);
   

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
    oberstesElement.appendChild(ul);*/
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