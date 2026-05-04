This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# TileHaus – Tile Gallery

A premium tile gallery web application built with Next.js App Router.

## 🌐 Live URL
https://tilehaus.vercel.app

## 📌 Purpose
TileHaus is a curated platform for discovering, browsing, and exploring premium tiles including ceramic, marble, mosaic, porcelain, terracotta, and zellige designs.

## ✨ Key Features
- Tile gallery with search and category filtering
- Swiper.js animated carousel on home and tile detail pages
- Authentication with email/password and Google OAuth (BetterAuth)
- Protected routes for tile details and user profile
- Profile update (name and image URL via BetterAuth updateUser)
- Responsive design for mobile, tablet and desktop
- Marquee text animation on home page
- Custom 404 and loading UI

## 📦 NPM Packages Used
- `@heroui/react` – UI component library
- `swiper` – SwiperJS React for animated carousel
- `better-auth` – Authentication with MongoDB adapter
- `mongoose` – MongoDB object modeling
- `react-hot-toast` – Toast notifications
- `framer-motion` – Required peer dependency for HeroUI

## 🔐 Environment Variables
See `.env.local`:
- `MONGODB_URI`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `NEXT_PUBLIC_APP_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`