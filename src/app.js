"use strict";

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
        this._currentUrl = "";
        this._navAborted = false;
        this._db = new DB();

        this._router.on({
            "/Home":        () => this.showMainPage(),
            "/Phasen":      () => this.showPhasenPage(),
            "/Studenten":   () => this.showStudentenPage()
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
        console.log("App started successfully :)");
        this._router.resolve();
    }

    showMainPage(){
        let view = new StartPage(this);
        this._switchVisibleView(view);
    }

    showPhasenPage(){
        let view = new Phasenuebersicht(this);
        this._switchVisibleView(view);
    }

    showStudentenPage(){
        let view = new Studenten(this);
        this._switchVisibleView(view);
    }

    _switchVisibleView(view) {
        let newUrl = this._router.lastRouteResolved().url;
        console.log(newUrl);
        let goon = () => {
            this._router.navigate(newUrl + "?goon");
        }

        if(this._currentView && !this._currentView.onLeave(goon)) {
            console.log("Navigation aborted");
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
        //let header = document.querySelector("#app > header");
        let main = document.querySelector("#app > main");

        // Zuvor angezeigte Inhalte entfernen
        // Bei der Topbar nur die untere Zeile, im Hauptbereich alles!
        app.className = "";
        //header.querySelectorAll(".bottom").forEach(e => e.parentNode.removeChild(e));
        main.innerHTML = "";

        // CSS-Klasse übernehmen, um die viewspezifischen CSS-Regeln zu aktivieren
        if (content && content.className) {
            app.className = content.className;
        }

        // Neue Inhalte der Topbar einfügen
        /*if (content && content.topbar) {
            content.topbar.forEach(element => {
                element.classList.add("bottom");
                header.appendChild(element);
            });
        }*/

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