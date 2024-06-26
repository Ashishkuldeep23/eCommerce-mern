
import { Fragment, useState, useRef, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { toggleModeValue } from '../../Slices/ThemeSlices'
import { AppDispatch, RootState } from '../../store'
import { fetchAllCategoryAndHighlight, fetchAllProducts, fetchOneProductByID, setSingleProductData } from '../../Slices/AllProductSlice';
import { toast } from 'sonner';
import { reqVerifyMail, userState } from '../../Slices/UserSlice';
import { searchProduct, searchProductState, setKeyText } from '../../Slices/ProductSearchByKey';
import { IProduct } from '../ProductListing/ProductLists';




const navigation = [
    { name: 'My Orders', href: '/orders', current: true },
    { name: 'name', href: '/about', current: false },
    // { name: 'AAAA', href: '#', current: false },
    // { name: 'Team', href: '#', current: false },
    // { name: 'Projects', href: '#', current: false },
    // { name: 'Calendar', href: '#', current: false },
]


const LOGO_PATH_HERE = '/logo3.png'

const LOGO_CLASSES_HERE = "h-7 w-auto hover:scale-125 hover:z-20 transition-all"


// // // I'm main UI code for Navbar (All Functional comps present in-side me)
export default function NavBar() {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const limitValue = useSelector((state: RootState) => state.allProductWithCatReducer.onePageLimit)


    // const { brand, category } = useSelector((state: RootState) => state.allProductWithCatReducer.searchBrandAndCate)
    // console.log(brand, category, limitValue)


    const gotoHomeBtnClickHandler = () => {

        navigate("/");
        dispatch(fetchAllCategoryAndHighlight())
        dispatch(fetchAllProducts({ brand: "", category: '', price: "-1", limit: `${limitValue}` }))
        window.scroll(0, 500);
    }



    // const navigate = useNavigate()

    // const userData = userState().userData

    // // // // Use Efftect to send on admin page (If user role is admin) ---->
    // // // // If user is Admin then navigate to Admin Page -->

    // useEffect(() => {

    //     if (userData.firstName !== "" && userData.lastName !== "") {

    //         if (userData.role === "admin") {
    //             navigate("/admin")
    //         }
    //     }
    // }, [userData])



    // /// // Main navBar code --->
    return (


        <Disclosure as="nav" className="bg-gray-800 sticky -top-16 md:top-0 z-40  ">
            {({ open }) => (
                <>
                    <div className=" mx-auto max-w-full md:max-w-allAk px-1  md:px-8 ">
                        <div className="relative flex h-16 items-center justify-between">


                            {/* This div will visiable on less then md devices main div. (This div includes Icon and open & close icon) */}
                            <MobileUICodeLeftSection
                                open={open}
                                gotoHomeBtnClickHandler={gotoHomeBtnClickHandler}
                            />


                            {/*  All menu items that always visible more then tab screen (presented left side after icon) */}
                            <MenuOfTabAndAbove
                                gotoHomeBtnClickHandler={gotoHomeBtnClickHandler}
                            />


                            {/* Common left section here This will visible in both screen */}
                            <RightCommonSection />


                        </div>
                    </div>



                    {/* Here menu items will visible and show when user click ok icon */}
                    <MenuOfMobileShowByBTN />


                    {/* (search bar full width less then tab) Below search bar will visible less then md (in mobile only)    */}
                    <SearchBarTabAndLess />

                    {/* This comp resposible for loading and scroll tracker ----> */}
                    <UniversalLoaderAndScroll />


                    {/* {
                        roleOfUser === "admin"
                        &&
                        ""
                    } */}

                    <GoToAdminPageBtn />

                </>
            )}
        </Disclosure>



    )
}



// // // Below btn is used for admin only (For navigating to admin page)---->
function GoToAdminPageBtn() {

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const roleOfUser = userState().userData.role

    const location = useLocation()

    // console.log(location)


    if (roleOfUser !== "admin" || location.pathname === "/admin") {
        return <> </>
    }

    return (
        <>
            <div
                className={` backdrop-blur-3xl rounded-full border  absolute my-2 left-2/4 -translate-x-2/4 active:bg-green-500 ${!themeMode ? "text-black border-black" : "text-white border-white"} `}
            >
                <Link to={"/admin"}>
                    <button className=' px-4 capitalize font-bold text-sm sm:text-lg'>Go To Admin Page</button>
                </Link>
            </div>
        </>
    )
}


// // // All menu items that always visible more then tab screen (presented left side after icon) (This includes search bar that visible tab and above) (Icon also sho here)
function MenuOfTabAndAbove({ gotoHomeBtnClickHandler }: { gotoHomeBtnClickHandler: Function }) {


    const userData = userState().userData
    const navigate = useNavigate()

    return (
        <>

            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">


                <div
                    className=" hidden md:flex flex-col items-center hover:cursor-pointer  hover:scale-125 hover:z-20 transition-all  "
                    onClick={() => gotoHomeBtnClickHandler()}
                >
                    <img
                        className={LOGO_CLASSES_HERE}
                        src={LOGO_PATH_HERE}
                        alt="AKart"
                    />
                    <p
                        style={{ fontFamily: "cursive" }}
                        className=' text-xs text-center -mt-0.5 font-semibold'
                    >AKart</p>
                </div>


                {/*  Shown in leptop (tab and above) */}
                <div className="hidden md:ml-6 md:block">
                    <div className="flex space-x-4">

                        {navigation.map((item, i) => (
                            <a
                                key={i}
                                // href={item.href}
                                onClick={(e) => { e.stopPropagation(); navigate(item.href) }}
                                className={` ${item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} rounded-md px-3 py-2 text-md font-medium `}
                                aria-current={item.current ? 'page' : undefined}
                            >
                                {
                                    item.name !== "name"
                                        ? item.name
                                        : <span className=' capitalize'>Welcome,{userData.firstName || "user"}😊</span>
                                }
                            </a>
                        ))}


                        {/* This searchBar will visiable in tab or above */}
                        <div className='my-auto flex  items-center justify-center relative'>


                            <MainSearchBarWithLogics />

                        </div>


                    </div>
                </div>
            </div>


        </>
    )
}


// // // {/* This div will visiable on less then md devices main div. (This div includes Icon and open & close icon) */ }
function MobileUICodeLeftSection({ open, gotoHomeBtnClickHandler }: { open: boolean, gotoHomeBtnClickHandler: Function }) {


    return (
        <>

            <div className="absolute inset-y-0 left-0 flex items-center md:hidden ">

                {/* Barnd ICon */}
                <div
                    className="flex flex-col ml-0.5 items-center "
                    onClick={() => gotoHomeBtnClickHandler()}
                >
                    <img
                        className={LOGO_CLASSES_HERE}
                        src={LOGO_PATH_HERE}
                        alt="AKart"
                    />

                    <p
                        style={{ fontFamily: "cursive" }}
                        className=' text-xs text-center -mt-0.5 font-semibold'
                    >AKart</p>
                </div>

                {/* Mobile menu button*/}
                <Disclosure.Button className="ml-1 relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                </Disclosure.Button>

            </div>



        </>
    )
}


// // // {/* Common left section here This will visible in both screen */ }
function MenuOfMobileShowByBTN() {

    const navigate = useNavigate()
    const userData = userState().userData


    return (
        <>
            <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">

                    {navigation.map((item, i) => (
                        <Disclosure.Button
                            key={i}
                            as="a"
                            // href={item.href}
                            className={`${item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} block rounded-md px-3 py-2 text-base font-medium `}
                            aria-current={item.current ? 'page' : undefined}
                            onClick={(e) => { e.stopPropagation(); navigate(item.href) }}
                        >
                            {
                                item.name !== "name"
                                    ? item.name
                                    : `Welcome,${userData.firstName || "user"}😊`
                            }
                        </Disclosure.Button>
                    ))}

                </div>

            </Disclosure.Panel>

        </>
    )
}


// // // {/* Here menu items will visible and show when user click ok icon */ }
function RightCommonSection() {

    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()

    const themeSate = useSelector((store: RootState) => store.themeReducer.mode)

    const cartData = useSelector((state: RootState) => state.CartReducer.cartData)

    const getUserState = userState();

    const isUserAdmin = getUserState.userData.role


    // console.log(isUserAdmin)

    // const [tokenInCookie , setTokenInCookie] = useState<string>('')


    let itemsOfProfileOnHover = null;

    // itemsOfProfileOnHover = [
    //     { tab: "Your Profile", to: "/about" },
    //     { tab: "Setting", to: "#" },
    //     { tab: "SignIn", to: "/login" },
    //     { tab: "SignOut", to: "#" },
    // ]




    if (getUserState.isLogIn) {

        if (getUserState.userData.isEmailVerified) {

            itemsOfProfileOnHover = [
                { tab: "Admin Page", to: "/admin" },
                { tab: "Your Profile", to: "/about" },
                { tab: "SignOut", to: "#" },
            ]

        } else {


            itemsOfProfileOnHover = [
                { tab: "Admin Page", to: "/admin" },
                { tab: "Your Profile", to: "/about" },
                { tab: "Verify Mail", to: "#" },
                { tab: "SignOut", to: "#" },
            ]

        }


    } else {

        itemsOfProfileOnHover = [
            // { tab: "Your Profile", to: "/about" },
            { tab: "SignIn", to: "/login" },
        ]

    }




    function singOutHandler() {




        // // // Now setting token to null in singOut Fn() ---->
        document.cookie = `token=`

        // // // Now using localStorage and request header (Means remove token from local storage) ------->
        localStorage.removeItem("userToken")

        // // // Go To home-page ---->>
        navigate("/")

        // // // Delete user INFO in local ---->
        localStorage.removeItem("userData")
        localStorage.removeItem("isUserLogIn")




        toast.success("SingOut Done ✅")



        // // Reload page ----->>
        location.reload()


    }




    function verifyMailHandler() {
        dispatch(reqVerifyMail())
    }


    // useEffect( ()=>{

    //     // let getCookie = document.cookie.get("token")

    //     console.log(document.cookie.split(";").includes("token="))

    //     let getCookie = document.cookie.split(";").includes("token=")

    //     // // // If above code will give true means user logout . 

    // } , [tokenInCookie] )



    return (
        <>

            <div className="absolute inset-y-0 right-0 flex items-center  md:static md:inset-auto md:ml-6 md:pr-0">




                {/* Cart btn */}
                <>
                    <button
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mx-1 hover:scale-125  transition-all"
                        onClick={() => { navigate("/cart") }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>

                    </button>


                    {/* Cart items show */}
                    {
                        (cartData.length > 0)
                        &&
                        <span
                            className={` ${!themeSate ? "bg-indigo-50 text-red-700  hover:bg-slate-200" : " bg-slate-500 text-red-500  hover:bg-slate-400 "} inline-flex items-center rounded-full  px-2 text-x font-bold ring-1 ring-inset ring-indigo-700/10 -ml-5 -mt-7 -mr-2 z-10 hover:text-red-400 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:scale-125 hover:z-20 transition-all `}
                            onClick={() => { navigate("/cart") }}
                        >
                            {cartData.length}
                        </span>
                    }
                </>


                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3 mx-1 hover:scale-125 hover:z-20 transition-all">

                    <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img

                                // https://res.cloudinary.com/dlvq8n2ca/image/upload/v1700368567/ej31ylpxtamndu3trqtk.png

                                // // // By this way we can prevent our UI if image link will return nothing.
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = "https://res.cloudinary.com/dlvq8n2ca/image/upload/v1700368567/ej31ylpxtamndu3trqtk.png";
                                }}
                                className="h-8 w-8 rounded-full object-cover"
                                src={getUserState.userData.profilePic}
                                alt=""
                            />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className={`absolute overflow-hidden -right-full z-50 mt-2 w-32 xsm:w-48 origin-top-right rounded-md  pt-1 shadow-md ring-1 ring-opacity-5 focus:outline-none ${!themeSate ? "bg-white text-gray-900" : "bg-gray-900 text-white"} `}>

                            {
                                (itemsOfProfileOnHover && itemsOfProfileOnHover.length > 0)
                                &&
                                itemsOfProfileOnHover.map((item, i) => {
                                    return (
                                        <Fragment key={i}>

                                            <Menu.Item >
                                                {

                                                    <Link
                                                        to={item.to}
                                                        className={` 
                                                        ${(item.tab === "Admin Page" && isUserAdmin === "user") ? "hidden" : "block"}
                                                         ${!themeSate ? "hover:bg-gray-300 hover:text-teal-500" : "hover:bg-gray-600 hover:text-yellow-500"} 
                                                         ${item.tab === "SignOut" && "text-red-500"}  
                                                         ${item.tab === "SignIn" && "text-green-500"}  
                                                         block px-4 py-2 text-md  border-b border-green-300 transition-all
                                                         `}
                                                        onClick={() => {

                                                            switch (item.tab) {
                                                                case "SignOut":
                                                                    return singOutHandler()

                                                                case "Verify Mail":
                                                                    return verifyMailHandler()


                                                                default:
                                                                    return;
                                                            }

                                                            // item.tab === "SignOut"
                                                            //     && singOutHandler()
                                                        }}
                                                    >
                                                        {item.tab}
                                                    </Link>

                                                }


                                            </Menu.Item>

                                        </Fragment>
                                    )
                                })

                            }

                        </Menu.Items>
                    </Transition>
                </Menu>

                {/* dark btn */}
                <ThemeToggelBtnLightAndDark />
            </div >

        </>
    )

}


