# scrum-poker-server — a firebase app for estimating youtrack tasks

The scrum-poker-server application is a webapp which can be used to list and estimate tasks within YouTrack. After all users log into the system using their Google account, the Scrum Master selects the developers who are taking part in sprint planning and selects a task. During the estimation phase a gravatar is displayed for each developer. Once all the developers have submitted an estimate, all the estimates are revealed at the same time.

The application is implemented as an Angular SPA which uses firebase to synchronize state across Scrum Master and Developer sessions. Firebase provide [hosting](https://www.firebase.com/docs/hosting/) so you can deploy the webapp directly to the firebase servers by using the *firebase-tool* which is installed through npm. This avoids the need to run any internal infrastructure.

This project is based on an application skeleton for a typical [AngularJS](http://angularjs.org/) web app. The original skeleton is [available here](https://github.com/angular/angular-seed).

There is an awesome Android app which will be made available...

[![Build Status](https://drone.antarcticgames.co.uk/api/badges/manicmonkey/scrum-poker-server/status.svg)](https://drone.antarcticgames.co.uk/manicmonkey/scrum-poker-server)
