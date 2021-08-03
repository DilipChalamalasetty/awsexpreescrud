const express=require("express")
const app = express();
const server=require('http').createServer(app)

//importing middlewares
const errorHandler=require('./src/middlewares/errorHandler');

//importing all the routes
const userRoutes=require('./src/routes/user');

//adding middlewares to app
app.use(express.json());
app.use(express.urlencoded());
app.get('/apis',(req,res)=>{
    res.send("Api's are Live")
})
app.use('/apis/user/',userRoutes);
app.use(errorHandler)
//starting the server
server.listen(3000,()=>{
    console.log("Server listening on port 3000");
})
 
server.once("listening",()=>{
    console.log("Running code to create the tables if not existed")
    //creating all the required tables
    const createTables=require('./src/aws/dynamoDb/createTables');
})

