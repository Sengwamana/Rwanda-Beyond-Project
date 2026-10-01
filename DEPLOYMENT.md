# Deployment Guide — Smart Maize Farming System

## Free Hosting Platform Recommendations

### Frontend (React + Vite — Static Site)

| Platform | Free Tier | Best For | Deploy Time |
|----------|-----------|----------|-------------|
| **Vercel** (Recommended) | 100GB bandwidth, unlimited sites | React/Vite projects, instant deploys | ~2 min |
| **Netlify** | 100GB bandwidth, 300 build min/month | Static sites, forms, functions | ~3 min |
| **Cloudflare Pages** | Unlimited bandwidth, 500 builds/month | Performance, global CDN | ~3 min |
| **GitHub Pages** | 100GB bandwidth, 10GB storage | Simple static sites | ~5 min |

### Backend (Node.js + Express)

| Platform | Free Tier | Best For | Notes |
|----------|-----------|----------|-------|
| **Render** (Recommended) | 750 hours/month, sleeps after 15min idle | Node.js APIs, WebSockets | Cold start ~30s |
| **Railway** | $5 credit/month, 500 hours | Quick prototyping | Generous free tier |
| **Fly.io** | 3 shared VMs, 3GB storage | Low-latency global apps | Requires credit card |
| **Convex** (Already Used) | Free tier included | Backend-as-a-service | Already in project |

---

## Recommended Architecture

```
┌─────────────────────────────────────────────────────┐
│                    FREE HOSTING                      │
├──────────────────────┬──────────────────────────────┤
│                      │                              │
│   ┌──────────────┐   │   ┌──────────────────────┐   │
│   │   Vercel     │   │   │      Render          │   │
│   │   Frontend   │───┼───>│      Backend         │   │
│   │   (React)    │   │   │   (Node.js + Express) │   │
│   └──────────────┘   │   └──────────┬───────────┘   │
│                      │              │               │
│                      │   ┌──────────▼───────────┐   │
│                      │   │      Convex          │   │
│                      │   │   (Database - Free)  │   │
│                      │   └──────────────────────┘   │
└──────────────────────┴──────────────────────────────┘
```

---

## Database Setup (Convex — Free)

This project uses **Convex** as its database — a serverless backend-as-a-service with a generous free tier.

### Quick Start

```bash
# 1. Install Convex CLI
npm install -g convex

# 2. Login to Convex
npx convex login

# 3. Initialize in your project
cd Backend
npx convex dev

# 4. Copy the CONVEX_URL to your .env
# After running `npx convex dev`, you'll see:
# Deployment: https://your-project-name.convex.cloud
echo "CONVEX_URL=https://your-project-name.convex.cloud" >> .env

# 5. Deploy to production
npx convex deploy
```

### Convex Free Tier

| Resource | Free Limit |
|----------|------------|
| Function executions | 1M/month |
| Storage | 1GB |
| Bandwidth | 10GB/month |

### Alternative Free Databases

| Database | Free Tier | Type | Migration Effort |
|----------|-----------|------|------------------|
| **Convex** (Current) | 1M executions, 1GB | Serverless | None |
| **Supabase** | 500MB, 2GB bandwidth | PostgreSQL | Medium |
| **Firebase** | 1GB, 50K reads/day | NoSQL | Medium |
| **MongoDB Atlas** | 512MB | NoSQL | Medium |
| **Turso** | 9GB, 500M reads/month | SQLite | High |

> **Recommendation**: Stick with Convex — it's already integrated and requires zero migration effort.

---

## Step-by-Step Deployment

### 1. Deploy Backend to Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → Sign up with GitHub
3. Click **New +** → **Web Service**
4. Connect your GitHub repository
5. Configure:
   - **Name**: `smart-maize-backend`
   - **Root Directory**: `Backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add environment variables (see `Backend/.env.example`)
7. Click **Create Web Service**

### 2. Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure:
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables (see `Frontend/.env.example`)
6. Click **Deploy**

### 3. Update Environment Variables

After deployment, update your frontend `.env`:

```
VITE_API_URL=https://your-backend.onrender.com/api/v1
VITE_WS_URL=wss://your-backend.onrender.com/ws
```

---

## Environment Variables Required

### Backend (Render)

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | `production` |
| `PORT` | Yes | `3000` |
| `CONVEX_URL` | Yes | Your Convex deployment URL |
| `CLERK_SECRET_KEY` | Yes | From Clerk dashboard |
| `CLERK_PUBLISHABLE_KEY` | Yes | From Clerk dashboard |
| `CORS_ORIGINS` | Yes | Your Vercel URL |
| `GEMINI_API_KEY` | Recommended | For AI features |
| `CLOUDINARY_*` | Optional | For image uploads |
| `AT_API_KEY` | Optional | For SMS notifications |

### Frontend (Vercel)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes | Your Render backend URL |
| `VITE_WS_URL` | Yes | Your Render WebSocket URL |
| `VITE_CLERK_PUBLISHABLE_KEY` | Yes | From Clerk dashboard |
| `VITE_MAPBOX_ACCESS_TOKEN` | Optional | For maps |

---

## Free Tier Limitations

| Platform | Limitation | Workaround |
|----------|------------|------------|
| Render | Sleeps after 15 min idle | Use UptimeRobot to ping every 10 min |
| Vercel | 100GB bandwidth | Optimize assets, use CDN |
| Convex | Free tier limits | Sufficient for small-scale use |

---

## Quick Start Commands

```bash
# Build frontend for production
cd Frontend && npm run build

# Test backend locally
cd Backend && npm start

# Deploy to Render (CLI)
npm install -g render-cli
render deploy

# Deploy to Vercel (CLI)
npm install -g vercel
cd Frontend && vercel
```
