import express from 'express';
import { Request, Response} from 'express';

import cors from 'cors';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';
import { errorMiddleware } from './middleware/errorMiddleware';


const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req:Request,res:Response)=>{
    res.send("Welcome to server")
})
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);
// Error middleware must be last
app.use(errorMiddleware);
export default app;