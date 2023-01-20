import { useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import { useParams} from "react-router-dom"
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const RutaProtegida = () => {

    const {auth, cargando} = useAuth();
    if (cargando) return 'Cargando...'


  const { cerrarSesionProyectos, obtenerProyecto, proyecto } = useProyectos();
  const params = useParams()

    var img = ''

    //async function anyNameFunction() {
    // const anyNameFunction = () => {
    //     console.log('paso 1: ', params.id)
    //     // if(params.id){
    //     //   await obtenerProyecto(params.id)
    //     //   const {nombre} = proyecto
    //     //   console.log('y el nombre es: ', nombre)
    //     //   img = nombre
    //     //   return img
    //     // }
    // }
      
      //miPorcentaje(mipro)


  return (
    <>
        {/* <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'> 
            <div className='md:w-2/3 lg:w-2/5'>
                <Outlet />
            </div>
        </main> */}
        {auth._id ? (
          <div className='bg-gray-900'>
            <Header />
            {/* {anyNameFunction} */}
            <div className='md:flex md:min-h-screen'>
              <Sidebar />
              <main className='flex-auto mx-5 mb-5'>
                <Outlet className='flex-1 p-10' />
              </main>
            </div> 
          </div>
        ): <Navigate to="/" />}
    </>
  )
}

export default RutaProtegida