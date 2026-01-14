import { jwtDecode } from "jwt-decode";

export const getUserFromToken=()=>{
    const token=localStorage.getItem("userToken");
    if(!token){
        return null;
    }
    try {
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
}