require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My ROUTES
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripePayment");
const paypalRoutes = require("./routes/paypalPayment");
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then((val) => {
        console.log("DB connected successfully");
    })
    .catch((err) => console.log(err));

//MiddleWares
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json());
app.use(express.json());

app.use(cookieParser());
app.use(cors());

//Routes:

app.use("/api/v1", authRoutes);

app.use("/api/v1", userRoutes);

app.use("/api/v1", categoryRoutes);

app.use("/api/v1", productRoutes);

app.use("/api/v1", orderRoutes);
app.use("/api/v1", stripeRoutes);
app.use("/api/v1", paypalRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`App is running at port ${port}`);
});
