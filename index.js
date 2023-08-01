const express = require ('express')
const userRouter = require('./routes/user.router')
const passport = require ('passport')
const initializePassport = require('./config/passport')
const session = require ('express-session')


const app = express()
app.use(express.json())

app.use(session({
    // store: MongoStore.create({
    //     mongoUrl:'mongodb+srv://sebastianramirezpain:peperoni12345@cluster0.x6tvpmi.mongodb.net/',
    // }),
    secret:'secretCoder',
    resave:true,
    saveUninitialized:true
}))



app.use(passport.initialize())
app.use(passport.session())
initializePassport()
app.use('/user', userRouter)


app.listen(8080,()=>{
    console.log('Server is running on port 8080');
})