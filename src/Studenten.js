import stylesheet from "./Studenten.css";

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

export default Studenten;