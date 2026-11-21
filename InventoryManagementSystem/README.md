# Inventory and Data Management System

A beginner-friendly backend assignment built with Node.js, Express.js, MongoDB and Mongoose.

## 1. Requirements

- Node.js and npm
- MongoDB running locally, or a MongoDB Atlas connection URL
- Postman for testing

## 2. Setup

Open a terminal in this project folder and run:

```bash
npm install
```

Create a file named `.env` in the project root. Copy the contents of `.env.example` into it:

```env
PORT=5000
MONGO_URL=mongodb://127.0.0.1:27017/inventoryDB
```

If you use MongoDB Atlas, replace the local MongoDB URL with your Atlas connection string.

## 3. Run the project

```bash
npm run dev
```

The server runs at `http://localhost:5000`.

Open `http://localhost:5000` in your browser to check that the API is running.

## 4. API endpoints

Base URL: `http://localhost:5000/api/products`

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/` | Create a product |
| GET | `/` | Get products with filtering, sorting and pagination |
| GET | `/:id` | Get one product |
| PUT | `/:id` | Update a product |
| DELETE | `/:id` | Delete a product |
| GET | `/low-stock` | List products at or below reorder level |
| GET | `/summary` | Category-wise inventory summary |
| PATCH | `/:id/stock` | Increase or decrease stock |

## 5. Sample POST body

Use Postman: POST `http://localhost:5000/api/products`, select Body > raw > JSON.

```json
{
  "name": "Gel Pen Pack of 15",
  "sku": "STNY-PN-713",
  "category": "Stationery",
  "price": 120,
  "quantity": 40,
  "reorderLevel": 20,
  "supplier": "Cello Pens"
}
```

## 6. Query examples

- Filter by category: `GET /api/products?category=Stationery`
- Search by product name: `GET /api/products?search=Gel`
- Minimum price: `GET /api/products?minPrice=100`
- Maximum price: `GET /api/products?maxPrice=500`
- Sort by price ascending: `GET /api/products?sort=price`
- Sort by price descending: `GET /api/products?sort=-price`
- Pagination: `GET /api/products?page=1&limit=5`
- Combine options: `GET /api/products?category=Stationery&page=1&limit=5&sort=-price`

## 7. Stock adjustment

Send PATCH to `/api/products/PRODUCT_ID/stock`.

Increase stock:

```json
{
  "change": 10
}
```

Decrease stock:

```json
{
  "change": -5
}
```

The API does not allow stock to become negative.

## 8. Project structure

```text
InventoryManagementSystem/
├── config/
│   └── db.js
├── middleware/
│   └── errorMiddleware.js
├── models/
│   └── Product.js
├── routes/
│   └── productRoutes.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Notes

- Copy `.env.example` to `.env` before running the application.
- Do not upload `.env` or `node_modules` to GitHub.
- MongoDB must be running and reachable before testing the APIs.
- Test each endpoint in Postman and keep screenshots for your practical submission.
