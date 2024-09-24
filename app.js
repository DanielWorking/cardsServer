const express = require("express");
const PORT = process.env.PORT || 8181;
const connectToDb = require("./DB/dbService");
const router = require("./router/router");
const corsMiddleware = require("./middlewares/cors");
const loggerMiddleware = require("./logger/loggerService");
const app = express();

//* defining the cors as middleware for the server (by default - give access to all sites to refer to the server)
app.use(corsMiddleware);
//* to make the sever accept data in json format
app.use(express.json());

//* using the morgan logger function:
app.use(loggerMiddleware());

app.use(express.static("./public"));

app.get("/", (request, response) => {
    const myPassword = process.env.myPassword;
    response.response.send(myPassword);
});

//* using the router controllers of cards and users
app.use(router);

//? a special middleware for dealling with errors (without try-catch) for all the rest of possible errors of the middlewares
// must specify all 4 arguments even if not using all of them
app.use((error, request, response, next) => {
    return handleError(response, 500, error.message || "Internal Server Error");
});

app.listen(PORT, () => {
    console.log("listening to port" + PORT);
    connectToDb();
});
