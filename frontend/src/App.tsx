import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch products (handles filtering too!)
  const fetchProducts = (category = '') => {
    setLoading(true);
    const url = category 
      ? `http://localhost:3000/products?category=${category}`
      : 'http://localhost:3000/products';
      
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching data:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          Lagos Tech Store
        </h1>
        <p className="mt-2 text-gray-500">Premium Computing for the African Professional</p>
        
        {/* Category Filters - Test Requirement #3 */}
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => fetchProducts()} className="px-4 py-2 bg-white border rounded-full text-sm font-bold hover:bg-gray-100">All</button>
          <button onClick={() => fetchProducts('Laptops')} className="px-4 py-2 bg-white border rounded-full text-sm font-bold hover:bg-gray-100">Laptops</button>
          <button onClick={() => fetchProducts('Accessories')} className="px-4 py-2 bg-white border rounded-full text-sm font-bold hover:bg-gray-100">Accessories</button>
        </div>
      </div>

      {/* The Product Grid - This fixes the "Very Big" images */}
      {loading ? (
        <div className="text-center py-20">Loading amazing tech...</div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((item: any) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App