import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."

interface ILoginShowState{
    isShowForm: boolean
}

const initialState: ILoginShowState = {         
    isShowForm: false
} 

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {       
        showLoginForm: (state, action: PayloadAction<boolean>) => {            
            state.isShowForm = action.payload            
        },        
    },
    
})

export const { showLoginForm} = authSlice.actions
export default authSlice.reducer
export const selectLoginFormState = (state: RootState) => state.loginFormReducer