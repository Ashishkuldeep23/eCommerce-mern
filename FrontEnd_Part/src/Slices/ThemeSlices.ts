
import { createSlice } from "@reduxjs/toolkit"


// import type { PayloadAction } from "@reduxjs/toolkit"
// // // Above will use in action object , see the docs.


interface ThemeInter{
    mode : boolean ,
}



const initialState : ThemeInter = { mode : false }



const themeSlice = createSlice( {
    name : "theme" , 
    initialState ,
    reducers : {

        // makeDark(state){
        //     state.mode = true;
        // },
        // makeLight(state){
        //     state.mode = false;
        // }


        toggleModeValue(state){

            // if(!state.mode){
            // }

            if(!state.mode){
                state.mode = true
            }else{
                state.mode = false
            }

        }


    }
} )



export const { toggleModeValue } = themeSlice.actions

export default themeSlice.reducer





