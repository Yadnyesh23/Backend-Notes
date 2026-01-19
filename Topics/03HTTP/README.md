# HTTP Fundamentals

HTTP (HyperText Transfer Protocol) is the foundation of
communication on the web.

At its core, HTTP is built on two fundamental ideas:
1. Stateless Model
2. Client–Server Model

## 1. Stateless Model

HTTP follows a **stateless** communication model.

Stateless means that the server does **not remember**
any previous interaction with a client.
Each HTTP request is treated as a completely new request.

### What Does Stateless Mean?

- Every request contains all required information
- Information is sent using:
  - Headers
  - URL
  - Method (GET, POST, etc.)
  - Body (if required)
- Once the server sends a response, it discards the request
- The next request is considered independent

In other words, an HTTP request is **self-contained**.

### Benefits of the Stateless Model

#### 1. Simplicity
Stateless systems are easier to design and maintain
because the server does not need to store client session data.

#### 2. Scalability
Since no session state is stored on the server,
requests can be distributed across multiple servers
using load balancers.

#### 3. Reliability
If one server fails, another server can handle the request
without losing session data.

#### 4. Flexibility in State Management
Although HTTP itself is stateless,
applications can maintain continuity using:
- Cookies
- Sessions
- Tokens (JWT, OAuth)

These mechanisms are built **on top of HTTP**,
not part of HTTP itself.

## 2. Client–Server Model

HTTP follows a **client–server architecture**.

In a typical HTTP interaction:
- A **client** initiates the communication
- A **server** responds to the request

### Client Responsibilities

The client (browser, mobile app, or another service):
- Initiates the request
- Sends required data such as:
  - URL
  - Headers
  - HTTP method
  - Request body (if applicable)

### Server Responsibilities

The server:
- Hosts resources such as:
  - Web pages
  - APIs
  - Files
- Waits for incoming requests
- Processes requests
- Sends appropriate responses such as:
  - HTML pages
  - JSON data
  - Files
  - Status codes

According to the HTTP protocol,
communication is **always initiated by the client**.

## HTTP vs HTTPS

HTTP and HTTPS follow the same protocol rules.

The difference is security.

- HTTP sends data in plain text
- HTTPS encrypts data using TLS/SSL

HTTPS ensures:
- Data confidentiality
- Data integrity
- Server authenticity

In production systems,
HTTPS is mandatory.

## Transport Layer and Connection

For a client to send a request or receive a response,
a network connection is required.

HTTP uses the **TCP** protocol at the transport layer.

### TCP (Transmission Control Protocol)

TCP is a transport protocol that provides:
- Reliable data delivery
- Ordered packets
- Error checking and retransmission

Because of these guarantees,
TCP is considered more reliable than other transport protocols.

### TCP vs UDP

There are two main transport protocols:

- TCP (Transmission Control Protocol)
- UDP (User Datagram Protocol)

TCP is reliable but slightly slower.
UDP is faster but does not guarantee delivery.

Traditional HTTP uses TCP.
(Some modern protocols like HTTP/3 use QUIC over UDP.)

## OSI Model Overview

Network communication is commonly explained
using the OSI (Open Systems Interconnection) model.

The OSI model consists of 7 layers:

1. Physical
2. Data Link
3. Network
4. Transport
5. Session
6. Presentation
7. Application

## Backend Engineer’s Perspective

As backend engineers, we primarily work at:

- Layer 7: Application Layer

This includes:
- Designing APIs
- Handling HTTP requests and responses
- Implementing authentication and authorization
- Managing data formats (JSON, XML)
- Returning appropriate status codes

However, understanding lower layers
helps in debugging performance, networking,
and production issues.


# Evolution of HTTP

HTTP (HyperText Transfer Protocol) has evolved over time
to improve performance, reliability, and scalability
as the web has grown in complexity.

This document explains the major HTTP versions
along with their advantages and limitations.

## HTTP/0.9 (1991)

The first and simplest version of HTTP.

**Pros:** Extremely simple and lightweight, suitable for early text-based web communication.  
**Cons:** Supported only GET requests, plain text responses, and had no headers, status codes, or metadata.

## HTTP/1.0 (1996)

Introduced structure and metadata to HTTP communication.

