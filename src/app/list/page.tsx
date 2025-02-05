'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ProductService } from '@/lib/api/services/product.service'
import Filter from '@/components/Filter'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/lib/context/UserAuthContext'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

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
  current_amount: number;
  target_amount: number;
}

interface FilterParams {
  category?: string;
  min_price?: string;
  max_price?: string;
  featured?: boolean;
  ordering?: string;
}

export default function ListPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || undefined
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState<FilterParams>({})
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const fetchProducts = async (filters: FilterParams = {}) => {
    setLoading(true);
    try {
      // Clean up filters before sending
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => 
          value !== undefined && value !== '' && value !== false
        )
      );
  
      let response;
      if (searchQuery) {
        // If we have a search query, use the search endpoint with filters
        response = await ProductService.searchProducts(searchQuery, cleanFilters);
      } else {
        // If no search query, use regular products endpoint
        response = await ProductService.getProducts(cleanFilters);
      }
      setProducts(response.results || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset filters when search query changes
    setActiveFilters({});
    fetchProducts();
  }, [searchQuery])

  const handleFilterChange = async (filters: FilterParams) => {
    setActiveFilters(filters);
    fetchProducts(filters);
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      router.push('/login');
      return;
    }
    // Add to cart logic here
    toast.success("Item added to cart");
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mt-8">
        {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
      </h1>
      
      <Filter onFilterChange={handleFilterChange} initialFilters={activeFilters} />
      
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : products.length > 0 ? (
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

              <div className="text-sm text-gray-500 line-clamp-2">{product.description}</div>
              
              <div className="flex flex-col gap-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-myColor h-2.5 rounded-full" 
                    style={{ 
                      width: `${Math.min((product.current_amount / product.target_amount) * 100, 100)}%` 
                    }}
                  />
                </div>
                <div className="text-xs text-gray-600">
                  ${product.current_amount} raised of ${product.target_amount}
                </div>
              </div>
              
              <button 
                onClick={(e) => {
                  e.preventDefault(); // Prevent Link navigation
                  handleAddToCart();
                }}
                className="rounded-2xl text-myColor ring-1 ring-myColor py-2 px-4 text-xs hover:bg-myColor hover:text-white w-max"
              >
                Add to Cart
              </button>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          {searchQuery 
            ? `No products found for "${searchQuery}"`
            : "No products available"
          }
        </div>
      )}
    </div>
  )
}