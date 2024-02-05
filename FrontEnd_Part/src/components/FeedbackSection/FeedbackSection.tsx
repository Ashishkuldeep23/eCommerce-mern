// import React from 'react'

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import ShowAllFeedDiv from "./ShowAllFeedDiv"
import { SubmitHandler, useForm } from "react-hook-form"
import { LoaderCircle } from "../LoaderCircle/LoaderCircle"
import { createNewFeedback, feedbackState } from "../../Slices/FeedbackSliceFile"
import { useEffect } from "react"


type FormInputs = {
    name: string;
    type: string;
    comment: string;
}


const FeedbackSection = () => {

    const dispatch = useDispatch<AppDispatch>()

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const { isLoading, isFullFilled } = feedbackState()

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormInputs>()


    const onSubmit: SubmitHandler<FormInputs> = (data) => {

        // dispatch(logInUser({ bodyData: data }))

        // console.log(data)


        let bodyData = { ...data }

        if (!bodyData.name) {
            setValue("name", "Guest")
            bodyData.name = "Guest"
        }


        // // whenCreated: `${new Date()}`

        dispatch(createNewFeedback({ body: { feedbackMsg: bodyData.comment, feedbackName: bodyData.name, feedbackType: bodyData.type } }))

    }



    useEffect(() => {

        if (isFullFilled) {
            setValue("name", "")
            setValue("comment", "")
            setValue("type", "Feedback")
        }

    }, [isFullFilled])



    console.log(errors)


    return (
        <div
            className={`${!themeMode ? "bg-white text-gray-700" : "bg-black text-gray-100"} w-full min-h-screen relative`}
        >
            {/* <div className=" border h-allAk mx-auto max-w-full lg:max-w-allAk px-1 lg:px-8 flex flex-col items-center justify-center"></div> */}


            <LoaderCircle isLoading={isLoading} />



            <div>

                <div className=" py-10 sm:py-24 flex flex-col sm:flex-row justify-center items-center bg-emerald-900  ">

                    <div className=" h-90 overflow-hidden border  w-11/12 sm:w-2/5 p-1 py-3 rounded m-0.5">
                        Inro --
                    </div>

                    <div className=" h-90 overflow-hidden border w-11/12 sm:w-2/5 p-1 py-3 rounded m-0.5 bg-black text-white">

                        <h2 className=" text-center  border-b font-semibold">Give your valuable feedback for this web app.</h2>

                        <form noValidate={true} className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                            <div className=" flex my-3">

                                <div className=" w-8/12">

                                    <label className="block text-sm font-medium leading-6 " htmlFor="name">Your Name👇</label>
                                    <input
                                        // className=" w-full"
                                        className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                        type="text"
                                        id="name"
                                        placeholder="Geust (Default)"
                                        {...register('name', {
                                            // required: "Name is Required",
                                            pattern: {
                                                value: /[a-zA-Z][a-zA-Z0-9-_ .]{3,25}/gi,
                                                message: "Must start with an alphabetic character. Can contain the following characters: a-z A-Z 0-9 - . _ and should be in between 5 to 25"
                                            }
                                        })}
                                    />
                                    <p className="text-sm pl-2 text-red-500 font-bold"> {errors.name?.message} </p>
                                </div>

                                <div className=" w-1/3">

                                    <label className="block text-sm font-medium leading-6 " htmlFor="feed_type">Type👇</label>

                                    <select
                                        className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                        // name=""
                                        id="feed_type"

                                        {...register('type', {
                                            required: "Type of Feedback is Required"
                                        })}
                                    >

                                        <option value="Feedback">Feedback</option>
                                        <option value="Bug">Bug</option>
                                        <option value="Suggetion">Suggetion</option>
                                        <option value="Appericate">Appericate</option>
                                        <option value="NotLike">NotLike</option>
                                        <option value="Else">Else</option>
                                    </select>

                                    <p className="text-sm pl-2 text-red-500 font-bold"> {errors.type?.message} </p>
                                </div>


                            </div>

                            <div className=" w-full">

                                <label className="block text-sm font-medium leading-6 " htmlFor="comment">Your Comment👇</label>

                                <textarea
                                    // name=""
                                    id="comment"
                                    // className=" w-full"

                                    className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                    rows={3}

                                    {...register('comment', {
                                        required: "Comment of Feedback is Required"
                                    })}
                                ></textarea>

                                <p className="text-sm pl-2 text-red-500 font-bold"> {errors.comment?.message} </p>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                >
                                    Submit
                                </button>
                            </div>


                        </form>

                    </div>


                </div>



                <div className=" pb-10 p-3 flex flex-col sm:flex-row justify-center items-center bg-emerald-900  ">


                    <ShowAllFeedDiv />
                </div>

            </div>


        </div>
    )
}

export default FeedbackSection