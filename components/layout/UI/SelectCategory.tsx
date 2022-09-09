/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { ICategory } from '../../../models/models'



interface Props {
    items: ICategory[],
    currentItemId: number,
    setSelectedItem: (caterory: ICategory) => void;
}
const SelectCategory: FC<Props> = (props) => {
    const initialCategory: ICategory = { id: 0, name: '',picture:'' }
    const currentCategiryId = props.items.find(category => category.id === props.currentItemId)
    const [selectedCategory, setSelectedCategory] = useState(currentCategiryId || initialCategory)
    
    return (
        <Listbox  value={selectedCategory} onChange={(e)=>{setSelectedCategory(e); props.setSelectedItem(e)}}>
            {({ open }) => (
                <>

                    <div className="mt-1 relative">
                        <Listbox.Button className="relative w-full min-h-[40px] bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none  focus:border-indigo-500 sm:text-sm">
                            <span className="ml-3 block truncate">{selectedCategory.name}</span>
                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {props.items.map((category) => (
                                    <Listbox.Option
                                        key={category.id}
                                        className={` text-gray-900 hover:bg-blue-gray-50 marker:cursor-default select-none relative py-2 pl-3 pr-9`}
                                        value={category}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <div className="flex items-center ">
                                                    <span className={`font-normalml-3 block truncate`}>
                                                        {category.name}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span className={`text-indigo-600  absolute inset-y-0 right-0 flex items-center pr-4`}>
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}
export default SelectCategory
