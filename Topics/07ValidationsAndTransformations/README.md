# 🏗️ Backend Layered Architecture

## What is Layered Architecture?

Layered Architecture is a backend design pattern where the application is divided into separate layers, each having a specific responsibility.

```
Client → Controller → Service → Repository → Database
```

It ensures **clean code, separation of concerns, and scalability**.

---

## Why Use It?

### Problems It Solves
- Mixing business logic with HTTP logic
- SQL queries inside controllers
- Hard-to-maintain and messy code
- Difficult testing
- Tight coupling

### Benefits
- Clean structure
- Easy testing
- Scalable design
- Maintainable code
- Team-friendly

---

## Layers Explained

### 1️⃣ Controller Layer
**Role:** Handles HTTP requests.

**Responsibilities:**
- Validate input
- Authenticate / Authorize
- Call service
- Return response

**Use For:** Request-level validation only.

---

### 2️⃣ Service Layer
**Role:** Contains business logic.

**Responsibilities:**
- Apply business rules
- Coordinate repositories
- Data transformation

**Use For:** Business validations (e.g., "user already exists").

---

### 3️⃣ Repository Layer
**Role:** Database interaction.

**Responsibilities:**
- CRUD operations
- Communicate with DB / ORM

**Use For:** All database access.

---

## Validation Rule

| Type | Layer |
|------|-------|
| Input validation | Controller |
| Business validation | Service |

---

## When to Use

### Recommended For:
- APIs
- Scalable backend systems
- Production projects
- Team environments

### Not Needed For:
- Small scripts
- Simple MVPs
- Single-file apps

---

## Pros & Cons

### Pros
- Clean separation
- Reusable logic
- Easy testing
- Scalable

###  Cons
- More files
- Slightly more boilerplate
- Overkill for tiny apps

---

## Summary

Layered Architecture =  
**Controller → Service → Repository**

Each layer has a single responsibility, making the backend clean, structured, and scalable.

## Why Validate?

Validation ensures that incoming data is correct, safe, and expected **before** it reaches your business logic or database.

---

## What Happens Without Validation?

Example:

Your database expects:

```
age: number
```

But the user sends:

```
age: "twenty"
```

### The Result:
- Database query fails
- Application crashes
- Server returns **500 Internal Server Error**
- Bad user experience
- Harder debugging

This means the error was caught too late (inside the server).

---

## The Better Way: Validate Early

Validate input at the **Controller Layer** (entry point).

If invalid data is received:

- Stop the request immediately
- Return **400 Bad Request**
- Send a helpful error message

Example response:

```json
{
  "error": "Age must be a number"
}
```

---

## What Validation Solves

- Prevents server crashes
- Protects database integrity
- Improves security
- Improves user experience
- Saves server resources
- Makes debugging easier

---

## Rule of Thumb

> Validate as early as possible.  
> Never trust client input.

Always assume:
- Users can send wrong data
- Frontend validation can be bypassed
- APIs are publicly accessible

---

## Summary

Without validation → ❌ 500 Internal Server Error  
With validation → ✅ 400 Bad Request (clean and controlled)

# Validation makes your backend **secure, stable, and production-ready**.

## Types of Validation

Validation is not just about checking if a field exists — it ensures data is correct in **format, meaning, type, and business conditions**.

---

## 1️⃣ Syntactic Validation (Format Check)

Checks whether the data follows a required pattern or structure.

###  What It Validates
- Email format
- Phone number format
- URL format
- Password pattern
- Regex-based rules

###  Examples

**Email Validation**
```json
{
  "email": "yadnyeshgmail.com"
}
```
 Fail — Missing `@` and domain.

---

**Phone Number Validation**
```json
{
  "phone": "12345"
}
```
 Fail — Not a valid international phone format.

---

**Password Pattern**
```json
{
  "password": "abc123"
}
```
 Fail — Does not meet requirement (e.g., 8+ characters, 1 special symbol).

---

## 2️⃣ Semantic Validation (Logical / Real-World Meaning)

Checks whether the data makes sense logically.

It may be correctly formatted — but still wrong.

### Examples

**Future Date of Birth**
```json
{
  "date_of_birth": "2030-01-01"
}
```
 Fail — A birth date cannot be in the future.

---

**Negative Product Price**
```json
{
  "price": -500
}
```
 Fail — Price cannot be negative.

---

