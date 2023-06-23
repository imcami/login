import { Router } from 'express'
import { usersModel } from '../persistencia/models/users.models.js'

import { hashData, compareData } from '../utils.js'
import passport from 'passport'

const router = Router()


router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error)
      res.send(error)
    } else {
      res.redirect('/api/views')
    }
  })
})

// persistencia mongo

router.post('/signup', async (req, res) => {
  const { email, password } = req.body
  const user = await usersModel.findOne({ email })
  if (user) {
    return res.redirect('/api/views/errorSignup')
  }
  const hashPassword = await hashData(password)
  const newUser = { ...req.body, password: hashPassword }
  await usersModel.create(newUser)
  res.redirect('/api/views')
})

// login sin passport
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body
//   const user = await usersModel.findOne({ email })
//   if (!user) {
//     return res.redirect('/api/views/errorLogin')
//   }
//   const isPasswordValid = await compareData(password, user.password)
//   if (!isPasswordValid) {
//     return res.status(400).json({ message: 'Email or password not valid' })
//   }
//   req.session.user = user
//   //req.session.email = email
//   //req.session.password = password
//   res.redirect('/api/views/profile')
// })

//login con passport
router.post(
  '/login',
  passport.authenticate('login', {
    passReqToCallback: true,
    failureRedirect: '/api/views/errorLogin',
    successRedirect: '/api/views/profile',
    failureMessage: '',
  })
)

// github

router.get(
  '/githubSignup',
  passport.authenticate('githubSignup', { scope: ['user:email'] })
)

router.get('/github', 
  passport.authenticate('githubSignup', { failureRedirect: '/api/views' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/api/views/profile');
  });
export default router