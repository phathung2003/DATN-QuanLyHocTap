import { ILogin } from "@/components/models/ILogin";
import { redirect } from 'next/navigation'

export const defaultLoginValue: ILogin = {
    info: "",
    password: "",
}

export function handelSubmit(data: ILogin, setErrorMessage: React.Dispatch<React.SetStateAction<string>>){

    if(data.info === "1"){
        setErrorMessage("Sai thông tin đăng nhập");
        return;
    }
    else{
        window.location.replace('/'); 
    }
    console.log(data.info);
}

