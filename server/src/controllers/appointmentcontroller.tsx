import type { Request, Response } from "express";
import { db } from "../config/db.js";
import { doctorsAvailability } from "../db/schema/doctorsAvailability.js";
import { appointments } from "../db/schema/appointments.js";
import { and, eq } from "drizzle-orm";
import { doctorProfiles } from "../db/schema/doctorProfiles.js";

type WeekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export const appointmentSlots = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    if (!id || !date) {
      return res.status(400).json({
        message: "Doctor id and date are required",
        status: false,
      });
    }

    // doctor exists
    const isDoctorExist = await db
      .select()
      .from(doctorProfiles)
      .where(eq(doctorProfiles.id, id));

    if (!isDoctorExist[0]) {
      return res.status(404).json({
        message: "Doctor not found",
        status: false,
      });
    }

    // convert date to weekday
    const selectedDate = new Date(date as string);

    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        message: "Invalid date",
        status: false,
      });
    }

    const selectedDay = selectedDate.toLocaleString("en-US", {
      weekday: "long",
    }) as WeekDay;

    // 3️⃣ Get weekly availability
    const availability = await db
      .select()
      .from(doctorsAvailability)
      .where(
        and(
          eq(doctorsAvailability.doctorId, id),
          eq(doctorsAvailability.day, selectedDay)
        )
      );

    if (!availability.length) {
      return res.json({
        status: true,
        slots: [],
      });
    }

    // 30-minute slots
    const generateSlots = (start: string, end: string, interval: number) => {
      const slots = [];

      const startDate = new Date(`1970-01-01T${start}`);
      const endDate = new Date(`1970-01-01T${end}`);

      while (startDate < endDate) {
        const slotStart = new Date(startDate);
        startDate.setMinutes(startDate.getMinutes() + interval);
        const slotEnd = new Date(startDate);

        slots.push({
          startTime: slotStart.toTimeString().slice(0, 8),
          endTime: slotEnd.toTimeString().slice(0, 8),
        });
      }

      return slots;
    };

    let generatedSlots: any[] = [];

    for (const slot of availability) {
      generatedSlots.push(...generateSlots(slot.startTime, slot.endTime, 30));
    }

    // removing the booked slots
    const bookedAppointments = await db
      .select()
      .from(appointments)
      .where(
        and(
          eq(appointments.doctorId, id),
          eq(appointments.appointmentDate, date as string)
        )
      );

    const bookedStartTimes = bookedAppointments?.map((b) => b?.startTime);

    const availableSlots = generatedSlots?.filter(
      (slot) => !bookedStartTimes?.includes(slot?.startTime)
    );

    return res.json({
      status: true,
      slots: availableSlots,
      doctorDetails: isDoctorExist[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { startTime, endTime, date, doctorId } = req.body;
    const { id } = req.user;
    const result = await db
      .insert(appointments)
      .values({
        startTime,
        endTime,
        appointmentDate: date,
        doctorId,
        userId: id,
      })
      .returning();

    if (!result[0]) {
      return res.status(400).json({
        status: false,
        message: "An error occured while booking an appoinment",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Appointment booked successfully.",
      data: result[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const appointmentsList = async (req: Request, res: Response) => {
  try {
    const { role, id } = req.user;
    let result;
    if (role === "superadmin") {
      result = await db
        .select({
          id:appointments?.id,
          firstName: doctorProfiles?.firstName,
          lastName: doctorProfiles?.lastName,
          experience: doctorProfiles?.experience,
          specialization:doctorProfiles?.specialization,
          status:appointments?.status,
          startTime:appointments?.startTime,
          endTime:appointments?.endTime,
          appointmentDate:appointments?.appointmentDate,
          doctorId:appointments?.doctorId,
          userId:appointments?.userId
        })
        .from(appointments).leftJoin(doctorProfiles,eq(doctorProfiles?.id,appointments?.doctorId));
    } else if (role === "user") {
      result = await db
        .select()
        .from(appointments)
        .where(eq(appointments?.userId, id));
    } else if (role === "doctor") {
      const doctorProfile = await db
        .select()
        .from(doctorProfiles)
        .where(eq(doctorProfiles?.userId, id));
      if (doctorProfile[0]) {
        result = await db
          .select()
          .from(appointments)
          .where(eq(appointments?.doctorId, doctorProfile[0]?.id));
      }
    }

    if (!result) {
      return res
        .status(400)
        .json({ message: "An error occured while fetching the appointments" });
    }

    return res
      .status(200)
      .json({
        status: 200,
        message: "Appointments fetched successfully",
        appointments: result,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error." });
  }
};
