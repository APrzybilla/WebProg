import stylesheet from "./Studenten.css";

let _app="";

class Studenten{
    constructor(app){
        this._app = _app;
        _app = this._app;
    }

    onShow(){
        let section = document.querySelector("#section_Studenten").cloneNode(true);

        return {
            className: "section_Studenten",
            main: section.querySelectorAll("section > *"),
        };
    };

    onLoad(){

    }

    onLeave(goon){
        return true;
    }
}

export default Studenten;