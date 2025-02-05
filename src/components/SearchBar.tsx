'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ProductService } from '@/lib/api/services/product.service'
import debounce from 'lodash/debounce'
import { Loader2 } from 'lucide-react'

export default function SearchBar() {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const fetchSuggestions = debounce(async (term: string) => {
        if (term.length >= 2) {
            setIsLoading(true)
            try {
                const response = await ProductService.getSearchSuggestions(term)
                setSuggestions(response.suggestions || [])
                setShowSuggestions(response.suggestions?.length > 0)
            } catch (error) {
                console.error('Error fetching suggestions:', error)
                setSuggestions([])
            } finally {
                setIsLoading(false)
            }
        } else {
            setSuggestions([])
            setShowSuggestions(false)
        }
    }, 300)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchTerm(value)
        fetchSuggestions(value)
    }

    const handleSearch = (term: string) => {
        if (term.trim()) {
            router.push(`/list?q=${encodeURIComponent(term.trim())}`)
            setShowSuggestions(false)
            setSearchTerm('')
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleSearch(searchTerm)
    }

    const handleSuggestionClick = (suggestion: string) => {
        setSearchTerm(suggestion)
        handleSearch(suggestion)
    }

    return (
        <div ref={searchRef} className="relative flex-1">
            <form 
                className="flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={() => setShowSuggestions(suggestions.length > 0)}
                    placeholder="Search Products"
                    className="flex-1 bg-transparent outline-none"
                />
                {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                ) : (
                    <button type="submit" className="cursor-pointer">
                        <Image 
                            src="/search.png"
                            alt="search"
                            width={16}
                            height={16}
                        />
                    </button>
                )}
            </form>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer first:rounded-t-md last:rounded-b-md"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}