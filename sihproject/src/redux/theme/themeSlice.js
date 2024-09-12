import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme:'dark',
}

const themeSlicec = createSlice({
    name:'theme',
    initialState,
    reducers:{
        toggleTheme:(state)=>{
            state.theme= state.theme==='light'?'dark':'light';
        },
    }
});

export const {toggleTheme} = themeSlicec.actions;

export default themeSlicec.reducer;