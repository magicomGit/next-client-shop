/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { SelectorIcon } from '@heroicons/react/solid'



interface Props {
    items: any[],
    currentItemIndex: number,
    setSelectedItem: (item: any) => void;
}
const SelectObject: FC<Props> = (props) => {
   let initialItem = {id:0, name:''}
    if (props.currentItemIndex !== -1) {
         initialItem = props.items[props.currentItemIndex]       
    }
    
    const [selectedItem, setSelectedItem] = useState<any>(initialItem )
    const [isOpen, setIsOpen] = useState(false )
    
    return (
        <Listbox   value={selectedItem} onChange={(e)=>{setSelectedItem(e); props.setSelectedItem(e)}}>
            {({ open }) => (
                <>

                    <div className="mt-1 relative ">
                        <Listbox.Button className="relative w-full min-h-[40px] bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 
                        text-left cursor-default focus:outline-none  focus:border-indigo-500 sm:text-sm">
                            <span className="ml-3 block truncate">{selectedItem && selectedItem.name}</span>
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
                            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 
                            ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {props.items.map((item, index) => (
                                    <div key={index} onClick={()=>{setSelectedItem(item); props.setSelectedItem(item)}} 
                                    className={`${item.id === selectedItem.id && 'bg-gray-100'} p-2 hover:text-teal-500 cursor-pointer`}>{item.name}</div>
                                ))}
                            </div>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}
export default SelectObject
