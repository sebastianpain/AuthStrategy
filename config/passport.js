const passport = require('passport')
const LocalStrategy = require('passport-local')
const { createHash,isValidPassword } = require('../utils/bcrypts')
const users = require('../user')


const initializePassport = () => {


    passport.use('register', new LocalStrategy({ 
            passReqToCallback: true,
            usernameField: 'email'
        },
        async (req, username, password, done) => {
                try {
                    let newUser = req.body

                    let user = users.find(us => {
                        return us.email == dataUser.email
                    })
                    if (user) {
                        console.log('user alredy')
                       done(null, false)
                    }

                    newUser.id = Math.random()
                    newUser.password = createHash(newUser.password)
                    users.push(newUser)
                    done(null, newUser)
                } catch (err) {
                    done(null, false)
                }
            },
            passport.serializeUser((user, done) => {
                done(null, user.id)
            }),
            passport.deserializeUser((id, done) => {
                let user = users.find(us => {
                    return us.id == id
                })
                done(null, user)
            })
    ))

}

module.exports = initializePassport