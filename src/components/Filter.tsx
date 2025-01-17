'use client'

import React, { useState, useEffect } from 'react'
import { ProductService } from '@/lib/api/services/product.service'

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface FilterParams {
    category?: string;
    min_price?: string;
    max_price?: string;
    featured?: boolean;
    ordering?: string;
}

interface FilterProps {
    onFilterChange: (filters: FilterParams) => void;
    initialFilters?: FilterParams;
}

export default function Filter({ onFilterChange, initialFilters = {} }: FilterProps) {
    const [filters, setFilters] = useState<FilterParams>({
        category: '',
        min_price: '',
        max_price: '',
        featured: false,
        ordering: '',
        ...initialFilters
    });
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await ProductService.getCategories();
                console.log('Categories response:', response); // Debug log
                setCategories(Array.isArray(response) ? response : response?.results || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...initialFilters
        }));
    }, [initialFilters]);

    const handleFilterChange = (key: keyof FilterParams, value: string | boolean) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className='mt-12 flex justify-between'>
            <div className='flex gap-6 flex-wrap'>
                <select 
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className='py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]'
                >
                    <option value="">All Categories</option>
                    {categories && categories.length > 0 && categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                {/* Rest of the component remains the same */}
                <input 
                    type="number"
                    min="0"
                    value={filters.min_price}
                    onChange={(e) => handleFilterChange('min_price', e.target.value)}
                    placeholder='min price'
                    className='text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400'
                />

                <input 
                    type="number"
                    min="0"
                    value={filters.max_price}
                    onChange={(e) => handleFilterChange('max_price', e.target.value)}
                    placeholder='max price'
                    className='text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400'
                />

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={filters.featured}
                        onChange={(e) => handleFilterChange('featured', e.target.checked)}
                        className="rounded text-myColor"
                    />
                    <span className="text-xs font-medium">Featured Only</span>
                </label>
            </div>
            
            <div className=''>
                <select
                    value={filters.ordering}
                    onChange={(e) => handleFilterChange('ordering', e.target.value)}
                    className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
                >
                    <option value="">Sort By</option>
                    <option value="price">Price (low to high)</option>
                    <option value="-price">Price (high to low)</option>
                    <option value="-created_at">Newest First</option>
                    <option value="created_at">Oldest First</option>
                </select>
            </div>
        </div>
    );
}