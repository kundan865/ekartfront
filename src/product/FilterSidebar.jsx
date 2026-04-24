import { Input } from '@/components/ui/input';
import React from 'react'

const FilterSidebar = ({ products, priceRange, setPriceRange
  , search, setSearch,
  category, setCategory,
  brand, setBrand,}) => {

  const categories = ["All", ...new Set(products?.map((product) => product.category))];
  const brands = ["All", ...new Set(products?.map((product) => product.brand))];

  const handleCategoryClick = (category) => {
    setCategory(category);
  }

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  }

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value);
    if (value <= priceRange[1]) {
      setPriceRange([value, priceRange[1]]);
    }
  }

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= priceRange[0]) {
      setPriceRange([priceRange[0], value]);
    }
  }

  const resetFilters = () => {
    setBrand("All");
    setCategory("All");
    setPriceRange([0, 999999]);
    setSearch("");
  }


  return (
    <div className='bg-gray-100 mt-10 p-4 rounded-md h-max'>
      {/* search */}
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text" placeholder="Search..."
        className="bg-white p-2 rounded-md border-gray-400 border-2 w-full" />

      {/* category */}
      <h1 className='font-semibold text-xl mt-5'>Category</h1>
      <div className='flex flex-col gap-2 mt-3'>
        {
          categories.map((cat, idx) => {
            return <div key={idx} className='flex items-center gap-2'>
              <input type="radio"
                checked={category === cat} onChange={() => handleCategoryClick(cat)}
                name="category" id='category' />
              <label htmlFor="category">{cat}</label>
            </div>
          })
        }
      </div>

      {/* Brand */}
      <h1 className='font-semibold text-xl mt-4 mb-2'>Brand</h1>
      <select className='bg-white w-full p-1 border-gray-400 border-2 rounded-md'
        value={brand} onChange={handleBrandChange}
      >
        {
          brands.map((brand, idx) => {
            return <option key={idx}
              value={brand} className='capitalize'>{brand.toUpperCase()}</option>
          })
        }
      </select>

      {/* price range */}
      <h1 className='font-semibold text-xl mt-4 mb-2'>Price Range</h1>
      <div className='flex flex-col gap-2 mt-3'>
        <label htmlFor="">
          Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
        </label>
        <div className='flex gap-2 items-center'>

          <input type="number" min="0" max="5000" placeholder="Min" className="bg-white p-1 rounded-md border-gray-400 border-2 w-full"
            value={priceRange[0]}
            onChange={(e) => handleMinChange(e)} />

          <span>to</span>
          <input type="number" min="0" max="999999" placeholder="Max" className="bg-white p-1 rounded-md border-gray-400 border-2 w-full"
            value={priceRange[1]}
            onChange={(e) => handleMaxChange(e)} />

        </div>

        <input type="range" min="0" max="5000" step="100" value={priceRange[0]} onChange={(e) => handleMinChange(e)} />

        <input type="range" min="0" max="999999" step="100" value={priceRange[1]} onChange={(e) => handleMaxChange(e)} />
      </div>


      {/* reset filters */}
      <button className='flex items-center justify-center w-full
       bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600'onClick={() => resetFilters()}>
        Reset Filters
      </button>

    </div>
  )
}

export default FilterSidebar
