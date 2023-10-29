import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import SingleCartItem from "./SingleCartItem"




export type CartCompProp = {
  mainCartComp?: boolean
}



export default function CartComponent({ mainCartComp = true }: CartCompProp) {
  //   const [open, setCarOpen] = useState(true)

  const navigate = useNavigate()

  const themeMode = useSelector((store: RootState) => store.themeReducer.mode)

  const cartData = useSelector((store: RootState) => store.CartReducer.cartData)




  return (

    <div className={` md:h-allAk  flex flex-col overflow-y-scroll shadow-xl ${!themeMode ? "bg-white text-gray-900" : "bg-black text-gray-200"}  `}>

      <div className=' max-w-full md:max-w-allAk px-1  lg:px-8 lg:mx-14'>

        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6">

          {/* Go To Home Left presented */}
          <div className="flex items-start justify-between">

            {

              (mainCartComp)
                ?

                <div className="h-7 flex items-center w-full">
                  <button
                    type="button"
                    className=" relative ml-auto p-2 border-blue-500 border rounded font-bold  hover:bg-blue-500 hover:text-white transition-all"
                    onClick={() => { navigate("/") }}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close panel</span>
                    GoTo Home
                  </button>
                </div>

                :
                <div className="h-7 flex items-center w-full  text-center">
                  <p className='w-full text-center  text-xl font-bold font-serif underline '>Your Cart Items 👇</p>
                </div>
            }
          </div>

          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-green-300">

                {

                  (cartData && cartData.length > 0)

                    ?
                    cartData.map((product , i) => <SingleCartItem key={i} mainCartComp={mainCartComp} product={product} />)

                    :

                    <>

                      <li className='text-center text-2xl md:text-3xl font-bold mt-2 '>🛒Cart is Empty😔, Go to home and Shopping please😊 </li>

                    </>


                }

              </ul>
            </div>
          </div>
        </div>



        {/* This is total amount div with both btns */}
        {

          (mainCartComp) &&

          <>
            {

              (cartData && cartData.length > 0)

                ?
                <div className="border-t border-green-300 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium">
                    <p>Subtotal</p>
                    <p>₹262.00</p>
                  </div>
                  <p className="mt-0.5 text-sm ">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <Link
                      to={"/pay"}
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm">
                    <p>
                      or
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                        onClick={() => navigate("/")}
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>

                :
                <div className="border-t border-green-300 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium">
                    <p>Subtotal</p>
                    <p>NA</p>
                  </div>
                  <div className="mt-6">
                    <Link
                      to={"/pay"}
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Shop Now
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm">
                    <p>
                      or
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                        onClick={() => navigate("/")}
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>

                </div>
            }
          </>

        }




      </div>
    </div>

  )
}
