import { TrashIcon } from "@heroicons/react/solid"
import { Input } from "@material-tailwind/react"
import { useState } from "react"
import SelectObject from "../../components/layout/UI/SelectObject"
import { ICategory } from "../../models/models"
import { useDeleteFilterNameMutation, useGetFilterNamesQuery, useGetFilterValuesByFilterNameIdQuery, useNewFilterNameMutation, useNewFilterValueMutation } from "../../store/slices/filterApiSlice"
import { useGetCategiriesQuery } from "../../store/slices/productApiSlice"


const FilterManag = () => {
    const initialCategory: ICategory = { id: 0, name: '', picture: '' }

    const [newFilterName, setNewFilterName] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<ICategory>(initialCategory)
    const [selectedFilterNameId, setSelectedFilterNameId] = useState<number>(0)
    const [selectedFilterName, setSelectedFilterName] = useState<string>('')
    //---------filterValues State
    const [value, setValue] = useState<string>('')


    const { data: categories } = useGetCategiriesQuery('')
    const { data: filterNames } = useGetFilterNamesQuery(Number(selectedCategory.id))
    const { data: filterValues } = useGetFilterValuesByFilterNameIdQuery(selectedFilterNameId)

    const [NewFilterName, { }] = useNewFilterNameMutation()
    const [deleteFilterName, { }] = useDeleteFilterNameMutation()
    const [newFilterValue, { }] = useNewFilterValueMutation()

    const hendleDelete = async (id: number) => {
        try {
            const response = await deleteFilterName(id)
        } catch (error) {

        }

    }

    const hendleAddCatProperty = async () => {
        setNewFilterName('')
        try {
            const response = await NewFilterName({ id: 0, name: newFilterName, categoryId: selectedCategory.id })

        } catch (error) {

        }
    }

    const hendleNewFilterValue = async () => {
        try {
            await newFilterValue({
                id: 0, categoryId: selectedCategory.id, filterNameId: selectedFilterNameId,
                filterName: selectedFilterName, value: value, productQty: 0
            })


        } catch (error) {

        }
    }

    return (
        <div className="max-w-[1200px] mx-auto ">
            <div className="w-1/3">
                <label >Категория</label>
                {categories && <SelectObject items={categories} currentItemIndex={-1} setSelectedItem={setSelectedCategory} />}
            </div>
            {/* -------------------------------------------- */}
            <div className="flex py-4">

                <div className="w-1/2  border border-gray-400 p-6 mr-2">
                    <div className="flex mb-3">
                        <Input label="Название фильтра" onChange={(e) => { setNewFilterName(e.target.value) }} />
                        <button type="button" className="ml-3 border border-gray-300 px-3 py-1 rounded-lg"
                            onClick={() => { hendleAddCatProperty() }}> Добавить</button>
                    </div>


                    {filterNames && filterNames.map((prop) =>
                        <div key={prop.id}
                            onClick={() => {
                                setSelectedFilterNameId(prop.id)
                                setSelectedFilterName(prop.name)
                            }}
                            className={`${selectedFilterNameId === prop.id && 'bg-gray-100'} flex justify-between p-2 border-b border-gray-400 hover:bg-gray-100`}
                        >
                            <span>{prop.name}</span>
                            <span onClick={() => hendleDelete(prop.id)}>
                                <TrashIcon className="h-6 w-6 text-teal-700 cursor-pointer" />
                            </span>

                        </div>
                    )}



                </div>

                {/* -------------- NewPropTemplate --------------------------------------- */}
                <div className="w-1/2  border border-gray-400 p-6 mr-2">

                    {selectedFilterNameId !== 0 &&
                        <div>
                            <div className="flex mb-3">
                                <Input value={value} onChange={(e: any) => { setValue(e.target.value) }} label="Значение фильтра" />
                                <button type="button" className="ml-3 border border-gray-300 px-3 py-1 rounded-lg"
                                    onClick={() => { hendleNewFilterValue() }}> Добавить
                                </button>
                            </div>


                        </div>

                    }
                    {filterValues && filterValues.map(filterValue =>
                        <div className="p-2 border-b border-gray-400 hover:bg-gray-100" key={filterValue.id}>
                            {filterValue.value}
                        </div>
                    )}

                </div>
            </div>

        </div>
    )
}

export default FilterManag