import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."
import { AuthPayload, AuthState } from "../../models/models"

const initialState: AuthState = {     
    userId:   '',
    userName:   '',
    userRole:  '',
    accessToken:  '',
    isAuth: false,
    emailConfirmed: false
} 
if (typeof window !== "undefined"){
         
        initialState.userId =  localStorage.getItem('userId') ?? '',
        initialState.userName =  localStorage.getItem('userName') ?? '',
        initialState.userRole=  localStorage.getItem('userRole') ?? '',
        initialState.accessToken= localStorage.getItem('accessToken') ?? '',
        initialState.isAuth= Boolean(localStorage.getItem('accessToken'))
        initialState.emailConfirmed= Boolean(localStorage.getItem('accessToken'))
   
}




export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {       
        setCredentials: (state, action: PayloadAction<AuthPayload >) => {
            const {userId, userName, userRole, accessToken, emailConfirmed} = action.payload
            state.userId = userId
            state.userName = userName
            state.userRole = userRole
            state.accessToken = accessToken
            state.isAuth = Boolean(accessToken)
            state.emailConfirmed = emailConfirmed
            localStorage.setItem('userId', userId)
            localStorage.setItem('userName', userName)
            localStorage.setItem('userRole', userRole)
            localStorage.setItem('accessToken', accessToken)            
            
        },
        logOut:(state,action: PayloadAction<undefined>)=>{            
            state.userId = ''
            state.userName = ''
            state.userRole = ''
            state.accessToken = ''
            state.isAuth = false
            state.emailConfirmed = false
            localStorage.removeItem('userId')
            localStorage.removeItem('userName')
            localStorage.removeItem('userRole')
            localStorage.removeItem('accessToken')
            
        },
        
        
    },
    
})

export const { setCredentials, logOut} = authSlice.actions
export default authSlice.reducer
export const selectCurrentAuthData = (state: RootState) => state.authReducer