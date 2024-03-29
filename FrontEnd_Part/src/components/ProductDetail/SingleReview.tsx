import { StarIcon } from "@heroicons/react/24/solid"
import { ReviewData } from "./ProductDetails"
import { userState } from "../../Slices/UserSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { deleteReview, dislikeReview, likeReview, setReviewData, setReviewUpadte } from "../../Slices/ReviewSlice"
import { setChildrenModal, setOpenMoadl } from "../../Slices/ModalSlice"
import { useState } from "react"
import { LikeBtnDoubleClick } from "./LikeBtnDoubleClick"
import { gettingTokenInCookieAndLocalHost } from "../../App"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"



type PropOfSingleReview = {
    reviewData: ReviewData
}


const SingleReview = ({ reviewData }: PropOfSingleReview) => {

    const [doubleClickLike, setDoubleClickLike] = useState<boolean>(false)

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const userDataId = userState().userData.id

    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()



    function checkUserIsLogInEd(): boolean {

        let logined = true

        // // // Check user is logIn or not --->
        if (!gettingTokenInCookieAndLocalHost()) {
            toast.error(`Can't do this, you are not logged in person.`, {
                action: {
                    label: 'LogIn',
                    onClick: () => {
                        window.scroll(0, 0)
                        navigate("/login");
                    }
                },
            });
            logined = false
        }

        return logined
    }




    const updateReview = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, reviewData: ReviewData) => {

        e.stopPropagation();
        e.preventDefault();


        // console.log(reviewData)

        dispatch(setReviewData({ data: reviewData }))

        dispatch(setReviewUpadte({ data: true }))


        // let post_review_div = document.querySelector("#post_review")

        // console.log( window.pageYOffset ,post_review_div?.getBoundingClientRect().top , post_review_div.off)

        // let y = post_review_div?.getBoundingClientRect().y

        // if(y) window.scroll(0 , y)

        if (window.innerWidth <= 1024) {

            window.scroll(0, 1400)
        } else {

            window.scroll(0, 700)
        }


    }



    const likeHandler = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {


        e.stopPropagation();
        e.preventDefault();



        // // // FN calling to check Login ---->
        if (!checkUserIsLogInEd()) return


        // alert("ok")

        if (!reviewData.likedUserIds.includes(userDataId)) {

            dispatch(likeReview({ reviewId: reviewData.id, isLiking: true, userId: userDataId }))

            animationForLike()  // // // Show like animation code -->
        } else {

            dispatch(likeReview({ reviewId: reviewData.id, isLiking: false, userId: userDataId }))
        }


    }



    const dislikeHandler = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {


        e.stopPropagation();
        e.preventDefault();


        // // // FN calling to check Login ---->
        if (!checkUserIsLogInEd()) return


        // alert("ok")

        if (!reviewData.dislikedUserIds.includes(userDataId)) {

            dispatch(dislikeReview({ reviewId: reviewData.id, isDisliking: true, userId: userDataId }))
        } else {

            dispatch(dislikeReview({ reviewId: reviewData.id, isDisliking: false, userId: userDataId }))
        }


    }



    const doubleClickHandler = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        if (!reviewData?.likedUserIds?.includes(userDataId)) {
            likeHandler(e)

        }
    }


    // // // this code will show like animation --->
    function animationForLike() {
        setDoubleClickLike(true)

        setTimeout(() => {
            setDoubleClickLike(false)
        }, 1000)
    }



    function showModalWithValues() {

        // e.stopPropagation();

        // alert()


        // // // FN calling to check Login ---->
        if (!checkUserIsLogInEd()) return


        dispatch(setOpenMoadl(true))


        let ChildrenOfModal = <div><p className=" text-center font-bold text-xl underline">Name : {reviewData.userId.firstName + " " + reviewData.userId.lastName}</p><img className=" rounded" src={reviewData.userId.profilePic} alt="" /></div>

        dispatch(setChildrenModal(ChildrenOfModal))

    }



    return (
        <>

            <div
                className={`p-1 my-4 mx-2 px-2 border border-green-300 rounded ${!themeMode ? "bg-blue-50" : "bg-blue-950"} relative `} id="post_review"
                onDoubleClick={(e) => doubleClickHandler(e)}
            >


                {/* Show on double click  */}
                <LikeBtnDoubleClick doubleClickLike={doubleClickLike} left={false} />

                {/* User Info Div (Containing Pic and Name ) */}
                <div
                    className='flex items-center hover:cursor-pointer'
                    onClick={showModalWithValues}
                >
                    <img className=' w-6 h-6 object-cover rounded-full hover:rounded-sm hover:scale-125 transition-all' src={reviewData?.userId?.profilePic || ''} alt="" />
                    <p className=' text-xl pl-2 font-bold border-b capitalize '>{reviewData?.userId?.firstName || '' + " " + reviewData?.userId?.lastName || ''} </p>
                </div>

                {/* Review Info Div --> */}
                <div>

                    {/* Review (Comment and Stars) */}
                    <div className='flex items-start'>

                        <div className=' border border-yellow-400 rounded inline-flex items-center my-1 px-1'>
                            <p className=" font-bold text-yellow-400" >{reviewData.stars}</p>
                            <StarIcon className={` h-5 w-5 text-yellow-400 text-5xl flex-shrink-0`} />
                        </div>
                        <p
                            className='ml-2 text-xl'
                            style={{ lineBreak: "anywhere" }}
                        >{reviewData.comment}</p>

                    </div>

                    {/* Like Dislike btns ---> */}
                    <div className='flex  w-4/5 mt-2'>


                        <p
                            className={`border px-3 mr-3 rounded ${reviewData.likedUserIds.includes(userDataId) && 'text-blue-400'}  `}
                            onClick={(e) => likeHandler(e)}
                        >
                            <i
                                className={`ri-thumb-up-fill ${reviewData.likedUserIds.includes(userDataId) ? 'text-blue-400' : "text-gray-300"} `}
                            ></i> {reviewData.likes}
                        </p>



                        <p
                            className={`border px-3 rounded ${reviewData.dislikedUserIds.includes(userDataId) && 'text-red-400'}  `}
                            onClick={(e) => dislikeHandler(e)}
                        >
                            <i
                                className={`ri-thumb-down-fill ${reviewData.dislikedUserIds.includes(userDataId) ? 'text-red-400' : "text-gray-300"} `}
                            ></i> {reviewData.dislikes}
                        </p>
                    </div>

                    {/* Edit Delete btns ---> */}
                    <div className={` mt-0.5 flex  justify-end relative  ${userDataId === reviewData.userId.id ? "display" : "hidden"} `}>
                        {/* <div className={` mt-0.5 flex  justify-end relative  `}> */}

                        <div className=" absolute left-0">

                            <button
                                className="  border rounded px-0.5 mx-0.5 hover:bg-red-300 hover:text-white"
                                onClick={(e) => { e.stopPropagation(); dispatch(deleteReview({ reviewId: reviewData.id, userUID: userDataId })) }}
                            >
                                <i className="ri-delete-bin-7-line"></i>
                            </button>

                            <button
                                className="  border rounded px-0.5 mx-0.5 hover:bg-blue-300 hover:text-white"
                                onClick={(e) => { updateReview(e, reviewData) }}
                            >
                                <i className="ri-pencil-fill"></i>
                            </button>

                        </div>

                    </div>

                    <p className='text-end mr-5 '>{reviewData.whenCreated}</p>
                </div>


            </div>
        </>

    )
}

export default SingleReview
