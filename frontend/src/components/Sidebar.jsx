import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Sidebar = () => {

  const {auth} = useAuth()

  return (
    <aside className="md:w-70 lg:w-80 px-5 py-5 bg-gray-900"> {/*80 -> 96*/}
        {/* <p className="text-xl font-bold">Hola {auth.nombre}!</p> */}
      <div className="p-4 bg-gray-800 h-full">
        <div className="flex gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-11 h-11 p-2 text-gray-200 mt-2 text-left text-lg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>  
          <Link
              to="/proyectos"
              className=" p-2 text-gray-200 block mt-2 text-left text-lg"
          >Dashboard</Link>
        </div>
        <div className="flex gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-11 h-11 p-2 text-gray-200 mt-2 text-left text-lg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
          </svg>

          <Link
              to="crear-proyecto"
              className=" p-2 text-gray-200 block mt-2 text-left text-lg"
          >Nuevo proyecto
          </Link>
        </div>
        <div className="flex gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-11 h-11 p-2 text-gray-200 mt-2 text-left text-lg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <Link
              className=' p-2 text-gray-200 block mt-2 text-left text-lg'
              to="../registrar"
          >Registrar</Link>
        </div>

        <p className='w-full flex h-5/6 items-end justify-center'>
          <a href="https://www.nbucle.com/es/">
              <img className='h-9' src="../src/assets/powered_nbucle.png" alt="Nbucle Creative Communication" />
          </a>
        </p>
      </div>
    </aside>
  )
}

export default Sidebar