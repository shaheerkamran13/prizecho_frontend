'use client'
// src/components/CategoryList.tsx
import { fetchAPI } from "@/lib/api/config";
import Link from "next/link";
import { useEffect, useState } from 'react';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CategoryListProps {
  displayType?: 'scroll' | 'grid';
}

export default function CategoryList({ displayType = 'scroll' }: CategoryListProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchAPI('/categories/');
        console.log('Categories response:', response);
        const categoryData = response.results ? response.results : response;
        setCategories(categoryData);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading categories...</div>;
  }

  const containerClass = displayType === 'grid'
    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64"
    : "flex gap-4 overflow-x-auto px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pb-4";

  const itemClass = displayType === 'grid'
    ? "bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
    : "min-w-[200px] bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow";

  return (
    <div className={containerClass}>
      {categories.map((category) => (
        <Link
          href={`/categories/${category.slug}`}
          key={category.id}
          className={itemClass}
        >
          <h3 className="text-lg font-medium text-center">{category.name}</h3>
        </Link>
      ))}
    </div>
  );
}