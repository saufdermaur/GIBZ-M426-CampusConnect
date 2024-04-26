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

## User Endpoints

### Login Endpoint

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/api/users/login`                            |
| **HTTP Method**   | POST                                          |
| **Headers**       | `Content-Type`: application/json              |
| **Query Parameters** | None                                        |
| **Request Body**  | `{ "Email": "example@example.com", "PasswordHash": "your_password" }` |
| **Success Response** | **Code**: 200 OK                           |
|                   | **Content**: `{ "message": "Login successful", "token": "JWT_Token_here" }` |
| **Error Response**| **Code**: 401 Unauthorized                    |
|                   | **Content**: `{ "error": "Invalid credentials" }` |
|                   | **Code**: 403 Forbidden                       |
|                   | **Content**: `{ "message": "Please reset your password", "forceReset": true }` |
| **Description**   | This endpoint verifies user credentials and returns a JWT if successful. It requires users to change their password if it is their first login (initiated password). |

### Change Password Endpoint

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/api/users/change-password`                  |
| **HTTP Method**   | POST                                          |
| **Headers**       | `Content-Type`: application/json, `Authorization`: Bearer Token |
| **Query Parameters** | None                                        |
| **Request Body**  | `{ "UserID": "user_uuid", "oldPassword": "old_password", "newPassword": "new_password" }` |
| **Success Response** | **Code**: 200 OK                           |
|                   | **Content**: `{ "message": "Password successfully updated" }` |
| **Error Response**| **Code**: 401 Unauthorized                    |
|                   | **Content**: `{ "error": "Old password does not match" }` |
| **Description**   | Allows users to change their password after validating their old password. It uses JWT for user authentication. |

### Create User Endpoint (Admin only)

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/api/users/create-user`                      |
| **HTTP Method**   | POST                                          |
| **Headers**       | `Content-Type`: application/json, `Authorization`: Bearer Token |
| **Query Parameters** | None                                        |
| **Request Body**  | `{ "FirstName": "John", "LastName": "Doe", "Email": "john.doe@example.com", "RoleID": "role_uuid", "PasswordHash": "initial_password" }` |
| **Success Response** | **Code**: 201 Created                       |
|                   | **Content**: `{ "message": "User created successfully" }` |
| **Error Response**| **Code**: 403 Forbidden                       |
|                   | **Content**: `{ "error": "Access denied" }`   |
| **Description**   | This endpoint allows admin users to create new users in the system. It requires admin authentication and role verification via JWT. |
