import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'

import { useAppDispatch } from '../store'
import { logOut } from '../store/slices/authSlice'

//import { toast } from 'your-cool-library'

/**
 * Log a warning and show a toast!
 */
 const authMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {   
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      //console.log(action.payload.status)
      if (action.payload.status === 401) {
        console.warn('We got a rejected action!')
        next(logOut())
      }
      //toast.warn({ title: 'Async error!', message: action.error.data.message })
    }

    return next(action)
  }
  export default authMiddleware