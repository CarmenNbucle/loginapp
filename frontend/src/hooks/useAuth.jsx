import { useContext } from "react";
import AuthContext, { AuthProvider } from "../context/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth;