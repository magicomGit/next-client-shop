import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useEffect, useState } from "react";
import { ICategory, IProduct } from "../../../models/models";
import { SERVER_URL } from "../../../store/shop.api";
import { useGetBrandsQuery, useGetCategiriesQuery } from "../../../store/slices/productApiSlice";
import CloseIcon from "../../icons/closeIcon";
import SelectCategory from "./SelectCategory";


interface ModalProps {
    isShow: boolean;
    product: IProduct;

    setIsShow: (isShow: boolean) => void;

}
//-------------------------

const EditProduct: FC<ModalProps> = ({ isShow, product, setIsShow }) => {
    const initialCategory: ICategory =  {id:0, name:'',picture:''}
    

    const [productName, setProductName] = useState(product.name)
    const [selectedCategory, setSelectedCategory] = useState(initialCategory)
    
    const [productPrice, setProductPrice] = useState(product.price)

    useEffect(
        () => {
             setProductName(product.name)
             //setProductCategory(initialCategory)
            // setProductBrandId(product.brandId)
            // setProductPrice(product.price)
        },
        [isShow]
    )

    const { data: categories } = useGetCategiriesQuery('')
    const { data: brands } = useGetBrandsQuery('')

    const hendleNewProduct = async () => {
        try {
            console.log(selectedCategory.name)
            //await newCategory({ id: 0, name: categoryState }).unwrap()
            //setCategory('')
        } catch (error) {
        }
    }

    return (
        <Transition.Root show={isShow} as={Fragment}>
            <div className="relative z-10 " >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed  z-10 inset-0 overflow-y-auto">
                    <div className="flex flex-col bg-white mx-auto w-[1200px]  min-h-full p-5  relative">
                        <div className='absolute top-4 right-4 ' >
                            <span className='cursor-pointer' onClick={() => { setIsShow(false); }}><CloseIcon /></span>
                        </div>
                        <div className="text-2xl ">Редактирование товара</div>
                        <div className="mt-4 flex">
                            <div className="w-1/2 flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <label htmlFor="prod-name">Название товара</label>
                                    <input id="prod-name" className="w-3/4 p-2 border  border-blue-gray-300 rounded-md"
                                        type='text' autoComplete='off' value={productName}
                                        onChange={(e) => setProductName(e.target.value)} />
                                </div>
                                <div className="flex flex-col w-3/4">
                                    <label >Категория</label>
                                    
                                    {categories && <SelectCategory 
                                    items={categories } 
                                    currentItemId = {product.categoryId}
                                    setSelectedItem={setSelectedCategory}                                    
                                    />}
                                
                                </div>

                                <button onClick={hendleNewProduct} 
                                className='w-3/4 p-2 rounded-md text-white hover:bg-teal-600 bg-teal-800
                                my-3 transition-colors ease-in-out delay-100 duration-200'>
                                    Сохранить</button>
                            </div>


                            <img src={SERVER_URL + '/' + product.picture} />
                        </div>
                    </div>
                </div>
            </div>
        </Transition.Root>
    )
}

export default EditProduct