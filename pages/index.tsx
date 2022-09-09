import { StarIcon, ChatIcon } from '@heroicons/react/solid'
import { Checkbox } from '@material-tailwind/react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Pagination from '../components/layout/pagination/Pagination'
import Range from '../components/layout/UI/Range'

import { ICategory, IExtendedProduct, IFilterValue } from '../models/models'
import { SERVER_URL } from '../store/shop.api'
import { useGetFilterNamesQuery } from '../store/slices/filterApiSlice'
import { useGetCategiriesQuery, useGetFilteredProductsMutation } from '../store/slices/productApiSlice'

const LIMIT = 5

const Home: NextPage = () => {
  const initialCategory = { id: 1, name: 'Смартфоны', picture: '' }

  const [selectedCategory, setSelectedCategory] = useState<ICategory>(initialCategory)
  const [selectedFilters, setSelectedFilters] = useState<IFilterValue[]>([])
  const [selectedFilterIds, setSelectedFilterIds] = useState<number[]>([])

  const [productsQty, setProductsQty] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagesQty, setPagesQty] = useState(1)

  const [products, setProducts] = useState<IExtendedProduct[]>([])

  const [rangeValues, setRangeValues] = useState([1000, 200000])//фильтр по цене

  const { data: categories } = useGetCategiriesQuery('')
  const { data: filterNames } = useGetFilterNamesQuery(selectedCategory.id)

  const [GetFilteredProducts, { data: filteredProducts }] = useGetFilteredProductsMutation()





  useEffect(() => {
    hendleGetFilteredProducts()
  }, [currentPage])

  useEffect(() => {    //при изменении фильтров - сброс текущей страницы
    if (currentPage === 1) {
      hendleGetFilteredProducts()
    } else {
      setCurrentPage(1)
    }
  }, [selectedFilters,rangeValues])

  async function hendleGetFilteredProducts() {
    try {
      GetFilteredProducts({ categoryId: selectedCategory.id, priceRange: rangeValues, filters: selectedFilters, limit: LIMIT, page: currentPage })
        .then((res: any) => { setProductsQty(res.data.count); setProducts(res.data.products); setPagesQty(Math.ceil(res.data.count / LIMIT)) 
      })

    } catch (error) {

    }
  }

  const hendleSelectCategory = (category: ICategory) => {
    setSelectedCategory(category)
    setSelectedFilters([])
    setProducts([])
    hendleGetFilteredProducts()
  }

  function getSelectedTemplates(checked: any, newTemplate: IFilterValue) {
    let templates: IFilterValue[] = []
    let selectedIds: number[] = []
    if (checked) {
      templates = selectedFilters.filter(template => template.id !== newTemplate.id)
      templates.push(newTemplate)

      selectedIds = selectedFilterIds.filter(filterId => filterId !== newTemplate.id)
      selectedIds.push(newTemplate.id)
    } else {
      templates = selectedFilters.filter(template => template.id !== newTemplate.id)

      selectedIds = selectedFilterIds.filter(filterId => filterId !== newTemplate.id)
    }

    setSelectedFilters(templates)
    setSelectedFilterIds(selectedIds)
  }

  return (
    <div className='max-w-[1200px] mx-auto'>
      <div className='flex gap-1'>

        {categories && categories.map(category =>
          <div key={category.id}
            onClick={() => { hendleSelectCategory(category); }}
            className="flex flex-col  items-center w-48 h-24 border border-slate-300 my-5 
            rounded-md shadow-sm hover:shadow-md hover:text-teal-500 cursor-pointer relative transition ease-in-out delay-250 duration-200">
            <div className='absolute transition ease-in-out delay-250 duration-200 scale-95 hover:scale-100 w-full h-full pt-2'>
              <img className='h-14 mx-auto '
                src={SERVER_URL + '/' + category.picture} />
            </div>
            <div className='mt-16'>{category.name}</div>
          </div>
        )}
      </div>
      <div className='px-7 py-3 text-3xl'>{selectedCategory.name}</div>
      <div className='lg:flex justify-between'>
        <div className='lg:w-5/6 lg:pr-3'  >
          {products && products.map((product, index) =>

            <div key={product.id} className={`${index !== 0 && 'border-t border-gray-300'} 
            flex gap-3 lg:h-60  hover:shadow-my  p-6  flex-col lg:flex-row
            transition ease-in-out delay-100 duration-300`}>
              <div className='lg:w-1/4 '>
                <img className='max-h-full' src={SERVER_URL + '/' + product.picture} />
              </div>
              <div className='lg:w-3/4 pl-10'>
                <div className='text-2xl hover:text-teal-400 text-teal-600 cursor-pointer'>
                  <Link href={`/product/${product.id}`}>{product.name}</Link>

                </div>
                <div className='flex'>
                  <StarIcon className="h-5 w-5  text-yellow-700 " /><span className='text-sm px-1'>
                    {(product.rating/product.ratingCount).toFixed(1)}</span>
                  <ChatIcon className="h-5 w-5  text-gray-300 ml-3" /><span className='text-sm px-1'>{product.comments.length}</span>
                </div>

                <div className='flex flex-col lg:flex-row justify-between lg:gap-0 gap-5'>
                  <div className='mt-3'>
                    {product.properties.map(property =>
                      <div key={property.id} className='flex gap-3'>
                        <span>{property.name}</span>
                        <span>{property.value}</span>
                      </div>
                    )}
                  </div>
                  <div className='lg:px-5 flex flex-row lg:flex-col justify-start lg:items-center gap-1'>
                    <div className='text-2xl'>{product.price.toLocaleString()} ₽</div>
                    <div className='text-base py-2 px-4 bg-teal-600 text-white rounded-md'>В корзину</div>

                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='bg-gray-100 p-3 lg:w-1/6'>
          {/* ------------------ фильтр по цене ---------------------------- */}
          <Range values={rangeValues} setValues={setRangeValues} />
          {/* ------ характеристики категории и шаблоны для этой характеристики ---------------- */}


          {filterNames && filterNames.map((filterName) =>
            <div key={filterName.id} className=''>

              <div>{filterName.name}</div>
              {filteredProducts && filteredProducts.filterValueQuantities.map((filterValue) =>
                filterName.name === filterValue.filterName &&
                <div className='flex my-1' key={filterValue.id}>

                  <Checkbox
                    ripple={false} color='teal'
                    className=' hover:before:opacity-0 disabled:bg-gray-200 bg-white -m-1'
                    checked={selectedFilterIds.includes(filterValue.id) ? true : false}
                    disabled={filterValue.productQty === 0 && !selectedFilterIds.includes(filterValue.id) ? true : false}
                    onChange={(e: any) => { getSelectedTemplates(e.target.checked, filterValue) }}
                  />

                  <div className={`${filterValue.productQty === 0 && 'text-gray-400'}, mt-1.5`}>{filterValue.value}</div>
                  <div className='px-1  text-[10px] text-gray-600 mt-1.5'>
                    {filterValue.productQty !== 0 && filterValue.productQty}
                  </div>
                </div>

              )}


            </div>
          )}

        </div>

      </div>
      {/* ------------------------------- */}
      <div className='max-w-6xl mx-auto mt-10'>
        <Pagination setCurrentPage={setCurrentPage} pagesQty={pagesQty} limit={LIMIT} page={currentPage} />
      </div>
    </div>
  )
}

export default Home
