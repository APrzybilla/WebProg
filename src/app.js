"use strict";
//Main Class of Application

import styelsheet from "./Index.css";

import Navigo from "../node_modules/navigo/lib/navigo.js";

import StartPage from "./Home.js";
import Phasenuebersicht from "./Phasen.js";
import Studentenuebersicht from "./Studenten.js";



class App{
    construtor(){
        this._currentURL._title="Studentenuebersicht";
        this._currentView = null;

        //Single Page Router initialisieren
        this._router = new Navigo();
        this._currentURL="";
        //Abfrage nach Abbruch durch den Nutzer
        this._navAborted = false;
        
        this._router.on({
            "/Studentenuebersicht/Home": () => this.showPage("Home"),
            "/Studentenuebersicht/Phasen": () => this.showPage("Phasen"),
            "/Studentenuebersicht/Studenten": () => this.showPage("Studenten")
        });

        this._router.hooks({
            after: (params) =>{
                if(!this._navAborted){
                    this._currentUrl = this._router.lastRouteResolved().url;
                } else {
                    this._router.pause(true);
                    this._router.navigate(this.currentUrl);
                    this._router.pause(false);
                    this._navAborted = false;
                }
            }
        });
    }

    start(){
        console.log("App ist gestartet");
        this._router.resolve();
    }

    showPage(name){
        console.log("showPage");
        let view;
        if(name=="Home"){
            view = new StartPage(this);
        } else if(name=="Phasen"){
            view = new Phasenuebersicht(this);
        } else if(name=="Studenten"){
            view = new Studenten(this);
        }
        this._switchVisibleView(view);
    }

    _switchVisibleView(view){
        console.log("switchView");
        let newUrl = this._router.lastRouteResolved().url;
        console.log(newUrl);
        let goon = () =>{
            this._router.navigate(newUrl + "?goon");
        }
            
        if(this._currentView && !this._currentView.onLeave(goon)){
            this._navAborted = true;
            return false;
        }

        this._currentView = view;
        this._switchVisibleContent(view.onShow());
        view.onLoad();
        return true;
    }

    _switchVisibleContent(content) {
        // <header> und <main> des HTML-Grundgerüsts ermitteln
        let app = document.querySelector("#app");
        let header = document.querySelector("#app > header");
        let main = document.querySelector("#app > main");
    
        // Zuvor angezeigte Inhalte entfernen
        // Bei der Topbar nur die untere Zeile, im Hauptbereich alles!
        app.className = "";
        header.querySelectorAll(".bottom").forEach(e => e.parentNode.removeChild(e));
        main.innerHTML = "";
    
        // CSS-Klasse übernehmen, um die viewspezifischen CSS-Regeln zu aktivieren
        if (content && content.className) {
            app.className = content.className;
        }
    
        // Neue Inhalte der Topbar einfügen
        if (content && content.topbar) {
            content.topbar.forEach(element => {
                element.classList.add("bottom");
                header.appendChild(element);
            });
        }
    
        // Neue Inhalte des Hauptbereichs einfügen
        if (content && content.main) {
            content.main.forEach(element => {
                main.appendChild(element);
            });
        }
        // Navigo an die Links in der View binden
        this._router.updatePageLinks();
        console.log("Page Links Updated");
        //end of _switchVisibleContent
    }
}

export default App;

        

        /*Title, wenn man will
        vor alles this.
        currentView=null oder aktuelle Seite 
        router = new Navigo
        currentURL
        navAborted = ob der Nutzer es abgebrochen hat
        dann router.on erstellung
        router.hooks = auf abrechen prüfen
        dann current url neu bestimmen
        wenn nicht zur currentUrl
        start(): Router.resolve()
        
        onShow Methode
        klonen von section
        onLoad
        onLeave: Formular, abfragen ob er verlassen will
        
        export default NameVonKlasse -> dass man es woanders importieren kann
        
        
        _switchVisibleView: sorgt dafür, dass es angezeigt wird
        URL holen
        this._router.updatePageLinks()*/