**Age Restriction**
```json
{
  "age": 15
}
```
 Fail — Must be 18+ to register.

---

## 3️⃣ Type Validation (Data Type Check)

Ensures that the variable type matches what the API expects.

### Examples

**Expected Number but Received String**
```json
{
  "age": "twenty"
}
```
Fail — Expected `number`, received `string`.

---

**Expected Array but Received String**
```json
{
  "tags": "backend"
}
```
 Fail — Expected `Array<string>`, received `string`.

Correct:
```json
{
  "tags": ["backend", "api"]
}
```

---

## 4️⃣ Complex / Conditional Validation

Validates fields based on other field values.

Used in real-world business rules.

### Examples

**Marital Status Rule**
```json
{
  "is_married": true,
  "partner_name": ""
}
```
 Fail — `partner_name` is required if `is_married` is true.

---

**Discount Rule**
```json
{
  "has_discount": true,
  "discount_percentage": 0
}
```
 Fail — Discount percentage must be greater than 0 if discount is enabled.

---

**Delivery Address Rule**
```json
{
  "delivery_type": "home",
  "address": ""
}
```
 Fail — Address is required for home delivery.

---

## Summary

| Type | Checks |
|------|--------|
| Syntactic | Format / Pattern |
| Semantic | Real-world logic |
| Type | Correct data type |
| Conditional | Depends on other fields |

---

## Final Rule

> Good backend validation checks:
- Format  
- Meaning  
- Type  
- Business conditions  

Strong validation = Secure + Stable + Production-ready backend.

## 🔄 Transformations (Sanitization)

Transformations (also called sanitization) prepare incoming data before it reaches your business logic or database.

Unlike validation (which checks correctness), transformation **modifies data into a safe and consistent format**.

This ensures:
- Cleaner database records
- Consistent comparisons
- Fewer unexpected bugs
- Better security

---

## Why Transform Data?

User input is often:
- Inconsistent
- Poorly formatted
- Case-sensitive
- Containing extra spaces
- In the wrong type

If stored as-is, it can cause:
- Duplicate records
- Matching issues
- Query errors
- Security risks

So we sanitize it early.

---

## Common Transformation Types

### 1️⃣ Casting (Type Conversion)

Converting data into the correct type before using it.

Example: Query parameters are always strings.

```http
GET /users?page=5
```

Received:
```
page = "5"  // string
```

Transform:
```
page = 5  // number
```

Without casting:
- Pagination may break
- Arithmetic operations may fail

---

### 2️⃣ Normalization (Standardization)

Making data consistent for storage and comparison.

Example: Emails are case-insensitive.

```json
{
  "email": "User@Email.Com "
}
```

Transform:
```
"user@email.com"
```

Steps:
- Trim spaces
- Convert to lowercase

Without normalization:
- `"User@email.com"` and `"user@email.com"` could be treated as different users.

---

### 3️⃣ Formatting (Restructuring Data)

Adjusting the structure before saving.

Example: Phone number formatting.

Input:
```
9876543210
```

Transform:
```
+919876543210
```

Other examples:
- Formatting dates to ISO format (`YYYY-MM-DD`)
- Removing special characters from usernames
- Hashing passwords before storing

---

### 4️⃣ Trimming & Cleaning

Removing unwanted characters.

Example:
```json
{
  "username": "   Yadnyesh   "
}
```

Transform:
```
"Yadnyesh"
```

This prevents unnecessary database inconsistencies.

---

## Important Rule

> Validate → Then Transform → Then Process

1. Validate input
2. Sanitize / transform data
3. Pass clean data to service layer

---

## Summary

| Action | Purpose |
|--------|---------|
| Validation | Check if data is correct |
| Transformation | Make data clean and consistent |

Sanitization ensures your backend remains:
- Predictable  
- Secure  
- Consistent  
- Production-ready  

## Frontend vs. Backend: The Gold Rule
| Feature | Frontend Validation | Backend Validation |
| :--- | :--- | :--- |
| **Primary Goal** | User Experience (UX) | Security & Data Integrity |
| **Reliability** | Low (Can be bypassed) | High (Final Authority) |
| **Tooling** | HTML5, React/Vue State | Joi, Zod, Class-Validator |

> **Note:** Never rely on the Frontend for security. If a user hits your API via **Postman** or **cURL**, your Frontend checks are completely bypassed.