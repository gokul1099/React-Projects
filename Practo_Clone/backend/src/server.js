const express = require("express");
const dotenv = require('dotenv')
const cors = require("cors");
const userRouter = require("./routers/login");
const listUsers = require("./routers/user");
const appoinment = require("./routers/appoinment");
const Prescription = require("./routers/prescription");
const Rating = require("./routers/rating");
const MedicalRecord = require("./routers/medicalrecord");
const UpdateProfile = require("./routers/updateprofile");
const errorHandler = require('./middleware/error')
const fileupload = require('express-fileupload')
const path = require('path');


const app = express();

//Load env vars
dotenv.config({path: 'src/config/config.env'})
app.use(fileupload())

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')))




app.use(userRouter);
app.use(listUsers);
app.use(appoinment);
app.use(Prescription);
app.use(Rating);
app.use(MedicalRecord);
app.use(UpdateProfile);

app.use(errorHandler)

const port = process.env.PORT || 5000;




const __dirName = path.resolve()
app.use(express.static(path.join(__dirName, "/frontend/build")))


app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirName, "frontend", "build", "index.html"));
});
app.listen(port, () => {
  console.log(`server is running in ${process.env.NODE_ENV} mode in port ${process.env.port}`);
});
