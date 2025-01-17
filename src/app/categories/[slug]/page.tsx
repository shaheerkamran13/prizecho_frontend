'use client'
// src/app/categories/[slug]/page.tsx
import { fetchAPI } from "@/lib/api/config";
import ProductList from "@/components/ProductList";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetchAPI(`/categories/${slug}/`);
        setCategory(response);
      } catch (err) {
        console.error('Error loading category:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-8">Loading category...</div>;
  }

  if (!category) {
    return <div className="text-center py-8 text-red-500">Category not found</div>;
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-gray-900">Categories</Link>
        <span>/</span>
        <span className="text-gray-900">{category.name}</span>
      </div>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold mb-4">{category.name}</h1>
        <div className="h-1 w-20 bg-myColor"></div>
      </div>

      {/* Products Grid */}
      <ProductList categoryId={category.id} />
    </div>
  );
}