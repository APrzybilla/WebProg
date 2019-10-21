"use strict";

import stylesheet from "./new-receipe.css";

let _db = "";
let _app;

class NewReceipePage {
  constructor(app, id, action) {
    this._app = app;
    this._id = id;
    this._action = action;
    _db = this._app._db;
    _app = this._app;
  }

  onShow() {
    // Anzuzeigende HTML-Elemente ermitteln
    let section = document.querySelector("#new-receipe").cloneNode(true);

    return {
        className: "new-receipe",
        topbar: section.querySelectorAll("header > *"),
        main: section.querySelectorAll("main > *"),
    };
  }

  onLoad() {
    console.log('Page loaded');
    //Submit Funktion
    document.querySelector('#submit_button').addEventListener('click', submitEventListener);
    window.addEventListener('keydown', (event) => {
      if(event.key === "Enter") {
        event.preventDefault();
        submitEventListener(event);
      }
    });

    //Verlängere Input Funktion
    document.querySelectorAll('input.ingredient').forEach((ingredientElement) => {
      console.log(ingredientElement.placeholder);
      ingredientElement.addEventListener('input', ingredientEventListener);
    }
  )}

  onLeave(goon) {
    return true;
  }

  get title() {
    return "Neues Rezept";
  }
}

let ingredientEventListener = (event) => {
  let input = event.target;
  console.log(input.value);
  let thParent = input.parentElement;
  let trParent = thParent.parentElement;
  let table = trParent.parentElement;
  if(trParent.classList.contains('last-element')) {
    if(input.value!=='')
    {
      let dummyIngredient = document.querySelector('input.ingredient.dummy').cloneNode(true);
      let dummyAmount = document.querySelector('input.amount.dummy').cloneNode(true);
      let trChild = document.createElement('tr');
      let thChild = document.createElement('th');

      trParent.classList.remove('last-element');
      trChild.classList.add('last-element');

      thChild.appendChild(dummyIngredient);
      thChild.appendChild(dummyAmount);
      trChild.appendChild(thChild);
      document.querySelector('tbody').appendChild(trChild);
      console.log(dummyIngredient);

      dummyIngredient.addEventListener('input', ingredientEventListener);
    }
  }
}

let submitEventListener = (event) => {
  let receipeName = document.getElementById('receipe-name').value;
  let receipeAuthor = document.getElementById('receipe-author').value;
  if(receipeAuthor === '')
    receipeAuthor = 'anonym';

  let recipeIngredients = [];

  let allIngredientElements = document.querySelectorAll('input.ingredient');
  let allAmountElements = document.querySelectorAll('input.amount');
  for (let i = 1; i < allIngredientElements.length; i++) {
    if(allIngredientElements[i].value !== '') {
      recipeIngredients.push({"ingredient": allIngredientElements[i].value,
                            "amount": allAmountElements[i].value});
    }
  }
  let receipe = { "name": receipeName,
                  "author": receipeAuthor,
                  "ingredients": recipeIngredients};
  console.log(receipe);
  _db.addReceipe(receipe).then(() => window.location.href = '/my-receipes');

}

// let addEventListenerToIngredient = (ingredientElement) => {
//
// }

export default NewReceipePage;