// // // (search bar full width less then tab) 
function SearchBarTabAndLess() {

    // const themeSate = useSelector((store: RootState) => store.themeReducer.mode)

    return (
        <>
            <div className='my-auto flex  items-center justify-center md:hidden mb-1 m-1 relative'>

                <MainSearchBarWithLogics />

                {/* <MainSearchBarWithLogicsOnNode /> */}


            </div>
        </>
    )
}



// // // This div contains Input box and search btn and suggestion div all ---> and it's neccessory thing 
// // // Used is two placed in leptop and mobile also ---->
function MainSearchBarWithLogics() {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const themeSate = useSelector((store: RootState) => store.themeReducer.mode)
    const allProduct = searchProductState().productSuggetionArr
    const isLoading = searchProductState().isLoading
    const isFullfilled = searchProductState().isFullFilled
    const isError = searchProductState().isError
    const errorMessage = searchProductState().errMsg


    const inputRef = useRef<HTMLInputElement | null>(null);
    const [showSuggestion, setShowSuggestion] = useState(false)
    const [isUserStopTyping, setIsUserStopTyping] = useState<boolean>(false)

    const [searchHistory, setSearchHistory] = useState<IProduct[]>([])

    // const [text, setText] = useState("")
    // // // Text var is used as search Text --->

    const text = searchProductState().keyText
    const setText = (text: string) => dispatch(setKeyText(text));


    // // // Input onchange handler --->



    // let isUserStopTyping = false

    // // // This type we can use in set timeout -->
    type Timer = ReturnType<typeof setTimeout>

    let timeOutValue: Timer;

    function searchOncahngeHandler(e: React.ChangeEvent<HTMLInputElement>) {

        setText(e.target.value);

        clearTimeout(timeOutValue)

        timeOutValue = setTimeout(() => {
            setIsUserStopTyping(true)
        }, 500)
    }



    // // // // Product search ------>
    // function SuggestionHandler() {

    //     // // // This will run first (when ever text is empty)
    //     // if (text === "") {
    //     //     return <h1 className='my-5 mx-1 text-center text-danger fw-bold'>Search product by it's <strong>Name</strong> or <strong>Category</strong> or <strong>Brand name</strong>.</h1>
    //     // }



    //     // // // frontend filter logic (OLD)
    //     // let returnArrFromFilter = allProduct.filter((product) => {
    //     //     if (text === "") {
    //     //         return product
    //     //     }
    //     //     else if (product.title.toLocaleLowerCase().includes(text.toLocaleLowerCase())) {
    //     //         return product
    //     //     }
    //     //     else if (product.category.toLocaleLowerCase().includes(text.toLocaleLowerCase())) {
    //     //         return product
    //     //     }
    //     //     else if (product.brand.toLocaleLowerCase().includes(text.toLocaleLowerCase())) {
    //     //         return product
    //     //     }

    //     // })



    //     // returnArrFromFilter = []
    //     // // // just checking thier

    //     return (



    //     )

    // }



    const handleInboxClick = () => {
        setShowSuggestion(true);
    }


    const handleOutsideClick = (e: MouseEvent) => {

        setText("");  // // // Empty text now --->

        if (inputRef.current && e.target !== inputRef.current) {
            setShowSuggestion(false);
        }
    }



    const handleHistoryClick = (product: IProduct) => {
        // e.stopPropagation()
        // setText(product.title)
        // setIsUserStopTyping(true)

        itemSuggestionClickHandle(product)
    }



    const addOneKeywordFromHistory = (product: IProduct) => {
        let newHistoryArr = [product, ...searchHistory];
        newHistoryArr = [...new Set(newHistoryArr)]
        setSearchHistory(newHistoryArr)
    }


    const removeOneKeywordFromHistory = (product: IProduct) => {

        // console.log(searchHistory[i])
        // let newHistoryArr = [...searchHistory].splice(i, 1)
        let newHistoryArr = searchHistory.filter((item) => item.title != product.title)

        // console.log(newHistoryArr)

        setSearchHistory(newHistoryArr)
    }



    const itemSuggestionClickHandle = (product: IProduct) => {

        // // // Add click into search history ---> 
        addOneKeywordFromHistory(product)

        navigate(`/product/${product.id}`);
        dispatch(setSingleProductData({ id: product.id }));
        dispatch(fetchOneProductByID({ productId: product.id }));
        // dispatch(setSingleOProductId({ id: product.id }));
        window.scroll(0, 0);
        setText("")
    }



    useEffect(() => {


        if (isUserStopTyping) {

            // // // Here checking two thing 
            // // 1s is) is loading is false (means not getting data)
            // // // 2nd is) text having someting 
            if (!isLoading && text) {
                // alert("Calling Dispatch here --->")
                // console.log("calling db")


                dispatch(searchProduct(text))


                setIsUserStopTyping(false)
            }
        }

    }, [text, isUserStopTyping])



    useEffect(() => {

        let getSearchHistory = localStorage.getItem("SearchHistory")

        // console.log(getSearchHistory)
        if (getSearchHistory) {
            let parsedArr = JSON.parse(getSearchHistory)
            setSearchHistory([...parsedArr])
        }


        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);



    // // // search history and setting in localhost ---------->
    useEffect(() => {

        // if (searchHistory.length > 0) {
        localStorage.setItem("SearchHistory", JSON.stringify(searchHistory))
        // }

    }, [searchHistory])




    return (
        <>

            <input
                type="text" placeholder='Search Product...'
                className={` ${!themeSate ? "bg-white text-black" : " bg-gray-900 text-white"}  py-1 rounded w-full`}
                name="" id=""
                value={text}

                // onFocus={()=>{alert("ok")}}

                // onFocusCapture={()=>alert("ok")}
                ref={inputRef}

                onClick={handleInboxClick}

                onChange={(e) => { e.stopPropagation(); searchOncahngeHandler(e); }}

            // onClick={() => { alert("ok") }}

            />

            <button
                className='border text-white rounded text-md p-1 font-medium  hover:bg-gray-700 hover:text-white'
                onClick={() => {
                    // if (allProduct.length > 0) { addOneKeywordFromHistory(text) }
                }}
            >
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-200" />
            </button>


            {
                showSuggestion
                &&

                <div className={` ${!themeSate ? "bg-white text-black" : " bg-gray-900 text-white"} w-full absolute top-full mt-0.5  rounded-b-md py-2 px-1 z-20 `}>


                    <ul className='px-1 pb-1 max-h-96 overflow-y-scroll border rounded border-green-300'>

                        {/* <li>1 productOne ---</li>
                        <li>1 productOne ---</li>
                        <li>1 productOne ---</li>
                        <li>1 productOne ---</li> */}

                        {
                            text
                            &&
                            <div className='p-1 text-white bg-red-500 m-1 font-bold rounded flex justify-between'
                                onClick={() => { setText(""); }}
                            >
                                <p>Close</p>
                                <p className='border px-1 rounded'>x</p>
                            </div>
                        }




                        {
                            isLoading
                            &&
                            <span id="search_loader"></span>
                        }




                        {
                            (allProduct && (allProduct.length >= 0))
                                &&
                                (text === "")
                                ?

                                <h1 className='my-5 text-center text-danger fw-bold'>Search product by it's <strong>Name</strong> or <strong>Category</strong> or <strong>Brand name</strong>.</h1>

                                :

                                (isFullfilled && !isError && !isLoading)
                                    ?
                                    allProduct.map((product) => {
                                        return (
                                            <li
                                                key={product.id}
                                                className='my-2 border rounded px-1 flex items-center hover:cursor-pointer hover:scale-95 transition-all'
                                                onClick={(e) => {
                                                    // e.stopPropagation();
                                                    e.preventDefault();
                                                    itemSuggestionClickHandle(product);
                                                }}
                                            >
                                                <img className=' w-12 mr-1 ' src={product.thumbnail} alt="" />
                                                <p className=' capitalize'>{` ${product.title} - ${product.brand} - ${product.category} - ₹${product.price} `}</p>
                                            </li>
                                        )
                                    })
                                    :
                                    <h1 className='my-5 text-center text-danger fw-bold'>{errorMessage}</h1>
                        }



                        {

                            searchHistory.length > 0
                            &&

                            <div className=' px-1'>
                                <div className='border-1 border-b border-violet-600 font-bold flex justify-between text-sm'>

                                    <h5>History</h5>
                                    <span
                                        className='mb-2 text-red-500 border-red-500 border px-1.5 rounded-md font-bold hover:bg-red-500 hover:text-white hover:cursor-pointer transition-all'
                                        onClick={() => { setSearchHistory([]) }}
                                    >X</span>
                                </div>

                                {
                                    searchHistory.map((ele, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className={`
                                                    ${themeSate ? "text-violet-300 " : "text-violet-800 "} 
                                                    pl-1 rounded-l-md flex justify-between items-end border-1 border-b border-violet-600
                                                 `}
                                            >
                                                <ol
                                                    className=' w-full hover:cursor-pointer capitalize'

                                                    onClick={() => { handleHistoryClick(ele); }}

                                                >{ele.title}</ol>
                                                <span
                                                    className='my-1 text-xs text-red-500 px-1.5 rounded-md font-bold hover:bg-red-500 hover:text-white hover:cursor-pointer transition-all'

                                                    onClick={(e) => { e.stopPropagation(); removeOneKeywordFromHistory(ele) }}

                                                >X</span>
                                            </div>
                                        )
                                    })
                                }

                            </div>

                        }





                    </ul>

                </div>

            }



        </>
    )
}


