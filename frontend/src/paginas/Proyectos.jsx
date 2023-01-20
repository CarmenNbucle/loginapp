import useProyectos from "../hooks/useProyectos"
import PreviewProyecto from "../components/PreviewProyecto";
import useAuth from "../hooks/useAuth"


const Proyectos = () => {

  const {proyectos} = useProyectos();

  const {auth} = useAuth()


  return (
    <>
      <h1 className='mt-5 text-4xl text-white'> Bienvenido, <br/> {auth.nombre}</h1>
      <div className="flex flex-wrap align-middle justify-between shadow mt-10 rounded-lg mb-10 ">
        {proyectos.length ? 
          
          proyectos.map(proyecto => (
            <PreviewProyecto 
              key={proyecto._id}
              proyecto={proyecto} 
            />
          ))  
        : <p className="mt-5 mb-5 text-center text-white uppercase p-5">No hay proyectos aún</p>
        }
      </div>
    </>
  )
}

export default Proyectos