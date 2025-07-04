import CategoryList from "@/components/CategoryList"
import CategoryPage from "@/components/CategoryPage"
import ProductList from "@/components/ProductList"
import Slider from "@/components/Slider"
export default function HomePage(){
  return (
    <div className=''>
      <Slider/>
      
      <div className="mt-24">
        <h1 className="text-2xl mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12 "></h1>
        <CategoryList/>
      </div>

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
        <ProductList/>
      </div>
      
      
    </div>



  )
}
