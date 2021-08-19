const cors = require('cors')
const compression = require('compression')
const express = require('express')
const methodOverride = require('method-override')
const { appTime, globalError } = require('./middlewares/middleware')
require('dotenv').config()



const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(methodOverride('_method'))

app.use(cors())
app.use(express.static(`${__dirname}/public`))
app.set('view engine', 'ejs')

// Customs Middleware
app.use(appTime)
app.use(compression())

app.use('/', require('./routes/hngRoutes'))
app.use('/', require('./routes/nodemailer'))


app.get('*', (req, res) => {
  res.status(200).render('404', {
    title: '404 Page',
    time: req.time,
    isAuthenticated: false
  })
})

app.use(globalError)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})
