
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"

// // // by using corrent i can use updated data ----> (see the setSingleProduct  funtion )

import { IProduct } from "../components/ProductListing/ProductLists"

import { toast } from "react-toastify"



type SearchObj = {
    brand ?: string ,
    category ?: string,
    price ?:string,
    page ?: string,
    limit ?: string,
}


export const fetchAllProducts = createAsyncThunk("fetchAllProducts", async ({ brand = '' , category = '' , price = '1' , page="1" ,limit="10"} : SearchObj ) => {

    // console.log(brand , category)


    let url = `${import.meta.env.VITE_BACKEND_URL}/findAllProducts`


    if(brand  && brand !== ''){


        url = url + `?brand=${brand}`

    }

    if(category && category !== ""){
        if(brand){
            url = url + `&category=${category}`
        }else{
            url = url + `?category=${category}`
        }
    }



    if(!brand && !category){
        url = url + `?sort_by_price=${price}&page=${page}&limit=${limit}`
    }else{
        url = url + `&sort_by_price=${price}&page=${page}&limit=${limit}`
    }

    // console.log(url)


    const response = await fetch(url)
    let data = await response.json();
    return data
})


type productId = {
    productId: string | number
}

export const fetchOneProductByID = createAsyncThunk("fetchSingleProduct/:id", async ({ productId }: productId) => {

    // console.log(productId)

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/findOneProduct/${productId}`)
    let data = await response.json();
    return data
})



export const fetchAllCategoryAndHighlight = createAsyncThunk("getCategoryAndHighlight", async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getCategoryAndHighlight`)
    let data = await response.json();
    return data
})



interface IAllProductsWithCat {
    allProducts: IProduct[],
    allCaegory: string[],
    filterAllBrands: string[],
    filterAllCateory: string[],
    allHighlightProducts: IProduct[],
    totalProducts : number ,
    onePageLimit : number ,
    singleProductId: string | number,
    singleProductData: IProduct,
    simmilarProductWithOnePro: IProduct[],
    isLoading: boolean,
    isError: boolean
}



const initialState: IAllProductsWithCat = {
    allProducts: [],
    allCaegory: [],
    filterAllBrands : [],
    filterAllCateory : [],
    allHighlightProducts: [],
    totalProducts : 0 ,
    onePageLimit : 4 ,
    singleProductId: "",
    singleProductData: {
        "id": 0,
        "title": "",
        "description": {
            fullName: "",
            aboutProduct: "",
            highLights: [],
            specifications: [{}],
            product_Details: [{}],
            dimensions: [{}]
        },
        "price": 0,
        "discountPercentage": 0,
        type: [],
        "rating": {
            totalPerson: 0,
            avgRating: 0
        },
        "brand": '',
        "category": '',
        "thumbnail": '',
        "images": [],
        "isHighlight": false,
        "isDeleted": false,
        "review": []


    },

    simmilarProductWithOnePro: [],

    isLoading: false,
    isError: false
}


const allProductsCatSlice = createSlice({

    name: "allPrductsCat",
    initialState,
    reducers: {


        loadDataIntoState(state, action) {
            state.allProducts = action.payload.allProducts
            state.allCaegory = action.payload.allCaegory
            state.allHighlightProducts = action.payload.allHighlightProducts
            // state.singleProductData = action.payload.allProducts[1]
        },


        setSingleProductData(state, action) {

            let getUpdatedData = current(state)

            const allProductsArr = [...getUpdatedData.allProducts]

            const getSingleItem = allProductsArr.filter((item) => {

                if (item.id === action.payload.id) {
                    return item
                }

            })

            // console.log(getSingleItem[0])

            state.singleProductData = getSingleItem[0]
        },


        setSingleOProductId(state, action) {

            // console.log(action.payload)

            state.singleProductId = action.payload.id

            localStorage.setItem("singleProductId", JSON.stringify(action.payload.id))

        },


        setFilterItems(state, action) {
            state.allProducts = action.payload.allProducts
        },


    },


    extraReducers: (builder) => {

        builder.addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {


            if(action.payload.totaldata === 0){
                toast.error(`Data Not Found for your query | 404`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }

            state.isLoading = false;
            state.allProducts = action.payload.allProductData
            state.allCaegory = action.payload.allCategory
            // state.allHighlightProducts = action.payload.allHighlights

            // console.log(action.payload)
        })

        builder.addCase(fetchAllProducts.rejected, (state, action) => {
            state.isError = true;

            console.log(action.error)

            toast.error(`${action.error.message} | Check your Network | Refresh the page`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })



            .addCase(fetchAllCategoryAndHighlight.pending, () => {

                console.log("Getting Data from Backend. Now pending")
            })


            .addCase(fetchAllCategoryAndHighlight.fulfilled, (state, action) => {

                // console.log(action.payload)

                state.allHighlightProducts = action.payload.allHighlights
                state.filterAllBrands = action.payload.allBrands
                state.filterAllCateory = action.payload.allCategory
                state.totalProducts = action.payload.totalProducts

            })


            .addCase(fetchAllCategoryAndHighlight.rejected, (state, action) => {
                state.isError = true
                toast.error(`${action.error.message} | Check your Network | Refresh the page`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })





            .addCase(fetchOneProductByID.pending, () => {
                console.log("Getting Data from Backend. Now pending")
            })

            .addCase(fetchOneProductByID.fulfilled, (state, action) => {

                // console.log(action.payload)

                state.singleProductData = action.payload.data
                state.simmilarProductWithOnePro = action.payload.simmilarProductExceptThis
            })

            .addCase(fetchOneProductByID.rejected, (state, action) => {

                state.isError = true
                toast.error(`${action.error.message} | Check your Network | Refresh the page`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })


    }

})


export const { loadDataIntoState, setSingleProductData, setFilterItems, setSingleOProductId } = allProductsCatSlice.actions

export default allProductsCatSlice.reducer

