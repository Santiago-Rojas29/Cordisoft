import { Input } from "../atoms/input";
import { MessageError } from "../atoms/messageError";


export const InputField=({type,value,onChange,placeholder,error})=>{
    return(
        <div style={{marginBottom:"10px"}}>
            <Input 
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}/>
        <MessageError text={error}/>

        </div>
    )
}