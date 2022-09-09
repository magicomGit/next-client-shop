import { useState } from "react";
import { IProduct, IProductDto } from "../../models/models";
import { useDeleteProductMutation, useGetProductsQuery } from "../../store/slices/productApiSlice";
import { PencilIcon, TrashIcon, ChevronDoubleDownIcon } from '@heroicons/react/solid'
import ConfirmModal from "../../components/layout/UI/ConfirmModal";
import EditProduct from "../../components/layout/UI/EditProductModal";
import NewProduct from "../../components/layout/UI/NewProduct";

const ProductManag = () => {
    const initialProduct: IProduct = {
        id: 0, name: '', categoryId: 0, brandId: 0, picture: '', price: 0, rating: 0, ratingCount: 0
    }

    const [showNewProduct, setShowNewProduct] = useState(false);
    const [showConfirm, setConfirmShow] = useState<boolean>(false)
    const [editShow, setEditShow] = useState<boolean>(false)
    const [productForDelete, setProductForDelete] = useState<IProductDto>(initialProduct)
    const [productForEdit, setProductForEdit] = useState<IProduct>(initialProduct)

    const { data: products, isSuccess: isProductsSuccess, } = useGetProductsQuery({ limit: 10, page: 1 })
    const [deleteProduct, { }] = useDeleteProductMutation()

    const hendleDeleteProduct = async (id: number) => {
        try {
            await deleteProduct(id)
        } catch (error) {

        }        
    }

    const hendleEdit = (id: number) => {
        setEditShow(true)
    }

    const hendleConfirm = (id: number, name: string) => {
        setConfirmShow(true)
        setProductForDelete({ id: id, name: name })
    }

    return (
        <>
            <ConfirmModal isShow={showConfirm} id={productForDelete.id}
                message={'Подтвердите удаление товара \'' + productForDelete.name + '\''}
                setIsShow={setConfirmShow} hendleDelete={hendleDeleteProduct} />

            <EditProduct isShow={editShow} setIsShow={setEditShow} product={productForEdit} />
            <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col my-3 lg:w-3/4 mx-auto mb-5 border border-teal-800 rounded-md " >
                    <button className="flex justify-between gap-3 cursor-pointer  rounded-md p-2"
                        type="button"

                        onClick={() => { setShowNewProduct(!showNewProduct) }}>
                        <span className="text-xl">Добавить новый товар</span>
                        <ChevronDoubleDownIcon className="h-6 w-6 pt-2 text-teal-800" />
                    </button>
                    <div className={`${showNewProduct ? 'block' : 'hidden'}`}>
                        <NewProduct/>
                    </div>
                </div>




                {/* <Collapse in={open}>
                    <div className="border-bott"><NewProduct/></div>                    
                </Collapse> */}
                {isProductsSuccess && products.rows.map(product =>
                    <div key={product.id} className="flex justify-between lg:w-3/4 mx-auto p-2 border my-1 rounded-md">
                        <span className="">{product.name}</span>
                        <div className="flex">
                            <div onClick={() => { hendleEdit(product.id); setProductForEdit(product) }}>
                                <PencilIcon className="h-6 w-6 text-teal-700 cursor-pointer" />
                            </div> &nbsp;

                            <div onClick={() => hendleConfirm(product.id, product.name)}>
                                <TrashIcon className="h-6 w-6 text-teal-700 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default ProductManag