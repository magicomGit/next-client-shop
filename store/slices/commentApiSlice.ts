
import { IComment, ICommentRespose, IRating, IRatingDataRespose } from "../../models/models"
import { shopApi } from "../shop.api"

interface request {
    productId:number,
    limit: number,
    page: number,
}

export const commentApiSlice = shopApi.injectEndpoints({
    endpoints:  build => ({        
        getComments: build.query<ICommentRespose,request>({
            query: (request) => ({
                url: 'comment/getComments',
                method: 'GET',  
                params:  request          
            }),     
            providesTags: (result) =>
                result
                    ? [...result.rows.map(({ id }) => ({ type: 'comment' as const, id })),
                    { type: 'comment', id: 'LIST' },]
                    : [{ type: 'comment', id: 'LIST' }],                
        }),
        newComment: build.mutation<IComment, IComment>({
            query: (comment) => ({
                url: 'comment/newComment',
                method: 'PUT',
                body: { comment }
            }),   
            invalidatesTags: [{ type: 'comment', id: 'LIST' }], //авто обновление                      
        }),
        newRating: build.mutation<IRatingDataRespose, IRating>({
            query: (rating) => ({
                url: 'comment/newRating',
                method: 'PUT',
                body: { rating }
            }),                                 
        }),
        getRating: build.query<number, IRating>({
            query: (rating) => ({
                url: 'comment/getRating',
                method: 'GET',
                params: { userId: rating.userId, productId:rating.productId }
            }),                                 
        }),
        

    })
})

export const {   
    useGetCommentsQuery,
    useNewCommentMutation,
    useNewRatingMutation,
    useGetRatingQuery    
    
} = commentApiSlice