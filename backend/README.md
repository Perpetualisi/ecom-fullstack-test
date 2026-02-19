# ⚙️ TechMarket - Backend API

A RESTful API built to power the TechMarket storefront.

## 🛠 Tech Stack
- **Runtime**: Node.js & TypeScript
- **Framework**: Express
- **ORM**: Prisma v6
- **Database**: SQLite

## 🛣 API Endpoints
- `GET /products`: Returns all products (Supports `?category=` filter).
- `GET /products/:id`: Returns a single product by its ID.
- `DELETE /products/:id`: Removes a product from the database.

## 🚀 Setup
1. `cd backend`
2. `npm install`
3. `npx prisma db push` (to sync the SQLite database)
4. `npm run dev`