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
        this._phasen = this._db.collection("phasen");
    }

     createDemoData(){
        let students =  this.selectAllStudents();

        //Festlegen von einigen Demodaten, wenn noch keine vorhanden sind
        if(students.length < 1){
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
                "Name" : "Pshszsjvdjdjfjrbilla",
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
                "Geburtstag": "27.07.1999",
                "id": "09234983",
                "Notizen":"Arbeitet prima und verdient eine Gehaltserhöhung"
            }]);
        }
    }

    //Aufrufen aller vorhandenen Studenten
    selectAllStudents(){
        return this._db.collection("students").get();
    }

    //Aufrufen aller Studenten, sortiert nach dem übergebenen Kriterium (z.B. Name, Vorname, etc)
    selectAllStudentsByOrder(order){
        return this._db.collection("students").orderBy(order).get();
    }

    selectAllStudentsByOrderBackwards(order){
        return this._db.collection("students").orderBy(order, "desc").get();
    }

    //Gibt einen Student anhand seiner ID zurück
    //Die ID ist dabei die Mitarbeiter-ID
    selectStudentById(id){
        return this._students.doc(id).get();
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
     saveStudents(students) {
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

    /*Anlegen eines neuen Jahrgangs
    Der Aufbau sollte wie folgt aussehen:
    "Theorie1" : "Startdatum",
    "Theorie2": "Startdatum",
    "Theorie3": "Startdatum",
    "Theorie4": "Startdatum.",
    "Theorie5": "Startdatum",
    "Theorie6": "Startdatum",
    "Praxis1": "Startdatum",
    "Praxis2": "Startdatum",
    "Praxis3": "Startdatum",
    "Praxis4": "Startdatum",
    "Praxis5": "Startdatum",
    "Praxis6": "Startdatum",
    "EndeLetztePhase": "Enddatum",
    "id": "StudiengangJahrgang"*/
    savePhase(phase){
        this._phasen.doc(phase.id).set(phase);
    }

    selectAllPhases(){
        return this._db.collection("phasen").get();
    }
}



export default DB;