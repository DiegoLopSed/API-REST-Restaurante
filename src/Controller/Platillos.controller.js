import { connection } from '../db.js'

export const getPlatillos = async (req, res) => {

    try {
        const consulta = "SELECT id, nombre, precio, imagen FROM platillos"
        const [rows] = await connection.query(consulta);
        console.log('Platillos obtenidos:', rows.length, 'elementos');
        console.log('Primer platillo:', rows[0]);
        return res.json(rows)

    }
    catch (error) {
        console.error('Error obteniendo platillos:', error);
        return res.status(500).json({ message: error })
    }
}

export const getPlatillo = async (req, res) => {
    try {
        const { id } = req.params;
        const consulta = "SELECT id, nombre, precio, imagen FROM platillos WHERE id = ?";
        const [rows] = await connection.query(consulta, [id]);
        return res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export const savePlatillo = async (req, res) => {
    try {
        const { nombre, descripcion, precio } = req.body;
        
        // Obtener el nombre del archivo de imagen subido
        const imagen = req.file ? `/img/${req.file.filename}` : null;
        
        const consulta = "INSERT INTO platillos (nombre, precio, imagen) VALUES (?, ?, ?)";
        await connection.query(consulta, [nombre, precio, imagen]);
        
        return res.status(201).json({ 
            message: 'Platillo Guardado',
            platillo: { nombre, precio, imagen }
        });
    } catch (error) {
        console.error('Error al guardar platillo:', error);
        return res.status(500).json({ message: error.message });
    }
}


export const deletePlatillo = async (req, res) => {
    try {
        const { id } = req.params;
        const consulta = "DELETE FROM platillos WHERE id = ?";
        const [result] = await connection.query(consulta, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Platillo no encontrado' });
        }

        return res.status(200).json({ message: 'Platillo eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export const updatePlatillo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, imagen } = req.body;
        
            let consulta = "UPDATE platillos SET nombre = ?, precio = ?, imagen = ?";
        let params = [nombre, precio, imagen];
        
        // Si se subió una nueva imagen, incluirla en la actualización
        if (req.file) {
            consulta += ", imagen = ?";
            params.push(`/img/${req.file.filename}`);
        }
        
        consulta += " WHERE id = ?";
        params.push(id);

        const [result] = await connection.query(consulta, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Platillo no encontrado' });
        }

        return res.status(200).json({ message: 'Platillo actualizado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}