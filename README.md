## Usage
```javascript
$ npm install
$ node app.js
```
Access server via `http://localhost:3000`<br>

## ENV Variables
```
JWT_SECRET=
DATABASE=
PROJECT_ID=
```
**DON'T FORGET TO INPUT YOUR ENV VARIABLES! It can be found in .env.example**


##  Routes
|Routes|HTTP|Header(s)|Body|Response|Description|
|:--:|:--:|:--:|:--:|:--:|:--:|
|/register  |POST  |none|email: String (**required**),  password: String (**required**)|**Success**: Register a user, **Error**: Internal server error (Validation)|Register a user|
|/login  |POST  |none|email: String (**required**), password: String (**required**) |**Success**: Login as a user, **Error**: Internal server error (Validation)|Login as a user|