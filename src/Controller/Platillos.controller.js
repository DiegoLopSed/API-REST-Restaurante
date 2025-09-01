import {connection} from '../db.js'

export const getPlatillos= async(req,res)=>{

    try {
        const consulta = "SELECT id,nombre, descripcion, precio FROM makis"
        const [rows] = await connection.query(consulta);
        return res.json(rows)

    } 
    catch (error) {
        return res.status(500).json({message:error})   
    }
} 

export const getPlatillo = async (req,res) =>{
    try {
        const {id} = req.params;
        const consulta = "SELECT nombre, descripcion, precio FROM makis WHERE id =" +id;
        const [rows] = await connection.query(consulta);
        return res.json(rows);
    } catch (error) {
        return res.status(500).json({message:error});
    }
}


export const savePlatillo = async (req,res) =>{
    try {
        const {nombre,descripcion,precio} = req.body;
        const consulta = "INSERT INTO makis (nombre, descripcion, precio) VALUES (?, ?, ?)";
        await connection.query(consulta,[nombre,descripcion,precio]);
        return res.status(201).json({message:'Platillo Guardado'});
    } catch (error) {
        return res.status(500).json({message:error});
    }
}

export const deletePlatillo = async (req,res) =>{
    try {
        const {id} = req.params;
        const consulta = "DELETE FROM makis WHERE id = ?";
        const [result] = await connection.query(consulta, [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'Platillo no encontrado'});
        }
        
        return res.status(200).json({message: 'Platillo eliminado correctamente'});
    } catch (error) {
        return res.status(500).json({message: error});
    }
}

export const updatePlatillo = async (req,res) =>{
    try {
        const {id} = req.params;
        const {nombre, descripcion, precio} = req.body;
        
        const consulta = "UPDATE makis SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?";
        const [result] = await connection.query(consulta, [nombre, descripcion, precio, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'Platillo no encontrado'});
        }
        
        return res.status(200).json({message: 'Platillo actualizado correctamente'});
    } catch (error) {
        return res.status(500).json({message: error});
    }
}