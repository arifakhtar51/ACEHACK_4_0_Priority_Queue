import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    uid: null, // Store the unique ID of the authenticated user
    url: "",
    nft: 0
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.uid = action.payload;
        },
        setUrl: (state,action) => {
            state.url = action.payload;
        },
        clearUrl: (state) => {
            state.url = "";
        },
        clearUser: (state) => {
            state.uid = null;
        },
        setNft: (state) => {
            state.nft = action.payload
        }
    }
})

export const { setUser, clearUser,setUrl,clearUrl,setNft } = userSlice.actions;
export default userSlice.reducer;
