import { getPlatillos,getPlatillo,savePlatillo,deletePlatillo,updatePlatillo } from "../Controller/Platillos.controller.js";
import { Router } from "express";
const router = Router();

router.get('/platillos', getPlatillos);
router.get('/platillo/:id', getPlatillo);
router.post('/platillos', savePlatillo);
router.delete('/platillo/:id', deletePlatillo);
router.put('/platillo/:id', updatePlatillo);

export default router;