// // // Universal loader code here ---->
function UniversalLoaderAndScroll() {


    const productIsLoading = useSelector((state: RootState) => state.allProductWithCatReducer.isLoading)
    const orderIsLoading = useSelector((state: RootState) => state.orderReducer.isLoading)
    const reviewIsLoading = useSelector((state: RootState) => state.reviewReducer.isLoading)
    const userIsLoading = useSelector((state: RootState) => state.userReducer.isLoading)


    const [left, setLeft] = useState<number>(0)

    const [windowHight, setWindowHight] = useState(0)



    // // // Scroll percentage div (code here ---> ) ---->

    document.addEventListener("scroll", scrollPageAndGetSetData)

    function scrollPageAndGetSetData() {
        // console.log(dets)

        let totalHeightOfWebPage = document.body.scrollHeight

        let currentDistanceFromTop = document.documentElement.scrollTop

        const windowHeight = document.documentElement.clientHeight

        const scroolPercentge = (currentDistanceFromTop / (totalHeightOfWebPage - windowHeight)) * 100

        // console.log(scroolPercentge)

        const roundedSroolValue = Math.round(scroolPercentge)

        if (roundedSroolValue < 82) {
            setLeft(roundedSroolValue)
        }

    }


    function leftClickhandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation()


        let aboveScrollDivLeft = document.getElementById('scroll_percent_indi_top')?.getClientRects()[0].x

        // console.log(aboveScrollDivLeft)

        if (aboveScrollDivLeft !== undefined) {

            window.scroll(0, aboveScrollDivLeft - 200)
        }
    }


    function rightClickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation()


        let aboveScrollDivLeft = document.getElementById('scroll_percent_indi_top')?.getClientRects()[0].x

        // console.log(aboveScrollDivLeft)

        if (aboveScrollDivLeft !== undefined) {

            window.scroll(0, aboveScrollDivLeft + 200)
        }

    }



    useEffect(() => {
        // scrollPageAndGetSetData()

        setWindowHight(window.innerHeight)

        // console.log(windowHight)

        scrollPageAndGetSetData()

    }, [windowHight])



    // // // Loader UI ------>
    if (productIsLoading || orderIsLoading || reviewIsLoading || userIsLoading) {
        return (
            <>
                <div style={{ height: "1px" }} className=' w-full bg-blue-200 flex items-center relative'>

                    <div className='universal_loader_holder absolute -top-4'>
                        <span className="universal_loader"></span>
                    </div>
                </div>
            </>
        )
    }



    // // // Scroll percentage div ---->
    return (
        <>
            <div className='w-full h-1.5 relative bg-gray-800 border-b '>
                <div

                    // style={{ width: width }}
                    // style={{ left: `${left}%`, width: "10%" }}
                    style={{ left: `${left}%`, width: `${Math.round(windowHight / 45)}%` }}
                    id='scroll_percent_indi_top'
                    className=' absolute left-10 h-1.5 bg-green-300 rounded hover:scale-y-200 transition-all overflow-hidden'
                >

                    <button
                        onClick={(e) => leftClickhandler(e)}
                        className='w-1/2  h-full bg-green-300'
                    >.</button>
                    <button
                        onClick={(e) => rightClickHandler(e)}
                        className='w-1/2  h-full  bg-green-300'
                    >.</button>

                </div>
            </div>
        </>
    )

}



export function ThemeToggelBtnLightAndDark() {

    const themeDispatch = useDispatch()

    const themeSate = useSelector((store: RootState) => store.themeReducer.mode)

    return (

        <>

            <div
                className="relative  overflow-hidden w-7 h-11 rounded-full bg-transparent p-1 text-white hover:text-yellow-400 mx-1 ml-1.5 hover:scale-125 hover:z-20  hover:cursor-pointer transition-all"
                onClick={() => { themeDispatch(toggleModeValue()); }}
            >


                <span
                    className={`absolute transition-all  ${themeSate ? "top-5 -left-12" : "top-0 left-0"}`}
                >
                    <svg
                        className={`swap-off fill-current w-7 h-7 mt-2 `}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>

                </span>



                <span
                    className={`absolute transition-all ${!themeSate ? "top-5  -left-12" : "top-0 left-0"}`}
                >
                    <svg
                        className={`swap-off fill-current w-7 h-7 mt-2 `}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>
                </span>


            </div>

        </>


    )

}

