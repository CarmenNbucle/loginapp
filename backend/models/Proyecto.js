import mongoose from "mongoose";

const proyectosSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        require: true,
    },
    descripcion: {
        type: String,
        trim: true,
        require: true,
    },
    fechaEntrega: {
        type: Date,
        default: Date.now(),
    },
    cliente: {
        type: String,
        trim: true,
        require: true,
    },
    // El creador es un usuario con más permisos
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
    },
    listas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lista",
        }
    ],
    colaboradores: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        },
    ],
}, {
    timestamps: true,
});

const Proyecto = mongoose.model("Proyecto", proyectosSchema)
export default Proyecto;