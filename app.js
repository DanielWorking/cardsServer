const express = require("express");
const PORT = process.env.PORT || 8181;
const connectToDb = require("./DB/dbService");
const router = require("./router/router");
const { handleError } = require("./utils/handleErrors");
const app = express();

//* defining the cors as middleware for the server (by default - give access to all sites to refer to the server)
app.use(corsMiddleware);

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

app.use((error, request, response, next) => {
    return handleError(response, 500, error.message || "Internal Server Error");
});

//* connecting to DB
app.listen(PORT, () => {
    console.log("listening to port" + PORT);
    connectToDb();
});
