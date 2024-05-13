import express from "express";
import dontenv from "dotenv";

dontenv.config();

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}  `);
});
