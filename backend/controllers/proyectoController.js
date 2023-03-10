import mongoose from "mongoose";
import Proyecto from "../models/Proyecto.js";
import Lista from "../models/Lista.js";
import fetch from "node-fetch";
import conectarDB from "../config/db.js";




const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find().where('creador').equals(req.usuario).select('-listas')
    res.json(proyectos);
}

const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id
    try {
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const obtenerProyecto = async (req, res) => {
    const { id } = req.params;
    const valid = mongoose.Types.ObjectId.isValid(id)

    if(!valid){
        const error = new Error('Token no válido');
        return res.status(404).json({ msg: error.message })
    }

    const proyecto = await Proyecto.findById(id)
    
    if(!proyecto){
        const error = new Error('El proyecto no existe');
        return res.status(404).json({ msg: error.message })
    }
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no válida');
        return res.status(401).json({ msg: error.message })
    }
 
        // return miProyecto
        var elnombre = proyecto.nombre
        var envio = { elnombre }
        const myProy = await conectarDB(envio)
        
        res.json({ 
            proyecto, 
            myProy })
    
}


const editarProyecto = async (req, res) => {
    const { id } = req.params;
    const valid = mongoose.Types.ObjectId.isValid(id)

    if(!valid){
        const error = new Error('Token no válido');
        return res.status(404).json({ msg: error.message })
    }

    const proyecto = await Proyecto.findById(id);

    if(!proyecto){
        const error = new Error('El proyecto no existe');
        return res.status(404).json({ msg: error.message })
    }
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no válida');
        return res.status(401).json({ msg: error.message })
    }

   proyecto.nombre = req.body.nombre || proyecto.nombre;
   proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
   proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
   proyecto.cliente = req.body.cliente || proyecto.cliente;

   try {
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado)
   } catch (error) {
        console.log(error)
   }
}

const eliminarProyecto = async (req, res) => {
    const { id } = req.params;
    const valid = mongoose.Types.ObjectId.isValid(id)

    if(!valid){
        const error = new Error('Token no válido');
        return res.status(404).json({ msg: error.message })
    }

    const proyecto = await Proyecto.findById(id);

    if(!proyecto){
        const error = new Error('El proyecto no existe');
        return res.status(404).json({ msg: error.message })
    }
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no válida');
        return res.status(401).json({ msg: error.message })
    }

    try {
        await proyecto.deleteOne();
        res.json({ msg: "Proyecto Eliminado" })
    } catch (error) {
        console.log(error)
    }
}

const agregarColaborador = async (req, res) => {
    //const
}

const eliminarColaborador = async (req, res) => {
    
}

// const obtenerTareas = async (req, res) => {
//     const { id } = req.params;
//     const valid = mongoose.Types.ObjectId.isValid(id)

//     if(!valid){
//         const error = new Error('Token no válido');
//         return res.status(404).json({ msg: error.message })
//     }

//     const proyecto = await Proyecto.findById(id);

//     if(!proyecto){
//         const error = new Error('El proyecto no existe');
//         return res.status(404).json({ msg: error.message })
//     }
//     if(proyecto.creador.toString() !== req.usuario._id.toString()){
//         const error = new Error('Acción no válida');
//         return res.status(401).json({ msg: error.message })
//     }

//     const tareas = await Tarea.find().where("proyecto").equals(id); 
//     res.json(tareas)

//    try {
//         const proyectoAlmacenado = await proyecto.save();
//         res.json(proyectoAlmacenado)
//    } catch (error) {
//         console.log(error)
//    }


// }

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
//  obtenerTareas,
}