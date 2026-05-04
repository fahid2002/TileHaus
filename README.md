# 🏛️ TileHaus

**Premium tile gallery for architects, designers, and homeowners.**

TileHaus is a full-stack, meticulously crafted web application built to showcase premium ceramic, marble, and mosaic tiles. It serves as a curated digital gallery, offering seamless user authentication, personalized profile management, and dynamic database-driven product displays.

**🔗 Live Demo:** [https://tile-haus.vercel.app](https://tile-haus.vercel.app)

---

## 🎯 Project Purpose

The purpose of TileHaus is to provide a highly performant, visually engaging platform where users can discover aesthetic inspiration for their spaces. Built with a modern Next.js architecture, it demonstrates advanced capabilities in secure authentication, responsive UI/UX design, real-time database querying, and robust state management.

---

## ✨ Key Features

* **Secure Authentication System:** Implemented using Better Auth, supporting both standard Email/Password registration and seamless Google OAuth login.
* **User Profile Management:** Authenticated users can view and update their profile, including changing their display name and uploading a custom avatar (via URL or local file reader).
* **Dynamic Data Rendering:** Live connection to MongoDB Atlas fetches real-time tile collections and dynamically updates platform statistics (e.g., total curated tiles).
* **Protected Routes:** Utilizes Next.js server-side proxy/middleware to protect sensitive routes (like `/my-profile` and `/tile/[id]`) from unauthenticated access.
* **Modern UI/UX:** Styled with custom CSS variables, elegant typography (Playfair Display & DM Sans), interactive marquees, and dynamic carousels.
* **Toaster Notifications:** Context-aware success and error state notifications for auth and profile actions.

---

## 🛠️ Tech Stack & NPM Packages

This project utilizes a modern React ecosystem powered by Turbopack and Vercel.

**Core Framework & Database:**
* `next` (v16.2.4) - React framework for Server Side Rendering (SSR) and routing.
* `react` / `react-dom` - UI library.
* `mongodb` - Official MongoDB driver to fetch and manage the tile database.

**Authentication:**
* `better-auth` - Comprehensive authentication library handling Google OAuth, session encryption, and credential management.

**UI Components & Styling:**
* `@heroui/react` - Pre-built, accessible UI components (Buttons, Inputs).
* `react-hot-toast` - Lightweight, customizable toast notifications for user feedback.
* *(Implicit)* `swiper` - Used for the `FeaturedSwiper` interactive tile carousel.

---

## 🚀 Getting Started (Local Development)

To run this project locally on your machine, follow these steps:

### 1. Clone the repository
```bash
git clone [https://github.com/fahid2002/TileHaus.git](https://github.com/fahid2002/TileHaus.git)
cd TileHaus

2. Install dependencies
npm install

3. Configure Environment Variables
Create a .env file in the root directory and add the following keys. Note: For local development, ensure your Auth URLs are set to localhost.

# Database
MONGODB_URI=mongodb+srv://<your-db-user>:<password>@<cluster-url>/TileHaus

# Better Auth Configuration
BETTER_AUTH_SECRET=your_super_secret_random_string
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

4. Run the development server
npm run dev
Open http://localhost:3000 with your browser to see the result.

🌍 Deployment Variables (Vercel)
When deploying to Vercel, ensure your production Environment Variables are updated to match your live domain:

BETTER_AUTH_URL = https://tile-haus.vercel.app
NEXT_PUBLIC_BETTER_AUTH_URL = https://tile-haus.vercel.app

(Note: You must also add the live Vercel callback URL to your Google Cloud Console Authorized Redirect URIs).

📞 Contact & Author
Fahid Hasan Ifty
Email: fahidhasanifty20@gmail.com
Location: Dhaka, Bangladesh
WhatsApp: +88 01749573951

© 2026 TileHaus. All rights reserved.