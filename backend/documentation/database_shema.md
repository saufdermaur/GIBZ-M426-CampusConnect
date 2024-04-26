# Database Schema Documentation

## Role Table

| Key | Column Name | Datatype        | Required | Nullable | Default | Description |
|-----|-------------|-----------------|----------|----------|---------|-------------|
| PK  | RoleID      | UUID            | Yes      | No       | None    | Unique identifier for each role |
|     | Name        | Varchar(32)     | Yes      | No       | None    | Name of the role |

## User Table

| Key | Column Name  | Datatype        | Required | Nullable | Default | Description |
|-----|--------------|-----------------|----------|----------|---------|-------------|
| PK  | UserID       | UUID            | Yes      | No       | None    | Unique identifier for each user |
|     | FirstName    | Varchar(64)     | Yes      | No       | None    | User's first name |
|     | LastName     | Varchar(64)     | Yes      | No       | None    | User's last name |
|     | Email        | Varchar(128)    | Yes      | No       | None    | User's email address |
| FK  | RoleID       | UUID            | Yes      | No       | None    | Foreign key to Role table |
|     | PasswordHash | Varchar(512)    | Yes      | No       | None    | Hash of the user's password |
|     | InitPassword | Boolean         | Yes      | No       | True    | Indicates if password is initial/default |

## Class Table

| Key | Column Name   | Datatype        | Required | Nullable | Default | Description |
|-----|---------------|-----------------|----------|----------|---------|-------------|
| PK  | ClassID       | UUID            | Yes      | No       | None    | Unique identifier for each class |
| FK  | DepartmentID  | UUID            | Yes      | No       | None    | Foreign key to Department table |
|     | Name          | Varchar(32)     | Yes      | No       | None    | Name of the class |

## Department Table

| Key | Column Name   | Datatype        | Required | Nullable | Default | Description |
|-----|---------------|-----------------|----------|----------|---------|-------------|
| PK  | DepartmentID  | UUID            | Yes      | No       | None    | Unique identifier for each department |
|     | Name          | Varchar(64)     | Yes      | No       | None    | Name of the department |
|     | Abbreviation  | Varchar(2)      | Yes      | No       | None    | Abbreviation for the department |

## ClassModuleJunction Table (N:N)

| Key | Column Name    | Datatype        | Required | Nullable | Default | Description |
|-----|----------------|-----------------|----------|----------|---------|-------------|
| PK  | ClassModuleID  | UUID            | Yes      | No       | None    | Unique identifier for each class-module relationship |
| FK  | ClassID        | UUID            | Yes      | No       | None    | Foreign key to Class table |
| FK  | ModuleID       | UUID            | Yes      | No       | None    | Foreign key to Module table |

## Module Table

| Key | Column Name   | Datatype        | Required | Nullable | Default | Description |
|-----|---------------|-----------------|----------|----------|---------|-------------|
| PK  | ModuleID      | UUID            | Yes      | No       | None    | Unique identifier for each module |
|     | Name          | Varchar(64)     | Yes      | No       | None    | Name of the module |
|     | Description   | Varchar(1048)   | Yes      | Yes      | Null    | Description of the module |

## Exam Table

| Key | Column Name     | Datatype        | Required | Nullable | Default | Description |
|-----|-----------------|-----------------|----------|----------|---------|-------------|
| PK  | ExamID          | UUID            | Yes      | No       | None    | Unique identifier for each exam |
| FK  | ClassModuleID   | UUID            | Yes      | No       | None    | Foreign key to ClassModuleJunction table |
|     | ExamDate        | Timestamp       | Yes      | No       | None    | Scheduled date and time of the exam |
|     | ExamTitle       | Varchar(64)     | Yes      | No       | None    | Title of the exam |
|     | Description     | Varchar(512)    | Yes      | Yes      | None    | Description of the exam |

## UserExam Table

| Key | Column Name    | Datatype        | Required | Nullable | Default | Description |
|-----|----------------|-----------------|----------|----------|---------|-------------|
| PK  | UserExamID     | UUID            | Yes      | No       | None    | Unique identifier for each user-exam relationship |
| FK  | UserID         | UUID            | Yes      | No       | None    | Foreign key to User table |
| FK  | ExamID         | UUID            | Yes      | No       | None    | Foreign key to Exam table |
|     | ExamGrade      | Real            | Yes      | Yes      | None    | Grade received by the user |
|     | GradeConfirmed | Boolean         | Yes      | No       | False   | Indicates if the grade has been confirmed |
|     | Feedback       | Varchar(512)    | Yes      | Yes      | None    | Feedback for the user |
|     | ReturnDate     | Timestamp       | Yes      | No       | Now     | Date when the graded exam was returned |
|     | ConfirmDate    | Timestamp       | Yes      | Yes      | Null    | Date when the grade was confirmed |

## UserClassJunction Table (N:N)

| Key | Column Name   | Datatype        | Required | Nullable | Default | Description |
|-----|---------------|-----------------|----------|----------|---------|-------------|
| PK  | UserClassID   | UUID            | Yes      | No       | None    | Unique identifier for each user-class relationship |
| FK  | ClassID       | UUID            | Yes      | No       | None    | Foreign key to Class table |
| FK  | UserID        | UUID            | Yes      | No       | None    | Foreign key to User table |
