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

## Complete HTTP Request Example

Each Request message will contain Http method, Resourse, Http version, Host, headers and body

POST /login HTTP/1.1  ----> Method Resourse Http version
Host: example.com     
User-Agent: Mozilla/5.0   -----------
Content-Type: application/json      |--->Headers
Authorization: Bearer <token>--------

{                          -----
  "username": "john_doe",       |---> Request Body
  "password": "123456"          |
}                          -----


## Complete HTTP Response Example
HTTP/1.1 200 OK                  -----> Http version, status code and status message
Content-Type: application/json   ---------
Content-Length: 128                      |---->Headers
Date: Tue, 16 Jan 2026 10:30:00 GMT      |
Server: nginx                    ---------

{                                 ---------------
  "success": true,                              |
  "message": "User fetched successfully",       |
  "data": {                                     |
    "id": 101,                                  |----> Response Body
    "username": "john_doe",                     |
    "email": "john@example.com"                 |
  }                                             |
}                               -----------------


