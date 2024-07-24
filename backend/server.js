import express from 'express'
import dotenv from  'dotenv';
import bodyParser from 'body-parser'
import ProductRoutes from './routes/productsRoutes.js'
import connectToMongoDB from './DATABASE/connectToMongoDB.js';
import cors from 'cors';

dotenv.config();

const app = express();

//middleware 
app.use(bodyParser.json());
app.use(cors()); 

//routes
app.use('/api', ProductRoutes);

//port
const PORT = process.env.PORT || 4000;

app.get( "/", ( req, res ) => {
    res.send("Hello World !!");
});


app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
})

