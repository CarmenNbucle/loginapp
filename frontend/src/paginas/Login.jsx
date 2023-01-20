import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const {setAuth} = useAuth();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) =>{
        e.preventDefault();

        if([email, password].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            }); 
            return
        }

        try {
            const {data} = await clienteAxios.post('usuarios/login', {email, password});
            setAlerta({})
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/proyectos')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const {msg} = alerta

  return (
    <>
       <h1 className="text-white font-normal text-4xl text-center">Iniciar sesión</h1> 
       <form 
            className="my-8 bg-trasnparent shadow rounded-lg p-8 "
            onSubmit={handleSubmit}
        >

            {msg && <Alerta alerta={alerta} />}

            <div className="my-5 ">
                <input
                    id="email"
                    type="email"
                    placeholder="Usuario"
                    className="w-full mt-3 p-3 text-center placeholder-white border-white border-2 bg-white/[0.2]"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className="my-5 ">
                <input
                    id="password"
                    type="password"
                    placeholder="Contraseña"
                    className="w-full mt-3 p-3 text-center placeholder-white  border-white border-2 bg-white/[0.2]"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            {/* <nav className="lg:flex lg:justify-between">
                 <Link
                    className='block text-center my-5 trxt-slate uppercase text-sm'
                    to="registrar"
                >¿No tienes cuenta? Regístrate</Link> */}

                <Link
                    className='block text-center my-5 text-2sm text-white trxt-slate text-sm'
                    to="olvide-password"
                >¿Has olvidado la contraseña?</Link>
            {/* </nav> */}
            <div className='w-full flex mt-20 justify-center'>
                <input 
                    type="submit"
                    value="Adelante"
                    className="bg-transparent w-auto mx-10 py-1 px-4 text-white text-xl font-bold border-white border-2 hover:cursor-pointer hover:bg-gray-900 hover:text-gray-200 transition-colors"
                />
            </div>
       </form>

       <p className='w-full flex mt-20 justify-center'>
        <a href="https://www.nbucle.com/es/">
            <img className='h-9' src="../src/assets/powered_nbucle.png" alt="Nbucle Creative Communication" />
        </a>
       </p>
       
    </>
  )
}

export default Login