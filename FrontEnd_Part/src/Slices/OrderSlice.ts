
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { OrderData } from "../components/Payment/PaymentComp"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { gettingTokenInCookieAndLocalHost } from "../App"
import { toast } from "sonner"



// import type { PayloadAction } from "@reduxjs/toolkit"
// // // Above will use in action object , see the docs.



export const createOrder = createAsyncThunk("order/createOrder", async ({ body }: { body: OrderData }) => {


    // console.log("From Body -->", body)

    // // // Put validtaion here ------>



    let option: RequestInit = {
        credentials: 'include',
        method: "POST",

        headers: {
            'Content-Type': 'application/json',
            "token": `${gettingTokenInCookieAndLocalHost()}`
        },
        body: JSON.stringify(body)

    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/createOrder`, option)
    let data = await response.json();
    return data
})



type UpadteOrderBody={
    whatUpdate : string;
    orderId : string;
    makeOrderStatus ?: string
}

export const updateOrder = createAsyncThunk("order/updateOrder", async ({body} : {body : UpadteOrderBody}) => {


    let option: RequestInit = {
        credentials: 'include',
        method: "PUT",

        headers: {
            'Content-Type': 'application/json',
            "token": `${gettingTokenInCookieAndLocalHost()}`
        },
        body: JSON.stringify(body)

    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/updateOrder`, option)
    let data = await response.json();
    return data
})




interface OrderInterface {
    orderArr: OrderData,
    isLoading: boolean,
    isError: boolean,
    isFullFilled: boolean
}


const intialOrderData: OrderData = {
    fullName: "",
    phone: 0,
    address: {
        id: "",
        city: "",
        street: "",
        country: "",
        pincode: ""
    },
    paymentMethod: "",
    cartData: [],
    userId: "",
    whenCreated: "",
    totalItems: 0,
    totalPrice: "",
    status: ""
}


const initialState: OrderInterface = {
    orderArr: intialOrderData,
    isLoading: false,
    isError: false,
    isFullFilled: false
}



const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {

        setOrderdata(state, action) {
            state.orderArr = action.payload.data
        }

    },


    extraReducers: (builder) => {
        builder

            // // // fetchUser reducers ----->

            // // // Create Order reducer --->
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true
                state.isFullFilled = false
            })

            .addCase(createOrder.fulfilled, (state, action) => {

                // console.log(action.payload)

                if (action.payload.status === false) {

                    state.isError = true
                    state.isFullFilled = false

                    toast.error(`${action.payload.message} | 400`)
                } else {

                    state.isFullFilled = true
                    toast.success(`${action.payload.message}`)
                }


                // console.log(action.payload.message)

                state.isLoading = false

            })

            .addCase(createOrder.rejected, (state, action) => {

                // console.log(action)

                toast.error(`${action.error.message} | Check your Network | Refresh the page`);


                state.isLoading = false
                state.isError = true
                state.isFullFilled = false
            })



            // // // Update order reducer --->
            .addCase(updateOrder.pending, (state) => {
                state.isLoading = true
                state.isFullFilled = false
            })

            .addCase(updateOrder.fulfilled, (state, action) => {

                // console.log(action.payload)

                if (action.payload.status === false) {

                    state.isError = true
                    state.isFullFilled = false

                    toast.error(`${action.payload.message} | 400`)
                } else {

                    state.isFullFilled = true
                    toast.success(`${action.payload.message}`)
                }


                // console.log(action.payload.message)

                state.isLoading = false

            })

            .addCase(updateOrder.rejected, (state, action) => {

                // console.log(action)

                toast.error(`${action.error.message} | Check your Network | Refresh the page`);


                state.isLoading = false
                state.isError = true
                state.isFullFilled = false
            })

    }

})



export const { setOrderdata } = orderSlice.actions

export const orderState = () => useSelector((state: RootState) => state.orderReducer)

export default orderSlice.reducer





