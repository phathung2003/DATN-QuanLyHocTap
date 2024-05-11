import { IRegister } from "@/components/models/IRegister";

export const defaultRegisterValue: IRegister = {
    name: "",
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    rePassword: "",
}

export function handelSubmit(data: IRegister) {
    console.log(data.email);
    window.location.replace('/login'); 
}
