## 🔍 What is it?

### Serialization
The process of converting an **In-Memory Object** (like a Java Class or JS Object) into a **Format for Transmission** (like a String or Byte stream).

### Deserialization
The process of turning that **Transmitted Format** back into a **Native Object** that a program can use.

---

## 💡 Why do we need it?

Imagine a **JavaScript Frontend** sending a "User" object to a **Rust Backend**:
- **JavaScript** sees data as dynamic objects.
- **Rust** sees data as strict structs.
- They cannot share memory. They need a **Common Standard** (like JSON) to act as a bridge.

**Real-Life Analogy:** Think of furniture from IKEA. 
1. **Serialization:** The factory takes a finished desk and breaks it down into a flat-pack box (Compact format for transport).
2. **Transmission:** The box is shipped to your house.
3. **Deserialization:** You take the pieces out of the box and rebuild the desk so you can use it.

---

## 🛠 Popular Standards

| Type | Examples | Best For |
| :--- | :--- | :--- |
| **Text-Based** | JSON, XML, YAML | Web APIs, Configurations, Human-Readability |
| **Binary-Based** | Protobuf, Avro | High-performance microservices, Internal communication |

---

## 🏗 JSON Deep Dive
JSON (JavaScript Object Notation) is the most popular standard for web communication.

### Rules:
1. **Braces:** Must be enclosed in `{}`.
2. **Keys:** Must be in `"double quotes"`.
3. **Data Types:** Supports `String`, `Number`, `Boolean`, `Array`, and nested `Objects`.

**Example:**
```json
{
  "id": 101,
  "title": "Backend Engineering",
  "is_published": true,
  "tags": ["tech", "coding"],
  "author": {
    "name": "Sriniously"
  }
}