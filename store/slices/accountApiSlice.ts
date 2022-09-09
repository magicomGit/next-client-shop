import { ILimitOffset, ILogin, ILoginResponse, IUser } from "../../models/models"
import { shopApi } from "../shop.api"

export const accountApiSlice = shopApi.injectEndpoints({
    endpoints:  build => ({
        allUsers: build.query<IUser[], ILimitOffset>({
            query: ({ limit, offset }) => ({
                url: 'account/users',
                method: 'get',
                params: { l: limit, }
            }),            
        }),
        register: build.mutation<any, ILogin>({
            query: ({ email, password }) => ({
                url: 'account/register',
                method: 'post',
                body: { email: email, password: password }
            })
        }),
        login: build.mutation<ILoginResponse, ILogin>({
            query: ({ email, password }) => ({
                url: 'account/login',
                method: 'post',
                body: { email: email, password: password }
            })
        }),
        logout: build.mutation<{ isAuth: boolean }, string>({
            query: (userId) => ({
                url: 'account/logout',
                method: 'post',
                body: { userId: userId }
            })
        }),
        vkAuth: build.mutation<{ isAuth: boolean }, string>({
            query: (token) => ({
                url: 'account/vkAuth',
                method: 'post',
                body: { vkToken: token }
            })
        }),   
        
        
       

    })
})

export const {
    useAllUsersQuery,
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,  
    useVkAuthMutation  
} = accountApiSlice