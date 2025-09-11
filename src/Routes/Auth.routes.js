import {Router} from 'express';
import {crearUsuario, loginUsuario, obtenerPerfil} from '../Controller/Auth.controller.js';

const rutas = Router();

// Ruta para crear usuario (registro)
rutas.post('/api/usuarios', crearUsuario);

// Ruta para login
rutas.post('/api/login', loginUsuario);

// Ruta para obtener perfil (requiere autenticación)
rutas.get('/api/perfil', obtenerPerfil);

export default rutas;
