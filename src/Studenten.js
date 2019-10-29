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
        console.log("zu");
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
            li.innerHTML = doc.data().Vorname + " " + doc.data().Name;
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
    eltern.appendChild(button);
   

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
    eltern.appendChild(ul);*/
}

export default Studenten;