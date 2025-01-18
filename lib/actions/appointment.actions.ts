'use server';

import {APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases} from "@/lib/appwrite.config";
import {ID, Query} from "node-appwrite";
import {parseStringify} from "@/lib/utils";
import {revalidatePath} from "next/cache";
import {CreateAppointmentParams, UpdateAppointmentParams} from "@/types";
import {Appointment} from "@/types/appwrite.types";
import routes from "@/lib/routes";

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

export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
        );

        return parseStringify(appointment);
    } catch (error) {
        console.error('inside catch of getAppointment:', error);
    }
}

export const getRecentAppointmentList = async () => {
    try {
        const appointments = await databases.listDocuments(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')],
        );

        const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0,
        };

        const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
            const {status} = appointment;
            if (status === 'scheduled') acc.scheduledCount += 1;
            else if (status === 'pending') acc.pendingCount += 1;
            else if (status === 'cancelled') acc.cancelledCount += 1;

            return acc;
        }, initialCounts);

        const data = {
            totalCount: appointments.total,
            ...counts,
            documents: appointments.documents,
        };

        return parseStringify(data);
    } catch (error) {
        console.log('inside catch of getRecentAppointmentList:', error);
    }
}

export const updateAppointment = async ({userId, appointmentId, appointment, type}: UpdateAppointmentParams) => {
    try {
        const updatedAppointment = await databases.updateDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
            appointment,
        );

        if (!updatedAppointment) {
            throw new Error('Appointment not found');
        }

        // TODO SMS notification
        revalidatePath(routes.adminPath());
        return parseStringify(updatedAppointment);
    } catch (error: any) {
        console.log('inside catch of updateAppointment:', error);
    }
}
