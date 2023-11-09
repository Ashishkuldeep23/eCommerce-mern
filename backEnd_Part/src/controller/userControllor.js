const bcrypt = require("bcrypt")
const userModel = require("../model/userModel")


const cloudinary = require("cloudinary").v2

// cloudinary.config({
//     cloud_name: "dlvq8n2ca",
//     api_key: "867966181995229",
//     api_secret: "mDLwbTVA1oMMOVn6_rO5M2CevT0"
// });

cloudinary.config({
    cloud_name: `${process.env.CLOUD_NAME}`,
    api_key: `${process.env.API_KEY}`,
    api_secret: `${process.env.API_SECRET}`
});



//------------------------*** Improtant Regex ***----------------//
const validateName = (/^[a-zA-Z ]+([\s][a-zA-Z ]+)*$/);
const validateEmail = (/^([a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,6})*$/);
const validatePassword = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
// const validatePhone = (/^(\+\d{1,3}[- ]?)?\d{10}$/)
const pinCodeRegex = (/^\d{4}$|^\d{6}$/)



async function creteUserControllor(req, res) {

    try {




        // console.log(process.env.CLOUDINARY_CLOUD_NAME)
        // console.log(process.env.CLOUDINARY_API_KEY)
        // console.log(process.env.CLOUDINARY_API_SECRET)

        // console.log(req.body)




        // let body = JSON.parse(req.body)

        let { firstName, lastName, email, password, address  } = req.body


        if (Object.keys(req.body).length <= 0) return res.status(400).send({ status: false, message: "Body can't be empty." })

        if (!firstName || !lastName || !email || !password) return res.status(400).send({ status: false, message: "Imp field missing." })


        if(!validateName.test(firstName))   return res.status(400).send({ status: false, message: `${firstName} : This First Name is invalid` })

        if(!validateName.test(lastName))   return res.status(400).send({ status: false, message: `${lastName} : This Last Name is invalid` })


        if(!validateEmail.test(email)){
            return res.status(400).send({ status: false, message: `${email} : This email is invalid` })
        }

        if(!validatePassword.test(password)){
            return res.status(400).send({ status: false, message: `${password} : This password is invalid` })
        }



        if (address) {
            let { pincode,street,city, country } = address

            if (street && !validateName.test(street)) return res.status(400).send({ status: false, message: "Street name should be string only." });
            if (city && !validateName.test(city)) return res.status(400).send({ status: false, message: "City name should be string only." });
            if (country && !validateName.test(country)) return res.status(400).send({ status: false, message: "City name should be string only." });
            if (pincode && !pinCodeRegex.test(pincode)) return res.status(400).send({ status: false, message: "Given Pincode is invalid , ex-->123456 , in 4 to 6 digit" });
        }





                
        // // // // Upload File -------->

        const file = req.files;

        // console.log(file)


        let pathUrl = "https://res.cloudinary.com/dlvq8n2ca/image/upload/v1699431919/up6onv0gbmdjyt1rsiyz.jpg"

        if(req.files.length > 0){

            let filePathIs = req.files[0].path
            
            let result = await cloudinary.uploader.upload(filePathIs)

            console.log(result)
            pathUrl = result.url

        }





        let findByEmailForUnique = await userModel.findOne({ email: email })

        if (findByEmailForUnique) return res.status(400).send({ status: false, message: "Email is already present in Data-base" });


        // // // Set opt here ------->


        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(password, salt)



        const createNewUser = await userModel.create({ ...req.body, password: hashPassword , profilePic : pathUrl })



        let data = {
            userName : `${createNewUser.firstName} ${createNewUser.lastName}` ,
            id : createNewUser.id ,
            role : createNewUser.email ,
            profilePic : createNewUser.profilePic
        }



        res.status(201).send({ status: true, data: data, message: "New user created successful" })




    } catch (err) {

        console.log(err)
        res.status(500).send({ status: false, message: "Server Error" })

    }

}



module.exports = { creteUserControllor }
