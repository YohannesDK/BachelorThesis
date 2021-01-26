# Application Views
Think about the flow of actions made by different types of users.

## General
  - User Entity:
    - Register
      - id 
      - username
      - first_name
      - last_name
      - password
      - email
      - role
        - This need to be abstracted out due to that we'll only have to types
          of roles, and its redundant to have to specify it for every user. 
      
## Course
  - Register
    - course id
    - course name
    - course shorthand
    - course owner
  
  - Attachments 
    - documents related to this course
    - resources related to this course
  
  - Join
    - users related to this course
    - course link?
  
  - Data
    - data monitoring related to this course

  - Permissions
    - Give permission to substitute teacher


## Text Document - this guy is tricky and important to get right
  - Register
    - id
    - editing 
      - delta (abstracted)
        - reference to context module
    - data monitoring
      - ...

    - if a document is to big, maybe device it in smaller parts. 

## Question
  - Register
    - id
    - question
    - question type
      - this need to be abstracted
    - question answer type
      - abstract
    - question answers

## Question set
  - id
  - reference to questions
  - Data
    - Need to store 
      - attempts
          - who attempted (student)
          - time used
          - which questions correct/wrong (abstracted)


## Resources
  - Register
    - id
    - link
    - reference to resource origin

idea avarage time from clicking on a resource link to they are back, to determine of the user was doing something else or actually was on the page.


