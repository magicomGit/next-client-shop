import { ChatIcon, StarIcon, UserCircleIcon } from '@heroicons/react/solid'
import { FC, useEffect, useState } from 'react'
import Pagination from '../../components/layout/pagination/Pagination'

import NewComment from '../../components/layout/UI/NewComment'
import { IComment, IRatingDataRespose } from '../../models/models'
import { useAppDispatch, useAppSelctor } from '../../store'
import { SERVER_URL } from '../../store/shop.api'
import { useGetCommentsQuery, useGetRatingQuery, useNewCommentMutation, useNewRatingMutation } from '../../store/slices/commentApiSlice'
import { useGetProductQuery } from '../../store/slices/productApiSlice'
import { showLoginForm } from '../../store/slices/showLoginFormSlice'


export const getServerSideProps = async (context: any) => {
    const { id } = context.params
    return { props: { id: id } }
}

const LIMIT = 5

const Product: FC = ({ id }: any) => {


    const { data: product, isSuccess: isSuccessProduct } = useGetProductQuery(id)


    const { userId, userRole, userName, isAuth } = useAppSelctor(state => state.authReducer)
    const dispatch = useAppDispatch()



    const [comments, setComments] = useState<IComment[]>([])

    const [userNameState, setUserNameState] = useState('')
    const [isAuthState, setIsAuthState] = useState(false)

    const [showNewComment, setShowNewComment] = useState(false)


    const [commentsQty, setCommentsQty] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pagesQty, setPagesQty] = useState(1)


    const { data: commentsData, isSuccess: isSuccessComments } = useGetCommentsQuery({ productId: id, limit: LIMIT, page: currentPage })




    useEffect(() => {
        if (isAuth) {
            setUserNameState(userName)
            setIsAuthState(true)
        } else {
            setUserNameState('')
            setIsAuthState(false)
        }
    }, [isAuth])


    useEffect(() => {

        if (isSuccessComments) {
            setComments(commentsData.rows)
            setCommentsQty(commentsData.count)
            setPagesQty(Math.ceil(commentsData.count / LIMIT))
        }
    }, [commentsData])



    const hendleNewComment = () => {
        if (isAuth) {
            setShowNewComment(true)
        } else {
            dispatch(showLoginForm(true))
        }
    }
    //----------rating---------------------------------
    const [ratingArray, setRatingArray] = useState([false, false, false, false, false])
    const [rating, setRating] = useState(0)
    const [productRating, setProductRating] = useState('')

    const [sendNewRating, { data: newRating }] = useNewRatingMutation()
    const { data: oldRating, isSuccess: isSuccessOldRating } = useGetRatingQuery({ productId: id, userId: Number(userId), rating: 0 })

    useEffect(() => {
        if (isSuccessProduct) {
            setProductRating((product.rating / product.ratingCount).toFixed(1))
        }
    }, [isSuccessProduct])

    useEffect(() => {
        if (isSuccessOldRating && oldRating) {
            setRating(oldRating)
            const tempRating = []
            for (let i = 0; i < 5; i++) {
                if (oldRating > i) {
                    tempRating.push(true)
                } else {
                    tempRating.push(false)
                }
            }
            setRatingArray(tempRating)
        }
    }, [isSuccessOldRating])

    function hendleMouseOut() {
        const tempRating = []
        for (let i = 0; i < 5; i++) {
            if (rating > i) {
                tempRating.push(true)
            } else {
                tempRating.push(false)
            }
        }
        setRatingArray(tempRating)
    }

    function hendleMouseMove(e: any) {
        let currentTargetRect = e.currentTarget.getBoundingClientRect();
        const event_offsetX = e.pageX - currentTargetRect.left
        if (event_offsetX >= 5 && event_offsetX < 25) { setRatingArray([true, false, false, false, false]) }
        if (event_offsetX >= 25 && event_offsetX < 45) { setRatingArray([true, true, false, false, false]) }
        if (event_offsetX >= 45 && event_offsetX < 65) { setRatingArray([true, true, true, false, false]) }
        if (event_offsetX >= 65 && event_offsetX < 85) { setRatingArray([true, true, true, true, false]) }
        if (event_offsetX >= 85 && event_offsetX < 105) { setRatingArray([true, true, true, true, true]) }
    }

    async function hendleMouseClick(e: any) {
        if (isAuth) {
            let currentTargetRect = e.currentTarget.getBoundingClientRect();
            const event_offsetX = e.pageX - currentTargetRect.left

            let tempRating = 0

            if (event_offsetX >= 5 && event_offsetX < 25) { setRating(1); tempRating = 1; }
            if (event_offsetX >= 25 && event_offsetX < 45) { setRating(2); tempRating = 2; }
            if (event_offsetX >= 45 && event_offsetX < 65) { setRating(3); tempRating = 3; }
            if (event_offsetX >= 65 && event_offsetX < 85) { setRating(4); tempRating = 4; }
            if (event_offsetX >= 85 && event_offsetX < 105) { setRating(5); tempRating = 5; }

            await sendNewRating({ productId: id, userId: Number(userId), rating: tempRating })
                .then((res: any) => setProductRating(res.data.productRating))
        } else {
            dispatch(showLoginForm(true))
        }


    }
    return (
        <>
            <NewComment isShow={showNewComment} productId={id} setIsShow={setShowNewComment}
                userId={Number(userId)} userName={userNameState} />

            <div className='max-w-[1200px] mx-auto '>
                {isSuccessProduct &&
                    <div className='flex flex-col lg:flex-row mt-10'>
                        <div className='lg:w-1/3'><img src={SERVER_URL + '/' + product.picture} /> </div>
                        <div className='lg:w-2/3 flex flex-col lg:flex-row'>
                            <div className='pl-16 '>
                                <div className='text-3xl '>{product.name}</div>
                                <div className='flex'>
                                    <StarIcon className="h-5 w-5  text-yellow-700 " /><span className='text-sm px-1'>
                                        {productRating}</span>
                                    <ChatIcon className="h-5 w-5  text-gray-300 ml-3" /><span className='text-sm px-1'>{product.comments.length}</span>
                                </div>
                            </div>
                            <div className='flex flex-col lg:flex-row mt-5'>
                                <div className='lg:pl-16 pl-5 my-5 min-w-[400px]'>
                                    {product.properties.map(property =>
                                        <div key={property.id} className='flex my-3'>
                                            <div className='w-60'>{property.name}</div>

                                            <div>{property.value}</div>
                                        </div>
                                    )}
                                </div>
                                <div className='px-5 flex lg:flex-col items-center gap-3 lg:gap-1'>
                                    <div className='text-2xl'>{product.price.toLocaleString()} ₽</div>
                                    <div className='text-base py-2 px-4 bg-teal-600 text-white rounded-md'>В корзину</div>

                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className='flex justify-center gap-3 mt-16'>
                
                <span>Отзывы</span>
            </div>
            <div className='bg-gray-200 p-10 mt-2'>
                <div className='max-w-[1200px] m-auto flex flex-col lg:flex-row gap-10'>
                    <div className='lg:w-1/5 flex flex-col items-center gap-1'>
                        <div>Ваша оценка</div>
                        <div onMouseMove={(e: any) => hendleMouseMove(e)} onMouseOut={hendleMouseOut}
                            onClick={(e: any) => hendleMouseClick(e)} className='mb-2 flex w-28'>
                            <StarIcon className={`${ratingArray[0] ? 'text-yellow-700 ' : 'text-gray-400'} h-5 w-5   `} />
                            <StarIcon className={`${ratingArray[1] ? 'text-yellow-700 ' : 'text-gray-400'} h-5 w-5   `} />
                            <StarIcon className={`${ratingArray[2] ? 'text-yellow-700 ' : 'text-gray-400'} h-5 w-5   `} />
                            <StarIcon className={`${ratingArray[3] ? 'text-yellow-700 ' : 'text-gray-400'} h-5 w-5   `} />
                            <StarIcon className={`${ratingArray[4] ? 'text-yellow-700 ' : 'text-gray-400'} h-5 w-5   `} />

                        </div>
                        <button className='w-full h-9 mx-5 py-1 px-4 bg-teal-600 text-white rounded-md' onClick={() => hendleNewComment()}>
                            Оставить отзыв
                        </button>
                    </div>
                    {/* --------------comments----------------- */}
                    <div className='  flex flex-col gap-10 lg:w-4/5'>
                        {comments.map(comment =>
                            <div key={comment.id}>
                                <div className='flex items-center mb-2'>
                                    <UserCircleIcon className="h-8 w-8  text-teal-700 " />
                                    <span className='p-1 text-light-blue-700 '>{comment.userName}</span>
                                </div>

                                <div>{comment.content}</div>

                            </div>
                        )}
                    </div>

                    {/* ------------------------------- */}


                </div>
                {/* ------------------------------- */}
                <div className='max-w-6xl mx-auto mt-10'>
                    <Pagination setCurrentPage={setCurrentPage} pagesQty={pagesQty} limit={LIMIT} page={currentPage} />
                </div>
            </div>
        </>
    )

}
export default Product