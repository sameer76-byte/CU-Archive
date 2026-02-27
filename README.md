# 🎓 Academic Question Bank System

A structured, web-based Question Bank Platform designed for undergraduate students across B.Sc, B.A, and B.Com streams. The system provides easy access to **2500+ question papers** organized subject-wise with a clean and scalable file architecture.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green)
![PRs](https://img.shields.io/badge/PRs-welcome-orange)

---

## 📌 Project Overview

The Academic Question Bank System is a lightweight, static web project that allows students to browse, select, and view previous year question papers efficiently.

### 🎓 Supported Streams

The platform currently supports:

- **B.Sc** (Bachelor of Science)
- **B.A** (Bachelor of Arts)  
- **B.Com** (Bachelor of Commerce)

Each stream contains **30+ subjects**, and every subject is structured in a consistent and scalable way.

---

## 🧩 Project Structure

---

## 📊 Content Scale

| Category | Quantity |
|----------|----------|
| 📚 Subjects per stream | 30+ |
| 📄 Files per subject | 16 |
| 📁 SEC module files | 4+ |
| 📝 Total Question Papers | **2500+** |
| ☁️ Storage Type | Google Drive |

---

## 🔗 Content Delivery

Instead of storing heavy PDF files locally, this system uses:

- **Google Drive hosted question papers**
- **Direct access links** embedded into each page
- **Fast loading** and low server usage

This makes the project:

- ⚡ **Lightweight**
- 🚀 **Fast** 
- 🔄 **Easy to update**
- 💰 **Cost-effective**

---

## 🖥️ User Flow

```mermaid
graph LR
    A[Home Page] --> B{Select Stream}
    B --> C[B.Sc]
    B --> D[B.A] 
    B --> E[B.Com]
    C --> F[Select Subject]
    F --> G[Choose Paper/Unit/SEC]
    G --> H[View on Google Drive]
