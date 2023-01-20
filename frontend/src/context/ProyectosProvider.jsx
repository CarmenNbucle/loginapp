import {useState, useEffect, createContext} from 'react'
import axios from 'axios';
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import csvtojson from "csvtojson"

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {

  const [proyectos, setProyectos] = useState([])
  const [alerta, setAlerta] = useState({})
  const [alertaSubida, setAlertaSubida] = useState({})
  const [proyecto, setProyecto] = useState({})
  const [datosProyecto, setDatosProyecto] = useState({})
  const [cargando, setCargando] = useState(false)
  const [modalFormularioLista, setModalFormularioLista] = useState(false)
  const [modalFormularioBorrar, setModalFormularioBorrar] = useState(false)
  const [modalFormularioBorrarFila, setModalFormularioBorrarFila] = useState(false)
  
  const [name, setName] = useState('')


  const navigate = useNavigate()
  const { auth } = useAuth()

  useEffect ( () => {
    const obtenerProyectos = async() =>{
      try{
        const token =  localStorage.getItem('token');
        if(!token) return
        const config = {
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
        const { data } = await clienteAxios('/proyectos', config)
        setProyectos(data)
      }catch (error) {
          console.log(error)
        }
      }
    obtenerProyectos()
  },[auth])
  
  const mostrarAlerta = alerta =>{
    setAlerta(alerta)
    setTimeout(() => {
      setAlerta({})
    }, 2000);
  }

  const mostrarAlertaSubida = alertaSubida =>{
    setAlertaSubida(alertaSubida)
    setTimeout(() => {
      setAlertaSubida({})
    }, 2000);
  }

  const submitProyecto = async(proyecto) => {
    if(proyecto.id){
      await editarProyecto(proyecto); 
    }else{
      await nuevoProyecto(proyecto);
    }
  }

  const editarProyecto = async proyecto => {
    try {
      const token =  localStorage.getItem('token');
      if(!token) return
      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)

      // Sincronizar el state
        const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ?  data : proyectoState)
        setProyectos(proyectosActualizados)
        
      // Mostrar alerta
        setAlerta({
          msg: "Proyecto creado correctamente",
          error: false
        })

      // Redireccionar
        setTimeout (() => {
          setAlerta({})
          navigate('/proyectos')
        }, 3000)


    } catch (error) {
      console.log(error)
    }
  }

  const nuevoProyecto = async proyecto => {
    try {
      const token =  localStorage.getItem('token');
      if(!token) return
      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post('/proyectos', proyecto, config)
      setProyectos([...proyectos, data])
      setAlerta({
        msg: "Proyecto creado correctamente",
        error: false
      })
      setTimeout (() => {
        setAlerta({})
        navigate('/proyectos')
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  const obtenerProyecto = async id =>{
    setCargando(true)
    try {
      const token =  localStorage.getItem('token');
      if(!token) return
      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios(`/proyectos/${id}`, config)
      // console.log('data es: ' + JSON.stringify(data))
      // const miproyectoactual = proyectos.filter(proyectoState => proyectoState._id == id)
      // const proyActual = miproyectoactual[0].nombre

      setProyecto(data.proyecto)
      setDatosProyecto(data.myProy)
      //setProyectos([...proyectos, data]) 
      //console.log('desde ek obtenerProyecto', data.proyecto.nombre)
      //return data.proyecto.nombre
    } catch (error) {
      console.log(error)
    }finally{
      setCargando(false)
    }
  }

  const porcentajeProyecto = async id =>{
    var cuentaReservados = 0;
    try {
      const token =  localStorage.getItem('token');
      if(!token) return
      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios(`/proyectos/${id}`, config)
      const total = Object.keys(data.myProy).length 
      Object.entries(data.myProy).forEach(([total, value]) => {
        if (value.reservado == 'true'){
            cuentaReservados = cuentaReservados + 1;
        }  
      });
      return {total, cuentaReservados};

    } catch (error) {
      console.log(error)
    }
  }


  const saberProyecto = async (id) =>{
    try {
      const token =  localStorage.getItem('token');
      if(!token) return
      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios(`/proyectos/${id}`, config)
      //console.log('me meto y saco: ', config)
      var nombre = data.proyecto.nombre
      return nombre;
    } catch (error) {
      console.log(error)
    }
  }

  const eliminarProyecto = async id => {
    try {
      const token =  localStorage.getItem('token');
      if(!token) return
      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)

      // Sincronizar el state
      const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
      setProyectos(proyectosActualizados)
    
      setAlerta({
        msg: data.msg,
        error: false
      })

      // Redireccionar
      setTimeout (() => {
        setAlerta({})
        navigate('/proyectos')
      }, 3000)


    } catch (error) {
      console.log(error)
    }
  }

  const eliminarFila = async id => {
    try {
      const token =  localStorage.getItem('token');
      if(!token) return
      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)

      // Sincronizar el state
      const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
      setProyectos(proyectosActualizados)
    
      setAlerta({
        msg: data.msg,
        error: false
      })

      // Redireccionar
      setTimeout (() => {
        setAlerta({})
        navigate('/proyectos')
      }, 3000)


    } catch (error) {
      console.log(error)
    }
  }

  const cerrarSesionProyectos = () => {
    setProyectos([])
    setProyecto({})
    setAlerta({})
  }

  const handleModalLista = () => {
    setModalFormularioLista(!modalFormularioLista)
  }

  const handleModalBorrar = () => {
    setModalFormularioBorrar(!modalFormularioBorrar)
  }

  const handleModalBorrarFila = () => {
    setModalFormularioBorrarFila(!modalFormularioBorrarFila)
  }

  const submitLista = async lista => {
    try {
      const token =  localStorage.getItem('token');
      if(!token) return

      
      //console.log('lista es: ' + JSON.stringify(lista))
      var cantidadDatos = lista.id.length - 1

      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      //const { data } = await clienteAxios(`/proyectos/${id}`, config)

      var idproy = ''
      var _id = ''
      var piso = ''
      var habitaciones = ''
      var tsuperficie = ''
      var precio = ''
      var reservado = ''
      var url = ''
      var plano = ''
      var status = ''
      var visitas = ''
      var proyecto = ''
      var guardaLista = []

      for (let i = 0; i<cantidadDatos; i++){
          _id = lista.id[i]
          piso = lista.piso[i]
          habitaciones = lista.habitaciones[i]
          tsuperficie = lista.tsuperficie[i]
          precio = lista.precio[i]
          reservado = lista.reservado[i]
          url = lista.url[i]
          plano = lista.plano[i]
          status = lista.status[i]
          visitas = lista.visitas[i]
          proyecto = lista.proyecto[i]

          idproy = proyecto

          guardaLista.push({_id, piso, habitaciones, tsuperficie, precio, reservado, url, plano, status, visitas, proyecto})

      }

      await clienteAxios.post('/lista', guardaLista, config).then( res => {

        if ( !res.data ){
          setAlerta({
            msg: "Ha habido un error, por favor revise el csv",
            error: true
          })

        }else{
          setAlerta({
            msg: "Se han subido correctamente los datos",
            error: false
          })
        }

      })
      
      console.log('el id que tengo es: ' + idproy)


      // Redireccionar
      setTimeout (() => {
        setAlerta({})
        navigate(`${import.meta.env.VITE_BACKEND_URL}/proyectos/${idproy}`, UserDetailPage)
      }, 6000)


    } catch (error) {
      console.log(error)
    }
  }

  const borrarLista = async idborrar => {
    try {
      const token =  localStorage.getItem('token');
      if(!token) return
      
      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      await clienteAxios.delete(`/lista/${idborrar}`, config).then( res => {
        // if ( !res.data ){
        //   setAlerta({
        //     msg: "Ha habido un error, no se han posido borrar los datos",
        //     error: true
        //   })

        // }else{
        //   setAlerta({
        //     msg: "Se han subido correctamente los datos",
        //     error: false
        //   })
        // }

      })

      // Redireccionar
      setTimeout (() => {
        setAlerta({})
        navigate(`${import.meta.env.VITE_BACKEND_URL}/proyectos/${idborrar}/`, UserDetailPage)
        //(`/proyectos/${idborrar}/`)
      }, 1000)

    }catch (error) {
      console.log(error)
    }
  }    

  const borrarFila = async idborrar => {
    try {
      const token =  localStorage.getItem('token');
      if(!token) return
      
      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      // await clienteAxios.delete(`/lista/${idborrar}`, config).then( res => {
      //   // if ( !res.data ){
      //   //   setAlerta({
      //   //     msg: "Ha habido un error, no se han posido borrar los datos",
      //   //     error: true
      //   //   })

      //   // }else{
      //   //   setAlerta({
      //   //     msg: "Se han subido correctamente los datos",
      //   //     error: false
      //   //   })
      //   // }

      // })
      console.log('Borrando la fila')
      // Redireccionar
      setTimeout (() => {
        setAlerta({})
        navigate(`${import.meta.env.VITE_BACKEND_URL}/proyectos/${idborrar}/`, UserDetailPage)
        //(`/proyectos/${idborrar}/`)
      }, 1000)

    }catch (error) {
      console.log(error)
    }
  }    

  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        mostrarAlerta,
        alerta,
        alertaSubida,
        submitProyecto,
        obtenerProyecto,
        proyecto, 
        cargando,
        eliminarProyecto,
        cerrarSesionProyectos,
        modalFormularioLista,
        handleModalLista,
        modalFormularioBorrar,
        handleModalBorrar,
        modalFormularioBorrarFila,
        handleModalBorrarFila,
        submitLista,
        datosProyecto,
        borrarLista,
        borrarFila,
        porcentajeProyecto,
        saberProyecto
      }}
    >
      {children}
    </ProyectosContext.Provider>
  )
}

export {ProyectosProvider}
export default ProyectosContext;
