# Database Schema Documentation

## Account Table

| Key | Column Name   | Datatype        | Required | Nullable | Default | Description                       |
|-----|---------------|-----------------|----------|----------|---------|-----------------------------------|
| PK  | AccountID        | UUID            | Yes      | No       | None    | Unique identifier for each account|
|     | FirstName     | Varchar(64)     | Yes      | No       | None    | Account's first name                 |
|     | LastName      | Varchar(64)     | Yes      | No       | None    | Account's last name                  |
|     | Email         | Varchar(128)    | Yes      | No       | None    | Account's email address              |
|     | PasswordHash  | Varchar(512)    | Yes      | No       | None    | Hash of the Account's password       |

## Module Table

| Key | Column Name   | Datatype        | Required | Nullable | Default | Description                             |
|-----|---------------|-----------------|----------|----------|---------|-----------------------------------------|
| PK  | ModuleID      | UUID            | Yes      | No       | None    | Unique identifier for each module       |
| FK  | AccountID        | UUID            | Yes      | No       | None    | Foreign key to Account table         |
|     | Name          | Varchar(64)     | Yes      | No       | None    | Name of the module                      |
|     | Description   | Varchar(512)   | Yes      | Yes      | Null    | Description of the module               |

## Exam Table

| Key | Column Name   | Datatype        | Required | Nullable | Default | Description                             |
|-----|---------------|-----------------|----------|----------|---------|-----------------------------------------|
| PK  | ExamID        | UUID            | Yes      | No       | None    | Unique identifier for each exam         |
| FK  | ModuleID      | UUID            | Yes      | No       | None    | Foreign key to Module table             |
|     | Grade         | Real            | Yes      | Yes      | Null    | Grade of the exam                       |
|     | Weight        | Real            | Yes      | Yes      | Null    | Weight of the exam in overall score     |
|     | ExamTitle     | Varchar(64)     | Yes      | No       | None    | Title of the exam                       |
|     | Description   | Varchar(512)    | Yes      | Yes      | Null    | Description of the exam                 |
|     | ExamDate      | Timestamp       | Yes      | No       | None    | Scheduled date and time of the exam     |
