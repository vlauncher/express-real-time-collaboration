import app from "./app";

// setup port
const port = process.env.PORT;

// server setup
app.listen(port,()=>{
    console.log(`Server running on port : ${port}`)
})