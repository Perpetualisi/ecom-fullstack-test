import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// 1. GET all products (Supports Filtering)
app.get('/products', async (req, res) => {
  try {
    const { category } = req.query;
    // If category exists, filter by it. Otherwise, fetch all.
    const products = await prisma.product.findMany({
      where: category ? { category: String(category) } : {},
    });
    res.json(products);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Could not fetch products" });
  }
});

// 2. GET single product by id
app.get('/products/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid product id' });
  
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Could not fetch product' });
  }
});

// 3. POST create new product
app.post('/products', async (req, res) => {
  const { name, description, price, image, category, stock } = req.body;
  
  if (!name || !description || price === undefined || !image || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        image,
        category,
        stock: stock !== undefined ? Number(stock) : 0,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Create Error:', error);
    res.status(500).json({ error: 'Could not create product' });
  }
});

// 4. DELETE a specific product
app.delete('/products/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid product id' });

  try {
    await prisma.product.delete({
      where: { id: id },
    });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: "Could not delete product. It might not exist." });
  }
});

// 5. Start the server (Set to 3000 to match your Frontend)
const PORT = 3000; 
app.listen(PORT, () => {
  console.log(`🚀 Lagos Tech Store API running at http://localhost:${PORT}`);
});