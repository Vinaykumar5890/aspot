const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admituser = require('./model')
const Contactuser = require('./model1')

const app = express()
app.use(express.json())

//CORS Used For Integration in Which different Domain Using Origin '*'

app.use(cors({origin: '*'}))

// Mongoose Connection
mongoose
  .connect(
    'mongodb+srv://vinay:vinay@cluster0.fv2hjsb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  )
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err))

//User Register Using Post Method : /register

app.post('/register', async (req, res) => {
  try {
    const {username, email, password} = req.body
    let exits = await Admituser.findOne({email})
    if (exits) {
      return res.status(400).send('User Already Exist')
    } else if (!email || !username || !password) {
      return res.status(400).send('All fields are required')
    }
    if (password.length > 6) {
      const hashedPassword = await bcrypt.hash(password, 10)

      let newUser = new Admituser({
        username,
        email,
        password: hashedPassword,
      })
      await newUser.save()
      res.status(200).send('Register Succesfully')
    } else {
      res.status(400).send('Password Too Short')
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal Server Error')
  }
})

//User Login Using Post Method : /Login

app.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body
    let exits = await Admituser.findOne({email})
    if (!exits) {
      return res.status(400).send("User Doesn't Exits")
    } else if (!email || !password) {
      return res.status(400).send('All fields are required')
    } else {
      const isPasswordMatched = await bcrypt.compare(password, exits.password)
      if (isPasswordMatched === true) {
        let payload = {
          user: {
            id: exits.id,
          },
        }
        jwt.sign(payload, 'jwt', (err, jwtToken) => {
          if (err) throw err
          return res.json({jwtToken})
        })
      } else {
        return res.status(400).send('Invalid Password')
      }
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Server Error')
  }
})

//User Change Password using Put Method  : /changePassword

app.put('/changePassword', async (req, res) => {
  try {
    const {email, oldPassword, newPassword} = req.body
    let exits = await Admituser.findOne({email})
    const isPasswordCorrect = await bcrypt.compare(oldPassword, exits.password)
    if (!exits) {
      return res.status(400).send("User Doesn't Exits")
    } else if (!email || !oldPassword || !newPassword) {
      return res.status(400).send('All fields are required')
    } else if (oldPassword === newPassword) {
      return res.status(400).send('Passwords are Same')
    } else if (!isPasswordCorrect) {
      return res.status(401).send('Old password is incorrect')
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10)

      // Update the user's password in the database

      const updated = await Admituser.updateOne(
        {email},
        {$set: {password: hashedPassword}},
      )
      return res.status(200).send('Password updated successfully')
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Server Error')
  }
})

// Contact Posting using Post Method : /contact

app.post('/contact', async (req, res) => {
  try {
    const {name, email, phone, address} = req.body
    let exits = await Contactuser.findOne({phone})
    if (exits) {
      return res.status(400).send('User is Already Created Contact')
    } else if (!email || !name || !phone || !address) {
      return res.status(400).send('All fields are required')
    } else {
      // New Contact is Posted

      let newUser = new Contactuser({
        name,
        email,
        phone,
        address,
      })
      await newUser.save()
      res.status(200).send('Contact Saved Succesfully')
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal Server Error')
  }
})

// Contact Updating using Put Method : /contact

app.put('/contact/:id', async (req, res) => {
  const {id} = req.params
  const {email, name, phone, address} = req.body
  const u = {email, name, phone, address}
  try {
    // Update the Contact  in the database

    const updated = await Contactuser.findByIdAndUpdate(
      id,
      u,
      {updatedAt: Date()},
      {new: true},
    )
    return res.status(200).send('Contact Updated Successfully')
  } catch (err) {
    console.log(err)
    res.status(500).send('Server Error')
  }
})

//Contact Deleting Using Delete Method : /contact

app.delete('/contact/:id', async (req, res) => {
  try {
    await Contactuser.findByIdAndDelete(req.params.id)
    return res.send('Contact Deleted Succesfully')
  } catch (err) {
    console.log(err)
  }
})

//Get Contact using Get Method :/ contact

app.get('/contact', async (req, res) => {
  const {search} = req.query
  let filter = {}

  if (search) {
    filter.name = {$regex: search, $options: 'i'}
  }

  try {
    const allData = await Contactuser.find(filter)
    return res.json(allData)
  } catch (err) {
    console.log(err)
  }
})

//Get Contact based on there id : /contact/:id

app.get('/contact/:id', async (req, res) => {
  const {id} = req.params
  try {
    const allData = await Contactuser.findById(id)
    return res.json(allData)
  } catch (err) {
    console.log(err)
  }
})

//Server Running https://localhost:3000/

app.listen(3000, () => {
  console.log('Server Running https://localhost:3000/')
})

module.exports = app
