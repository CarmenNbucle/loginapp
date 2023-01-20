import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'


const ModalFormularioLista = () => {
  const [idpisoi, setIdPiso] = useState([])
  const [habitacionesi, setHabitaciones] = useState([])
  const [pisoi, setPiso] = useState([])
  const [planoi, setPlano] = useState([])
  const [precioi, setPrecio] = useState([])
  const [proyecto, setProyecto] = useState([])
  const [reservadoi, setReservado] = useState([])
  const [statusi, setStatus] = useState([])
  const [superficiei, setSuperficie] = useState([])
  const [urli, setUrl] = useState([])
  const [visitasi, setVisitas] = useState([])
  
  const [archivo, setArchivo] = useState()

  const fileReader = new FileReader();
  const [array, setArray] = useState([]);
  const [data, setData] = useState({});

  const params = useParams()

  const {modalFormularioLista, handleModalLista, mostrarAlerta, alerta, alertaSubida, submitLista} = useProyectos();

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",")
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    setArray(array);
    guardarCSV(array)
  };


  
  const handleSubmit = e =>{
    e.preventDefault();
    //if([piso, habitaciones, superficie, precio, reservado, url, plano, status].includes('')){
    if([archivo].includes('')){
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios', 
        error: true
      })
      return
    }else{
      fileReader.onload = function (event) {
      const text = event.target.result;
      csvFileToArray(text);
      };
      fileReader.readAsText(archivo);
    }
  }

  
  const headerKeys = Object.keys(Object.assign({}, ...array));

  const guardarCSV = async(listaDatos, hacer) => {

    var id = []
    var habitaciones = []
    var piso = []
    var plano = []
    var precio = []
    var reservado = []
    var status = []
    var tsuperficie = []
    var url = []
    var visitas = []


    listaDatos.map((value) => {

      var rtrim = /['"]+/g;

      id.push(value['"_id\"'])
      habitaciones.push(value['"habitaciones\"'])
      piso.push(value['"piso\"']?.replace(/['"]+/g, ''))
      plano.push(value['"plano\"']?.replace(/['"]+/g, ''))
      proyecto.push(params.id)
      precio.push(value['"precio\"'])
      reservado.push(value['"reservado\"']?.replace(/['"]+/g, ''))
      status.push(value['"status\"']?.replace(/['"]+/g, ''))
      tsuperficie.push(value['"tsuperficie\"']?.replace(/['"]+/g, ''))
      url.push(value['"url\"'])
      visitas.push(value['"visitas\"\r'])

      
      setIdPiso(id)
      setHabitaciones(habitaciones)
      setPiso(piso)  //current  => [...current, value['"piso\"']]
      setPlano(plano)
      setPrecio(precio)
      //setProyecto(value['"proyecto\"'])
      setReservado(reservado)
      setStatus(status)
      setSuperficie(tsuperficie)
      setUrl(url)
      setVisitas(visitas)

    })
      await submitLista({id, habitaciones, piso, plano, precio, proyecto, reservado, status, tsuperficie, url, visitas})
      //console.log('-------------enviando: ' + id )
  }
  
  
  const {msg} = alerta
  const {msgSubida} = alertaSubida

    return (
        <Transition.Root show={ modalFormularioLista } as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={ handleModalLista }>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={ handleModalLista }
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        Añadir nueva lista
                                    </Dialog.Title>

                                    {msg && <Alerta alerta={alerta} />}

                                    <form 
                                    className='my-10'
                                    onSubmit={handleSubmit}
                                    data-netlify="true"
                                    encType="multipart/form-data"
                                    >
                                    <div className='mb-5'>
                                        <input
                                          id={"csvFileInput"} 
                                          type={"file"}
                                          name="archivosubido"
                                          className='flex items-center text-sm py-3 w-full md:w-auto text-black text-center mt-5 justify-center cursor-pointer'
                                          accept={".csv"}
                                          onChange={ e => setArchivo(e.target.files[0])}
                                        />
                                    </div>
                                      
                                      <input
                                        type="submit"
                                        className="flex items-center text-sm px-5 py-3 w-full md:w-auto uppercase font-bold bg-black text-white text-center mt-5 justify-center cursor-pointer"
                                        value="Añadir a la lista"
                                      /> 

                                   {msgSubida && <AlertaAgregar alerta={alertaSubida} />} 

                                    

                                    </form>
                                    

                                    {/*{msgSubida && 
                                      <>
                                     <div className={`${alertaSubida.error ? 'from-red-400 to-red-600 ' : 'from-green-400 to-green-600' } bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10`}>
                                      {alertaSubida.msgSubida}
                                     </div>
                                         <div className='flex'>
                                            <button
                                                onClick={archivo => handleSubmit(archivo, 'agregar')}
                                                className="flex items-center text-sm px-5 py-3 w-full md:w-auto uppercase font-bold bg-black text-white text-center mr-5 justify-center cursor-pointer"
                                                >Agregar</button>
                                            <button
                                                onClick={archivo => handleSubmit(archivo, 'reemplazar')}
                                                className="flex items-center text-sm px-5 py-3 w-full md:w-auto uppercase font-bold bg-black text-white text-center justify-center cursor-pointer"
                                                >Reemplazar</button>
                                        </div> 
                                      </>
                                    }*/}


                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalFormularioLista