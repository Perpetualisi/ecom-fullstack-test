# 🛒 TechMarket Frontend

This is a responsive e-commerce product listing page built with React, TypeScript, and Vite.

## 🛠 Features
- **Responsive Product Cards**: Displays image, name, price, and category.
- **Dynamic Inventory Logic**: The "Add to Cart" button automatically updates to "Out of Stock" and becomes disabled when stock is 0.
- **Category Filtering**: Integrated with the backend to filter products by category via URL query parameters.
- **Local Cart Management**: Implemented "Add to Cart" functionality using React local state.

## 📐 Layout & Responsiveness
- **Layout Approach**: I used a mobile-first approach with CSS Grid to manage the product listing.
- **Responsiveness**: The grid utilizes `repeat(auto-fill, minmax(280px, 1fr))` to ensure the layout fluidly adapts from mobile devices to large desktop screens without breaking the UI.

## 🚀 How to Run
1. `cd frontend`
2. `npm install`
3. `npm run dev`