const express=require('express')
const mongoose=require('mongoose')
const connectionURL = 'mongodb://127.0.0.1:27017/ecommerce_db'
// const path=require('path')
const router = require('./routes/productRoutes');
const chatbotRouter = require('./routes/chatbot');
// const publicDirectoryPath = path.join(__dirname, '../frontend/build')
const cors=require('cors')

const app=express()
app.use(express.json())
app.use(cors());
// app.use(cors({
//     origin: "http://localhost:3000", // Allow frontend
//     credentials: true // If you plan to send cookies/auth headers
//   }));
app.use(router);
app.use(chatbotRouter);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(publicDirectoryPath, 'index.html'));
// });



mongoose.connect(connectionURL).then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000,()=>{
        console.log("server is up on port: 5000")
    });
  }).catch((error) => console.error('Error connecting to MongoDB:', error));

  
  


  
 

