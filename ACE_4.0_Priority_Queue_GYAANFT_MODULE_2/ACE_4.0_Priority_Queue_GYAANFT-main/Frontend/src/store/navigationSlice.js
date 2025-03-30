import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeItem: 'home',
  isMobileMenuOpen: false
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveItem: (state, action) => {
      state.activeItem = action.payload
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false
    }
  }
})

export const { setActiveItem, toggleMobileMenu, closeMobileMenu } = navigationSlice.actions
export default navigationSlice.reducer