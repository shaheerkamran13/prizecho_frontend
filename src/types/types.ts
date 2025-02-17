export type ProductType = {
    id: number
    name: string
    description: string
    price: number
    originalPrice?: number
    images: string[]
    sizes: string[]
    colors: string[]
    details: {
      title: string
      content: string
    }[]
    slug: string
  }

export  type SelectedOptions = {
    size?: string
    color?: string
  }

  export type CartItemType = ProductType & {
    quantity: number
    selectedOptions: SelectedOptions
    image: string
    available: boolean
  }
  
  type CartContextType = {
    cartItems: CartItemType[]
    addToCart: (item: Omit<CartItemType, 'id'>) => void
    removeFromCart: (itemId: number) => void
  }