**Pros:** Added request/response headers, status codes, and support for different content types.  
**Cons:** Opened a new TCP connection for every request, leading to high latency and poor performance.

## HTTP/1.1 (1997)

Became the long-standing standard for web communication.

**Pros:** Introduced persistent connections and request pipelining, reducing connection overhead.  
**Cons:** Still suffered from head-of-line blocking due to sequential request processing.

## HTTP/2 (2015)

Designed to significantly improve performance and efficiency.

**Pros:** Enabled multiplexing, binary framing, and header compression, greatly improving speed.  
**Cons:** Built on TCP, so packet loss could block all streams (TCP-level head-of-line blocking).

## HTTP/3 (2022)

The latest version optimized for modern networks.

**Pros:** Uses QUIC over UDP, eliminating TCP head-of-line blocking and improving performance on unreliable networks.  
**Cons:** More complex to implement and not fully supported on all legacy systems.

# HTTP Message
There are two types of messages - Request message and Response message

(1)Request Message - It is the one that is send by the client
(2)Response Message - It i sthe one that is sent by the server to the client

## 1. HTTP Request Message

An HTTP request message is sent by the client
(browser, mobile app, or another service)
to request a resource or perform an action on the server.

### Structure of an HTTP Request

Each HTTP request message contains:
- HTTP Method
- Resource (URL / Path)
- HTTP Version
- Headers
- Request Body (optional)

### Complete HTTP Request Example
POST /login HTTP/1.1        # Method, Resource, HTTP Version
Host: example.com
User-Agent: Mozilla/5.0
Content-Type: application/json
Authorization: Bearer <token>   # Headers

{
  "username": "john_doe",
  "password": "123456"
}                               # Request Body

## 2. HTTP Response Message

An HTTP response message is sent by the server
after processing the client’s request.

### Structure of an HTTP Response

Each HTTP response message contains:
- HTTP Version
- Status Code
- Status Message
- Headers
- Response Body (optional)

### Complete HTTP Response Example
HTTP/1.1 200 OK                 # HTTP Version, Status Code, Status Message
Content-Type: application/json
Content-Length: 128
Date: Tue, 16 Jan 2026 10:30:00 GMT
Server: nginx                   # Headers

{
  "success": true,
  "message": "User fetched successfully",
  "data": {
    "id": 101,
    "username": "john_doe",
    "email": "john@example.com"
  }
}                               # Response Body

## Important Notes

- Request messages are always initiated by the client
- Response messages are always sent by the server
- Headers carry metadata about the message
- Body contains actual data (JSON, HTML, text, files)
- Body is optional and depends on HTTP method and status code


# Why Do We Need Headers?

A common question arises:
Why do we have a separate section called **Headers**?
Why not send everything in the **URL**, **path**, or **body**?

## Simple Explanation

Headers exist to carry **metadata** about the request or response.

They describe *how* the data should be handled,
not *what* the actual data is.

## Real-Life Analogy (Courier Example)

Think of HTTP like sending a courier package.

When a sender sends a package:
- The **address**, **sender details**, and **handling instructions**
  are written **on the package**
- The courier person does **not open the package**
  to find this information

If all details were kept inside the package,
the courier would have to open it every time,
which is inefficient and unsafe.

## How This Applies to HTTP

Similarly in HTTP:
- Headers are like the **information written on the package**
- The body is like the **content inside the package**

Headers allow servers, proxies, and browsers to:
- Identify the sender
- Understand the content type
- Check authentication
- Apply caching rules
- Enforce security policies

All this happens **without reading the request body**.

## Why Not Put Headers in Body or URL?

Putting everything in the body or URL would cause problems:
- Servers would need to parse the body for every request
- Proxies and caches wouldn’t work efficiently
- Security checks would become harder
- Large bodies would slow down processing

Headers solve this by keeping important control information
separate and lightweight.

# Different Types of HTTP Headers

HTTP headers are **metadata** sent along with a request or response.
They act like a **remote control**, telling the server or client
how to process the message.

Headers are grouped into four main types:

1. Request Headers  
2. General Headers  
3. Representation Headers  
4. Security Headers

## 1. Request Headers

