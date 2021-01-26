# Database Must Knows
This is some notes on databases, which we may have forgotten!

## Resources:
 - <a href="http://en.wikipedia.org/wiki/Create,_read,_update_and_delete#Database_applications">Basic CRUD Operations</a>
 - <a href="http://en.wikipedia.org/wiki/Join_(SQL)">SELECT queries with JOINs</a>
 - <a href="http://en.wikipedia.org/wiki/Database_normalization">Normalization</a>
 - <a href="http://en.wikipedia.org/wiki/Index_(database)">Basic Indexing</a>
 - <a href="http://en.wikipedia.org/wiki/Referential_integrity">Referential Integrity</a> with <a href="http://en.wikipedia.org/wiki/Foreign_key">Foreign Key Constraints</a>
 - <a href="http://en.wikipedia.org/wiki/Check_Constraint"> Basic Check Constraints</a>

---

## Basic CRUD Operations
  - Create: `INSERT`, 
  - Read: `SELECT`, 
  - Update: `UPDATE`, 
  - Delete: `DELETE`, 

--- 

## `SELECT` queries with `JOINs`
  - Join is used when you have tables that are related somehow and you want to retrieve data from both tables, on a specific value.
  - We have several Join types, where each of them will have an different impact on the output. 
  - Syntax:
  ```sql
      SELECT  <tablename>.<colname>, _, ...
      FROM <tablename_1>
      <Join_type> JOIN <tablename_2>
      ON <tablename_1>.<colname> = <tablename_2>.<colname>
      WHERE <conditions>
      ORDER BY <somevalue>;
  ```
  - Joins:
    - `Inner Join`:
      - Returns only connected rows when there is a matching field (id) in both rows.
    - `Left Join`:
      - Returns every row from the left table, even if there is no matching row in the right table. 
    - `Right Join `:
      - Return every row from the right table, even if there is no matching row in the left table.
    - `Full Join`:
      -  Combination of left and right join, and returns everything from both tables. 
    - `Self Join`:
      - Its possible to join a table with it self, returning relations based on the value we want to `join on`.

--- 

## <a href="https://www.youtube.com/watch?v=UrYLYV7WSHM&ab_channel=channel5567">Normalization</a>
  - Normalization is the process of structuring a relational database into multiple related tables, to <b>`minimize Data Redundancy`</b> and improve <b>`Data Integrity`</b>.  
  - This is done by splitting and structuring tables into separated ``logical``, `independent`, but `related data`. 
  - Normalization can be achieved in these three-four normal forms:

    - <b>1'st Normal Form</b>
      - ``Each cell`` need to be ``Single Valued``
      - ``Entries`` in a ``column`` are of the ``same type``
      - ``Rows`` are ``uniquely identified``

    - <b>2'nd Normal Form</b>
      - `All attributes` (Non-Key Columns) are ``dependent`` on the ``key``

    - <b>3'rd Normal Form</b>
      - `All Fields` (columns) can be determined <b>`Only`</b> by the `Key` in the table and no other column. In other words, if we repeat data that never change and always stick together, then that data should be abstracted out in another table.

    - <b>4'th Normal Form, BCNF</b>
      - No `multi-valued` dependencies

--- 

## Basic Indexing
  -  An index is a structure associated with a table or view that speeds retrieval of rows from the tables. 
  - We wont need this i think.

---

## Referential Integrity with Foreign Key Constraints
  - Trust your data. Need to respect Foreign Key Constraint or else the whole thing would be a big cluster f.

--- 

## Basic Check Constraints
...

--- 



