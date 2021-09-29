const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');



//importng routes
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');

//app
const app = express();
//cors 
if (process.env.NODE_ENV === "development") {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
}
// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//route middleware
app.use("/api", blogRoutes)
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)



//db
mongoose.connect(process.env.MONGO_API, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))



//port
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})