## 1. The Problem: Relational Database Limitations

### ⚠️ Inefficiency
Standard `LIKE` queries with wildcards (e.g., `%laptop%`) trigger **full-table scans**, making them computationally expensive and increasingly slow as datasets scale to millions of records.

### ⚠️ Lack of Relevance
Traditional SQL queries return matches **without ranking or relevance scoring**. This means results are not prioritized—for example, a book *about* machine learning is treated the same as one that only briefly mentions it.

### ⚠️ Scalability Issues
As systems scale (e.g., platforms like Amazon or Google), there is a need for **sub-millisecond search latency**. Traditional relational databases struggle to meet these performance demands efficiently.

## Additional Limitations of Relational Databases for Search

### ⚠️ Poor Full-Text Search Support
Relational databases are not designed for advanced **full-text search** features like:
- Tokenization
- Stemming (e.g., "running" → "run")
- Synonyms handling  
This makes search less intelligent compared to dedicated search engines.

### ⚠️ No Built-in Ranking Algorithms
There is no native support for relevance scoring algorithms like **TF-IDF** or **BM25**, which are essential for ranking search results meaningfully.

### ⚠️ Difficulty Handling Typos & Fuzzy Search
Relational DBs struggle with:
- Misspellings (e.g., "laptpo" instead of "laptop")
- Approximate matches  
Implementing fuzzy search is complex and inefficient.

### ⚠️ Limited Horizontal Scalability
Scaling relational databases typically means **vertical scaling** (adding more power to one machine), whereas modern search systems require **horizontal scaling** (distributed systems).

### ⚠️ High Latency for Complex Queries
Combining filters + sorting + text search leads to:
- Slow query execution
- Increased load on the database

### ⚠️ Not Optimized for Read-Heavy Workloads
Search systems are **read-heavy**, but relational databases are optimized for **transactional workloads (CRUD)**, not high-speed search queries.

### ⚠️ Indexing Limitations
While indexes exist (B-tree, etc.), they are not optimized for:
- Full-text search
- Inverted indexing (used in search engines)

### ⚠️ Real-Time Search Challenges
Updating indexes and reflecting changes instantly in search results is harder compared to systems like Elasticsearch.

---