# Error Handling and Building Fault-Tolerant Systems

## 1. The Mindset

### Errors Are Inevitable
Backend engineers must shift their mindset from trying to prevent all errors to being prepared to detect, contain, and resolve them efficiently.  


### Fault-Tolerant Mindset
Building fault-tolerant systems requires proactive preparation for worst-case scenarios, ensuring that user transactions remain seamless even when failures occur.


## 2. Common Error Types


### A. Logic Errors

The most dangerous type of errors. The system runs without crashing, but produces incorrect or unintended business results.

These errors are difficult to detect because:
- There are no obvious failures or exceptions
- The system appears to function normally
- Issues are often discovered only through incorrect outputs or user complaints

**Example:**
In an e-commerce platform, a mistake in the discount calculation logic could result in users being negatively charged (i.e., the system pays the user instead of charging them).

**Reasons for Errors:**
- Misunderstood requirements
- Incorrect implementation of algorithms
- Failure to consider edge cases

**Why they are critical:**
- Direct financial loss
- Loss of user trust
- Harder to debug compared to runtime errors

**Prevention strategies:**
- Strong unit and integration testing
- Edge case validation (e.g., minimum price = 0)
- Code reviews and business logic verification
- Monitoring unusual outputs (e.g., negative transaction values)