import api from "@/api/axiosInstance"

export const fetchAppointmentSlotsService=async(id:string,selectedDate:string)=>{
    return await api.get(`/api/appointments/slots/${id}?date=${selectedDate}`)
};

export const createAppointmentService=async(payload:{startTime:string,endTime:string,date:string,doctorId:string})=>{
      return await api.post("/api/appointments/create",payload);    
};

export const appointmentListService=async()=>{
    return await api.get("/api/appointments")
}