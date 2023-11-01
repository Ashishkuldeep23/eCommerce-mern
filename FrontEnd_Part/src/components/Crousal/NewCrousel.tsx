
import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { IProduct } from "../ProductListing/ProductLists"
import { useNavigate } from 'react-router-dom';
import { setSingleProductData } from '../../Slices/AllProductSlice';


const NewCrousel = () => {

    const themeMode = useSelector((store: RootState) => store.themeReducer.mode)
    const crousalItems: IProduct[] = useSelector((store: RootState) => store.allProductWithCatReducer.allHighlightProducts)
    // // // taking first 4 items as highlights and showing in to crousel / Now this doing on app.jsx after getting data.


    const [activeSlideIndex, setActiveSlideIndex] = useState(0);


    const navigate = useNavigate();
    const dispatch = useDispatch()


    const holderDivStyle = {
        backgroundRepeat: "repeat-x",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "hue(120deg)",
        backgroundSize: "contain",
    }


    return (

        <div className={`p-1 pt-10 sm:pt-10 sm:p-5  overflow-hidden flex justify-center ${!themeMode ? "bg-white" : 'bg-black'} `}>


            <div className={` overflow-hidden rounded-xl sm:rounded-3xl`} id='crouselHolderDiv'>
                <ReactSimplyCarousel

                    activeSlideIndex={activeSlideIndex}
                    onRequestChange={setActiveSlideIndex}
                    itemsToShow={1}
                    itemsToScroll={1}
                    forwardBtnProps={{
                        //here you can also pass className, or any other button element attributes
                        style: {
                            right: "10%",
                        },
                        className: ' crouselBtn ',
                        children: <span>{`❯`}</span>,
                    }}
                    backwardBtnProps={{
                        //here you can also pass className, or any other button element attributes
                        style: {
                            left: "10%",
                        },
                        className: ' crouselBtn ',
                        children: <span>{`❮`}</span>,
                    }}
                    responsiveProps={[
                        {
                            itemsToShow: 1,
                            itemsToScroll: 1,
                            minWidth: 768,
                        },
                    ]}
                    speed={500}
                    autoplayDelay={2000}
                    easing="linear"
                    autoplay={true}
                    autoplayDirection="forward"
                >

                    {

                        (crousalItems.length > 0)

                            ?

                            crousalItems.map((item, i) => {
                                return (
                                    <div key={i} className='withAllImp singleCrousel relative  h-crH hover:cursor-pointer'>

                                        <div
                                            style={{ backgroundImage: `url(${item.images[1]})`, ...holderDivStyle }}
                                            className="carousel-item relative w-full h-full hover:cursor-pointer box-content flex "
                                        onClick={() => { navigate("/product"); dispatch(setSingleProductData({ id: item.id })) }}
                                        >

                                            <img src={item.thumbnail}
                                                className=" w-full  object-contain rounded"
                                            />

                                            <p className=" text-sm md:text-3xl text-teal-300 text-center  absolute bottom-5 left-1/2 -translate-x-3/4 ">
                                                {item.title} :

                                                {
                                                    item.discountPercentage
                                                        ?
                                                        <span className={`text-end font-medium `}> <span className=' text-sm font-thin line-through'>₹{item.price}</span> ₹{Math.round(item.price - ((item.discountPercentage * item.price) / 100))}</span>

                                                        :
                                                        <span className={`text-end font-medium `}> ₹{item.price} </span>
                                                }
                                            </p>



                                            {/* <div
                                                className="absolute flex justify-between transform -translate-y-1/2 left-0 right-0 top-1/2"
                                                onClick={(e) => { e.stopPropagation() }}
                                            >
                                            </div> */}

                                        </div>


                                    </div>
                                )
                            })


                            :


                            <>

                                <div className='withAllImp singleCrousel relative  h-crH hover:cursor-pointer' style={{ background: '#0B666A' }}>
                                    slide 0
                                </div>
                                <div className=' withAllImp singleCrousel relative h-crH hover:cursor-pointer' style={{ background: '#065535' }}>
                                    slide 1
                                </div>
                                <div className='withAllImp singleCrousel relative  h-crH hover:cursor-pointer' style={{ background: '#000000' }}>
                                    slide 2
                                </div>
                                <div className=' withAllImp singleCrousel relative h-crH hover:cursor-pointer' style={{ background: '#133337' }}>
                                    slide 3
                                </div>
                                <div className='withAllImp singleCrousel relative  h-crH hover:cursor-pointer' style={{ background: '#ffc0cb' }}>
                                    slide 4
                                </div>
                                <div className=' withAllImp singleCrousel relative  h-crH hover:cursor-pointer' style={{ background: '#ffffff' }}>
                                    slide 5
                                </div>
                                <div className=' withAllImp singleCrousel relative h-crH hover:cursor-pointer' style={{ background: '#ffe4e1' }}>
                                    slide 6
                                </div>

                            </>

                    }



                    {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}


                    {/* <>


                        <div className='withAllImp singleCrousel relative  h-crH hover:cursor-pointer' style={{ background: '#ff80ed' }}>
                            slide 0
                        </div>
                        <div className=' withAllImp singleCrousel relative h-crH hover:cursor-pointer' style={{ background: '#065535' }}>
                            slide 1
                        </div>
                        <div className='withAllImp singleCrousel relative  h-crH hover:cursor-pointer' style={{ background: '#000000' }}>
                            slide 2
                        </div>
                        <div className=' withAllImp singleCrousel relative h-crH hover:cursor-pointer' style={{ background: '#133337' }}>
                            slide 3
                        </div>
                        <div className='withAllImp singleCrousel relative  h-crH hover:cursor-pointer' style={{ background: '#ffc0cb' }}>
                            slide 4
                        </div>
                        <div className=' withAllImp singleCrousel relative  h-crH hover:cursor-pointer' style={{ background: '#ffffff' }}>
                            slide 5
                        </div>
                        <div className=' withAllImp singleCrousel relative h-crH hover:cursor-pointer' style={{ background: '#ffe4e1' }}>
                            slide 6
                        </div>

                    </> */}


                </ReactSimplyCarousel>
            </div>

        </div>

    );
}

export default NewCrousel

