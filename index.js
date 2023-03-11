const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')

let app = express()

app.use(express.json())
app.use(cors())

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sokolovilya235@gmail.com',
        pass: 'tfqvvahwrptigkej'
    }
})

app.post('/', (request, response) => {
    if (request.body.goods !== undefined) {
        const mailOptions = {
            from: 'sokolovilya235@gmail.com',
            to: 'hlaoruweb@gmail.com',
            subject: `Customer ${request.body.fullname} bought ${request.body.goods.join(', ')}`,
            text: `Customer ${request.body.fullname} bought ${request.body.goods.join(', ')}. Customer's email: ${request.body.email}. Customer's phone number: ${request.body.phonenumber}. Customer's adress: ${request.body.adress}. Customer's payment form: ${request.body.paymentform}. Total price: ${request.body.totalprice} ₴`
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error)
            } else {
                console.log('Email sent: ' + info.response)
            }
        })
    }
    
    response.status(200).json({
        message: 'Data recieved',
        data: request.body
    })
})

app.listen(3000, () => console.log('server working on 3000'))
