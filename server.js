import express from 'express';
import dotenv from "dotenv";
import Router from "./routes/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// ---- default api endpoint --------------------------------
app.get("/", (req, res) => {
    res.json({succcess: true, message: "Welcome to the Pisma and PostgreSQL server"});
})

// --- any other non-existent API endpoint when hit -----
// app.get("*", (req, res) => {
//     res.json({succcess: false, message: "Invalid API endpoint"})
// })

// ---- *Routes files ------------
app.use(Router);


app.listen(PORT, () => {
    console.log("app listening on port: ", PORT);
})