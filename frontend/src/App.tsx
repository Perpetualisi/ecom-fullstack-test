import { useEffect, useState } from 'react'
import axios from 'axios'
// Removed unused 'Star' and 'PackageSearch' to pass Vercel build
import { ShoppingBag, Trash2, Filter } from 'lucide-react'

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number; 
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchProducts = (category?: string) => {
    setLoading(true);
    // Note: When you get your Render URL, replace 'http://localhost:5000' with it
    const url = category 
      ? `http://localhost:5000/products?category=${category}` 
      : 'http://localhost:5000/products';
    
    axios.get(url)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/products/${id}`);
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading TechMarket...</div>;

  return (
    <div style={{ backgroundColor: '#f4f4f5', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto 2rem' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>TechMarket 🚀</h1>
        <div style={{ position: 'relative' }}>
          <ShoppingBag size={30} />
          <span style={{ position: 'absolute', top: -5, right: -5, background: '#ef4444', color: 'white', borderRadius: '50%', padding: '2px 8px', fontSize: '0.8rem' }}>
            {cartCount}
          </span>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto 2rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Filter size={20} />
        <button onClick={() => fetchProducts()} style={btnStyle}>All</button>
        <button onClick={() => fetchProducts('Audio')} style={btnStyle}>Audio</button>
        <button onClick={() => fetchProducts('Electronics')} style={btnStyle}>Electronics</button>
      </div>

      <main style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {products.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          products.map(product => (
            <div key={product.id} style={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
              <div style={{ marginTop: '15px' }}>
                <span style={{ fontSize: '0.7rem', color: '#71717a', textTransform: 'uppercase' }}>{product.category} • Variant: Standard</span>
                <h3 style={{ margin: '5px 0' }}>{product.name}</h3>
                <p style={{ fontSize: '0.9rem', color: '#71717a' }}>{product.description}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                  <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>${product.price}</span>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => handleDelete(product.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                      <Trash2 size={20} />
                    </button>

                    <button 
                      disabled={product.stock === 0}
                      onClick={() => setCartCount(c => c + 1)}
                      style={{ 
                        backgroundColor: product.stock === 0 ? '#d1d5db' : '#18181b', 
                        color: 'white', border: 'none', padding: '10px 15px', borderRadius: '8px',
                        cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  )
}

const btnStyle = {
  padding: '8px 16px',
  borderRadius: '20px',
  border: '1px solid #d1d5db',
  backgroundColor: 'white',
  cursor: 'pointer'
};

export default App