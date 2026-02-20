# Lagos Tech Store Full-Stack Test

### Frontend
- **Layout Approach**: I used a responsive grid system with Tailwind CSS, ensuring that product images are constrained to professional aspect ratios using `object-contain`.
- **Responsiveness**: The UI follows a mobile-first approach, transitioning from a single-column stack on mobile to a four-column grid on desktop.

### Backend
- **Tech Stack**: Built with Node.js, TypeScript, and Prisma ORM using a SQLite database for portability.
- **Run Locally**: 
  1. `cd backend && npm install && npx prisma generate && npm run dev`
  2. `cd frontend && npm install && npm run dev`

### API Documentation
- `GET /products` - Fetch all
- `GET /products?category=Electronics` - Filter products
- `POST /products` - Add new product