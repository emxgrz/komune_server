# Komune Backend

This repository is a Node.js-based backend server created to feed data into the React Application below.

[Client Repo here](#https://github.com/emxgrz/komune_client)  
[Server Repo here](#https://github.com/emxgrz/komune_client)

## Server Structure

### Collections

#### User
{
  "username": "string",
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "dateOfBirth": "date",
  "location": {
    "city": "string",
    "country": "string"
  },
  "description": "string",
  "image": "string (URL)"
}

#### Work

{
  "title": "string",
  "description": "string",
  "skills": ["string"],
  "professional": "User reference",
  "status": "string"
}

#### Transaction
{
  "workId": "Work reference",
  "clientId": "User reference",
  "status": "string",
  "date": "date",
  "price": "number"
}

#### Review
{
  "text": "string",
  "rating": "number",
  "transactionId": "Transaction reference",
  "reviewerId": "User reference"
}


## Used API Endpoints
## Used API Endpoints in the App

| HTTP Method | URL                                | Request Body                            | Description                                        |
|-------------|------------------------------------|-----------------------------------------|----------------------------------------------------|
| **GET**     | `/users`                           |                                         | Sends all users                                    |
| **GET**     | `/users/:userId`                  |                                         | Sends details of a specific user                   |
| **POST**    | `/users`                           | `{username, email, password, ...}`     | Creates a new user                                 |
| **PUT**     | `/users/:userId`                  | `{firstName, lastName, ...}`           | Edits a user profile                               |
| **DELETE**  | `/users/:userId`                  |                                         | Deletes a user                                     |
| **GET**     | `/works`                           |                                         | Sends all works                                    |
| **POST**    | `/works`                           | `{title, description, skills, ...}`     | Creates a new work                                 |
| **GET**     | `/works/:workId`                  |                                         | Sends details of a specific work                   |
| **PUT**     | `/works/:workId`                  | `{title, description, status, ...}`     | Edits a work object                                |
| **DELETE**  | `/works/:workId`                  |                                         | Deletes a work object                              |
| **GET**     | `/transactions`                    |                                         | Sends all transactions                             |
| **POST**    | `/transactions`                    | `{workId, clientId, status, date, ...}` | Creates a new transaction                          |
| **GET**     | `/transactions/:transactionId`     |                                         | Sends details of a specific transaction            |
| **GET**     | `/reviews`                         |                                         | Sends all reviews                                  |
| **POST**    | `/reviews`                         | `{text, rating, transactionId, ...}`    | Creates a new review                               |


