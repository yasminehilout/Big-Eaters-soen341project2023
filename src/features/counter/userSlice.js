import { createSlice } from '@reduxjs/toolkit'

/* `const initialState` is defining the initial state of the `user` slice of the Redux store. In this
case, the initial state is an object with a `user` property set to `null`. This means that when the
application first loads, the `user` state will be `null` until it is updated by a `logIn` action. */
const initialState = {
    user: null
}

/* This code is creating a Redux slice for managing the user state. It uses the `createSlice` function
from the `@reduxjs/toolkit` library to create a slice with the name "user" and an initial state of
`{ user: null }`. The slice has two reducers: `logIn` and `logOut`. The `logIn` reducer takes the
`user` payload from the action and sets it as the new value of `state.user`. The `logOut` reducer
sets `state.user` to `null`. The slice's actions (`logIn` and `logOut`) and a selector
(`selectUser`) are exported for use in other parts of the application. Finally, the slice's reducer
function is exported as the default export. */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action) => {
        state.user = action.payload.user
    },
    logOut: (state) => {
        state.user = null
    }
  }
});

export const { logIn, logOut } = userSlice.actions

export const selectUser = state => state.user.user

export default userSlice.reducer