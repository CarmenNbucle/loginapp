import { useState, useEffect } from 'react' 
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useProyectos from '../hooks/useProyectos'

const PreviewProyecto = ({proyecto}) => {
    const {porcentajeProyecto} = useProyectos();
    const {nombre, _id, cliente} = proyecto;

    var [datos, setDatos] = useState([])
    var total = 0;
    var porreservados = 0;
    var cuentaReservados = 0;
    var vendidos = '';

    useEffect( () => {  
        setDatos({})
        //obtenerProyecto(_id)
        async function anyNameFunction() {
            const res = await porcentajeProyecto(_id)
            //console.log('res: ' + JSON.stringify(res) )
            var mitotal = res.total
            var micuentaReservados = res.cuentaReservados
            //console.log('mitotal: ', res.total, ' y cuenta reservados: ', res.cuentaReservados)
            setDatos({mitotal, micuentaReservados})
        }
        anyNameFunction();
        //miPorcentaje(mipro)
    }, [])

    
    return ( 
     <>
        
        <Link
            to={`${_id}`}
        >
            {/* <div className="bg-[url('../src/assets/fondo.jpg')] bg-cover w-80 h-40 mb-10">  
            <div className={`bg-[url('../src/assets/${nombre}.jpg')] bg-cover w-80 h-40 mb-10`}> */}

            <div style={{backgroundImage:`url('../src/assets/${nombre}.jpg')`}} className={`bg-[url('../src/assets/${nombre}.jpg')] bg-cover w-96 h-60 mb-4 mx-2`}> 

                <div className='flex h-full items-end pb-3'>
                    <p className='uppercase px-3 text-white w-full text-lg'>{nombre}</p>
                    <div className='text-right px-3'>
                        {/* <label for="file">{datos.reservados}/{datos.total} vendidos</label>
                        <progress id="file" value={datos.porreservados} max="100"> {datos.porreservados}% </progress> */}
                        <label className='text-white' for="file">{datos.mitotal === 0 ? 'No hay datos' : datos.micuentaReservados+'/'+datos.mitotal+ ' vendidos'}</label>
                        {datos.mitotal === 0 ? '' :
                        <progress className='h-2 border-white' id="file" value={`${datos.micuentaReservados}`} max="100"> { Math.trunc(datos.micuentaReservados* 100 /datos.mitotal)}% </progress>
                        }
                        
                    </div>
                </div>
            </div>
        </Link>



        {/*<div className="border-b p-5 flex">
            <p className="flex-1">
                {nombre}
                <span className="text-sm text-gray-500 uppercase">
                    {''} {cliente}
                </span> 
            </p>
            <Link
                to={`${_id}`}
                className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
            >ver proyecto</Link>
        </div>*/}




    </>                

    )
}

export default PreviewProyecto
