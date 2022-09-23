const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/Routes/contact.route");
const ApiError = require("./app/api-error");
const app = express();

app.use("/api/contacts", contactsRouter);
app.use(cors());
app.use(express.json());
app.use("/api/contacts ", contactsRouter);
app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

//handle 404 response
app.use((req, res, next) => {
    // code o day de chay khi khong co dinh nghia nao khop voi yeu cau. Goi next() de chuyen sang middleware xu li loi
    return next(new ApiError(404, "Resource not found"));
});

// define error handling middleware last, after other app.use() and route calls
app.use((err, req, res, next) => {
    // Middleware xu li loi tap trung. Trong cac doan code xu li loi o cac route, goi next(error) se chuyen ve middleware xu li loi nay
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error" ,
    });
});

module.exports = app;