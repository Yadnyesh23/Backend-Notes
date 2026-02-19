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

