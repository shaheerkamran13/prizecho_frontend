'use client'
import { useCart } from '@/context/cartContext'
import CustomizeProducts from '@/components/CustomizeProducts'
import ProductImages from '@/components/ProductImages'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { ProductType } from '@/types/types' // Define your product type
import { SelectedOptions } from '@/types/types'


export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { addToCart } = useCart()
  const [product, setProduct] = useState<ProductType | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  // Unwrap the params object using React.use()
  const unwrappedParams = React.use(params)
  const { slug } = unwrappedParams

  // Fetch product data based on slug
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Replace with actual API call
        const mockProducts: ProductType[] = [
          {
            id: 1,
            name: 'Premium Cotton T-Shirt',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
            price: 4900,
            originalPrice: 5900,
            images: ['/tshirt1.jpg', '/tshirt2.jpg'],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['#000000', '#FFFFFF', '#FF0000'],
            details: [
              { title: 'Material', content: '100% Organic Cotton' },
              { title: 'Care', content: 'Machine wash cold, line dry' },
              { title: 'Shipping', content: 'Free shipping worldwide' }
            ],
            slug: slug // Use the unwrapped slug
          }
        ]

        const foundProduct = mockProducts.find(p => p.slug === slug)
        if (foundProduct) {
          setProduct(foundProduct)
        } else {
          toast.error('Product not found')
        }
      } catch (error) {
        toast.error('Error loading product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug]) // Use the unwrapped slug in the dependency array

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity: 1,
        selectedOptions,
        image: product.images?.[0] || '/default-image.jpg', // Fallback for missing image
        available: true
      })
      toast.success(`${product.name} added to cart!`, {
        position: 'bottom-right',
        icon: '🛒'
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-myColor"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-medium">Product not found</h2>
      </div>
    )
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      <Toaster
        toastOptions={{
          position: 'bottom-right',
          style: {
            background: '#333',
            color: '#fff'
          }
        }}
      />

      {/* Image Section */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages image={product.images} />
      </div>

      {/* Product Details */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>

        {/* Price Section */}
        <div className="h-[2px] bg-gray-100" />
        <div className="flex items-center gap-4">
          {product.originalPrice && (
            <h3 className="text-xl line-through text-gray-500">
              PKR {product.originalPrice / 100}
            </h3>
          )}
          <h2 className="font-medium text-2xl text-myColor">
            PKR {product.price / 100}
          </h2>
        </div>
        <div className="h-[2px] bg-gray-100" />

        {/* Customization */}
        <CustomizeProducts
          options={{
            sizes: product.sizes,
            colors: product.colors
          }}
          onSelect={setSelectedOptions}
        />

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-myColor text-white py-4 rounded-lg hover:bg-pink-600 transition-colors font-medium text-lg"
        >
          Add to Cart
        </button>

        {/* Product Details Sections */}
        {product.details.map((detail, index) => (
          <div key={index} className="text-sm">
            <h4 className="font-medium mb-4">{detail.title}</h4>
            <p className="text-gray-600">{detail.content}</p>
            {index < product.details.length - 1 && (
              <div className="h-[2px] bg-gray-100 my-6" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}