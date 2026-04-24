import React, { useEffect, useState } from 'react'
import FilterSidebar from './FilterSidebar'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ProductCard from './ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { Menu, X } from 'lucide-react'
import { fetchProducts } from '@/redux/features/productThunks'

const Products = () => {

  const [priceRange, setPriceRange] = useState([0, 999999]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const dispatch = useDispatch();

  const { products, fetching } = useSelector((state) => state?.products);


  useEffect(() => {
    const loadProducts = async () => {
      try {
        await dispatch(fetchProducts()).unwrap();
      } catch (error) {
        toast.error(
          typeof error === "string"
            ? error
            : error?.message
        );
      }
    };

    loadProducts();

  }, [dispatch]);

  const finalProducts = (products ||[])?.filter(p => {

    const matchesSearch =

      (p.name || "").toLowerCase().includes(search.toLowerCase().trim()) ||

      (p.category || "").toLowerCase().includes(search.toLowerCase().trim()) ||

      (p.brand || "").toLowerCase().includes(search.toLowerCase().trim()) ||

      (p.description || "").toLowerCase().includes(search.toLowerCase().trim()) ||

      (p.price?.toString() || "").includes(search.toLowerCase().trim());

    const matchesCategory = category === "All" || p.category === category;

    const matchesBrand = brand === "All" || p.brand === brand;

    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;

  }).sort((a, b) => {

    if (sortOrder === "lowToHigh") {
      return a.price - b.price;
    }

    if (sortOrder === "highToLow") {
      return b.price - a.price;
    }

    return 0;

  });

  if (fetching) {
    return <p className="text-center bg-gray-100">Loading...</p>;
  }

  return (
    <div className='pt-28 pb-18 pr-8 pl-8 bg-pink-50'>

      <div className='md:hidden sm:hidden flex justify-end mb-5'>
        {
          showFilter ? (
            <X onClick={() => setShowFilter(false)} />
          ) : (
            <Menu onClick={() => setShowFilter(true)} />
          )
        }
      </div>

      <div className='max-w-7xl mx-auto gap-7 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 '>

        {/* Sidebar */}
        <div className={`${showFilter ? "block" : "hidden"} md:block sm:block`}>
          <FilterSidebar
            products={products}
            priceRange={priceRange} setPriceRange={setPriceRange}
            search={search} setSearch={setSearch}
            category={category} setCategory={setCategory}
            brand={brand} setBrand={setBrand}
            sortOrder={sortOrder} setSortOrder={setSortOrder}
          />
        </div>

        <div className='lg:col-span-3 md:col-span-2 sm:col-span-2'>
          <div className='flex flex-col flex-1'>

            {/* Sorting */}
            <div className='flex justify-end mb-4'>
              <Select onValueChange={(value) => setSortOrder(value)}>
                <SelectTrigger className="w-full max-w-40">
                  <SelectValue placeholder="Sort By Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="lowToHigh">Price: Low To High</SelectItem>
                    <SelectItem value="highToLow">Price: High To Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

              {finalProducts?.length === 0 ? (
                <p className="text-center col-span-full bg-gray-100">
                  No products found
                </p>
              ) : (
                finalProducts?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}

            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Products;