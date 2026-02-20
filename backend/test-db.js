const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const newProduct = await prisma.product.create({
    data: {
      name: "Test Laptop",
      price: 1200,
      description: "Testing the connection from Lagos!",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      category: "Electronics" // Added this to fix the new error!
    },
  })
  console.log("🚀 SUCCESS! Your product is now in Supabase:", newProduct)
}

main()
  .catch((e) => {
    console.error("❌ ERROR:", e.message)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })