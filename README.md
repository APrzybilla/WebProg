Studentenübersicht für dual Studierende"
===============================

Kurzbeschreibung
----------------

Die Studentenübersicht soll Unternehmen unterstützen einen Überblick über alle Praxis- und Theoriephasen 
ihrer Studierenden zu bekommen. Durch farbliche Hervorhebung in einem dynamischen Kalender können die Phasenwechel 
schnell erkannt werden und Praxisphasen können rechtzeitig geplant werden. 
Für jeden Studierenden lässt sich ein individuelles Kurzprofil anlegen. Ebenfalls können Jahrgänge eingepflegt werden
mit den Daten der verschiedenen Phasenwechsel. Durch eine Verknüpfung dieser beiden Stellen, werden die Studierenden 
in einer großen Übersichtstabelle veranschaulicht

Die Studentenübersicht ist eine Browser App, die ohne einen Server
im Hintergrund komplett im Browser läuft. Es handelt sich dabei
um eine so genannte Single Page App, da die App nur einmal durch
Aufrufen der HTML-Datei gestartet und dann bis zum Verlassen der
App nicht wieder neugeladen wird.


Verwendete Technologien
-----------------------

Die App nutzt den Node Package Manager npm als Paketverwaltung. Auf diese
Weise werden der Application Bundler ParcelJS sowie eine Hand voll externe
Bibliotheken für die Anwendung installiert. 

Folgende Entwicklungswerkzeuge kommen zum Einsatz:

 * [Atom:](https://atom.io/) Spezieller Texteditor für Webentwickler und Programmierer
 * [git:](https://git-scm.com/") Versionsverwaltung zur gemeinsamen Arbeit am Quellcode
 * [npm:](https://nodejs.org/") Paketverwaltung zum automatischen Download abhängiger Bibliotheken
 * [Parcel:](https://parceljs.org/") Web Application Bundler und Entwicklungsserver
 * [Firebase:] (https://firebase.google.com/) Stellt Programmierschnittstellen für verschiedenen Plattformen bereit

Zusätzlich werden folgende Bibliotheken genutzt:

 * [Navigo:](https://github.com/krasimir/navigo) Single Page Router zur Vereinfachung der Navigation innerhalb der App
 * [PouchDB:](https://pouchdb.com/") Clientseitige NoSQL-Datenbank zum Speichern der Songtexte
 * [lyric-get:](https://github.com/rhnvrm/lyric-api") Kleine Bibliothek zur Suche von Songtexten im Internet
 * [Quill:](https://quilljs.com/") WYSIWYG-Editor zum Nachbearbeiten der Songtexte


Copyright
---------

Dieses Projekt ist lizenziert unter
[_Creative Commons Namensnennung 4.0 International_](http://creativecommons.org/licenses/by/4.0/)

© 2019 Adrian Przybilla, Anika Haushälter, Martin Sütterlin <br/>

E-Mail: [adrian_przybilla@web.de](mailto:adrian_przybilla@web.de) <br/>
Webseite: TODO
