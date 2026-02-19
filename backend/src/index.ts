import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

// Standard initialization works perfectly in v6
const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

// 1. GET all products
app.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Could not fetch products" });
  }
});

// 2. DELETE a specific product (The New Part)
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: "Could not delete product. It might not exist." });
  }
});

// 3. Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});