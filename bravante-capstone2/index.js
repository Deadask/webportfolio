const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./Routes/userRoute');

const app = express();


//db connection
mongoose.connect("mongodb+srv://errellebravante:admin123@wdc028-course-booking.hfleqla.mongodb.net/eCommerceAPI", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

//dicplay succesful connection to db
mongoose.connection.once("open", () => console.log("Connected to MongoDB"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Defines the "/users" string to be included for all user routes defined in the "user" route file
// http://localhost:4000/users
app.use("/users", userRoute);


app.listen(process.env.PORT || 4001, () => console.log(`Connected to port ${process.env.PORT || 4001}`));

