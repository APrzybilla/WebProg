"use strict";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const _firebaseConfig = {
apiKey: "AIzaSyAeJRRsnbD9MxTN5ENFDa4ULP1cDOVSEho",
authDomain: "foodhelper-1b254.firebaseapp.com",
databaseURL: "https://foodhelper-1b254.firebaseio.com",
projectId: "foodhelper-1b254",
storageBucket: "",
messagingSenderId: "19921560329",
appId: "1:19921560329:web:d0882d74479ec8914029d8"
};

let _db = "";

class DB {
  constructor() {
    firebase.initializeApp(_firebaseConfig);
    _db = firebase.firestore();
  }

  addReceipe(receipe)
  {
    return _db.collection("receipes").add(receipe);
  }

  getAllReceipes()
  {
    return _db.collection("receipes").get();
  }

  getReceipe(id)
  {
    return _db.collection("receipes").doc(id).get();
  }

  deleteReceipe(id)
  {
    return _db.collection("receipes").doc(id).delete();
  }

  findPossibleReceipes(ingredients)
  {
    return true;
  }
}

export default DB;
