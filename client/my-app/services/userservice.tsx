import api from "@/api/axiosInstance";
import { ApiResponse, User } from "../types/users.types";

export const usersListService = async (): Promise<ApiResponse<User[]>> => {
    const { data } = await api.post<ApiResponse<User[]>>("/api/users/",{skip:0,limit:10});
    return data;
};

export const getUserByIdService=async(id:string)=>{
 return await api.get(`api/users/details/${id}`);
}

export const activateUserService=async(id:string)=>{
  const result=await api.put(`/api/users/update-status/${id}`);
  return result;
}
