'use server';

import {APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases} from "@/lib/appwrite.config";
import {ID} from "node-appwrite";
import {parseStringify} from "@/lib/utils";
import {revalidatePath} from "next/cache";
import {CreateAppointmentParams} from "@/types";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const newAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointment,
        );

        /** TODO: Use Routes. */
        revalidatePath('/admin');
        return parseStringify(newAppointment);
    } catch (error) {
        console.error('inside catch of createAppointment:', error);
    }
}
