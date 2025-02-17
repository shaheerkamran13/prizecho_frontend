// context/FilterContext.tsx
'use client'
import React, { createContext, useContext, useState } from 'react'

type FilterState = {
  category: string
  minPrice: number
  maxPrice: number
  sort: string
  type: string
}

export type FilterContextType = {
  filters: FilterState
  updateFilters: (newFilters: Partial<FilterState>) => void
  resetFilters?: () => void;
}

const FilterContext = createContext<FilterContextType | null>(null)

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    minPrice: 0,
    maxPrice: 10000,
    sort: '',
    type: ''
  })

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return (
    <FilterContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider')
  }
  return context
}