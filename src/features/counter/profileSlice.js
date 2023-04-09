import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    role: null
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setRole: (state, action) => {
        state.role = action.payload.role
    },
  }
});

export const { setRole } = profileSlice.actions

export const getRole = state => state.profile.role

export default profileSlice.reducer