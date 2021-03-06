require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3002;
const routes = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(PORT, function () {
    console.log(`Now running on PORT ${PORT}`);
});

// module.exports = app;
