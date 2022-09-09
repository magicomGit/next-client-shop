import { TrashIcon } from "@heroicons/react/solid"
import { Input, Radio, Select, Option } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import { IBrand, ICategory, IFilterValue, IProduct, IProperty } from "../../../models/models"
import axiosFormDataApi from "../../../store/axios.fomData.api"
import { SERVER_URL } from "../../../store/shop.api"
import { useGetFilterNamesQuery, useGetFilterValuesByCategoryIdQuery, useNewFilterInstanceMutation } from "../../../store/slices/filterApiSlice"
import { useGetBrandsQuery, useGetCategiriesQuery, useNewProductMutation, useNewPropertyMutation } from "../../../store/slices/productApiSlice"

import SelectObject from "./SelectObject"


const NewProduct = () => {
    const initialCategory: ICategory = { id: 0, name: '', picture: '' }
    const initialBrand: IBrand = { id: 0, name: '' }
    const [fileName, setFileName] = useState('')
    const [newProductBtn, setNewProductBtn] = useState(true)
    const [properties, setProperties] = useState<IProperty[]>([])
    const [propertyName, setPropertyName] = useState<string>('')
    const [propertyValue, setPropertyValue] = useState<string>('')

    const [productName, setProductName] = useState('')
    //const [productCategory, setProductCategory] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(initialCategory)
    const [selectedBrand, setSelectedBrand] = useState(initialBrand)

    const [selectedFilterValues, setSelectedFilterValues] = useState<IFilterValue[]>([])


    const [productPrice, setProductPrice] = useState<number>(0)
    const [file, setFile] = useState<Blob>()

    useEffect(() => {
        setSelectedFilterValues([])
    }, [selectedCategory])

    const { data: categories } = useGetCategiriesQuery('')
    const { data: brands } = useGetBrandsQuery('')

    //const [newProduct, { data }] = useNewProductMutation()

    const { data: filterNames } = useGetFilterNamesQuery(selectedCategory.id)
    const { data: filterValues } = useGetFilterValuesByCategoryIdQuery(selectedCategory.id)
    const [newFilterInstance, { }] = useNewFilterInstanceMutation()
    const [newProperty, { }] = useNewPropertyMutation()
    const [newProduct, { }] = useNewProductMutation()
    {/* ------------ сохранить продукт ------------------ */ }
    const hendleAddImg = async () => {
        const formData = new FormData()
        if (file) {
            formData.append('Img', file)
        } else {
            return
        }
        const uploadResponse = await axiosFormDataApi.post('product/uploadImg', formData)
        if (uploadResponse) {
            setFileName(uploadResponse.data)
            setNewProductBtn(false)
        }

    }
    const hendleAddProduct = async () => {
        const formData = new FormData()
        if (file) { formData.append('Img', file) }

        try {
            if (fileName) {
                const product:IProduct = {
                    id: 0,
                    name: productName,
                    categoryId: selectedCategory.id,
                    brandId: selectedBrand.id,
                    picture: fileName,
                    price: productPrice,
                    rating: 0,
                    ratingCount:0
                }

                const newProductRequest = { product: product, selectedFilterValues: selectedFilterValues, properties: properties }

                const res = await newProduct(newProductRequest)

            }

            //document.location.reload()
        } catch (error) {
        }
    }
    {/* -------------------------------------------- */ }

    function getSelectedFilterValues(newfilterValue: IFilterValue) {
        let filterValues: IFilterValue[] = []
        if (selectedFilterValues) {
            filterValues = selectedFilterValues.filter(filterValue =>
                filterValue.filterNameId !== newfilterValue.filterNameId
            )
        }
        filterValues.push(newfilterValue)
        setSelectedFilterValues(filterValues)

    }

    function hendleDeleteProperty(propertyName: string) {
        setProperties(properties.filter(f => f.name !== propertyName));
    }

    async function test() {

    }
    return (
        <div className="bg-gray-100 p-3 rounded-b-md">
            <div className="flex justify-between py-3 ">
                {/* --------------- поля описания товара ----------------------------- */}

                <div className="flex flex-col gap-3 w-1/2 justify-between">
                    <div className="flex flex-col">
                        <label>Название товара</label>
                        <input type='text' autoComplete='off' value={productName}
                            className='border border-gray-300 rounded-md p-2'
                            onChange={(e) => setProductName(e.target.value)} />
                    </div>
                    <div>
                        <label >Категория</label>
                        {categories && <SelectObject items={categories} currentItemIndex={-1} setSelectedItem={setSelectedCategory} />}
                    </div>
                    <div>
                        <label >Брэнд</label>
                        {brands && <SelectObject items={brands} currentItemIndex={-1} setSelectedItem={setSelectedBrand} />}
                    </div>
                    <div className="flex flex-col">
                        <label >Цена</label>
                        <input className='border border-gray-300 rounded-md p-2'
                            value={productPrice}
                            type="text"
                            onChange={(e) => setProductPrice(Number(e.target.value))}
                        />

                    </div>


                    <div className="flex flex-col">
                        <label>Фото товара 400x400 px</label>
                        <input type='file' onChange={(e: any) => { setFile(e.target.files[0]) }} />
                    </div>



                </div>
                <img src={file ? URL.createObjectURL(file) : ''} />
                {/* --------- картинка  */}

                {/* ------ характеристики категории и шаблоны для этой характеристики ---------------- */}


            </div>
            <br />
            <br />
            <div className="flex ">
                <div className="w-2/3 border border-gray-300 p-3 bg-white">
                    {filterNames && filterNames.map((filterName) =>
                        <div key={filterName.id}>

                            <div className="flex flex-col">{filterName.name}</div>

                            {filterValues && filterValues.map((filterValue) =>
                                filterName.name === filterValue.filterName &&
                                <Radio onClick={() => { getSelectedFilterValues(filterValue) }} className="hover:before:opacity-0" color="teal" ripple={false}
                                    key={filterValue.id} value={filterValue.id} id="html" name={filterName.name}
                                    label={filterValue.value}  />

                            )}



                        </div>
                    )}
                </div>
                <div className="w-1/3 border border-gray-300 p-3 bg-white">
                    {selectedFilterValues && selectedFilterValues.map(filterValue =>
                        <div key={filterValue.id}>{filterValue.value} </div>
                    )}

                </div>

            </div>

            <div className=" my-4 flex gap-2">
                <div className="w-2/5 bg-white p-3 border border-gray-300 flex flex-col gap-2">
                    <Input value={propertyName} onChange={(e) => setPropertyName(e.target.value)} color="teal" label="Название характеристики" />
                    <Input value={propertyValue} onChange={(e) => setPropertyValue(e.target.value)} color="teal" label="Значение характеристики" />


                </div>
                <div className="w-1/5  p-3 border border-gray-300 flex items-center">
                    <button type="button" className="p-1 bg-teal-800 w-full text-white rounded-md"
                        onClick={() => setProperties([...properties, { id: 0, productId: 0, name: propertyName, value: propertyValue }])}>&gt;&gt;</button>
                </div>
                <div className="w-2/5 bg-white p-3 border border-gray-300">
                    {properties.map((property, index) =>
                        <div key={index} className='flex justify-between my-2'>
                            <div className='flex  gap-3'>
                                <span>{property.name}</span>
                                <span className="font-bold">{property.value}</span>
                            </div>
                            <span onClick={() => hendleDeleteProperty(property.name)}>
                                <TrashIcon className="h-6 w-6 text-teal-700 cursor-pointer" />
                            </span>
                        </div>
                    )}
                </div>

            </div>
            <div className="flex">
                <div className="flex flex-col w-1/2 gap-2">
                    <button className="w-full p-2  disabled:bg-blue-gray-300 bg-teal-800 text-white rounded-md"
                        disabled={newProductBtn} onClick={() => hendleAddProduct()}>
                        Добавить продукт
                    </button>
                    <button className=" w-full p-2 bg-teal-800 text-white rounded-md" onClick={() => hendleAddImg()}>
                        Добавить изображение
                    </button>
                </div>
                <div className="w-1/2">
                    <img className="w-1/2 mx-auto" src={`${SERVER_URL}/${fileName}`} />
                </div>
            </div>
        </div>
    )
}

export default NewProduct