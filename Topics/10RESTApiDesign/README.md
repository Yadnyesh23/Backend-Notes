# Complete REST API Design Guide

A comprehensive guide to **professional REST API design principles, history, and best practices**.  
This document summarizes the key ideas behind RESTful architecture and how to design **clean, scalable, and developer-friendly APIs**.

---

# Overview

API design is one of the most critical skills for a backend engineer.

Good APIs are not just about functionality — they are about creating **clear, intuitive, and standardized interfaces** that other developers can easily understand and integrate with.

This guide focuses on designing APIs using the **REST (Representational State Transfer)** architectural style.

---

# A Brief History of the Web

## 1990 — Birth of the Web

**Tim Berners-Lee** invented the **World Wide Web** while working at **CERN**.

He introduced three fundamental technologies that power the web today:

---

## 1. URI (Uniform Resource Identifier)

A **URI** identifies a resource on the internet.

Example:

```
https://api.example.com/users/10
```


Here:

- `/users` → resource collection  
- `/10` → specific resource  

This represents **User with ID = 10**.

---

## 2. HTTP (HyperText Transfer Protocol)

**HTTP** defines how clients and servers communicate over the web.

Common HTTP methods:

| Method | Purpose |
|------|------|
| GET | Retrieve data |
| POST | Create data |
| PUT | Replace data |
| PATCH | Update partial data |
| DELETE | Remove data |

---

## 3. HTML

HTML defines how information is displayed in browsers.

However, APIs usually return **JSON instead of HTML**.

Example JSON response:

```json
{
  "id": 10,
  "name": "Yadnyesh",
  "role": "Backend Engineer"
}
```

## HTTP 1.1 Improvements

Later, Roy Fielding and Tim Berners-Lee worked on improving HTTP.

Important improvements included:

Persistent connections

Better caching support

Improved scalability

These improvements made it possible to build large distributed systems and modern APIs.

## REST — Introduced in 2000

In 2000, Roy Fielding published his PhD dissertation, where he defined the REST architectural style.

REST encourages developers to think in terms of resources instead of actions.

### Bad Design (Action-Based API)
```
/createUser
/deleteUser
/getUser
```
This approach treats API endpoints like functions

### Good REST Design (Resource-Based)
```
POST /users
GET /users/{id}
DELETE /users/{id}
```

users is the resource
HTTP methods define the action

# The 6 REST Constraints

Roy Fielding defined six constraints that make a system RESTful.

## 1. Client–Server Architecture

The client and server must be separate systems.

|Component|	Role|
|Client |	Frontend / Mobile App / Browser|
|Server |	Backend / Database / Business Logic|

This separation improves scalability and flexibility.

## 2. Stateless

Each request must contain all the information required to process it.

The server does not store session state between requests.
```
GET /users
Authorization: Bearer token123
```

## 3. Cacheable

Responses should indicate whether they can be cached.

Caching improves performance by reducing unnecessary server requests.

Example header:
```
Cache-Control: max-age=3600
```
Meaning:

The response can be cached for 1 hour.
## 4. Uniform Interface

This is the most important REST constraint.

APIs must follow consistent rules and predictable patterns.

Example:

|Operation |	Endpoint|
|Get all users |	GET /users|
|Get one user |	GET /users/{id}|
|Create user |	POST /users|
|Update user |	PUT /users/{id}|
|Delete user |	DELETE /users/{id}|

## 5. Layered System

Clients should not know whether they are communicating with:

The actual server

A load balancer

A proxy

An API gateway

A microservice

This abstraction improves security and scalability.

## 6. Code on Demand (Optional)

The server may send executable code to the client.

Example:

JavaScript sent to browsers

However, most APIs do not use this constraint, so it is considered optional.