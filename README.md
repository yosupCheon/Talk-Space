# Login-Chatting-App

## Overview
This is a plan for Login-Chatting web app.

## Fundamental User Story:
- a user can login with their credential
- a user can create an account
- a user can login -> create a room
- a user can login -> join a room
- users can communicate real-time

## Tech Stacks
#### Frontend
- HTML/CSS/Javascript
- React (Typescript)
#### Backend
- Node
- Express
- Typescript
- Websocket.io
- JWT Session (maybe later)
#### Database
- MySQL
#### Server
- host server, maybe cloud, but for now test on ngrok
- what is nginx

## API Endpoints + Socket communication
#### login (username=String, password=String)
- POST request
- check with db
- return 200 and token session for later header?
- else 400
#### create_account (username=String, password=String)
- POST request
- save it to the db
- return 200 if success else 400
#### update_account (username=String, password=String)
- PUT OR PATCH request
- update a user info in db
- return 200 if success else 400
#### delete_account (username=String, password=String)
- DELETE request
- delete a user's account in db
- return 200 if success else 400

#### create_room (Websocket vs Socket io)
- io.on(connect)...
- create room in db
- socket.join()
- send msg
#### join_room
- io.on(connect)... 
- socket.join()
- send msg
- if room is full -> msg:”room is full!”

## DATABASE Table (MySQL)
### User (add delete and update to api endpoints)
| Column Name | Data Type | Constraints                |
|-------------|-----------|----------------------------|
| id         | INT       | PRIMARY KEY, AUTO_INCREMENT | 
| username    | VARCHAR(50) | NOT NULL     |
| password(hash?)    | VARCHAR(50) | NOT NULL     |
### Room
| Column Name | Data Type | Constraints                |
|-------------|-----------|----------------------------|
| id         | INT       | PRIMARY KEY, AUTO_INCREMENT | 
| username    | STRING OR INT | NOT NULL     |
| room_occupy| INT | CHECK (CONTAINS <= 2)|


## TODO:
- ~~Documenting use story and tech stacks~~
- ~~create github project and push~~
- ~~create and design API end-points~~
- ~~database design~~
- pages for frontend
- coding
