# Mastering Databases with PostgreSQL

## Core Concepts

### Why Databases?
At its core, a database is a system designed to **persist information** across different sessions. Persistence ensures that data survives even after the program or process that created it has terminated.

### Storage Hierarchy: RAM vs. Disk
Modern backend systems balance speed and cost by utilizing different storage mediums:

| Feature | In-Memory (RAM) | Disk (SSD/HDD) |
| :--- | :--- | :--- |
| **Speed** | Extremely Fast | Slower than RAM |
| **Cost** | Expensive | Relatively Cheap |
| **Persistence** | Volatile (Lost on power off) | Non-volatile (Persistent) |
| **Examples** | Redis, Memcached | PostgreSQL, MongoDB, MySQL |

---

##  Database Management Systems (DBMS)

A **DBMS** is a software layer whose sole responsibility is to efficiently provide **CRUD** operations to clients:
* **C**reate: Inserting new data.
* **R**ead: Querying existing data.
* **U**pdate: Modifying current records.
* **D**elete: Removing data.

# Responsibilities of DBMS :

1) Organization of data - 
A DBMS defines how data is structured—typically into tables, rows, and columns—to ensure it is stored logically and can be retrieved efficiently. It manages the physical storage on the disk so the developer doesn't have to worry about raw file management.

2) Access - CRUD operation
The system provides a standardized interface (like SQL) to Create, Read, Update, and Delete data. This allows multiple users or applications to interact with the same dataset simultaneously without causing data conflicts.

3) Integrity-
DBMS enforces "business rules" or constraints, such as ensuring a primary key is unique or that a "Price" column doesn't contain text. This guarantees that the data remains accurate, consistent, and reliable over its entire lifecycle.

4) Security-
The system controls who can see or change specific data through authentication and role-based permissions. It also provides logging and encryption to protect sensitive information from unauthorized access or accidental loss.

# Why not text files instead of DBMS :
1) Parsing :
Parsing a text file requires loading the data into memory and manually splitting strings, which is incredibly slow and resource-intensive for large datasets. In contrast, a DBMS uses highly optimized binary formats and indexing to retrieve specific data in milliseconds without reading the entire file.

2) Structure : 
Text files are "unstructured" or "loosely structured," making it difficult to enforce data types or relationships between different sets of information. A DBMS uses a strict schema to ensure that every piece of data follows a predefined format, preventing "corrupt" data (like a name appearing in a phone number field) from being saved.

3) Concurrency :
If two users try to write to the same text file at the exact same moment, the file will likely become corrupted or one user's changes will be overwritten. A DBMS handles concurrency control by using locking mechanisms and transactions, allowing thousands of users to read and write simultaneously without data loss.