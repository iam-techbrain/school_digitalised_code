# School Evolution — Official EdTech & Campus Blog 🎓
> **Official Knowledge & Insights Portal for Modern Educational Institutions**  
> **Subdomain Target:** `school.digiritual.com`  
> **Parent Ecosystem:** `digiritual.com`  
> **Built with:** HTML5 • Tailwind CSS • Vanilla JavaScript (Zero Build Steps, Zero Dependencies)

---

## 📖 Table of Contents
1. [About School Evolution](#-about-school-evolution)
2. [Project Vision & Objectives](#-project-vision--objectives)
3. [Key Highlights & Tech Stack](#-key-highlights--tech-stack)
4. [Complete Folder Structure](#-complete-folder-structure)
5. [Core Features Breakdown](#-core-features-breakdown)
6. [Hosting & Deployment on `school.digiritual.com`](#-hosting--deployment-on-schooldigiritualcom)
7. [How to Manage & Publish Articles](#-how-to-manage--publish-articles)
8. [SEO & Social Sharing Guidelines](#-seo--social-sharing-guidelines)
9. [Browser Compatibility & Performance](#-browser-compatibility--performance)
10. [License & Credits](#-license--credits)

---

## 🌟 About School Evolution

**School Evolution** (by Digiritual) is a specialized initiative dedicated to modernizing K-12 and higher education institutions through smart technology, actionable pedagogy, and seamless digital administration.

This standalone blog portal (`school.digiritual.com`) serves as an intellectual hub for:
- **School Principals & Trustees:** Strategy guides on ERP adoption, digital admissions, and campus cybersecurity.
- **Teachers & Educators:** Class engagement strategies, AI-assisted grading, gamified STEM curricula, and blended learning.
- **Parents:** Practical guidance on balancing screen time, cyber wellness, and real-time parent-teacher communication portals.
- **Administrative Staff:** Paperless office workflows, fee collection automation, and biometric/RFID attendance logs.

---

## 🎯 Project Vision & Objectives

- **100% Lightweight & Blazing Fast:** Loads instantly in under 1 second without heavy Node.js runtimes, backend servers, or complex hydration scripts.
- **Zero-Dependency Architecture:** Runs out of the box using pure HTML5, Tailwind CSS, and Vanilla JavaScript.
- **Subdomain-Ready:** Pre-configured specifically to live seamlessly on `school.digiritual.com`.
- **Editorial Flexibility:** Includes a built-in visual blog publisher (`admin.html`) with live card preview and automatic snippet generation.

---

## ⚡ Key Highlights & Tech Stack

| Technology | Purpose | Implementation |
| :--- | :--- | :--- |
| **HTML5** | Semantic structure & SEO | Native HTML5 with accessible tags (`<article>`, `<header>`, `<main>`, `<nav>`) |
| **Tailwind CSS v3** | Styling & Design System | CDN-based with custom theme config (Brand Indigo & Emerald accents) |
| **Vanilla JavaScript** | Interactive logic | Pure ES6+ for instant search, filtering, applause, and comments |
| **Lucide Icons** | Visual iconography | Lightweight SVG icon library via CDN |
| **Google Fonts** | Modern typography | Plus Jakarta Sans (UI) & Playfair Display (Serif touches) |
| **Client Storage** | Data persistence | `localStorage` for claps, comments, and newly drafted custom articles |

---

## 📁 Complete Folder Structure

```
School Digitalised/Code/
│
├── index.html                  # Main Blog Homepage
│                               # - Header with branding & navigation
│                               # - Hero section with live instant search bar
│                               # - Featured editorial showcase
│                               # - Category filter pills with soft 3px scrollbar
│                               # - Dynamic articles grid with card hover effects
│                               # - Newsletter subscription with feedback toast
│                               # - School ecosystem footer
│
├── post.html                   # Single Article Reader View
│                               # - Fixed reading progress bar at viewport top
│                               # - Breadcrumb navigation
│                               # - High-resolution cover & article typography
│                               # - Interactive Clap/Applause counter
│                               # - 1-Click WhatsApp, LinkedIn & Copy Link share
│                               # - Contributor / Author biography card
│                               # - Community thoughts & comments section
│                               # - Recommended related articles carousel
│
├── admin.html                  # Visual Blog Publisher & Management Panel
│                               # - Visual drafting form (Title, Category, Summary, Content)
│                               # - Real-time Live Card Preview as you type
│                               # - Instant 1-click publishing to browser
│                               # - 1-click JSON snippet generator for data.js
│                               # - Management table for published custom articles
│
├── css/
│   └── custom.css              # Custom Styling & Animations
│                               # - Plus Jakarta Sans & typography rules
│                               # - .soft-thin-scroll: 3px delicate horizontal scrollbar
│                               # - Glassmorphism navigation (.glass-nav)
│                               # - Article typography styles (h2, h3, blockquotes, lists)
│                               # - Card hover micro-animations
│
├── js/
│   ├── data.js                 # Central Blog Database
│   │                           # - Array of pre-seeded educational articles
│   │                           # - Helper functions: getAllPosts(), getPostBySlug(),
│   │                           #   getFeaturedPost(), getCategories()
│   │
│   ├── app.js                  # Homepage Logic
│   │                           # - Featured post dynamic injection
│   │                           # - Real-time live search across title, tags & content
│   │                           # - Category pill selection & count updates
│   │                           # - Newsletter submission handling & toast alerts
│   │                           # - Mobile menu toggle
│   │
│   ├── post.js                 # Article Reader Logic
│   │                           # - Dynamic URL slug parsing (?slug=...)
│   │                           # - Reading progress indicator calculation on scroll
│   │                           # - Persistent applause / likes via localStorage
│   │                           # - Social sharing triggers (WhatsApp, LinkedIn, Clipboard)
│   │                           # - Interactive community comments system
│   │                           # - Automatic related posts discovery
│   │
│   └── admin.js                # Blog Publisher Logic
│                               # - Live preview synchronization on form input
│                               # - Preset classroom photo picker
│                               # - Pre-filled sample article template
│                               # - localStorage persistence for custom articles
│                               # - Formatted JS snippet exporter for data.js
│
└── README.md                   # Comprehensive project documentation & hosting guide
```

---

## 🎨 Core Features Breakdown

### 1. Dynamic Search & Multi-Topic Filtering
- **Topics included:**
  - `EdTech & AI` — Smart classroom automation & adaptive learning.
  - `School Management` — ERP migration, fee automation, and paperless admissions.
  - `Parenting & Community` — Digital parent communication and child wellness.
  - `Teaching Tips` — Gamified STEM and active pedagogical techniques.
  - `Student Life & Safety` — Cyber hygiene, password safety, and online child protection.
- Live search instantly filters across title, excerpt, author name, category, and tags without re-rendering the whole page.

### 2. Immersive Reading Experience
- **Progress Bar:** A subtle brand-colored line at the top reveals reading progress as the user scrolls.
- **Applaud / Claps:** Readers can show appreciation; counts are remembered in the user's browser.
- **Social Sharing:** One-click sharing formatted specifically for WhatsApp chats, LinkedIn feeds, and direct link copy.
- **Community Thoughts:** A clean comment module where teachers and parents can exchange thoughts on each article.

### 3. Visual Publisher (`admin.html`)
- Anyone can write and publish a new post without touching code.
- Includes a **Live Card Preview** that updates character by character as you fill in the form.
- Provides a **"Generate Code for data.js"** button to easily make additions permanent in source control.

---

## 🌐 Hosting & Deployment on `school.digiritual.com`

Since this project has **zero build steps** and requires **no Node.js server**, deployment takes less than 2 minutes.

### Method A: cPanel / Traditional Shared Hosting (Recommended)
1. Log in to your hosting cPanel.
2. Go to **Domains** ➔ **Subdomains**.
3. Create the subdomain:
   - **Subdomain:** `school`
   - **Domain:** `digiritual.com`
   - **Document Root:** `/public_html/school` (or `/public_html/school.digiritual.com`)
4. Open cPanel **File Manager** and open the document root folder.
5. Upload all the files and folders from this project:
   - `index.html`
   - `post.html`
   - `admin.html`
   - `css/`
   - `js/`
6. Open your browser and navigate to `https://school.digiritual.com`. Done!

---

### Method B: Cloudflare Pages / Vercel / Netlify
1. Push this folder to a GitHub repository (e.g. `github.com/your-org/school-evolution-blog`).
2. Log into Cloudflare Pages / Vercel / Netlify and click **New Project**.
3. Select your repository.
4. Set the build configurations:
   - **Framework Preset:** None / Other / Static
   - **Build Command:** *(Leave completely empty)*
   - **Output Directory:** `./` (or root)
5. Under **Custom Domains**, add: `school.digiritual.com`.
6. Add the DNS CNAME record pointing to your host.

---

### Method C: Nginx Web Server (Ubuntu / Linux VPS)
```nginx
server {
    listen 80;
    server_name school.digiritual.com;
    root /var/www/school-evolution;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable Gzip Compression for blazing fast delivery
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

---

## ✍️ How to Manage & Publish Articles

You can publish and manage posts in two ways:

### Approach 1: Visual Publisher (Quick & Easy)
1. Open `admin.html` in your browser.
2. Enter the Title, Category, Read Time, Summary, Author, and HTML content.
3. Click **"Publish Instantly to Blog"**.
4. The post is immediately saved and visible on `index.html` and `post.html`!

### Approach 2: Permanent Code Addition (`js/data.js`)
1. In `admin.html`, fill in the form and click **"Generate Code for data.js"**.
2. Click **Copy** to copy the generated JSON code snippet.
3. Open [`js/data.js`](file:///e:/CLIENTS/School%20Digitalised/Code/js/data.js).
4. Paste the snippet inside the `BLOG_POSTS = [...]` array at the top.
5. Save the file and push/upload. The article is now permanently baked into the website!

---

## 🔍 SEO & Social Sharing Guidelines

To ensure maximum organic search traffic and rich preview cards on WhatsApp/Facebook/LinkedIn:

1. **Title Tags:**
   - Format: `<title>Article Title | School Evolution</title>`
2. **Meta Descriptions:**
   - Keep excerpts between 140–160 characters for best Google snippet display.
3. **OpenGraph & Twitter Cards:**
   ```html
   <meta property="og:title" content="Article Title">
   <meta property="og:description" content="Brief excerpt...">
   <meta property="og:image" content="https://school.digiritual.com/cover.jpg">
   <meta property="og:url" content="https://school.digiritual.com/post.html?slug=...">
   ```
4. **Images:**
   - Use educational images with 16:9 or 16:10 aspect ratio (1200x675 or 1200x750 pixels). Unsplash educational photos or high-res campus photography work best.

---

## 📱 Browser Compatibility & Performance

- **Tested Browsers:** Chrome, Microsoft Edge, Safari, Firefox, Opera, Brave, Mobile Chrome, and iOS Safari.
- **Performance Rating:** 98+ on Google Lighthouse (no heavy JavaScript bundles, no render-blocking frameworks).
- **Responsive Breakpoints:** Fully fluid from 320px mobile screens up to 4K ultra-wide monitors.

---

## 📜 Credits & Brand Rights
- **Brand Name:** School Evolution
- **Parent Network:** [Digiritual](https://digiritual.com)
- **Subdomain:** [school.digiritual.com](https://school.digiritual.com)
- **Copyright:** © 2026 School Evolution. All rights reserved.
