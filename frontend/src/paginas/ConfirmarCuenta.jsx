import { useEffect, useState } from "react"
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"

const ConfirmarCuenta = () => {

    const [alerta, setAlerta] = useState({})
    const [cuentaConfirmada, setCuentaConfirmada] = useState('false')

    const params = useParams();
    const { id } = params
    
    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/usuarios/confirmar/${id}`
                const {data} = await clienteAxios(url)  // es get por defecto

                setCuentaConfirmada(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true,
                })
                setCuentaConfirmada(false)
            }
        }
        confirmarCuenta();
    }, [])

    const { msg } = alerta

  return (
    <>
       <h1 className="text-sky-600 font-black text-6xl">Confirmar cuenta</h1> 
       {/* <form className="my-10 bg-white shadow rounded-lg p-10 ">
            <input 
                type="submit"
                value="Confirmar nueva cuenta"
                className="bg-sky-700 mb-5 w-full py-3 text-white text-xl font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
       </form> */}
       <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
            {msg && <Alerta alerta={alerta} />}
            {cuentaConfirmada && (
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="/"
                >
                    Iniciar sesión
                </Link>
            )}
       </div>
    </>
  )
}

export default ConfirmarCuenta