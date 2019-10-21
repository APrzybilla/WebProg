"use strict";

import stylesheet from "./start-page.css";

let _app = "";
let _db = "";

class StartPage {
  constructor(app) {
    this._app = app;
    _app = this._app;
    _db = app._db;
  }

  onShow() {
    // Anzuzeigende HTML-Elemente ermitteln
    let section = document.querySelector("#start-page").cloneNode(true);

    return {
        className: "start-page",
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
    return "Was gibt es zu essen?";
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
  let ingredients = [];

  let allIngredientElements = document.querySelectorAll('input.ingredient');
  for (let i = 1; i < allIngredientElements.length; i++) {
    if(allIngredientElements[i].value !== '') {
      ingredients.push(allIngredientElements[i].value);
    }
  }
  console.log(ingredients);
  _db.getAllReceipes().then(function(querySnapshot) {
        console.log('Query successful');
        let resultList = [];
        //Iteriere durch alle gefunden Rezepte
        querySnapshot.forEach(function(doc) {
          let receipeIngredients = doc.data().ingredients;
          if(isTheReceipePossible(receipeIngredients, ingredients))
            resultList.push({'name': doc.data().name,
                              'id': doc.id});
        });
        console.log(resultList);
        if(resultList.length === 0)
        {
          alert("Leider kannst du damit nichts kochen.");
          return;
        }
        window.location.href = '/show?id=' + resultList[Math.floor(Math.random() * resultList.length)].id;
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

let isTheReceipePossible = (receipe, ingredients) =>
{
  //Iteriere durch alle Zutaten im Rezept
  let ingredientsNeeded = receipe.length;
  let ingredientsAvailable = 0;
  receipe.forEach((receipeIngredient) => {
    //console.log(doc.data());
    //Iteriere durch alle Zutaten im Kühlschrank
    ingredients.forEach((ingredient) => {
      console.log("Checking if " + ingredient + " is contained in " + receipeIngredient.ingredient);
      if(receipeIngredient.ingredient === ingredient && ingredient !== '') {
        ingredientsAvailable++;
        console.log('Found ' + ingredient);
        return;
      }
    });
  });
  return ingredientsNeeded === ingredientsAvailable;
}

export default StartPage;
