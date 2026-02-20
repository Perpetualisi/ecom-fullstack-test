import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use the deployed URL in production, or localhost in development
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // Function to fetch products (handles filtering too!)
  const fetchProducts = (category = '') => {
    setLoading(true);
    
    // Construct the URL dynamically
    const url = category 
      ? `${API_BASE_URL}/products?category=${encodeURIComponent(category)}`
      : `${API_BASE_URL}/products`;
      
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setProducts([]); // Clear products on error to avoid broken state
        setLoading(false);
      });
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
          <button 
            onClick={() => fetchProducts()} 
            className="px-4 py-2 bg-white border rounded-full text-sm font-bold hover:bg-gray-100 transition-colors shadow-sm"
          >
            All
          </button>
          <button 
            onClick={() => fetchProducts('Laptops')} 
            className="px-4 py-2 bg-white border rounded-full text-sm font-bold hover:bg-gray-100 transition-colors shadow-sm"
          >
            Laptops
          </button>
          <button 
            onClick={() => fetchProducts('Accessories')} 
            className="px-4 py-2 bg-white border rounded-full text-sm font-bold hover:bg-gray-100 transition-colors shadow-sm"
          >
            Accessories
          </button>
        </div>
      </div>

      {/* The Product Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading amazing tech...</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((item: any) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              No products found in this category.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App