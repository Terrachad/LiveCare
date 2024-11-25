'use server'

import { ID } from "node-appwrite"
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config"
import { parseStringify } from "../utils"

export const createAppointment = async ( appointment : CreateAppointmentParams) =>{
    try {
        const newAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointment,
          )
          return parseStringify(newAppointment)
    } catch (error) {
        console.log(error)
    }
}

export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId
        );
        //console.log("Fetched appointment:", appointment);  // Log the single document
        return appointment;  // This should return a single document, not an array
    } catch (error) {
        console.log("Error fetching appointment:", error);
        return null;
    }
}

// Usage example
const appointmentId = '67446389000bfd92eb2e';  // Example appointment ID
const appointment = await getAppointment(appointmentId);
if (appointment) {
    //console.log('Appointment details:', appointment);
}
