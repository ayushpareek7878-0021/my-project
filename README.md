# 🎂 Rawat Cake Parlour — Full Stack Website

**Premium food business website for Rawat Cake Parlour, Sikar, Rajasthan**

---

## 📁 Project Structure

```
rawat/
├── server.js              ← Node.js + Express backend
├── package.json           ← Dependencies
├── data/
│   └── db.json           ← JSON database (food items + orders)
└── public/
    ├── index.html         ← Main customer-facing website
    ├── admin.html         ← Admin panel (CRUD + orders)
    ├── css/
    │   └── style.css      ← Premium styles
    └── js/
        └── main.js        ← Frontend logic + API calls
```

---

## 🚀 Setup & Run

### 1. Install Dependencies
```bash
cd rawat
npm install
```

### 2. Start the Server
```bash
npm start
# OR for development with auto-reload:
npm run dev
```

### 3. Open in Browser
- **Website:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin.html

---

## 🔐 Admin Credentials

| Field    | Value        |
|----------|--------------|
| Username | `admin`      |
| Password | `rawat@2025` |

> ⚠️ Change these in `server.js` before going live!

---

## 🌐 API Endpoints

### Public API
| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| GET    | `/api/foods`          | Get all available food items |
| GET    | `/api/foods?category=cake` | Filter by category     |
| GET    | `/api/foods/:id`      | Get single food item         |
| POST   | `/api/orders`         | Place a new order            |

### Admin API (requires `x-admin-token` header)
| Method | Endpoint               | Description          |
|--------|------------------------|----------------------|
| POST   | `/api/admin/login`     | Admin login          |
| GET    | `/api/admin/foods`     | Get all items        |
| POST   | `/api/admin/foods`     | Add new item         |
| PUT    | `/api/admin/foods/:id` | Update item          |
| DELETE | `/api/admin/foods/:id` | Delete item          |
| GET    | `/api/admin/orders`    | Get all orders       |
| PUT    | `/api/admin/orders/:id`| Update order status  |

---

## 🍃 MongoDB Integration (Upgrade Path)

To switch from JSON to MongoDB:

1. `npm install mongoose`
2. Create `models/Food.js` and `models/Order.js`
3. Replace `readDB()`/`writeDB()` helpers in `server.js` with Mongoose queries
4. Connect: `mongoose.connect('mongodb://localhost:27017/rawat')`

---

## 🎨 Design Features

- **Dark luxury theme** with warm crimson + amber accent
- **Cormorant Garamond** display font — editorial & premium
- **Glassmorphism** navbar and hover cards
- **Scroll-reveal animations** on all sections
- **HD images** from Unsplash (food photography)
- **Google Maps embed** for Sikar location
- **Fully responsive** — mobile + tablet + desktop

---

## 📦 Tech Stack

| Layer     | Technology                    |
|-----------|-------------------------------|
| Frontend  | HTML5, CSS3, Vanilla JS (ES6+)|
| Backend   | Node.js + Express             |
| Database  | JSON (MongoDB-ready)          |
| Fonts     | Google Fonts (Cormorant + Syne)|
| Images    | Unsplash HD food photography  |

---

## 📞 Business Details

- **Name:** Rawat Cake Parlour
- **Location:** Maha Mandir Road, Sikar, Rajasthan 332001
- **Phone:** +91 98765 43210 *(update with real number)*
- **Email:** rawatcakeparlour@gmail.com *(update with real email)*

---

## ✅ Features Checklist

- [x] Sticky premium navbar with full logo visibility
- [x] HD hero section with animated food showcase
- [x] Dynamic food grid fetched from API
- [x] Category filter (Cakes / Fast Food)
- [x] Working search with live results
- [x] Food detail modal with quantity selector
- [x] Add to cart with persistent localStorage
- [x] Cart drawer with checkout flow
- [x] Order placement API
- [x] About section with brand story
- [x] Customer reviews section
- [x] Contact section with Google Maps embed
- [x] Full footer with business details
- [x] Admin login (JWT-style token auth)
- [x] Admin dashboard with stats
- [x] Add / Edit / Delete food items
- [x] Order management with status updates
- [x] Fully responsive (mobile-first)
- [x] Scroll-reveal animations
- [x] Toast notifications

---

*Made for Rawat Cake Parlour, Sikar, Rajasthan 🎂*
