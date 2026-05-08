// ═══════════════════════════════════════════════
//  Rawat Cake Parlour — Backend Server
//  Node.js + Express | JSON store (MongoDB-ready)
// ═══════════════════════════════════════════════

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// ── Middleware ──────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── DB Helpers ──────────────────────────────────
function readDB() {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } catch {
    return { foods: [], orders: [] };
  }
}
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// ── Simple JWT-less token auth (session token) ──
const ADMIN_TOKEN = 'rawat-admin-secret-2025';
function authMiddleware(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (token !== ADMIN_TOKEN) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// ══════════════════════════════════════════════
//  PUBLIC API ROUTES
// ══════════════════════════════════════════════

// GET all available food items
app.get('/api/foods', (req, res) => {
  const db = readDB();
  const { category } = req.query;
  let foods = db.foods.filter(f => f.available !== false);
  if (category && category !== 'all') {
    foods = foods.filter(f => f.category === category);
  }
  res.json({ success: true, count: foods.length, data: foods });
});

// GET single food item
app.get('/api/foods/:id', (req, res) => {
  const db = readDB();
  const food = db.foods.find(f => f.id === req.params.id);
  if (!food) return res.status(404).json({ error: 'Item not found' });
  res.json({ success: true, data: food });
});

// POST place order
app.post('/api/orders', (req, res) => {
  const { items, customerName, phone, address, total } = req.body;
  if (!items || !items.length) return res.status(400).json({ error: 'No items in order' });
  const db = readDB();
  const order = {
    id: uuidv4(),
    items,
    customerName: customerName || 'Guest',
    phone: phone || '',
    address: address || '',
    total: total || 0,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  db.orders.push(order);
  writeDB(db);
  res.json({ success: true, orderId: order.id, message: 'Order placed successfully!' });
});

// ══════════════════════════════════════════════
//  ADMIN API ROUTES (protected)
// ══════════════════════════════════════════════

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'rawat@2025') {
    res.json({ success: true, token: ADMIN_TOKEN, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

// GET all foods (admin — includes unavailable)
app.get('/api/admin/foods', authMiddleware, (req, res) => {
  const db = readDB();
  res.json({ success: true, data: db.foods });
});

// POST add new food item
app.post('/api/admin/foods', authMiddleware, (req, res) => {
  const { name, category, price, description, emoji, badge, rating, reviews, tags, imageUrl } = req.body;
  if (!name || !category || !price) {
    return res.status(400).json({ error: 'Name, category, and price are required' });
  }
  const db = readDB();
  const newFood = {
    id: (category === 'cake' ? 'c' : 'f') + Date.now(),
    name,
    category,
    price: Number(price),
    description: description || '',
    emoji: emoji || (category === 'cake' ? '🎂' : '🍔'),
    badge: badge || 'New',
    rating: Number(rating) || 4.5,
    reviews: Number(reviews) || 0,
    tags: tags || [],
    available: true,
    imageUrl: imageUrl || ''
  };
  db.foods.push(newFood);
  writeDB(db);
  res.json({ success: true, data: newFood, message: 'Item added successfully' });
});

// PUT update food item
app.put('/api/admin/foods/:id', authMiddleware, (req, res) => {
  const db = readDB();
  const idx = db.foods.findIndex(f => f.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Item not found' });
  db.foods[idx] = { ...db.foods[idx], ...req.body };
  writeDB(db);
  res.json({ success: true, data: db.foods[idx], message: 'Item updated' });
});

// DELETE food item
app.delete('/api/admin/foods/:id', authMiddleware, (req, res) => {
  const db = readDB();
  const idx = db.foods.findIndex(f => f.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Item not found' });
  db.foods.splice(idx, 1);
  writeDB(db);
  res.json({ success: true, message: 'Item deleted' });
});

// GET all orders (admin)
app.get('/api/admin/orders', authMiddleware, (req, res) => {
  const db = readDB();
  res.json({ success: true, data: db.orders.reverse() });
});

// PUT update order status
app.put('/api/admin/orders/:id', authMiddleware, (req, res) => {
  const db = readDB();
  const order = db.orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.status = req.body.status || order.status;
  writeDB(db);
  res.json({ success: true, data: order });
});

// ── Serve frontend ──────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🎂 Rawat Cake Parlour server running at http://localhost:${PORT}`);
  console.log(`📋 Admin panel: http://localhost:${PORT}/admin.html`);
  console.log(`🔑 Admin login: username=admin | password=rawat@2025\n`);
});
