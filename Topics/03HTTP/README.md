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
