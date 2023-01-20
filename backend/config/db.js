import mongoose from "mongoose";
import Lista from "../models/Lista.js";

const conectarDB = async (envio) => {  
    mongoose.pluralize(null);
    try {
        if(envio){
            //  console.log('tipo: ' + envio["tipo"])
            //  console.log('nombre: ' + envio["nombre"])
            //  console.log('bbdd: ' + envio["elnombre"])
            //  console.log('con minuscula: ' + envio["elnombre"])

            if(envio["tipo"] === 'crear'){
                const connection = await mongoose.connect(process.env.MONGO_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
                const url =`${connection.connection.host}:${connection.connection.host}`;

                const connectionExiste = await mongoose.connection.db.collection(envio["nombre"]).findOne({})
             
                    // if (connectionExiste != null){
                    //     //console.log('El result vale: ' + result)
                    //     return "false";
                    // }else{
                        try {
                            //const listaAlmacenada = await mongoose.connection.db.createCollection(envio["nombre"])
                            const listaSchema = mongoose.Schema({
                                _id: {
                                    type: Number, trim: true, required: true,
                                },piso: {
                                    type: String, trim: true, required: true,
                                },habitaciones: {
                                    type: Number, trim: true, required: true,
                                },tsuperficie: {
                                    type: String, default: false,
                                },precio: {
                                    type: String, required: true,
                                },reservado: {
                                    type: String, required: true,
                                },url: {
                                    type: String, required: true,
                                },plano: {
                                    type: String, required: true,
                                },status: {
                                    type: String, required: true,
                                },visitas: {
                                    type: Number, default: 0, required: true,
                                },proyecto: {
                                    //llamamos al Schema de proyecto en models > Proyecto.js
                                    type: mongoose.Schema.Types.ObjectId, ref: "Proyecto",
                                },
                            }, { timestamps: true })
                            
                            //const Lista = mongoose.model(envio["nombre"], listaSchema);
                            const Lista = await mongoose.model(envio["nombre"], listaSchema);
                            //https://stackoverflow.com/questions/66217124/mongoose-nextjs-overwritemodelerror-cannot-overwrite-note-model-once-compiled 

                            if (connectionExiste != null){
                                // La lista (collection) ya está creada
                                await Lista.insertMany(envio["result"], function(err) {  
                                //mongoose.models.insertMany(envio["result"], function(err) {     
                                    console.log(err) 
                                });
                                
                                return "true";
                            }else{
                                // Se ha creado la lista (collection) nueva 
                                await Lista.insertMany(envio["result"], function(err) {
                                    console.log(err)
                                });

                                return "true";
                            }
                            
                        } catch (error) {
                            console.log(error)
                        }
                    //}
            }else if(envio["tipo"] === 'borrar'){
                const connection = await mongoose.connect(process.env.MONGO_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
                const url =`${connection.connection.host}:${connection.connection.host}`;

                const connectionExiste = await mongoose.connection.db.collection(envio["nombre"]).findOne({})

                console.log('existe conexion: ' + JSON.stringify(connectionExiste) )

                if (connectionExiste != null){
                    mongoose.connection.db.collection(envio["nombre"]).drop()
                    return true
                }else{
                    return false
                }


            }else if(envio["elnombre"]){
                    const connection = await mongoose.connect(process.env.MONGO_URI, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    });
            
                    const url =`${connection.connection.host}:${connection.connection.host}`;
                    try {
                        let todo_tasks = [];
                        todo_tasks = await mongoose.connection.db.collection(envio["elnombre"]).find({status: "Activo"}).toArray();
                        //console.log('task: ' + JSON.stringify(todo_tasks))
                        return todo_tasks;
                    } catch (error) {
                        console.log(error)
                    }
                    mongoose.connection.close();
            }
        }else{
                const connection = await mongoose.connect(process.env.MONGO_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
        
                const url =`${connection.connection.host}:${connection.connection.host}`;
           
        }
       
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }


}

export default conectarDB;