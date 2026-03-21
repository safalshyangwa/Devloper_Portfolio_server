import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";


const app = express();

import {errorHandler} from './middlewares/error.middleware.js'
import authroutes from './routers/Auth.route.js'
import projectroutes from './routers/Project.route.js'
import contactroutes from './routers/contact.route.js'
import acheivementroutes from './routers/acheivment.route.js'
import blogRoutes from './routers/blog.route.js';


// Middleware
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors({
  origin: ["http://localhost:3000", 'http://localhost:3002'],
 // Methods should be in uppercase
  credentials: true
}));

// Serve uploads folder
app.use("/uploads", express.static("public/uploads"));

app.use('/api/auth',authroutes)
app.use('/api/project',projectroutes)
app.use('/api/achievement',acheivementroutes)
app.use('/api/blogs', blogRoutes);
app.use('/api/contact',contactroutes)



// Global Error Handler
app.use(errorHandler);


export default app
