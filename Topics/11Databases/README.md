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