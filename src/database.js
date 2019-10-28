"use strict";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


class DB {
    constructor(){
        firebase.initializeApp({
            apiKey: "AIzaSyBdw7lnsl4RKO55NyYuWk9XKRQA7EfLosk",
            authDomain: "webprog-e7279.firebaseapp.com",
            databaseURL: "https://webprog-e7279.firebaseio.com",
            projectId: "webprog-e7279",
            storageBucket: "webprog-e7279.appspot.com",
            messagingSenderId: "782627340501",
            appId: "1:782627340501:web:aceab92777db6fa94ae25c",
            measurementId: "G-XJD9Z3CN1S"
        });
        this._db = firebase.firestore();
        this._students=this._db.collection("students");
    }

    createDemoData(){
        console.log("createDemoData");
        let students =  this.selectAllStudents();
        console.log(this._db.collection("students").get());

        //Festlegen von einigen Demodaten, wenn noch keine vorhanden sind
        if(students.length < 1){
            console.log("ifDemoDaten");
            this.saveStudents([{
                "Name" : "Sütterlin",
                "Vorname": "Martin",
                "Jahrgang": "2018",
                "Semester": "3.",
                "Hochschule": "DHBW",
                "Studiengang": "Wirtschaftsinformatik",
                "Geburtstag": "17.08.1997",
                "id": "375925",
                "Notizen":"Arbeitet ungern und unsauber"
            }, {
                "Name" : "Przasdbilla",
                "Vorname": "Adrian",
                "Jahrgang": "2018",
                "Semester": "3.",
                "Hochschule": "DHBW",
                "Studiengang": "Wirtschaftsinformatik",
                "Geburtstag": "25.02.1997",
                "id": "23497523",
                "Notizen":"Arbeitet langsam, aber ordentlich"
            }, {
                "Name" : "Haushälter",
                "Vorname": "Anika",
                "Jahrgang": "2018",
                "Semester": "3.",
                "Hochschule": "DHBW",
                "Studiengang": "Wirtschaftsinformatik",
                "Geburtstag": "27.07.1997",
                "id": "09234983",
                "Notizen":"Arbeitet prima und verdient eine Gehaltserhöhung"
            }]);
        }
        console.log("Daten erstellt");
        console.log(this._db.collection("students").get());
    }

    //Aufrufen aller vorhandenen Studenten
    selectAllStudents(){
        console.log("SelectAllStudents");
        let result = this._students.orderBy("Name").get();
        let students = [];

        result.forEach(entry => {
            let student = entry.data();
            students.push(student);
        });

        return students;
    }

    //Gibt einen Student anhand seiner ID zurück
    //Die ID ist dabei die Mitarbeiter-ID
    selectStudentById(id){
        let result =  this._students.doc(id).get();
        return result.data();
    }

    /*Speichern eines Studenten
    Der Aufbau sollte wie folgt aussehen:
    "Name" : "Nachname",
    "Vorname": "Vorname",
    "Jahrgang": "2018",
    "Semester": "3.",
    "Hochschule": "DHBW",
    "Studiengang": "Wirtschaftsinformatik",
    "Geburtstag": "17.08.1997",
    "id": "375925",
    "Notizen": "Notizen als String"*/
    saveStudent(student){
        this._students.doc(student.id).set(student);
    }

    //Student löschen, anhand der Mitarbeiter-Id
    deleteStudentById(id){
        return this._students.doc(id).delete();
    }

    //Speichern mehrerer Studenten
     saveBooks(students) {
        let batch = this._db.batch();

        students.forEach(student => {
            let dbStudent = this._students.doc(student.id);
            batch.set(dbStudent, student);
        });

        return batch.commit();
    }

    //löschen mehrerer Studenten anhand der Mitarbeiter-Id
     deleteStudentsById(ids){
        let batch = this._db.batch();

        ids.forEach(id => {
            let dbStudent = this._students.doc(id);
            batch.delete(dbStudent);
        });

        return batch.commit();
    }
}



export default DB;