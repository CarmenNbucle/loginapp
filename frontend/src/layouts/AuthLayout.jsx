import { Outlet } from 'react-router-dom'


const AuthLayout = () => {
  return (
    <div className='bg-black h-screen bg-[url("./assets/fondo.jpg")]'>
        <main className='container h-full mx-auto mt-0 pt-30 md:flex md:justify-center md:items-center'> 
            <div className='md:w-2/3 lg:w-2/5'>
                <Outlet />
            </div>
        </main>
    </div>
  )
}

export default AuthLayout