Request headers help the server understand the client’s environment, preferences, and capabilities.

	
(1)User-Agent - Identifies the client software (browser, app, or device) making the request.
(2)Authorization - Contains credentials (token, API key, etc.) for authentication.
(3)Cookie - Sends stored cookies from the client to the server.
(4)Accept - Specifies the media types the client can handle (JSON, HTML, XML, e

## 2. General Headers

General headers can be used in both requests and responses.


(1)Date - Specifies the date and time when the message was sent.
(2)Cache-Control - 	Directs caching behavior (e.g., public, private, no-cache).
(3)Connection - Controls whether the connection stays open or closes after the message.

## 3. Representation Headers

Representation headers describe the format and encoding of the message body.

Header	
(1)Content-Type - Specifies the MIME type of the body (e.g., application/json).
(2)Content-Length - Indicates the size of the body in bytes.
(3)Content-Encoding - Specifies any compression used on the body (gzip, deflate).
(4)ETag - Provides a unique identifier for a specific version of the resource (used for caching).

## 4. Security Headers

Security headers enhance the security of requests and responses.

Header	
(1)Strict-Transport-Security (HSTS) - Forces the client to use HTTPS for future requests.
(2)Content-Security-Policy (CSP) - Defines which resources are allowed to be loaded, preventing XSS attacks.
(3)X-Frame-Options - Prevents clickjacking by controlling if the page can be embedded in a frame.
(4)X-Content-Type-Options - Stops browsers from MIME type sniffing to prevent attacks.
(5)Set-Cookie - Sends a cookie from server to client with optional security flags.

# HTTP Methods
Http method exist to represent the different kind of actions a client can request on a server.

## HTTP Methods
(1) GET - Used to the response from the server
(2) POST - Used to Send the data from client to servre
(3) PUT - Used to replace or update the complete data
(4) PATCH - Used to update the specific part of data
(5) DELETE - Used to delete

# HTTP Methods

HTTP methods define the **type of action** a client wants the server to perform on a resource.  
They are also called **verbs** and are essential for RESTful API design.

---

## Common HTTP Methods

| Method | Description |
|--------|-------------|
| **GET** | Requests data from the server without modifying it. |
| **POST** | Sends data from the client to the server to create a new resource. |
| **PUT** | Replaces or updates a complete resource with new data. |
| **PATCH** | Updates a specific part of a resource without replacing the whole. |
| **DELETE** | Deletes a specified resource on the server. |

---

## Important Notes

- HTTP methods are **idempotent** if repeating them has the same effect:
  - **GET, PUT, DELETE** → idempotent  
  - **POST, PATCH** → generally **not idempotent**
- Choosing the correct method is important for **API design, caching, and security**.
- Methods are **case-sensitive** and usually written in **uppercase**.

---

## Example Usage

```http
# GET request
GET /users/101 HTTP/1.1
Host: example.com

# POST request
POST /users HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com"
}

# PATCH request
PATCH /users/101 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "email": "new_email@example.com"
}

# DELETE request
DELETE /users/101 HTTP/1.1
Host: example.com 
```



# OPTIONS Method and CORS Flow

The **OPTIONS** HTTP method plays a key role in the **CORS (Cross-Origin Resource Sharing)** flow.

CORS is a browser security mechanism that controls how resources on a web server can be requested from a different origin (domain, protocol, or port). It works using HTTP headers to explicitly allow or restrict cross-origin requests, preventing unauthorized access to sensitive data. Proper CORS configuration is critical in production environments to balance security and legitimate cross-origin communication.

---

## Types of CORS Request Flows

There are **two types of CORS request flows**:

1. **Simple Request**
2. **Preflighted Request**

---

## 1. Simple Request Flow

Assume:
- Frontend (client) is hosted on `https://example.com`
- Backend (server) is hosted on `https://api.example.com`

### Client Request (Simple GET Request)

```
GET /api/products/123 HTTP/1.1
Host: api.example.com
Origin: https://example.com

Accept: application/json
```


### Server Behavior

- The server checks whether the `Origin` is allowed.
- If allowed, it includes the `Access-Control-Allow-Origin` header in the response.

### Server Response

```
HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: https://example.com

{
"product": {
"id": 123,
"name": "xyz"
}
}
```


### Important Notes

- The browser allows access to the response **only if**:
  - `Access-Control-Allow-Origin` matches the request origin, or
  - `Access-Control-Allow-Origin: *` is used (not recommended for authenticated or sensitive data).
- Without this header, the browser blocks the response even if the server returns data.

---

## 2. Preflighted Request Flow

A request becomes **preflighted** when **any** of the following conditions are met:

- The HTTP method is **not** `GET`, `POST`, or `HEAD` (e.g., `PUT`, `DELETE`)
- The request includes **non-simple headers** (e.g., `Authorization`, `X-Custom-Header`)
- The `Content-Type` is **not** one of:
  - `application/x-www-form-urlencoded`
  - `multipart/form-data`
  - `text/plain`

In these cases, the browser sends a **preflight request** using the **OPTIONS** method **before** making the actual request.

---

### Preflight Request (OPTIONS)

```
OPTIONS /api/users HTTP/1.1
Host: api.example.com
Origin: https://frontend.example.com

Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization
```


### Server Response to Preflight

```
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://frontend.example.com

Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```


### What Happens Next

- The browser validates the server’s response.
- If the requested method and headers are allowed, the browser proceeds with the actual request.
- If not allowed, the browser blocks the request before it reaches application logic.

---

## Summary

- **OPTIONS** is used by the browser for CORS preflight checks.
- Simple requests do not require preflight.
- Preflighted requests ensure the server explicitly allows potentially unsafe operations.
- Correct CORS configuration is essential for secure and reliable production systems.


# HTTP Response Status Codes

HTTP response status codes are used to communicate the result of a client’s request in a standardized way.  
They inform the client whether the request was successful, failed, or requires further action.

Status codes are **3-digit numbers**, grouped by their first digit.

---

## Status Code Categories

- **1xx → Informational**
- **2xx → Success**
- **3xx → Redirection**
- **4xx → Client Errors**
- **5xx → Server Errors**

---

## Common Status Codes and Their Usage

### ✅ Success Responses (2xx)

- **200 (OK)**  
  Indicates that the request was successful and the server returned the requested data (commonly used with `GET`).

- **201 (Created)**  
  Indicates that the request was successful and a new resource has been created (commonly used with `POST`).

- **204 (No Content)**  
  Indicates that the request was successful, but the server has no content to return (commonly used for CORS preflight `OPTIONS` responses or delete operations).

---

### 🔁 Redirection Responses (3xx)

- **301 (Moved Permanently)**  
  Indicates that the requested resource has been permanently moved to a new URL, and future requests should use the new URL.

- **302 (Found)**  
  Indicates a temporary redirection where the resource is available at a different URL for now, but the original URL should continue to be used.

- **304 (Not Modified)**  
  Indicates that the cached version of the resource is still valid, so the server does not resend the response body, improving performance.

---

### ❌ Client Error Responses (4xx)

- **400 (Bad Request)**  
  Indicates that the server cannot process the request due to invalid or malformed client data.

- **401 (Unauthorized)**  
  Indicates that authentication is required or the provided credentials are missing or invalid.

- **403 (Forbidden)**  
  Indicates that the client is authenticated but does not have permission to access the requested resource.

- **404 (Not Found)**  
  Indicates that the request was successful, but the requested resource does not exist on the server.

- **405 (Method Not Allowed)**  
  Indicates that the HTTP method used is not supported for the requested resource.

- **409 (Conflict)**  
  Indicates a conflict with the current state of the resource (e.g., creating a resource with a duplicate unique value).

- **429 (Too Many Requests)**  
  Indicates that the client has sent too many requests in a given time frame and has hit the rate limit.

---

### ⚠️ Server Error Responses (5xx)

- **500 (Internal Server Error)**  
  Indicates an unexpected error occurred on the server.

- **501 (Not Implemented)**  
  Indicates that the server does not support the requested HTTP method, but it may be implemented in the future.

- **502 (Bad Gateway)**  
  Indicates that the server received an invalid response from an upstream server.

- **503 (Service Unavailable)**  
  Indicates that the server is temporarily unavailable, usually due to overload or maintenance.

- **504 (Gateway Timeout)**  
  Indicates that the server did not receive a timely response from an upstream server.

---

## Summary

- Status codes help clients understand **what happened** with a request.
- Proper usage of status codes improves **API clarity, debugging, and client handling**.
- Correct status codes are essential for **production-grade APIs**.
