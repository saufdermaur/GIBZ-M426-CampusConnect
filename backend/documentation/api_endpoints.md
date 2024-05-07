# API Endpoint Documentation

## Examples

### Template for New Endpoints

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/example-route`                              |
| **HTTP Method**   | POST/GET/PUT/DELETE                           |
| **Headers**       | `Content-Type`: application/json              |
| **Query Parameters** | `param1` (type): Description             |
|                   | `param2` (type): Description                  |
| **Request Body**  | `{ "key1": "value1", "key2": "value2" }`      |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "responseKey1": "responseData1", "responseKey2": "responseData2" }` |
| **Error Response**| **Code**: 400 Bad Request                     |
|                   | **Content**: `{ "error": "errorDescription" }`|
| **Description**   | Provide a brief description of what the endpoint is used for and any additional information relevant to the endpoint's functionality. |

### Example: Hello World

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/`                                           |
| **HTTP Method**   | GET                                           |
| **Headers**       | `Content-Type`: text/plain                    |
| **Query Parameters** | None                                      |
| **Request Body**  | None                                          |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `Hello World!`                   |
| **Error Response**| None                                          |
| **Description**   | This endpoint provides a simple "Hello World!" message. It is used to demonstrate a basic GET request in the application and does not require any authentication or input parameters. Utilizes CORS to allow cross-origin requests. |

## Account Endpoints

### Login

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/api/account/login`                          |
| **HTTP Method**   | POST                                          |
| **Headers**       | `Content-Type`: application/json              |
| **Query Parameters** | None                                      |
| **Request Body**  | `{ "email": "example@example.com", "password": "yourPassword" }` |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "message": "Login successful", "token": "jwtTokenHere" }` |
| **Error Response**| **Code**: 401 Unauthorized                   |
|                   | **Content**: `{ "error": "Invalid credentials" }` |
|                   | **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Account not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | This endpoint authenticates a user by email and password, issuing a JWT upon successful authentication. |

### Change Password

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/api/account/change-password`                |
| **HTTP Method**   | POST                                          |
| **Headers**       | `Content-Type`: application/json              |
| **Query Parameters** | None                                      |
| **Request Body**  | `{ "accountId": "UUID", "oldPassword": "oldPass", "newPassword": "newPass" }` |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "message": "Password successfully updated" }` |
| **Error Response**| **Code**: 401 Unauthorized                   |
|                   | **Content**: `{ "error": "Old password does not match" }` |
|                   | **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Account not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Allows users to change their password after verifying the old password. |

### Create Account

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/api/account/create-account`                 |
| **HTTP Method**   | POST                                          |
| **Headers**       | `Content-Type`: application/json              |
| **Query Parameters** | None                                      |
| **Request Body**  | `{ "firstName": "John", "lastName": "Doe", "email": "johndoe@example.com", "password": "yourPassword" }` |
| **Success Response** | **Code**: 201 Created                    |
|                   | **Content**: `{ "message": "Account created successfully" }` |
| **Error Response**| **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | This endpoint allows for the creation of a new account with first name, last name, email, and password. |
