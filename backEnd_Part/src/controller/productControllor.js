
const uuid = require("uuid")

const { uploadArrOfImgOnCloud } = require('../../lib/cloudinary')

// // // required models ---->

const productModel = require("../model/productModel")
// const reviewModel = require("../model/reviewModel")


async function createNewProduct(req, res) {

    try {

        // // // Lot of work not done now (USE this api as admin api ) ------->


        // console.log({ ...req.body })
        // console.log("files are ---->", req.files)

        // // // Check body (body can't be empty)

        if (Object.keys(req.body).length <= 0) {
            return res.status(400).send({ status: false, message: "Body can't be empty" })
        }


        if (!req.tokenUserData || req.tokenUserData.role !== "admin") {
            return res.status(403).send({ status: false, message: "Unauthorized to create product." })
        }



        // // // Incomming keys -->
        let { whenCreted, imageInputBy, thumbnailIndex, type, description, category, discountPercentage, price, brand, title } = req.body


        if (!whenCreted || !imageInputBy || !thumbnailIndex || !type || !description || !category || !discountPercentage || !price || !brand || !title) {
            return res.status(400).send({ status: false, message: "All feilds are not given." })
        }



        // // // Validation ---> 


        // // // taking care of image (URL and Actual Images) ----->


        let recivedBodyData = {}

        for (let key of Object.keys(req.body)) {

            // console.log(key)

            recivedBodyData[key] = JSON.parse(req.body[key])

        }



        // console.log(recivedBodyData)


        // const images = []



        if (recivedBodyData.imageInputBy === "by_image") {

            const allFiles = req.files

            if (allFiles.length > 0) {


                // for (let i = 0; i < allFiles.length; i++) {

                //     console.log(allFiles[i])

                //     let filePathIs = allFiles[i].path

                //     let result = await uploadImageOnCloudinary(filePathIs, "product_Imgs_Ecom")

                //     console.log(result)
                //     images.push(result)

                // }



                let result = await uploadArrOfImgOnCloud(allFiles, "product_Imgs_Ecom")


                if (result.length > 0) {
                    recivedBodyData.images = result
                }


            }

        }

        // console.log("Thumbnail --------->" ,recivedBodyData.images[0])

        recivedBodyData.thumbnail = recivedBodyData.images[thumbnailIndex]

        // console.log({createdData : recivedBodyData})

        let newProduct = await productModel.create(recivedBodyData)
        // 
        // console.log(newProduct)

        res.status(201).send({ status: true, message: "Product created successfully.", data: newProduct })

    } catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: "Server Error" })
    }
}



async function findAllProducts(req, res) {

    // console.log(1555)


    // console.log(req.query)

    try {



        let searchByQuery = false


        let { brand, category, sort_by_price, most_started, page, limit } = req.query



        // console.log(brand , category , sort_by_price)

        // console.log(typeof sort_by_price) 

        let searchObject = {
            isDeleted: false,
        }

        if (brand) {
            // searchObject.brand = brand.toLowerCase()
            searchObject.brand = brand

            searchByQuery = true
        }

        if (category) {
            // searchObject.category = category.toLowerCase()
            searchObject.category = category

            searchByQuery = true

            // // // To lower case not used now
        }




        let sortByPrice = 1

        if (sort_by_price && (sort_by_price === '1' || sort_by_price === '-1')) {
            sortByPrice = sort_by_price
        }


        let pageNo = 1

        if (page) {
            pageNo = page
        }


        // let mostStarted = 1 

        // if(most_started  && (most_started === '1' || most_started === '-1') ){
        //     mostStarted = most_started
        // }


        let limitOfProducts = 3

        if (limit) {
            limitOfProducts = limit
        }

        const findAllProducts = await productModel.find(searchObject).sort({ price: sortByPrice }).skip(limitOfProducts * (pageNo - 1)).limit(limitOfProducts).select('-_id -updatedAt -createdAt -__v -description -type -review').populate("review")


        // // // Create all category list here and send to frontEnd
        const allCategoryOfProducts = [...new Set(findAllProducts.map(ele => ele.category))]

        // const allHighlights = [...findAllProducts.slice(3,8)]   // // // Upadte this by highlighted true product.


        // const allHighlights = [...findAllProducts.filter((item) => {
        //     if (item.isHighlight === true) { return item }
        // })]   // // // now Upadte this by highlighted true product.   
        // // // // return those items that have isHighlight true otherwise do nothing

        // // console.log( allHighlights)


        return res.status(200).send({ status: true, totaldata: findAllProducts.length, allProductData: findAllProducts, allCategory: allCategoryOfProducts, searchByQuery: searchByQuery })

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: "Server Error" })
    }

}



