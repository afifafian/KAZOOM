# KAZOOM
### Kazoom is an interactive website to make studying more fun and teachers can oversaw their progress and watch student live using WebRTC

# Technology

## Front-end
- React
- Apollo Client
- JWT
- Reactstrap
- Simple Peer

## Back-end
- Express
- Socket.io
- MongoDB
- JWT
- Jest
- Supertest
- Apollo Server
- GraphQL
- Redis
- WebRTC


# API Documentation

## Questions Endpoints:
1. GET    : /questions/
2. POST   : /questions/
3. DELETE : /questions/   
4. DELETE : /questions/:id
5. GET    : /template/
6. POST   : /template/
7. DELETE : /template/:id

## Users Endpoints:
1. GET    : /users/leaderboards
2. POST   : /users/register
3. POST  : /users/login
​
# Questions Endpoints

## GET /questions/
Request body:
​
```json
none
```
​
Response (200 - OK):
​
```json
[
  {
    "_id": "5f408865b0568519ecfe70dc",
    "question": "Berikut merupakan rumus untuk menentukan arus listrik",
    "choices": [
        {
            "answer": "I=V.R",
            "status": false
        },
        {
            "answer": "I=V/R",
            "status": true
        },
        {
            "answer": "I=V+R",
            "status": false
        },
        {
            "answer": "I=R/V",
            "status": false
        }
    ],
    "point": 1500
  },
  {...}
]
```
​
## POST /questions/
Request body:
​
```json
{
  "question": "Apakah air basah?",
  "choices": [
      {
        "answer": "Yup",
        "status": true
      },
      {
        "answer": "Terkadang",
        "status": false
      },
      {...},
  ],
  "point": 100
}
```
​
Response (201 - CREATED):
​
```json
{
  "_id": "5f408865b0568519ecfe70dc",
  "question": "Apakah air basah?",
  "choices": [
      {
        "answer": "Yup",
        "status": true
      },
      {
        "answer": "Terkadang",
        "status": false
      },
      {...},
  ],
  "point": 100
}
```

## DELETE : /questions/
Request body:
​
```json
none
```
​
Response (200 - OK):
​
​
```json
{
  "message": "Successfully Deleted Questions!"
}
```

## DELETE : /questions/:id
Request body:
​
```json
none
```
​
Response (200 - OK):
​
​
```json
{
  "message": "Successfully Deleted Questions!"
}
```

## GET /template/
Request body:
​
```json
none
```
​
Response (200 - OK):
​
```json
[
  {
    "_id": "5f44b8d80c77574692c08bcb",
    "title": "Soal B. Inggris",
    "questions": [
        {
          "question": "He .. born in 1990",
          "choices": [
              {
                  "answer": "were",
                  "status": false
              },
              {
                  "answer": "was",
                  "status": true
              },
              {...},
          ],
          "point": 1500
        },
        {...},
    ],
    "username": "5f411b4b51a0a820e115f58a"
  }
]
```

## POST /template/
Request body:
​
```json
[
  {
    "title": "Questions",
    "questions": [
        {
          "question": "Yes?",
          "choices": [
              {
                  "answer": "No",
                  "status": false
              },
              {
                  "answer": "Yes",
                  "status": true
              },
              {...},
          ],
          "point": 1500
        },
    ],
    "username": "johnDoe"
  }
]
```
​
Response (200 - OK):
​
```json
[
  {
    "_id": "5f44b8d80c77574692c08bcb",
    "title": "Questions",
    "questions": [
        {
          "question": "Yes?",
          "choices": [
              {
                  "answer": "No",
                  "status": false
              },
              {
                  "answer": "Yes",
                  "status": true
              },
              {...},
          ],
          "point": 1500
        },
    ],
    "username": "johnDoe"
  }
]
```

## DELETE /template/
Request body:
​
```json
none
```
​
Response (200 - OK):
​
```json
{
  "messages": "Successfully Deleted Template!"
}
```


# Question Error

## POST /question/

### These error indicating that each key is null and must be filled 

​
Response (400 - Bad Request)
```json
{
  "message": "Question must be filled!"
}
```
Response (400 - Bad Request)
```json
{
  "message": "Choices must be filled!"
}
```
Response (400 - Bad Request)
```json
{
  "message": "Point must be filled!"
}
```

## DELETE /question/

### This error appears if requested item didn't exist on server
​
Response (404 - Not Found)
```json
{
    "message": "Id Question is not found!"
}
```

## POST /template/

### These error indicating that each key is null and must be filled 

​
Response (400 - Bad Request)
```json
{
  "message": "Title must be filled!"
}
```
Response (400 - Bad Request)
```json
{
  "message": "Questions must be filled!"
}
```
Response (400 - Bad Request)
```json
{
  "message": "Id user must be filled!"
}
```

## Global Error

Response (500 - Internal Server Error)
```json
{
  "message": "error" 
}
```



# User Endpoints
## GET /users/leaderboards
Request body:
​
```json
none
```
​
Response (200 - OK):
​
```json
[
  {
    "_id" : "5f450bad3bebe16e36418e7d", 
    "username" : "freeman", 
    "password" : "password"
  },
  {
    "_id" : "6fe16e36418e7d5f450bad3b", 
    "username" : "giggs", 
    "password" : "password"
  },
  {...}
]
```
## GET /users/register
Request body:
​
```json
{
  "username": "gordon",
  "password" : "password"
}
```
​
Response (201 - Created):
​
```json
{
  "_id" : "5f450bad3bebe16e36418e7d", 
  "username" : "gordon", 
  "password" : "password"
}
```

## GET /users/login
Request body:
​
```json
{
  "username": "gordon",
  "password" : "password"
}
```
​
Response (200 - OK):
​
```json
{
  "token": "token"
}
```
# Users Error

## POST /users/register

### These error indicating that each key is null and must be filled 

Response (400 - Bad Request)
```json
{
  "message": "username cannot empty"
}
```

Response (400 - Bad Request)
```json
{
  "message": "password cannot empty"
}
```

### This error appears when username already registered

Response (400 - Bad Request)
```json
{
  "message": "this username already registered"
}
```

## POST /users/login

### This error appears when data input is not matched with database

Response (400 - Bad Request)
```json
{
  "message": "Invalid username or password"
}
```
## Global Error

Response (500 - Internal Server Error)
```json
{
  "message": "error" 
}
