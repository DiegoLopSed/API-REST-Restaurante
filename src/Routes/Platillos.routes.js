import { getPlatillos,getPlatillo,savePlatillo,deletePlatillo,updatePlatillo } from "../Controller/Platillos.controller.js";
import { Router } from "express";
import { subirImage } from "../Middleware/Storage.js";
import { verificar } from "../Middleware/Auth.js";
const router = Router();

// Rutas públicas (no requieren autenticación)
router.get('/platillos', getPlatillos);
router.get('/platillo/:id', getPlatillo);

// Rutas protegidas (requieren token de autenticación)
router.post('/platillos', verificar, subirImage.single('imagen'), savePlatillo);
router.delete('/platillo/:id', verificar, deletePlatillo);
router.put('/platillo/:id', verificar, subirImage.single('imagen'), updatePlatillo);

export default router;