const ejs = require('ejs')
const bodyParser = require('body-parser')
const express = require('express')
const cookieParser = require('cookie-parser')
const POST = process.env.POST || 3000
const app= express()

app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))

app.use(cookieParser())

let shoes = 0
let bags = 0
let pants = 0
let tshirts = 0
let date = "" //for the date

app.get('/', (req, res)=>{
  shoes = req.cookies.shoes || 0
  bags = req.cookies.bags || 0
  pants = req.cookies.pants || 0
  tshirts = req.cookies.shirts || 0
  date = req.cookies.date || "" //for the date
  username = req.cookies.username // for the username

  return res.render('store', {shoes, bags, pants, tshirts, date, username})
})

app.post('/store', (req, res)=>{
  shoes = req.body.shoes
  bags = req.body.bags
  pants = req.body.pants
  tshirts = req.body.tshirts
  let d = new Date().toLocaleString()
  data = d
  res.cookies('shoes', shoes, {maxAge: 90000})
  res.cookies('bags', bags, {maxAge: 90000})
  res.cookies('pants', pants, {maxAge: 90000})
  res.cookies('tshirts', tshirts, {maxAge: 90000})

  res.redirect('/')
})


app.listen(POST, ()=>{
  console.log('Shop is going...')
})
