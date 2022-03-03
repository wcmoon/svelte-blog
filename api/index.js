const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/post')
const postsRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')

dotenv.config();
app.use(express.json())

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

mongoose
  .connect(process.env.MONGO_URL, {
  }, (err) => {
    console.log(err);
  })

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api/posts', postsRoute);
app.use('/api/category', categoryRoute);

app.listen('5100', () => {
  console.log('blog api is running on http://localhost:5100')
})
