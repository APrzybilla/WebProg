import stylesheet from "./PUebersicht.css";

let _app="";

class Phasenuebersicht{
    constructor(app){
        this._app = app;
        _app = this._app;
    }

    onShow(){
        let section = document.querySelector("#section_PUebersicht").cloneNode(true);

        return {
            className: "section_PUebersicht",
            main: section.querySelectorAll("section > *"),
        };

    };

    onLoad(){

    }

    onLeave(goon){
        return true;
    }
}

export default Phasenuebersicht;