async function getCategoryAndHighlight(req, res) {

    const findAllProducts = await productModel.find({ isDeleted: false }).select('-_id -updatedAt -createdAt -__v -description -type -review')


    // // // Create all category list here and send to frontEnd
    const allCategoryOfProducts = [...new Set(findAllProducts.map(ele => ele.category))]


    // // // Create all category list here and send to frontEnd
    const allBrandsOfProducts = [...new Set(findAllProducts.map(ele => ele.brand))]

    // const allHighlights = [...findAllProducts.slice(3,8)]   // // // Upadte this by highlighted true product.

    const allHighlights = [...findAllProducts.filter((item) => {
        if (item.isHighlight === true) { return item }
    })]   // // // now Upadte this by highlighted true product.   
    // // // return those items that have isHighlight true otherwise do nothing


    // console.log(findAllProducts.length)

    return res.status(200).send({ status: true, allCategory: allCategoryOfProducts, allBrands: allBrandsOfProducts, allHighlights: allHighlights, totalProducts: findAllProducts.length })

}



async function findOneProduct(req, res) {

    try {


        const productId = req.params.productId     // // // Product id should given by frontEnd (generated by UUID)

        // console.log(productId) 

        if (!productId) return res.status(400).send({ status: false, message: "Product id should given in path params." })

        // let product = await productModel.findOne({ id: productId , isDeleted : false }).select('-updatedAt -createdAt -__v').populate("review").select('-updatedAt -createdAt -__v -_id -userId -productID').lean()


        let product = await productModel
            .findOne({ id: productId, isDeleted: false })
            .select('-updatedAt -createdAt -__v -_id')
            .populate({
                path: "review",
                match: { isDeleted: false },
                select: "-updatedAt -createdAt -__v -_id -userId -productID -isDeleted",
                populate: {
                    path: 'userId',
                    select: "id firstName lastName profilePic -_id"
                }

            })
            .lean()



        if (!product) return res.status(404).send({ status: false, message: "Product not found by this id." })


        // // // Now using populate of populate (product to review and review to userData).
        // // // Now use userId that also contant some info about user (And this field will contain updated user data).
        // // // Change frontEnd acc. to show updated data.


        // console.log(product)


        // // // Latest review first ---------->
        if (product.review && product.review.length > 0) {
            product.review = product.review.reverse()
        }



        // console.log(product)



        // // // Now no need of this because successfully implemented ref and populate --------------->

        // // // // Here finding all reviews about this product
        // let findAllReview = await reviewModel.find({ productID: product._id }).sort({createdAt : "-1"}).select('-userId -productID -isDeleted -_id  -updatedAt -createdAt -__v')
        // // console.log(findAllReview )
        // // // //.lean() is used means we can modify the object.
        // product.review = findAllReview      // // // storing all revies inside review key of product object.



        // // // Show simmilar products ------------>
        let simmilarProducts = await productModel.find({ category: product.category, isDeleted: false }).select('-_id -updatedAt -createdAt -__v -description -type -review')

        // console.log(simmilarProducts)

        let simmilarProductExceptThis = simmilarProducts.filter(item => item.id !== product.id)

        // console.log(simmilarProductExceptThis)


        delete product._id      // // // Deleting _id of product because i don't want to show it on frontEnd.


        return res.status(200).send({ status: true, message: "Product with details fetched", data: product, simmilarProductExceptThis })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: "Server Error" })
    }
}



