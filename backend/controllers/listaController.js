import Proyecto from "../models/Proyecto.js";
import Lista from "../models/Lista.js";
import conectarDB from "../config/db.js";



const agregarLista = async (req, res) => {
    //console.log('Estamos en agregarLista')
    const { proyecto } = req.body[0];
    const existeProyecto = await Proyecto.findById(proyecto);
    const {nombre} = existeProyecto

    if(!existeProyecto){
        const error = new Error('El proyecto no existe');
        return res.status(404).json({ msg: error.message })
    }

    if(existeProyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('No tienes permiso para agregar listas');
        return res.status(404).json({ msg: error.message })
    } 

    var result = req.body
    var tipo = 'crear'
    var envio = {tipo, nombre, result}
    

    try {
        const agregaProy = await conectarDB(envio)
        if (agregaProy === "true"){
            console.log('PROYECTO SUBIDO')
            res.json(true)
        }else{
            console.log('EL PROYECTO NO SE HA PODIDO SUBIR')
            res.json(false)
        }
    } catch (error) {
        console.log(error)
    }
};

const obtenerLista = async (req, res) => {
    
    const { proyecto } = req.params;
    try {
        const lista = await Lista.findById(proyecto).populate("proyecto");
        if(!lista){
            const error = new Error('La Lista no existe');
            return res.status(404).json({ msg: error.message });
        }
        if (lista.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Acción no válida');
            return res.status(403).json({ msg: error.message });
        } 
        res.json(lista);
    } catch (error) {
        const errore = new Error('La Lista no se encuentra');
        return res.status(404).json({ msg: errore.message });
    } 
};

const actualizarLista = async (req, res) => {

    const { id } = req.proyecto;
    try {
        const lista = await Lista.findById(id).populate("proyecto");
        if(!lista){
            const error = new Error('La Lista no existe');
            return res.status(404).json({ msg: error.message });
        }
        if (lista.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Acción no válida');
            return res.status(403).json({ msg: error.message });
        } 
        lista.id = req.body.id || lista.id;
        lista.piso = req.body.piso || lista.piso;
        lista.habitaciones = req.body.habitaciones || lista.habitaciones;
        lista.tsuperficie = req.body.tsuperficie || lista.tsuperficie;
        lista.precio = req.body.precio || lista.precio;
        lista.reservado = req.body.reservado || lista.reservado;
        lista.url = req.body.url || lista.url;
        lista.plano = req.body.plano || lista.plano;
        lista.status = req.body.status || lista.status;
        lista.visitas = req.body.visitas || lista.visitas;
        lista.proyecto = req.body.proyecto || lista.proyecto;

        try {
            const listaAlmacenada = await lista.save();
            res.json(listaAlmacenada)
        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        const errore = new Error('La lista no se encuentra');
        return res.status(404).json({ msg: errore.message });
    } 
};

const eliminiarLista = async (req, res) => {
    const { id } = req.params;
    try {
        const {nombre} = await Proyecto.findById(id);
        if(!nombre){
            const error = new Error('La Lista no existe');
            return res.status(404).json({ msg: error.message });
        }

        var result = id
        var tipo = 'borrar'
        var envio = {tipo, nombre, result}
        
        try {
            const borraProy = await conectarDB(envio)
            if (borraProy === true){
                console.log('PROYECTO BORRADO')
                res.json(true)
            }else{
                console.log('EL PROYECTO NO SE HA PODIDO BORRAR')
                res.json(false)
            }
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        const errore = new Error('La lista no se encuentra');
        return res.status(404).json({ msg: errore.message });
    } 
    
};

const eliminiarFila = async (req, res) => {
    const { id } = req.params;
    try {
        const {nombre} = await Proyecto.findById(id);
        if(!nombre){
            const error = new Error('La Lista no existe');
            return res.status(404).json({ msg: error.message });
        }

        var result = id
        var tipo = 'borrar'
        var envio = {tipo, nombre, result}
        
        try {
            const borraProy = await conectarDB(envio)
            if (borraProy === true){
                console.log('PROYECTO BORRADO')
                res.json(true)
            }else{
                console.log('EL PROYECTO NO SE HA PODIDO BORRAR')
                res.json(false)
            }
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        const errore = new Error('La lista no se encuentra');
        return res.status(404).json({ msg: errore.message });
    } 
    
};

const cambiarEstado = async (req, res) => {
    
};

export{
    agregarLista,
    obtenerLista,
    actualizarLista,
    eliminiarLista,
    cambiarEstado,
}