const express = require('express')
const connection = require("./db")
const userRouter = require('./routers/user')
const productRouter =require('./routers/product')
const cartRouter = require('./routers/cart')



const port = 5000;

const app = express()
connection();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/user',userRouter)
app.use('/products',productRouter)
app.use('/cart',cartRouter)
app.get("/",(req,res)=>{
    console.log(`Connected`)
})

app.listen(port, () => {
    console.log(`server listening on Port http://localhost:5000`)
})