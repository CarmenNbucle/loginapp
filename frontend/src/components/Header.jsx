import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import useAuth from "../hooks/useAuth"
//import Busqueda from "./Busqueda"
import { useParams} from "react-router-dom"

const Header = () => {

  const { cerrarSesionProyectos, saberProyecto } = useProyectos();
  const { auth, cerrarSesionAuth } = useAuth()

  const [ proyImg, setProyImg ] = useState('')
  const params = useParams()

  // useEffect( () => {  
  //   //setDatos({})
  //   //obtenerProyecto(_id)
  //   proyImg = ''
  //   async function anyNameFunction() {
  //     console.log('paso 1: ', params.id)
  //     if(params.id){
  //       obtenerProyecto(params.id)
  //       const {nombre} = proyecto
  //       console.log('y el nombre es: ', nombre)
  //       proyImg = nombre
  //       return proyImg
  //     }
  //   }
  //   anyNameFunction();
  //   //miPorcentaje(mipro)
  // }, [])


  // useEffect( () => {  
  //   setProyImg('')
  //   //obtenerProyecto(_id)
  //   async function knowProject() {
  //     if(params){
  //       await obtenerProyecto(params.id)
  //       console.log('LA RESPUESTA: ', params.id)
  //       const {nombre} = proyecto
  //       setProyImg(nombre)
  //     }else{
  //       setProyImg()
  //     }
  //   }
  //   knowProject();
  //   //miPorcentaje(mipro)
  // }, [])


  const handleCerrarSesion = () => {
    cerrarSesionAuth()
    cerrarSesionProyectos()
    localStorage.removeItem('token')
  }

  const knowProject = async(parametros) => {
    console.log('My parametros: ', parametros)
    var res = await saberProyecto(parametros)
    //var res = 'Proyecto1'
    console.log('res es: ', res)
    // const {nombre} = proyecto
    // console.log('LA RESPUESTA: ', nombre)
    setProyImg(res)
  }

  return (
    <>
    {/* {params.id? knowProject(params.id) : ''}  */}
    {/* {knowProject(params.id)} */}
    <header style={{backgroundImage:`url('../src/assets/${proyImg}.jpg')`}} className="px-4 py-3 bg-gray-900 w-full" >
      
      <div className='md:flex md:justify-between'>
            {/* <h2 className='text-4xl text-white text-left'>Nbucle</h2> */}
            {/* <input 
                type="search" 
                placeholder='Buscar Proyecto'
                className='rounded-lg lg:w-96 block p-2 border'           
            /> */}
            {/* {img ? <img src={`/src/assets/${proyImg}.jpg`} /> : ""} */}
            <div className="flex items-center gap-4 justify-end w-full">
                {/* <Link
                    to="/proyectos"
                    className="font-bold uppercase"
                >Proyectos</Link> */}
                <button
                    type="button"
                    className="text-black text-xs bg-gray-100 p-2 rounded-md uppercase font-bold flex"
                    onClick={handleCerrarSesion}
                >
                    Cerrar sesión
                </button>
            </div>
      </div>
    </header>
    </>
  )
}

export default Header
