import { TrashIcon } from "@heroicons/react/solid"
import { useState } from "react"
import { ICategory } from "../../models/models"
import { useDeleteCategoryMutation, useGetCategiriesQuery, useNewCategoryMutation } from "../../store/slices/productApiSlice"


const CategoryManag = () => {
    const [inputCategory, setInputCategory] = useState<string>('')
    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const [categoryForDelete, setCategoryForDelete] = useState<ICategory>({ id: 0, name: "", picture: "" })
    const [msgState, setMsgState] = useState('')

    const { data: categories, isSuccess: isCategoriesSuccess, isError: isCategoriesError, error: categoriesError } = useGetCategiriesQuery('')
    const [newCategory, { data: category, isError: isNewCategoryError, error: newCategoryError }] = useNewCategoryMutation()
    const [deleteCategory, { isError: isDelCategoryError, error: delCategoryError }] = useDeleteCategoryMutation()

    const hendleNewCategory = async () => {
        setMsgState('')
        try {
            await newCategory({ id: 0, name: inputCategory, picture: '' }).unwrap()
            setInputCategory('')
        } catch (error: any) {
            setMsgState(error.data.message + '!')

        }
    }


    const hendleDeleteCategory = async (id: number) => {
        setMsgState('')
        try {
            await deleteCategory(id)
        } catch (error: any) {
            setMsgState(error.data.message + '!')
            console.log('error')
        }

    }

    const hendleConfirm = (id: number, name: string) => {
        setMsgState('')
        setShowConfirm(true)
        //setCategoryForDelete({ id: id, name: name })
    }
    return (
        <div className="max-w-[1200px] mx-auto">
            <div className="flex py-4">
                <label htmlFor="">Категория товара</label>
                <input id="prod-name" className="w-72 mx-3 p-2 border  border-blue-gray-300 rounded-md"
                    type='text' autoComplete='off' value={inputCategory}
                    onChange={(e) => setInputCategory(e.target.value)} />
                <button type="button" onClick={() => hendleNewCategory()}>
                    Добавить категорию
                </button>
            </div>
            <div className="flex flex-col gap-2">
                {categories && categories.map(category => 
                    <div key={category.id} className="flex justify-between w-1/2 border-b border-gray-300">
                        <div className="p-2">{category.name}</div>
                        <TrashIcon className="h-6 w-6 text-teal-700 cursor-pointer mt-2" 
                        onClick={()=>hendleDeleteCategory(category.id)}/>
                    </div>
                    )}
            </div>
        </div>
    )
}

export default CategoryManag