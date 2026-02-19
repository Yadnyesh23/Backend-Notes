#  The Three-Layer Pattern (Clean Architecture for Real Projects)

When building scalable backend systems (APIs, bots, web apps), we **separate responsibilities** into layers.

Why?

Because mixing everything in one file leads to:
- Spaghetti code 
- Hard debugging
- Hard testing
- Hard scaling
- Pain when client changes requirements

So we use:

---
#  What is the Three-Layer Pattern?

It is a **code organization structure** that divides an application into three logical layers:

1. Handler Layer (Presentation Layer)
2. Service Layer (Business Logic Layer)
3. Repository Layer (Data Layer)

Each layer has **one responsibility only**.

Simple idea. Powerful impact.

---

#  Why is it needed?

Imagine your OMR Streamlit app.

If you:
- Detect image
- Analyze answers
- Convert to JSON
- Store in MongoDB
- Return response

All inside one function…

Now client says:
> “Store in PostgreSQL instead of Mongo.”

Now you must modify everything 😵

But if you use layers:
- Only Repository layer changes.
- Rest of app remains untouched.

That’s clean engineering.

---

#  What problem does it solve?

| Without Layers | With Layers |
|---------------|------------|
| Messy code | Clean separation |
| Hard to debug | Easy debugging |
| Hard to test | Easy unit testing |
| Tight coupling | Loose coupling |
| Changes break everything | Changes affect only one layer |

This pattern solves:
- Maintainability problem
- Scalability problem
- Testing problem
- Code readability problem

---

#  Layer 1: Handler (The Gatekeeper 🚪)

##  What is it?

The **Handler** is the entry point of your application.

It talks to:
- HTTP request
- Streamlit UI
- Telegram message
- REST API call

It understands:
- JSON
- HTTP
- Status codes
- User input

---

## What exactly does it do?

It:
- Parses JSON → Converts into Python dict
- Validates input
- Calls service layer
- Returns HTTP response

It DOES NOT:
- Talk directly to database
- Contain business logic
- Perform heavy calculations

---

### Example (Login API)

```python
@app.post("/login")
def login_handler(request):
    data = request.json()
    
    if "email" not in data:
        return {"error": "Email required"}, 400
    
    result = auth_service.login(data["email"], data["password"])
    
    return result, 200
```
#  Layer 1: Service (The Brain of the Application)

##  What is the Service Layer?

The **Service Layer** is the part of the application that contains the **core business logic**.

It is responsible for:
- Making decisions
- Applying business rules
- Coordinating workflows
- Calling repositories
- Calling external services (email, payment, etc.)

It does NOT handle:
- HTTP
- JSON parsing
- Status codes
- UI rendering

The Service layer only focuses on **what the system should do**, not how requests arrive.

---

##  Why is the Service Layer Needed?

Without a service layer:

- Business logic gets mixed inside controllers.
- Code becomes messy and tightly coupled.
- Testing becomes difficult.
- Logic cannot be reused in different environments.

The service layer ensures:
- Clean architecture
- Reusability
- Maintainability
- Scalability
- Easy unit testing

---

##  What Problem Does It Solve?

The Service layer solves:

### 1️⃣ Separation of Concerns
Keeps business logic separate from HTTP or UI logic.

### 2️⃣ Reusability
The same service can be used by:
- REST API
- Telegram Bot
- CLI script
- Background worker
- Cron job

### 3️⃣ Testability
You can test business logic without running a web server.

### 4️⃣ Maintainability
If business rules change, only the service layer needs modification.

---

## 🔄 How It Works (Flow Example)

### Example: Course Purchase System

Client sends a request to buy a course.

### Step 1️⃣ Controller Receives Request
- Parses JSON
- Validates input
- Calls service layer

```python
purchase_service.buy_course(user_id, course_id, payment_token)
```

# Layer 3: Repository Layer (The Data Access Layer)

## What is the Repository Layer?

The **Repository Layer** is responsible for handling all interactions with the database.

It is the layer that:
- Executes SQL / NoSQL queries
- Fetches data from database
- Inserts new records
- Updates existing records
- Deletes records
- Maps database rows/documents into application objects

It acts as a **bridge between your application and the database**.

The repository does NOT contain business logic.
It only deals with data persistence.

---

##  Why is the Repository Layer Needed?

Without a repository layer:

- Database queries get scattered across controllers and services.
- Code becomes tightly coupled to a specific database.
- Changing the database becomes painful.
- Testing becomes difficult.

The repository layer ensures:
- Clean separation of concerns
- Database abstraction
- Easier database switching
- Better maintainability
- Easier mocking in tests

---

##  What Problem Does It Solve?

### 1️⃣ Prevents Database Logic in Controllers
Controllers should not write SQL queries.

### 2️⃣ Prevents Database Logic in Services
Services should focus on business rules, not SQL syntax.

### 3️⃣ Reduces Tight Coupling
If tomorrow you switch from MongoDB to PostgreSQL,
only the repository changes.

### 4️⃣ Improves Testability
You can mock repository methods during testing without needing a real database.

---

## What Exactly Does the Repository Do?

The repository:

- Runs database queries
- Converts raw database data into usable objects
- Handles low-level data access logic
- Returns clean data to the service layer

It does NOT:
- Apply business rules
- Handle HTTP
- Validate request input
- Format API responses

---

##  How It Works (Flow Example)

### Example: User Login System

### Step 1️⃣ Controller Receives Request
- Parses JSON
- Calls service

```python
auth_service.login(email, password)
```