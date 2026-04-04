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

## 2. The Solution: Inverted Indexing (8:48 - 16:12)

### Concept
Instead of scanning entire documents for every search query, the system uses an **inverted index**—a specialized data structure that maps each term (word) to the list of documents where it appears.

👉 Think of it like a book index:
- Instead of reading the whole book to find a word  
- You directly look up the word in the index and jump to the pages  

####  Traditional Approach (Inefficient)
Scan every document → Check if it contains "laptop


####  Inverted Index Approach (Efficient)
"laptop" → [doc1, doc7, doc21, doc105]


So instead of searching through all documents, the system directly retrieves the relevant ones.

---

### How It Works Internally

1. **Tokenization**
   - Text is broken into individual terms (tokens)  
   - Example: `"Gaming Laptop under 50k"` → `["gaming", "laptop", "under", "50k"]`

2. **Normalization**
   - Convert to lowercase, remove punctuation, etc.  
   - `"Laptop"` → `"laptop"`

3. **Index Creation**
   - Each token is stored with a list of document IDs  
