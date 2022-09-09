import { Dialog, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/solid";
import { Textarea } from "@material-tailwind/react";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { ICategory, IProduct, IUser } from "../../../models/models";
import { SERVER_URL } from "../../../store/shop.api";
import { useNewCommentMutation } from "../../../store/slices/commentApiSlice";
import { useGetBrandsQuery, useGetCategiriesQuery } from "../../../store/slices/productApiSlice";
import CloseIcon from "../../icons/closeIcon";
import SelectCategory from "./SelectCategory";


interface ModalProps {
    isShow: boolean;
    productId: number;
    userName: string;
    userId: number;
    setIsShow: (isShow: boolean) => void;

}
//-------------------------

const NewComment: FC<ModalProps> = ({ isShow, productId, setIsShow, userName, userId }) => {
    const [sendNewComment, { }] = useNewCommentMutation()

    const [newComment, setNewComment] = useState('')

    const hendleSendComment = () => {
        sendNewComment({ id: 0, content: newComment, userName: userName, productId: productId, userId: userId })
    }
    const cancelButtonRef = useRef(null)
    return (
        <Transition.Root show={isShow} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} 
            onClose={() => { setIsShow(false) }}>
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
                    <div className="flex flex-col bg-white mx-auto w-[560px]  min-h-full p-5  relative">
                        <div className='absolute top-4 right-4 ' >
                            <span className='cursor-pointer' onClick={() => { setIsShow(false); }}><CloseIcon /></span>
                        </div>
                        <div className="text-2xl ">Ваш отзыв</div>
                        <div className='flex items-center mb-2'>
                            <UserCircleIcon className="h-8 w-8  text-teal-700 " />
                            <span className='p-1 text-light-blue-700 '>{userName}</span>
                        </div>

                        <Textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}
                            className='bg-white' color='teal' label='Ваш отзыв' />
                        <button onClick={hendleSendComment} className='bg-teal-600 p-2 rounded-md w-full text-white'>Отправить</button>
                    </div>
                </div>
            </div>
            </Dialog>
        </Transition.Root>
    )
}

export default NewComment