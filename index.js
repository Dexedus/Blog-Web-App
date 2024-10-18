
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
  });