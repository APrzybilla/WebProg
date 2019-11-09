"use strict"; 

import stylesheet from "./app.css";

import Navigo from "../node_modules/navigo/lib/navigo.js";
import DB from "./database.js";

import Studenten from "./Studenten.js";
import Phasenuebersicht from "./PUebersicht.js";
import StartPage from "./SUebersicht.js";

class App {
    constructor(){
        this._title = "Studentenübersicht";
        this._currentView = null;

        this._router = new Navigo();
        this._currentUrl = "/Home";
        this._navAborted = false;
        this._db = new DB();
        this._db.createDemoData();

        this._router.on({
            "/":            () => this.showMainPage(),
            "/Home":        () => this.showMainPage(),
            "/Phasen":      () => this.showPhasenPage(),
            "/Studenten":   () => this.showStudentenPage(),
            "/Studenten/*": () => this.showStudentenPage()
        });

        this._router.hooks({
            after: (params) => {
                if(!this._navAborted) {
                    this._currentUrl = this._router.lastRouteResolved().url;
                } else {
                    this._router.pause(true);
                    this._router.navigate(this._currentUrl);
                    this._router.pause(false);
                    this._navAborted = false;
                }
            }
        });
    }

    start() {
        this._router.resolve();
    }

    showMainPage(){
        let view = new StartPage(this);
        this._switchVisibleView(view);
        document.querySelector("nav").children[0].classList.add("bold");
        document.querySelector("nav").children[1].classList.remove("bold");
        document.querySelector("nav").children[2].classList.remove("bold");
    }

    showPhasenPage(){
        let view = new Phasenuebersicht(this);
        this._switchVisibleView(view);
        document.querySelector("nav").children[0].classList.remove("bold");
        document.querySelector("nav").children[1].classList.add("bold");
        document.querySelector("nav").children[2].classList.remove("bold");
    }

    showStudentenPage(){
        let view = new Studenten(this);
        this._switchVisibleView(view);
        document.querySelector("nav").children[0].classList.remove("bold");
        document.querySelector("nav").children[1].classList.remove("bold");
        document.querySelector("nav").children[2].classList.add("bold");
    }

    _switchVisibleView(view) {
        let newUrl = this._router.lastRouteResolved().url;
        let goon = () => {
            this._router.navigate(newUrl + "?goon");
        }

        if(this._currentView && !this._currentView.onLeave(goon)) {
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
        let main = document.querySelector("#app > main");

        // Zuvor angezeigte Inhalte entfernen
        // Bei der Topbar nur die untere Zeile, im Hauptbereich alles!
        app.className = "";
        main.innerHTML = "";

        // CSS-Klasse übernehmen, um die viewspezifischen CSS-Regeln zu aktivieren
        if (content && content.className) {
            app.className = content.className;
        }

        // Neue Inhalte des Hauptbereichs einfügen
        if (content && content.main) {
            content.main.forEach(element => {
                main.appendChild(element);
            });
        }
        // Navigo an die Links in der View binden
        this._router.updatePageLinks();
    }

    
}

export default App;