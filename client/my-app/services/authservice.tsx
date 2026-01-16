import api from "@/api/axiosInstance";
import { loginPayload, registerPayload } from "@/types/auth.types";

export const loginService=async(payload:loginPayload)=>{
          const response=await api.post("/auth/login",payload);  
           return response
}

export const registerService=async(payload:registerPayload)=>{
    return await api.post("/auth/register",payload);
}