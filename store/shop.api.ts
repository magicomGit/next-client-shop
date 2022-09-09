import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const SERVER_URL = 'http://localhost:5000'

const baseQuery = fetchBaseQuery({
    baseUrl: SERVER_URL,
    credentials: 'include',
    
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json;charset=UTF-8');
        headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        return headers;
    },
});



const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {    
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 303) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult: any = await baseQuery('account/refresh', api, extraOptions)

        if (refreshResult.data) {
            localStorage.setItem('accessToken', refreshResult.data.accessToken)
            result = await baseQuery(args, api, extraOptions)
        } 
    }

    return result
}

export const shopApi = createApi({
    reducerPath: 'gdovinfo/api',
    tagTypes: ['comment', 'category', 'brand', 'product', 'catProperty', 'propTemplate'],//авто обновление при изменении данных (doc redux toolkit)
    baseQuery: baseQueryWithReauth,
    endpoints:  build => ({})
})

