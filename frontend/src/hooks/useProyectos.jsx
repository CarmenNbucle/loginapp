import { useContext } from "react";
import ProyectosContext, { ProyectosProvider } from "../context/ProyectosProvider";

const useProyectos = () => {
    return useContext(ProyectosContext)
}

export default useProyectos;