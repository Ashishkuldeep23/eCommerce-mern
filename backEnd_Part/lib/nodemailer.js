const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport({

  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASS
  }

})




// const mailOptions = {
//     from: process.env.USER_EMAIL,
//     to: email,
//     subject: `${realOTP} sended using nodemailer.`,
//     text: `OTP from Ashish's website is :- ${storedOTP[now]} .`
// }



const sendMailWithNodemailerFormate = (to, subjcet, text) => {

  return {
    from: process.env.ADMIN_EMAIL,
    to: to,
    subject: `${subjcet} | Sending from AmmaKart Ecommerce Web App by Ashish Kuldeep.`,
    text: `${text}`,
    html: `${text}`,

  }

}



// // // // Html formate for orders ----->

function makeHtmlForOrders(order, unSubribeUrl) {
  let makeHtmlWithText = `
    <!DOCTYPE html>
<html>
<head>

<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<title>Email Receipt</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style type="text/css">
/**
* Google webfonts. Recommended to include the .woff version for cross-client compatibility.
*/
@media screen {
@font-face {
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 400;
  src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
}

@font-face {
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 700;
  src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
}
}

/**
* Avoid browser level font resizing.
* 1. Windows Mobile
* 2. iOS / OSX
*/
body,
table,
td,
a {
-ms-text-size-adjust: 100%; /* 1 */
-webkit-text-size-adjust: 100%; /* 2 */
}

/**
* Remove extra space added to tables and cells in Outlook.
*/
table,
td {
mso-table-rspace: 0pt;
mso-table-lspace: 0pt;
}

/**
* Better fluid images in Internet Explorer.
*/
img {
-ms-interpolation-mode: bicubic;
}

/**
* Remove blue links for iOS devices.
*/
a[x-apple-data-detectors] {
font-family: inherit !important;
font-size: inherit !important;
font-weight: inherit !important;
line-height: inherit !important;
color: inherit !important;
text-decoration: none !important;
}

/**
* Fix centering issues in Android 4.4.
*/
div[style*="margin: 16px 0;"] {
margin: 0 !important;
}

body {
width: 100% !important;
height: 100% !important;
padding: 0 !important;
margin: 0 !important;
}

/**
* Collapse table borders to avoid space between cells.
*/
table {
border-collapse: collapse !important;
}

a {
color: #1a82e2;
}

img {
height: auto;
line-height: 100%;
text-decoration: none;
border: 0;
outline: none;
}
</style>

</head>
<body style="background-color: #D2C7BA;">

<!-- start preheader -->
<div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
</div>
<!-- end preheader -->

<!-- start body -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">

<!-- start logo -->
<tr>
  <td align="center" bgcolor="#D2C7BA">
    <!--[if (gte mso 9)|(IE)]>
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
    <tr>
    <td align="center" valign="top" width="600">
    <![endif]-->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
      <tr>
        <td align="center" valign="top" style="padding: 36px 24px;">
          <a href='${process.env.FRONTEND_URL}' target="_blank" style="display: inline-block;">
            <img src='${process.env.COMPANY_LOGO}' alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
          </a>
        </td>
      </tr>
    </table>
    <!--[if (gte mso 9)|(IE)]>
    </td>
    </tr>
    </table>
    <![endif]-->
  </td>
</tr>
<!-- end logo -->

<!-- start hero -->
<tr>
  <td align="center" bgcolor="#D2C7BA">
    <!--[if (gte mso 9)|(IE)]>
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
    <tr>
    <td align="center" valign="top" width="600">
    <![endif]-->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
      <tr>
        <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
          <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Thank you for your order!</h1>
        </td>
      </tr>
    </table>
    <!--[if (gte mso 9)|(IE)]>
    </td>
    </tr>
    </table>
    <![endif]-->
  </td>
</tr>
<!-- end hero -->

<!-- start copy block -->
<tr>
  <td align="center" bgcolor="#D2C7BA">
    <!--[if (gte mso 9)|(IE)]>
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
    <tr>
    <td align="center" valign="top" width="600">
    <![endif]-->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

      <!-- start copy -->
      <tr>
        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
          <p style="margin: 0;">Here is a summary of your recent order. If you have any questions or concerns about your order, please <a href='${process.env.FRONTEND_URL}' target="_blank">contact us</a>.</p>
        </td>
      </tr>
      <!-- end copy -->

      <!-- start receipt table -->
      <tr>
        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td align="left" width="60%" style="padding: 12px; border-bottom: 2px dashed #D2C7BA; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"><strong>Orders #</strong></td>
            </tr>
            ${order.cartData.map(item => `<tr>
              <td align="left" width="60%" style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">${item.title}</td>
              <td align="left" width="20%" style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">${item.quantity}</td>


              ${item.discountPercentage
      ?
      //  <p className={`text-lg text-end font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> <span className=' text-sm font-thin line-through'>₹{item.price}</span> ₹{(Math.round(item.price - ((item.discountPercentage * item.price) / 100)))}</p>
      `<td align="left" width="20%" style="padding: 6px 12px;font-family: "Source Sans Pro", Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"> ${item.quantity > 1 ? `${item.quantity} X ₹${(Math.round(item.verity.typePrice - ((item.discountPercentage * item.verity.typePrice) / 100)))} =` : ''} ₹${(Math.round(item.verity.typePrice - ((item.discountPercentage * item.verity.typePrice) / 100))) * item.quantity}</td>`
      :
      //  <p className={`text-lg text-end font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> ₹{item.price} </p>
      `<td align="left" width="20%" style="padding: 6px 12px;font-family: "Source Sans Pro", Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">₹${item.verity.typePrice}</td>`
    }
            </tr>`)

    }
           
           
            <tr>
              <td align="left" width="60%" style="padding: 12px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-top: 2px dashed #D2C7BA; border-bottom: 2px dashed #D2C7BA;"><strong>Total</strong></td>
              <td align="left" width="20%" style="padding: 12px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-top: 2px dashed #D2C7BA; border-bottom: 2px dashed #D2C7BA;"><strong>${order.totalItems}</strong></td>
              <td align="left" width="20%" style="padding: 12px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-top: 2px dashed #D2C7BA; border-bottom: 2px dashed #D2C7BA;"><strong>${order.totalPrice}</strong></td>
            </tr>
          </table>
        </td>
      </tr>
      <!-- end reeipt table -->

    </table>
    <!--[if (gte mso 9)|(IE)]>
    </td>
    </tr>
    </table>
    <![endif]-->
  </td>
</tr>
<!-- end copy block -->

<!-- start receipt address block -->
<tr>
  <td align="center" bgcolor="#D2C7BA" valign="top" width="100%">
    <!--[if (gte mso 9)|(IE)]>
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
    <tr>
    <td align="center" valign="top" width="600">
    <![endif]-->
    <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
      <tr>
        <td align="center" valign="top" style="font-size: 0; border-bottom: 3px solid #d4dadf">
          <!--[if (gte mso 9)|(IE)]>
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
          <tr>
          <td align="left" valign="top" width="300">
          <![endif]-->
          <div style="display: inline-block; width: 100%; max-width: 50%; min-width: 240px; vertical-align: top;">
            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 300px;">
              <tr>
                <td align="left" valign="top" style="padding-bottom: 36px; padding-left: 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <p><strong>Delivery Address</strong></p>
                  <p>${order.fullName}<br>${order.address.street}<br>${order.address.city},${order.address.country},${order.address.pincode}</p>
                  <p>${order.phone}, ${order.paymentMethod}</p>

                  <a href='${process.env.FRONTEND_URL}/orders' target="_blank" style="display: inline-block; border:1px solid green; border-radius: 5px;padding:0px 3px;">See order details</a>

                  </td>
              </tr>
            </table>
          </div>
          <!--[if (gte mso 9)|(IE)]>
          </td>
          <td align="left" valign="top" width="300">
          <![endif]-->
        
          <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
        </td>
      </tr>
    </table>
    <!--[if (gte mso 9)|(IE)]>
    </td>
    </tr>
    </table>
    <![endif]-->
  </td>
</tr>
<!-- end receipt address block -->

<!-- start footer -->
<tr>
  <td align="center" bgcolor="#D2C7BA" style="padding: 24px;">
    <!--[if (gte mso 9)|(IE)]>
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
    <tr>
    <td align="center" valign="top" width="600">
    <![endif]-->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

      <!-- start permission -->
      <tr>
        <td align="center" bgcolor="#D2C7BA" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
          <p style="margin: 0;">You received this email because we received a request for [type_of_action] for your account. If you didn't request [type_of_action] you can safely delete this email.</p>
        </td>
      </tr>
      <!-- end permission -->

      <!-- start unsubscribe -->
      <tr>
        <td align="center" bgcolor="#D2C7BA" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
          <p style="margin: 0;">To stop receiving these emails, you can unsubscribe at any time.</p>
          <p style="margin: 0;">Paste 1234 S. Broadway St. City, State 12345</p>
        </td>
      </tr>
      <!-- end unsubscribe -->

    </table>
    <!--[if (gte mso 9)|(IE)]>
    </td>
    </tr>
    </table>
    <![endif]-->
  </td>
</tr>
<!-- end footer -->

</table>
<!-- end body -->

</body>
</html>
    `


  return makeHtmlWithText

}


