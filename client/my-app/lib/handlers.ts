import { toast } from "react-toastify";

export const apiErrorHandler = (error) => {
  const response = error?.response;
  const status = response?.status;

  switch (status) {
    case 400:
      toast.error(response?.data?.message, { toastId: "error" });
      break;
    case 401:
      toast.error("Session Expired. Please login to continue.", { toastId: "session" });
      break;
    case 403:
      toast.error(response?.data?.message, { toastId: "access-denied" });
      break;
    case 500:
      toast.error("Internal server error");
      break;
  }
};
