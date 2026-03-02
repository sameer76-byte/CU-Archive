# 🎓 Academic Question Bank System

A structured, web-based Question Bank Platform designed for undergraduate students across **B.Sc, B.A, and B.Com** streams. The system provides easy access to **2500+ question papers** organized subject-wise with a clean and scalable file architecture.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green)
![PRs](https://img.shields.io/badge/PRs-welcome-orange)
![GitHub stars](https://img.shields.io/github/stars/sameer76-byte/CU-Archive?style=social)

---

## 📌 Project Overview

The Academic Question Bank System is a lightweight, static web project that allows students to browse, select, and view previous year question papers efficiently across multiple disciplines.

### 🎓 Supported Streams

| Stream | Subjects | Focus Areas |
|--------|----------|-------------|
| **B.Sc** (Bachelor of Science) | 30+ | Physics, Chemistry, Mathematics, Computer Science, Botany, Zoology |
| **B.A** (Bachelor of Arts) | 25+ | English, History, Political Science, Economics, Sociology |
| **B.Com** (Bachelor of Commerce) | 20+ | Accounting, Finance, Marketing, Business Management, Taxation |

Each stream follows a consistent folder structure making it easy to navigate and maintain.

---

## 🧩 Project Structure

```text
CU-Archive/
│
├── index.html           # Main landing page with global search
├── bsc.html             # B.Sc stream overview
├── ba.html              # B.A stream overview
├── bcom.html            # B.Com stream overview
├── disclaimer.html      # Disclaimer page
├── developers.html      # Developer team info
├── contributr.html      # Contribution guidelines
├── report.html          # Report missing paper
├── contact.html         # Contact page
│
├── bsc/                 # B.Sc subjects
│   └── major/
│       ├── computer/
│       │   └── computer.html    # Computer Science papers
│       ├── physics/
│       │   └── physics.html     # Physics papers
│       ├── chemistry/
│       │   └── chemistry.html   # Chemistry papers
│       └── ... (30+ subjects)
│
├── ba/                  # B.A subjects
│   └── major/
│       ├── english/
│       │   └── english.html     # English papers
│       ├── history/
│       │   └── history.html     # History papers
│       └── ... (25+ subjects)
│
├── bcom/                # B.Com subjects
│   └── major/
│       ├── accounting/
│       │   └── accounting.html  # Accounting papers
│       ├── finance/
│       │   └── finance.html     # Finance papers
│       └── ... (20+ subjects)
│
├── css/
│   └── subjects.css     # Main stylesheet
│
├── js/
│   └── subjects.js      # JavaScript functionality
│
└── guidelines/          # Documentation
    ├── faq.html
    ├── privacy.html
    └── formats.html
    ```

```    
---

## 🔍 Search Functionality

The platform features a **global search bar** on the homepage that allows students to:

- 🔎 Search across **all streams** (BSc, BA, BCom)
- 📝 Find subjects by **name, code, or description**
- ⚡ **Real-time results** as you type
- 🎯 Click results to **directly navigate** to subject papers

![Search Demo](https://img.shields.io/badge/demo-search%20feature-blue)

---

## 📊 Content Scale

| Category | Quantity |
|----------|----------|
| 📚 **B.Sc Subjects** | 30+ |
| 📚 **B.A Subjects** | 25+ |
| 📚 **B.Com Subjects** | 20+ |
| 📄 **Files per subject** | 16+ |
| 📁 **SEC module files** | 4+ |
| 📝 **Total Question Papers** | **2500+** |
| ☁️ **Storage Type** | Google Drive |

---

## 🔗 Content Delivery

Instead of storing heavy PDF files locally, this system uses:

- ☁️ **Google Drive hosted question papers** - No server load
- 🔗 **Direct access links** embedded into each page
- ⚡ **Fast loading** - Pages load instantly
- 🔄 **Easy updates** - Just update Drive links

### Benefits:
- ✅ **Lightweight** - No PDF files in repository
- ✅ **Fast** - Pages load in milliseconds
- ✅ **Scalable** - Add unlimited papers
- ✅ **Cost-effective** - Free hosting on GitHub Pages

---

## 🖥️ User Flow

```mermaid
graph TD
    A[🏠 Home Page] --> B[🔍 Search Bar]
    A --> C[📚 Browse by Stream]
    
    B --> D[🔎 Search Results]
    D --> E[📄 Subject Page]
    
    C --> F[B.Sc]
    C --> G[B.A]
    C --> H[B.Com]
    
    F --> I[Select Subject]
    G --> I
    H --> I
    
    I --> J[📄 Subject Page]
    J --> K[📁 Choose Paper]
    K --> L[📥 View on Google Drive]
    ```
---

## 💻 Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Structure & Content |
| **CSS3** | Styling & Layout |
| **JavaScript** | Interactivity |
| **Google Drive** | Cloud Storage |
| **Anchor Links** | Navigation |
| **Font Awesome** | Icons|

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| ✅ **Global Search** | Instant real-time search across all subjects and streams |
| ✅ **Dark Mode** | Toggle light/dark theme |
| ✅ **Clean Navigation** | Structured subject-wise browsing |
| ✅ **Consistent Layout** | Uniform design across all streams |
| ✅ **SEC Modules** | Separated Skill Enhancement Courses |
| ✅ **Cloud Hosted** | All papers on Google Drive |
| ✅ **Responsive UI** | Works on all devices |
| ✅ **No Database** | Pure static files |
| ✅ **Scalable** | Easy to add new content |
| ✅ **Fast Loading** | No heavy PDF files locally |

---

## 🚀 Future Enhancements

| Feature | Description |
|---------|-------------|
| 🔍 **🔍 Advanced Search** | Find papers by year, semester |
| 👤 **Student login/dashboard** | Personalized experience |
| ⭐ **Bookmark papers** | Save important papers |
| 📊 **Usage analytics** | Track popular papers |
| 📥 **Download tracking** | Monitor paper access |
| 🤖 **AI-based recommendations** | Smart paper suggestions |
| 📱 ** PWA Support** | Offline access |

---

## 🔗 Quick Start

Follow these simple steps to get started with the project:

### 📥 Clone the repository
```bash
git clone https://github.com/sameer76-byte/CU-Archive.git
```

### 📂 Navigate to project directory
```bash
cd CU-Archive
```

### 🌐 Open in browser
```bash
open index.html
```
---

## 💻 Live Demo

Visit the live site: **[https://sameer76-byte.github.io/CU-Archive](https://github.com/sameer76-byte/CU-Archive.git)**

---

## 🛠️ Contributing

Contributions are welcome! Follow these steps to contribute:

| Step | Action | Command |
|------|--------|---------|
| 1️⃣ | 🍴 **Fork** the repository | Click "Fork" on GitHub |
| 2️⃣ | 📥 **Clone**  your fork | `git clone https://github.com/your-username/CU-Archive.git` |
| 3️⃣ | 🌿 **Create** feature branch | `git checkout -b feature/YourFeature` |
| 4️⃣ | 📝 **Add/Update** papers | `Follow existing structure` |
| 5️⃣ | 💾 **Commit** changes | `git commit -m "Add Your Feature"` |
| 6️⃣ | 📤 **Push** to branch | `git push origin feature/YourFeature` |
| 7️⃣ | 🔍 **Open** Pull Request | Click "New Pull Request" on GitHub |

---

---

## 🛠️ Contributing Guidelines

Maintain folder structure

Use descriptive commit messages

Update README if adding new subjects

Ensure Google Drive links are public
---

## 👨‍💻 Developer

<div align="center"> <img src="https://img.shields.io/badge/Developer-Sameer%20Prasad-blue?style=for-the-badge" alt="Developer"> <h3>Sameer Prasad</h3> <p><em>B.Sc Computer Science Student</em></p> <p>Building scalable and practical academic tools for the student community.</p> <br> <p> 📧 <strong>Email:</strong> <a href="mailto:sameerprasad980@gmail.com">sameerprasad980@gmail.com</a> • 🔗 <strong>GitHub:</strong> <a href="https://github.com/sameer76-byte">@sameer76-byte</a> </p> <p> <a href="https://github.com/sameer76-byte"> <img src="https://img.shields.io/github/followers/sameer76-byte?style=social" alt="GitHub followers"> </a> </p> </div>
---

---
## 📄 License
This project is developed for educational purposes only.

## ⚠️ Disclaimer:
 All question papers belong to their respective universities/boards. This platform only provides organized access to publicly available educational resources. We do not claim ownership of any copyrighted material.

---
## ⭐ Support
If you found this project useful for your studies, please consider supporting it:

<div align="center"> <table> <tr> <td align="center">⭐</td> <td><strong>Star the repository</strong> - Show appreciation</td> </tr> <tr> <td align="center">🍴</td> <td><strong>Fork it</strong> - Use for your institution</td> </tr> <tr> <td align="center">📢</td> <td><strong>Share with friends</strong> - Help fellow students</td> </tr> <tr> <td align="center">📝</td> <td><strong>Contribute papers</strong> - Expand the archive</td> </tr> </table><br> <br><h3>Made with ❤️ for students, by a student</h3>
<a href="https://github.com/sameer76-byte/CU-Archive/stargazers"> <img src="https://img.shields.io/github/stars/sameer76-byte/CU-Archive?style=for-the-badge&logo=github&color=yellow" alt="GitHub stars"> </a> <a href="https://github.com/sameer76-byte/CU-Archive/network/members"> <img src="https://img.shields.io/github/forks/sameer76-byte/CU-Archive?style=for-the-badge&logo=github&color=blue" alt="GitHub forks"> </a> <a href="https://github.com/sameer76-byte/CU-Archive/watchers"> <img src="https://img.shields.io/github/watchers/sameer76-byte/CU-Archive?style=for-the-badge&logo=github&color=green" alt="GitHub watchers"> </a><br> <br><p> <strong>⭐ Star this repo if it helped you!</strong> </p><p> <sub>Last updated: March 2025 | Version 1.0.0</sub> </p> </div> ```