'use client'
// src/app/[category]/[slug]/page.tsx
import { fetchAPI } from "@/lib/api/config";
import Add from '@/components/Add'
import CustomizeProducts from '@/components/CustomizeProducts'
import ProductImages from '@/components/ProductImages'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  sku: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  target_amount: number;
  current_amount: number;
  image: string;
  images: Array<{
    id: number;
    image: string;
    order: number;
  }>;
  category: {
    id: number;
    name: string;
    slug: string;
  };
}

export default function SinglePage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Using the slug from the URL params
        const response = await fetchAPI(`/items/${params.slug}/`);
        console.log('Product data:', response);
        setProduct(response);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchProduct();
    }
  }, [params.slug]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error || !product) {
    return <div className="text-center py-8 text-red-500">
      {error || 'Product not found'}
    </div>;
  }

  return (
    <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative'>
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link href={`/categories/${product.category.slug}`} className="hover:text-gray-900">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.title}</span>
      </div>

      <div className='flex flex-col lg:flex-row gap-16'>
        {/* Image */}
        <div className='w-full lg:w-1/2 lg:sticky top-20 h-max'>
          <ProductImages 
            images={[
              { id: 0, image: product.image },
              ...(product.images || []).map(img => ({ 
                id: img.id, 
                image: img.image,
                order: img.order 
              }))
            ]} 
          />
        </div>
        
        {/* Text */}
        <div className='w-full lg:w-1/2 flex flex-col gap-6'>
          <h1 className='text-4xl font-medium'>{product.title}</h1>
          <p className='text-gray-500'>{product.description}</p>
          
          <div className='h-[2px] bg-gray-100'/>
          <div className='flex items-center gap-4'>
            <h2 className='font-medium text-2xl'>${product.price}</h2>
          </div>
          <div className='h-[2px] bg-gray-100'/>

          {/* Progress bar */}
          <div className="flex flex-col gap-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-myColor h-2.5 rounded-full" 
                style={{ 
                  width: `${Math.min((product.current_amount / product.target_amount) * 100, 100)}%` 
                }}
              />
            </div>
            <div className="text-sm text-gray-600">
              ${product.current_amount} raised of ${product.target_amount}
            </div>
          </div>

          <CustomizeProducts/>
          <Add/>
          <div className='h-[2px] bg-gray-100'/>
          
          <div className='text-sm'>
            <h4 className='font-medium mb-4'>Product Details</h4>
            <p>{product.description}</p>
          </div>

          {/* SKU */}
          <div className='text-sm text-gray-500'>
            SKU: {product.sku}
          </div>
        </div>
      </div>
    </div>
  )
}