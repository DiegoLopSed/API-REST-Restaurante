import express from "express";
import morgan from "morgan";
import cors from "cors";
import apiPlatillos from "./Routes/Platillos.routes.js";
import authRoutes from "./Routes/Auth.routes.js";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Servir archivos estáticos del dashboard
app.use(express.static('public'));

// Rutas de la aplicación
app.use('/', apiPlatillos);
app.use('/', authRoutes);
app.use((req,res,next)=>{
    res.status(404).json({"message":"No encontrado"});
});

/*
app.get('/',(req,res)=>{
    res.send('Hello World!')
})
*/
export default app; 
