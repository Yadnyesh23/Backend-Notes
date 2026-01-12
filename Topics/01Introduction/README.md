# What is Backend?

Backend is the part of an application that runs on a server and
listens to requests such as HTTP, WebSocket, gRPC ( gRPC Remote Procedure Calls ) , or other protocols.

It is responsible for:
- Receiving requests from clients (browser, mobile apps, other services)
- Processing logic
- Communicating with databases and external services
- Sending responses back to the client

Backend services run on specific **ports** (e.g. 3000, 5000, 8080)
so that clients can access them over the internet.

Backend is called a **server** because it serves:
- Static files (HTML, CSS, JS)
- Dynamic data (JSON, files, media)
- APIs used by frontend and mobile apps

# How Backend Works (High-Level Flow)

Typical request flow in production:

Client (Browser / App)
→ DNS Server (resolves domain)
→ Load Balancer (AWS / Cloud)
→ Firewall / Security Rules
→ Server Instance (EC2 / VM / Container)
→ Web Server (Nginx / Apache)
→ Backend Application (Node.js, Java, etc.)
→ Database / External Services
→ Response back to Client

# Why Do We Need Backend?

Consider this example:

You like your friend’s post on Instagram.
Immediately, your friend receives a notification.

This entire communication is handled by the backend.

The backend:
- Identifies who performed the action
- Validates the user
- Saves the action in the database
- Finds the target user
- Sends notifications or updates

# What Happens Inside the Backend?

When a user performs an action:

1. Client sends a request to the server
2. Server parses the request
3. Server authenticates the user
4. Business logic is executed
5. Data is stored or updated in the database
6. Related users or services are notified
7. Server sends a response back

# Why Do We Need a Server?

Applications like Instagram, WhatsApp, or YouTube require
a **centralized system** that holds the complete and correct data.

Each user’s app is personalized:
- Followers
- Posts
- Messages
- Preferences

But the source of truth must exist in one place.

That centralized system is the backend server.

# Why Can’t Frontend Directly Connect to the Database?

Direct frontend-to-database access is avoided because:

1. ❌ Security risks (credentials exposed)
2. ❌ No access control
3. ❌ No validation or business rules
4. ❌ No scalability control
5. ❌ No auditing or logging
6. ❌ High risk of data corruption

Backend acts as a secure gatekeeper between
frontend and database.

# How Frontend Works

Frontend runs inside the browser.

Flow:
Browser → Server → Response

The response usually contains:
- HTML
- CSS
- JavaScript
- API responses (JSON)

The browser executes frontend code locally
on the user’s device.

# Why Backend Logic Should NOT Be Written in Frontend

Frontend code:
- Is downloaded by the browser
- Can be viewed and modified by anyone
- Runs on the user’s machine

Backend code:
- Runs on secure servers
- Cannot be accessed directly
- Controls sensitive operations

Backend:
- Receives request
- Executes logic
- Accesses database
- Sends response

Frontend:
- Sends request
- Displays response

# Summary: Why Backend is Required

Backend is required because of:

1. Security (authentication, authorization)
2. Database management
3. Business logic execution
4. Data validation
5. Performance & scalability
6. Centralized data control
7. Computing power
8. API management
9. Real-time communication