function makeHtmlMailForVerifyEmail(url) {
  let makedHtmltemplate = `
  <!DOCTYPE html>
  <html>
  
      <head>
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <title>Email Verification</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style type="text/css">
              table {
                  font-family: arial, sans-serif;
                  border-collapse: collapse;
                  
              }
  
              td {
                  border-bottom-style: solid;
                  border-color: #dddddd;
                  border-bottom-width: 1px;
                  text-align: left;
                  padding-top: 14px;
                  padding-right: 14px;
                  display: flex ;
                  justify-content: center;
                  align-items: center;
                  
              }
  
              th {
                  padding: 8px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
              }
  
              .image {
                  width: 293px;
                  height: 80px;
                  background-image: url(data:image/png;base64);
                  background-size: contain;
                  margin: 0 auto;
              }
  
              .topper {
                  background-color: #003d8f;
                  width: 100%;
                  height: 80px;
                  color: white;
                  font-family: sans-serif;
                  text-align: center;
              }
  
              .topper h1 {
                  padding-top: 20px;
              }
  
              .content {
                  margin: 0 auto;
                  width: fit-content;
              }
  
              .footer p {
                  width: fit-content;
                  margin-left: auto;
                  margin-right: auto;
                  color: gray;
                  font-size: small;
              }
  
              p {
                  text-align: center;
                  font-size: 1.3rem;
              }
  
              a {
                  font-size: 3rem;
                  border-radius: 5vh;
                  padding: 5px 15px;
                  font-weight: bolder;
                  background-color: green;
                  color: white;
                  text-align: center;
                  text-decoration: none;
              }
          </style>
      </head>
  
      <body>
          <div class="topper">
              <h1>Singup Successfull</h1>
          </div>
          <br />
          <div class="content">
              <div class="image"></div>
              <br />
              <br />
              <br />
              <table>
                  <tr>
                      <td> <a href="${url}">Verify Mail</a> </td>
                  </tr>
                  <tr>
                      <td>OR</td>
                  </tr>
                  <tr>
                      <td><b>URL : ${url}</b></td>
                  </tr>
              </table>
              <br />
              <br />
          </div>
          <br />
          <br />
          <br />
          <hr / style="border-top: 1px solid #e2e1e1; border-left: 0px">
      </body>
  
  </html>
  `

  return makedHtmltemplate
}



module.exports = { transport, sendMailWithNodemailerFormate, makeHtmlForOrders, makeHtmlMailForVerifyEmail }