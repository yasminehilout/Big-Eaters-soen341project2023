import { createSlice } from '@reduxjs/toolkit'

// const [user, setUser] = useState(null)
const initialState = {
    user: null
}

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