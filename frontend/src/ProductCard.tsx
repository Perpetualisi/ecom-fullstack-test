import { useState } from 'react';
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  category: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const [selectedVariant, setSelectedVariant] = useState('Standard');
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock < 5;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:shadow-xl hover:-translate-y-1">
      {/* 1. Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Availability Badges */}
        {isOutOfStock ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
            <span className="rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold uppercase text-white shadow-lg">
              Out of Stock
            </span>
          </div>
        ) : isLowStock && (
          <div className="absolute top-3 left-3">
            <span className="rounded-md bg-orange-500 px-2 py-1 text-[10px] font-bold uppercase text-white shadow-sm">
              Only {product.stock} left!
            </span>
          </div>
        )}
      </div>

      {/* 2. Details Section */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
            {product.category}
          </span>
          <span className="text-xl font-black text-gray-900">
            ₦{product.price.toLocaleString()}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600">
          {product.name}
        </h3>

        {/* Variant Dropdown - MANDATORY for your test */}
        <div className="mt-4">
          <label className="text-[10px] font-bold uppercase text-gray-400">Select Model</label>
          <select 
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 p-2 text-sm outline-none focus:border-blue-500"
          >
            <option>Standard Edition</option>
            <option>Pro Edition (+₦50,000)</option>
            <option>Enterprise Bundle</option>
          </select>
        </div>

        {/* 3. Action Button */}
        <div className="mt-auto pt-6">
          <button
            disabled={isOutOfStock}
            className={`flex w-full items-center justify-center rounded-xl py-4 text-sm font-black transition-all shadow-md active:shadow-inner ${
              isOutOfStock
                ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
            }`}
          >
            {isOutOfStock ? 'RESTOCKING SOON' : 'ADD TO CART'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;