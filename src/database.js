"use strict";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const _firebaseConfig = {
    apiKey: "AIzaSyBdw7lnsl4RKO55NyYuWk9XKRQA7EfLosk",
    authDomain: "webprog-e7279.firebaseapp.com",
    databaseURL: "https://webprog-e7279.firebaseio.com",
    projectId: "webprog-e7279",
    storageBucket: "webprog-e7279.appspot.com",
    messagingSenderId: "782627340501",
    appId: "1:782627340501:web:aceab92777db6fa94ae25c",
    measurementId: "G-XJD9Z3CN1S"
}; 

let _db = "";

class DB {
    constructor(){
        firebase.initializeApp(_firebaseConfig);
        _db = firebase.firestore();
    }

    addStudent(student){
        return _db.collection("Student").add(student);
    }

    getAllStudents(){
        return _db.collection("Student").get();
    }
}



export default DB;