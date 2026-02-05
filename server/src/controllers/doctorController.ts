import type { Request, Response } from "express";
import { createDoctorSchema } from "../schemas/doctor.schema.js";
import { db } from "../config/db.js";
import { users } from "../db/schema/users.js";
import { desc, eq } from "drizzle-orm";
import { doctorProfiles } from "../db/schema/doctorProfiles.js";
import { doctorsAvailability } from "../db/schema/doctorsAvailability.js";
import { generateRandomPassword } from "../utils/password.js";
import { hashPassword } from "../utils/hash.js";
// import { sendEmail } from "../utils/emails/sendEmail.js";
// import { doctorCredentialsEmail } from "../utils/emails/doctorCredential.js";

export const createDoctor = async (req: Request, res: Response) => {
  try {
    const isSafeParsed = createDoctorSchema.safeParse(req.body);

    if (!isSafeParsed?.success) {
      return res.status(400).json({
        message: "Please fill all fields",
        data: isSafeParsed?.error.issues,
      });
    }

    const {
      firstName,
      lastName,
      phone,
      email,
      experience,
      specialization,
      availability,
    } = req.body;

    const isUserExist = await db
      .select()
      .from(users)
      ?.where(eq(users?.email, email));
    if (isUserExist?.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Doctor already exist with this email.",
      });
    }

    const plainPassword = generateRandomPassword();
    const hashedPassword = await hashPassword(plainPassword);

    const result = await db.transaction(async (tx) => {
      const [newDoctor] = await tx
        .insert(users)
        .values({ email, role: "doctor", password: hashedPassword })
        .returning({ email: users?.email, id: users?.id, role: users?.role });
      if (!newDoctor?.id) {
        return res
          .status(400)
          .json({ status: false, message: "Error while creating the doctor." });
      }

      const [doctorProfile] = await tx
        .insert(doctorProfiles)
        .values({
          firstName,
          lastName,
          phone,
          experience,
          specialization,
          userId: newDoctor?.id,
        })
        .returning();

      await tx.insert(doctorsAvailability).values(
        availability?.map(
          (v: { day: string; startTime: string; endTime: string }) => ({
            doctorId: doctorProfile?.id,
            day: v?.day,
            startTime: v?.startTime,
            endTime: v?.endTime,
          })
        )
      );
      return newDoctor;
    });

    // await sendEmail({
    //   to: email,
    //   subject: "Your MediQueue Doctor Account",
    //   html: doctorCredentialsEmail({ email, password: hashedPassword }),
    // });

    return res.status(200).json({
      status: true,
      data: result,
      message: "Doctor created successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const doctorsList = async (req: Request, res: Response) => {
  try {
    const { skip, limit } = req.body;
    const result = await db
      .select({
        id: doctorProfiles?.userId,
        email: users?.email,
        isDeactivated: users?.isDeactivated,
        createdAt: users?.createdAt,
        firstName: doctorProfiles?.firstName,
        lastName: doctorProfiles?.lastName,
        phone: doctorProfiles?.phone,
        specialization: doctorProfiles?.specialization,
      })
      .from(users)
      .leftJoin(doctorProfiles, eq(users?.id, doctorProfiles?.userId))
      .where(eq(users.role, "doctor"))
      .offset(skip)
      .limit(limit)
      .orderBy(desc(users?.createdAt));
    if (!result) {
      return res
        .status(400)
        .json({ status: false, message: "Failed to fetch the doctors." });
    }
    return res.status(200).json({
      status: true,
      data: result,
      message: "Doctors fetched successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getDoctorDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "Provide the user id" });
    }

    const doctor = await db
      .select({
        doctorId: doctorProfiles?.id, 
        firstName: doctorProfiles?.firstName,
        lastName: doctorProfiles?.lastName,
        experience: doctorProfiles?.experience,
        specialization: doctorProfiles?.specialization,
        email: users?.email,
        createdAt: users?.createdAt,
        isDeactivated: users?.isDeactivated,
      })
      .from(doctorProfiles)
      .innerJoin(users, eq(doctorProfiles?.userId, users?.id))
      .where(eq(doctorProfiles?.userId, userId))
      .limit(1);

    if (!doctor[0]) {
      return res.status(404).json({
        status: false,
        message: "Doctor not found",
      });
    }

    const doctorAvailability = await db
      .select({
        day: doctorsAvailability?.day,
        startTime: doctorsAvailability?.startTime,
        endTime: doctorsAvailability?.endTime,
      })
      .from(doctorsAvailability)
      .where(eq(doctorsAvailability.doctorId, doctor[0].doctorId));

    return res.status(200).json({
      status: true,
      data: {
        ...doctor[0],
        availability: doctorAvailability,
      },
      message: "Doctor details fetched successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const updateDoctorStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400);
    }
    const isUserExist = await db.select().from(users).where(eq(users?.id, id));
    if (!isUserExist) {
      return res
        .status(400)
        .json({ message: "An error occured while updating the status" });
    }
    const result = await db
      .update(users)
      .set({ isDeactivated: !isUserExist[0]?.isDeactivated })
      .where(eq(users?.id, id))
      .returning();
    return res.status(200).json({
      status: true,
      message: "Doctor status updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};
