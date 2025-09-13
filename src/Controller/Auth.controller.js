import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { connection } from "../db.js";
import { JWT_SECRET, JWT_EXPIRES } from "../config.js";

// Función de validación
const validar = (name, email, password) => {
    if (!name || name.trim() === '') {
        return 'El nombre es requerido';
    }
    if (!email || email.trim() === '') {
        return 'El correo es requerido';
    }
    if (!password || password.trim() === '') {
        return 'La contraseña es requerida';
    }
    if (password.length < 6) {
        return 'La contraseña debe tener al menos 6 caracteres';
    }
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'El formato del correo no es válido';
    }
    return '';
};

// Función para crear usuario
const crearUsuario = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Validar datos de entrada
        var validacion = validar(name, email, password);
        
        if (validacion == '') {
            // Verificar si el usuario ya existe
            const [existingUser] = await connection.execute(
                'SELECT id FROM usuarios WHERE email = ?', 
                [email]
            );
            
            if (existingUser.length > 0) {
                return res.status(400).json({
                    status: false, 
                    message: 'El usuario ya existe con este correo'
                });
            }
            
            // Hashear la contraseña
            let pass = await bcryptjs.hash(password, 8);
            
            // Crear nuevo usuario en MySQL
            const [result] = await connection.execute(
                'INSERT INTO usuarios (name, email, password) VALUES (?, ?, ?)',
                [name, email, pass]
            );
            
            return res.status(200).json({
                status: true, 
                message: 'Usuario creado',
                userId: result.insertId
            });
        } else {
            return res.status(400).json({
                status: false, 
                message: validacion
            });
        }
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return res.status(500).json({
            status: false, 
            message: error.message
        });
    }
};

// Función para login
const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: 'Correo y contraseña son requeridos'
            });
        }
        
        // Buscar usuario por correo
        const [users] = await connection.execute(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );
        
        if (users.length === 0) {
            return res.status(401).json({
                status: false,
                message: 'Credenciales inválidas'
            });
        }
        
        const user = users[0];
        
        // Verificar contraseña
        const isValidPassword = await bcryptjs.compare(password, user.password);
        
        if (!isValidPassword) {
            return res.status(401).json({
                status: false,
                message: 'Credenciales inválidas'
            });
        }
        
        // Generar JWT
        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email 
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES }
        );
        
        return res.status(200).json({
            status: true,
            message: 'Login exitoso',
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
        
    } catch (error) {
        console.error('Error en login:', error);
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Función para obtener perfil
const obtenerPerfil = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const [users] = await connection.execute(
            'SELECT id, name, email FROM usuarios WHERE id = ?',
            [userId]
        );
        
        if (users.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'Usuario no encontrado'
            });
        }
        
        const user = users[0];
        
        return res.status(200).json({
            status: true,
            user: user
        });
        
    } catch (error) {
        console.error('Error al obtener perfil:', error);
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

export { crearUsuario, loginUsuario, obtenerPerfil };
