"use strict";

import stylesheet from "./receipe-page.css";

let _db = "";

class ReceipePage {
  constructor(app, id, action) {
    this._app = app;
    this._id = id;
    this._action = action;
    _db = this._app._db;
  }

  onShow() {
    // Anzuzeigende HTML-Elemente ermitteln
    let section = document.querySelector("#receipe-page").cloneNode(true);

    console.log("Recept loading with Action " + this._action);

    if(this._action == "display")
    {
      _db.getReceipe(this._id).then(function(doc)
      {
        console.log("Receipes loaded");
        onFinishedLoading(doc);
      });
    }

    else if(this._action == "edit")
    {
        document.getElementsByTagName("h1")[0].setAttribute("style","display:none");
        location.reload();
    }

    else if(this._action == "new")
    {
        document.getElementsByTagName("h1")[0].setAttribute("style","color:black !important");
    }



    return {
        className: "receipe-page",
        topbar: section.querySelectorAll("header > *"),
        main: section.querySelectorAll("main > *"),
    };
  }

  onLoad()
  {
    return;
  }

  onLeave(goon) {
    return true;
  }

  get title() {
    if(this._id!="")
    {
      return "Rezept Nummer " + this._id;
    }
    return "Neues Rezept";
  }
}

let onFinishedLoading = (doc) => {
  console.log('Finished Loading');
  let name = document.querySelector('h1').textContent = doc.data().name;
  document.querySelector('author').textContent = "Veröffentlicht von " + doc.data().author;

  console.log(document.getElementsByTagName("h1")[0].textContent);

  let table = document.getElementById("ingredients-table");

  doc.data().ingredients.forEach((ingredient, array, index) => {
    let ingredientElement = document.createElement("tr");
    ingredientElement.textContent = ingredient.ingredient;
    table.appendChild(ingredientElement);
  })

  table.classList.add("visible");
}

export default ReceipePage;
