'use client'
import { fetchAPI } from "@/lib/api/config";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  slug: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  target_amount: number;
  current_amount: number;
}

interface ProductListProps {
  searchQuery?: string;
  categoryId?: number;
  featured?: boolean;
}

export default function ProductList({ featured = false, categoryId, searchQuery }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let endpoint = '';
    
    if (searchQuery) {
      endpoint = `/products/search/?q=${encodeURIComponent(searchQuery)}`;
    } else if (featured) {
      endpoint = '/featured-items/';
    } else if (categoryId) {
      endpoint = `/items/?category=${categoryId}`;
    } else {
      endpoint = '/items/';
    }
    
    fetchAPI(endpoint)
      .then(data => {
        console.log('Products data:', data);
        setProducts(data.results || []);
      })
      .catch(error => console.error('Failed to fetch products:', error))
      .finally(() => setLoading(false));
  }, [featured, categoryId, searchQuery]);

  if (loading) {
    return <div className="w-full text-center py-8">Loading...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="w-full text-center py-8 text-gray-500">
        {searchQuery 
          ? `No products found for "${searchQuery}"`
          : "No products available"
        }
      </div>
    );
  }

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {products.map((product) => (
        <Link 
          href={`/${product.category.slug}/${product.slug}`}
          key={product.id} 
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        >  
          <div className="relative w-full h-80">
            <Image 
              src={product.image || "/images/placeholder-product.jpg"}
              alt={product.title} 
              fill 
              sizes="25vw"
              className="absolute object-cover rounded-md"
            />
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium">{product.title}</span>
            <span className="font-semibold">${product.price}</span>
          </div>

          <div className="text-sm text-gray-500">{product.description}</div>
          
          <div className="flex flex-col gap-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-myColor h-2.5 rounded-full" 
                style={{ width: `${Math.min((product.current_amount / product.target_amount) * 100, 100)}%` }}
              />
            </div>
            <div className="text-xs text-gray-600">
              ${product.current_amount} raised of ${product.target_amount}
            </div>
          </div>
          
          <button className="rounded-2xl text-myColor ring-1 ring-myColor py-2 px-4 text-xs hover:bg-myColor hover:text-white w-max">
            Add to Cart
          </button>
        </Link>
      ))}
    </div> 
  );
}