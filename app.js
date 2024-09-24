const express = require("express");
const PORT = process.env.PORT || 8181;
const connectToDb = require("./DB/dbService");
const router = require("./router/router");
const app = express();

//* to make the sever accept data in json format
app.use(express.json());

//* defining the public as static
app.use(express.static("./public"));

//* the home page
app.get("/", (request, response) => {
    const myPassword = process.env.myPassword;
    response.response.send(myPassword);
});

//* using the router controllers of cards and users
app.use(router);

//* connecting to DB
app.listen(PORT, () => {
    console.log("listening to port" + PORT);
    connectToDb();
});
