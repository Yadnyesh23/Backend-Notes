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
