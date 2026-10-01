# Database Guide — Smart Maize Farming System

## Current Database: Convex (Already Integrated)

This project uses **Convex** as its primary database — a serverless backend-as-a-service with a generous free tier.

### Why Convex?

| Feature | Details |
|---------|---------|
| **Free Tier** | 1M function executions/month, 1GB storage |
| **Real-time** | Built-in reactive queries |
| **Type-safe** | Full TypeScript support |
| **Already Integrated** | Schema and client already configured |
| **No Cold Starts** | Always warm, unlike serverless functions |

### Convex Free Tier Limits

| Resource | Free Limit |
|----------|------------|
| Function executions | 1M/month |
| Storage | 1GB |
| Bandwidth | 10GB/month |
| Concurrent connections | Unlimited |

---

## Setting Up Convex (Free)

### Step 1: Install Convex CLI

```bash
npm install -g convex
```

### Step 2: Create Convex Account

1. Go to [dashboard.convex.dev](https://dashboard.convex.dev)
2. Sign up with GitHub
3. Create a new project

### Step 3: Initialize Convex in Your Project

```bash
cd Backend
npx convex dev
```

This will:
- Create a new Convex deployment
- Generate the `CONVEX_URL` for your `.env`
- Set up real-time sync

### Step 4: Get Your Convex URL

After running `npx convex dev`, you'll see:

```
Deployment: https://your-project-name.convex.cloud
```

Add this to your `Backend/.env`:

```
CONVEX_URL=https://your-project-name.convex.cloud
```

---

## Alternative Free Database Options

If you want to use a different database, here are free alternatives:

### 1. Supabase (PostgreSQL)

| Feature | Details |
|---------|---------|
| **Free Tier** | 500MB storage, 2GB bandwidth |
| **Type** | PostgreSQL (relational) |
| **Real-time** | Built-in subscriptions |
| **Auth** | Built-in authentication |

**Migration Effort**: Medium — would need to rewrite database layer

### 2. Firebase (Firestore)

| Feature | Details |
|---------|---------|
| **Free Tier** | 1GB storage, 50K reads/day |
| **Type** | NoSQL document store |
| **Real-time** | Built-in listeners |
| **Auth** | Built-in authentication |

**Migration Effort**: Medium — different data model

### 3. PlanetScale (MySQL)

| Feature | Details |
|---------|---------|
| **Free Tier** | 5GB storage, 1B row reads/month |
| **Type** | MySQL (relational) |
| **Scaling** | Serverless MySQL |

**Migration Effort**: High — SQL schema redesign

### 4. MongoDB Atlas

| Feature | Details |
|---------|---------|
| **Free Tier** | 512MB storage |
| **Type** | NoSQL document store |
| **Hosting** | AWS/GCP/Azure |

**Migration Effort**: Medium — different data model

### 5. Turso (SQLite)

| Feature | Details |
|---------|---------|
| **Free Tier** | 9GB storage, 500M row reads/month |
| **Type** | SQLite (edge-optimized) |
| **Latency** | Global edge replication |

**Migration Effort**: High — SQL schema redesign

---

## Recommendation

**Stick with Convex** — it's already integrated, has a generous free tier, and requires zero migration effort.

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
echo "CONVEX_URL=https://your-project.convex.cloud" >> .env

# 5. Deploy to production
npx convex deploy
```

---

## Database Schema Overview

The project uses 14 tables:

| Table | Purpose |
|-------|---------|
| `users` | User accounts (farmers, experts, admins) |
| `farms` | Farm profiles and locations |
| `sensors` | IoT sensor devices |
| `sensor_data` | Sensor readings (moisture, temperature, etc.) |
| `weather_data` | Weather forecasts by district |
| `pest_detections` | AI-detected pest images and analysis |
| `irrigation_schedules` | Planned irrigation events |
| `fertilization_schedules` | Planned fertilization events |
| `pest_control_schedules` | Planned pest control actions |
| `recommendations` | AI-generated farming recommendations |
| `farm_issues` | Reported farm problems |
| `messages` | SMS/USSD/email notifications |
| `audit_logs` | System audit trail |
| `iot_device_tokens` | IoT device authentication |
| `districts` | Rwanda administrative districts |
| `system_config` | System configuration key-value store |

---

## Production Deployment

### Convex Production Deployment

```bash
# Deploy to production
npx convex deploy

# View production dashboard
npx convex dashboard
```

### Environment Variables

Add to your `Backend/.env`:

```
CONVEX_URL=https://your-project.convex.cloud
```

Add to your `Frontend/.env`:

```
VITE_CONVEX_URL=https://your-project.convex.cloud
```

---

## Monitoring

### Convex Dashboard

- [dashboard.convex.dev](https://dashboard.convex.dev)
- View function execution logs
- Monitor storage usage
- Debug queries in real-time

### Free Monitoring Tools

| Tool | Purpose |
|------|---------|
| **UptimeRobot** | Ping your backend every 5 min |
| **Sentry** (free tier) | Error tracking |
| **Google Analytics** | Frontend analytics |
