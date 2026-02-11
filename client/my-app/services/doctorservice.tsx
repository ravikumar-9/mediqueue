import api from "@/api/axiosInstance";

export const createDoctorService = async (payload: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  experience: string;
  availability: { day: string; startTime: string; endTime: string }[];
}) => {
  return await api.post("/api/doctors/create", payload);
};

export const getDoctorsListService = async (payload: {
  skip: number;
  limit: 10;
}) => {
  return await api.post("/api/doctors", payload);
};

export const updateDoctorStatusService = async (payload: string) => {
  return await api.put(`api/doctors/update-status/${payload}`);
};

export const updateDoctorService = async (
  id: string,
  payload: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialization: string;
    experience: string;
    availability: {
      day:
        | "Monday"
        | "Tuesday"
        | "Wednesday"
        | "Thursday"
        | "Friday"
        | "Saturday"
        | "Sunday";
      startTime: string;
      endTime: string;
    }[];
  }
) => {
  return await api.put(`api/doctors/update/${id}`, payload);
};

export const getDoctorDetailsService = async (payload: string) => {
  return await api.get(`api/doctors/profile/${payload}`);
};
