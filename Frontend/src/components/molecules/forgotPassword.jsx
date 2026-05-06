import { Link } from "../atoms/linkHref";

export const ForgotPassword=({link})=>{
    return(
        <div style={{ textAlign: "right", marginBottom: "15px"}}>
            <Link link={link}/>

        </div>
    )
}