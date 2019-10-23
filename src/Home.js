import stylesheet from "./SUebersicht.css";

let _app="";

class StartPage{
    constructor(app){
        this._app = app;
        _app = this._app;
    }

    onShow(){
        let section = document.querySelector("#section_SUebersicht").cloneNode(true);

        return {
            className: "section_SUebersicht",
            main: section.querySelectorAll("section > *"),
        };
    };

    onLoad(){

    }

    onLeave(goon){
        return true;
    }
}

export default StartPage;