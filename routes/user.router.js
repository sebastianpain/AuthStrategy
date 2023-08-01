const express = require ('express')
const { Router } =  express
const { createHash, isValidPassword } = require('../utils/bcrypts')
const passport = require('passport')
const users = require('../user')


const router = new Router()



router.get('/all',(req,res)=>{
    res.send(users)
})

// router.post('/register', (req,res)=>{
//     let newUser = req.body
//     newUser.id = Math.random()
// newUser.password = createHash(newUser.password)
//     users.push(newUser)
//     res.send('usuario registrado')

// })
 router.post('/register', passport.authenticate('register',{failureRedirect:'/user/failedregister'}), (req,res)=>{
     res.send('Usuario Registrado')

 })
router.get('/failedregister',(req,res)=>{
    res.send('<h1>registro fallido</h1>')
})
router.post('/login', (req,res)=>{
    let dataUser = req.body
    let user = users.find(us=>{
        return us.email == dataUser.email
    })
    if(!user) res.send('User not found')
    if (!isValidPassword(user,dataUser.password))if(!user) res.send('User invalid ')
    res.send('User loged')
})
module.exports= router