async function likeProduct(req, res) {

    try {

        let { productId, isLiking, userId } = req.body

        // console.log(req.body)

        // // Validatintion ---->



        if (!productId || !uuid.validate(productId)) {
            return res.status(400).send({ status: false, message: "Bad object id or Product objectId is not given." })
        }

        // let findProduct = await reviewModel.findOne({ id: reviewId })

        let findProduct = await productModel.findOne({ id: productId }).select('-updatedAt -createdAt -__v ')
            .populate({
                path: "review",
                match: { isDeleted: false },
                select: "-updatedAt -createdAt -__v  -userId -productID -isDeleted",
                populate: {
                    path: 'userId',
                    select: "id firstName lastName profilePic "
                }

            })

        if (!findProduct) {
            return res.status(404).send({ status: false, message: "No Product found with given object id." })
        }

        if (findProduct.isDeleted) {
            return res.status(404).send({ status: false, message: "Product is already deleted." })
        }


        // // // InCreaseing ----->

        if (isLiking) {
            findProduct.likes = findProduct.likes + 1

            if (findProduct.dislikedUserIds.includes(userId)) {


                let index = findProduct.dislikedUserIds.findIndex((ids) => ids === userId)

                // console.log(index)

                findProduct.dislikedUserIds.splice(index, 1)

                findProduct.dislikes = findProduct.dislikes - 1


            }


            if (!findProduct.likedUserIds.includes(userId)) {
                findProduct.likedUserIds.push(userId)
            }



        } else {
            findProduct.likes = findProduct.likes - 1

            if (findProduct.likedUserIds.includes(userId)) {

                let index = findProduct.likedUserIds.findIndex((ids) => ids === userId)

                // console.log(index)

                findProduct.likedUserIds.splice(index, 1)
            }
        }



        await findProduct.save()

        res.status(200).send({ status: true, message: `${findProduct.title} Like Done✅`, data: findProduct })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: `Server Error (${err.message})` })
    }


}



async function dislikeProduct(req, res) {

    try {

        let { productId, isDisliking, userId } = req.body

        // console.log(req.body)

        // // Validatintion ---->

        if (!productId || !uuid.validate(productId)) {
            return res.status(400).send({ status: false, message: "Bad object id or Product objectId is not given." })
        }

        let findProduct = await productModel.findOne({ id: productId })
            .select('-updatedAt -createdAt -__v ')
            .populate({
                path: "review",
                match: { isDeleted: false },
                select: "-updatedAt -createdAt -__v  -userId -productID -isDeleted -_id",
                populate: {
                    path: 'userId',
                    select: "id firstName lastName profilePic -_id"
                }

            })

        if (!findProduct) {
            return res.status(404).send({ status: false, message: "No Review found with given object id." })
        }

        if (findProduct.isDeleted) {
            return res.status(404).send({ status: false, message: "Review is already deleted." })
        }


        // // // InCreaseing ----->

        if (isDisliking) {
            findProduct.dislikes = findProduct.dislikes + 1



            if (findProduct.likedUserIds.includes(userId)) {

                let index = findProduct.likedUserIds.findIndex((ids) => ids === userId)

                // console.log(index)

                findProduct.likedUserIds.splice(index, 1)

                findProduct.likes = findProduct.likes - 1
            }




            if (!findProduct.dislikedUserIds.includes(userId)) {

                findProduct.dislikedUserIds.push(userId)
            }





        } else {
            findProduct.dislikes = findProduct.dislikes - 1

            if (findProduct.dislikedUserIds.includes(userId)) {

                let index = findProduct.dislikedUserIds.findIndex((ids) => ids === userId)

                // console.log(index)

                findProduct.dislikedUserIds.splice(index, 1)
            }
        }



        await findProduct.save()

        res.status(200).send({ status: true, message: `${findProduct.title} Dislike Done✅`, data: findProduct })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: `Server Error (${err.message})` })
    }


}



async function searchProductByKeyowrd(req, res) {

    try {

        const { keyword } = req.query

        if (!keyword) return res.status(400).send({ status: false, message: "Search by keyword.See your backend code." })


        // let getProductFromDB = await productModel.find(filterPoducts)

        let getProductFromDB = await productModel.find({
            $or: [
                { title: { $regex: keyword, $options: 'i' } }, // case-insensitive
                { category: { $regex: keyword, $options: 'i' } },
                { brand: { $regex: keyword, $options: 'i' } },
            ],
        })


        if (getProductFromDB.length <= 0) return res.status(404).send({ status: false, message: `No data found with this keyword :(${keyword})` })

        // console.log(getProductFromDB)

        res.status(200).send({ status: true, totalData: getProductFromDB.length, data: getProductFromDB, message: `Data found successfull by this keyword : ${keyword}` })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: `Server Error (${err.message})` })
    }
}


module.exports = { createNewProduct, findAllProducts, getCategoryAndHighlight, findOneProduct, likeProduct, dislikeProduct, searchProductByKeyowrd }

