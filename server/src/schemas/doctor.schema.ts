import z from "zod";

const slots=z.object({
    startTime:z.string().min(1,"Start time is required"),
    endTime:z.string().min(1,"End time is required")
})

export const RegisterDoctor=z.object({
    name:z.string().min(2,"Doctor name must be at least 3 characters"),
    email:z.string().email("Invalid E-mail"),
    phone:z.string().min(10).max(15),
    specialization:z.string().min(2),
    experience:z.number(),
    slots:z.array(slots).min(1,"Atleast one slot is required")
});

export type RegisterDoctorType=z.infer<typeof RegisterDoctor>