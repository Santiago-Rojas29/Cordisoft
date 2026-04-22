import { toast } from "sonner";
import axiosClient from "../../Api/axiosClient";
import { useState } from "react";

import { ForgotPassword } from "../molecules/forgotPassword";
import { InputField } from "../molecules/inputField";
import { LoginButtonSeccion } from "../molecules/loginButtonSeccion";


export const LoginForm=({onLoginSuccess})=>{
    const [correo_electronico,setCorreoElectronico]=useState("")
    const [contraseña,setContraseña]=useState("")
    const[error,setError]=useState("")
    const[success,setSuccess]=useState("")

    const handleSubmit= async(e)=>{
        e.preventDefault()
        setError("")
        setSuccess("")

        try{
            const respuesta= await axiosClient.post("/login/validar",{correo_electronico,contraseña})
            setSuccess("Inicio de sesion Exitoso")
            toast.success("Inicio de sesion Exitoso")
            onLoginSuccess(respuesta.data)


        }catch(err){
            const msg= err.response?.data?.msg||"Error en el login"
            setError(msg)
            toast.error(msg)

        }
    }
    return(
        <form onSubmit={handleSubmit}>
            <InputField
            type="email"
            value={correo_electronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            placeholder="Correo"

            />

            <InputField
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            placeholder="Contraseña"
            error={error}
            />
            <ForgotPassword />
            <LoginButtonSeccion success={success} />
        </form>
    )

    

}