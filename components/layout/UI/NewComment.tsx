/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CloseIcon from '../../icons/closeIcon';
import { useGetRatingQuery, useNewCommentMutation } from '../../../store/slices/commentApiSlice';
import { UserCircleIcon } from '@heroicons/react/solid';
import { Textarea } from '@material-tailwind/react';

interface ModalProps {
    isShow: boolean;
    productId: number;
    userName: string;
    userId: number;
    setIsShow: (isShow: boolean) => void;

}
const NewComment: FC<ModalProps> = ({ isShow, productId, setIsShow, userName, userId }) => {
    const [sendNewComment, { }] = useNewCommentMutation()

    const [newComment, setNewComment] = useState('')
    const [ratingArray, setRatingArray] = useState([false, false, false, false, false])
    const [rating, setRating] = useState(0)

    const hendleSendComment = () => {
        sendNewComment({ id: 0, content: newComment, userName: userName, productId: productId, userId: userId })
        setIsShow(false)
        setNewComment('')
    }
    const cancelButtonRef = useRef(null)

    
    const {data: oldRating }= useGetRatingQuery({productId:productId, userId: userId, rating:0})
    

   

    useEffect(()=>{
        if (oldRating) {            
            setRating(oldRating)
            hendleMouseOut()       
        }},
    [oldRating,isShow])

    function hendleMouseOut(){
        const tempRating=[]
        for (let i = 0; i < 5; i++) {
            if (rating > i) {
                tempRating.push(true)
            }else{
                tempRating.push(false)
            }
        }
        setRatingArray(tempRating)
    }

   
    

    return (
        <Transition.Root show={isShow} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef}
                onClose={() => { setIsShow(false) }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed  inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed  z-10 inset-0 overflow-y-auto">
                    <div className="flex  lg:items-center justify-center min-h-full  text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative bg-white lg:rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-[470px] lg:min-w-[470px]">
                                <div className="bg-white px-8 pt-5 pb-10 ">
                                    <div className='flex justify-end mt-1 mb-3 ' >
                                        <span className='cursor-pointer' onClick={() => { setIsShow(false) }}><CloseIcon /></span>
                                    </div>

                                    <div className="text-2xl ">Ваш отзыв</div>
                                    <div className='flex items-center mb-2'>
                                        <UserCircleIcon className="h-8 w-8  text-teal-700 " />
                                        <span className='p-1 text-light-blue-700 '>{userName}</span>
                                    </div>
                                    

                                    <Textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}
                                        className='bg-white' color='teal' label='Ваш отзыв' rows={9} />
                                    <button onClick={hendleSendComment}
                                        className='bg-teal-600 p-2 rounded-md w-full text-white my-5'>
                                        Отправить
                                    </button>

                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
export default NewComment
