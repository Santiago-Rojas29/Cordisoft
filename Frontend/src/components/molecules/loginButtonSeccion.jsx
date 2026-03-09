import { ButtonSave } from "../atoms/buttonSave";
import { MessageExito } from "../atoms/messageExito";

export const LoginButtonSeccion=({success})=>{
    return(
    <div>
        <ButtonSave />

        {success && (
            <MessageExito text={success} />
        )}

        </div>
    )

}