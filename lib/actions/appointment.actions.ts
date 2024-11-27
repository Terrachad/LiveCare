'use server'

import { ID, Query } from "node-appwrite"
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config"
import { parseStringify } from "../utils"
import { Appointment } from "@/types/appwrite.types"

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


export const getRecentAppointmentsList = async () =>{
    try {
        const appointments = await databases.listDocuments(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]
        );
        const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0,
        }

        const counts = (
            appointments.documents as Appointment[]).reduce((acc, app) => {
                if (app.status === 'scheduled'){
                    acc.scheduledCount += 1;
                }
                else if (app.status === 'pending'){
                    acc.pendingCount += 1;
                }
                else if (app.status === 'cancelled'){ 
                    acc.cancelledCount +=1;
                }

                return acc; 
            }, initialCounts)

            const dataObj = {
                totalCount: appointments.total,
                ...counts,
                documents: appointments.documents
            }
        
            return parseStringify(dataObj)
    } catch (error) {
        console.log(`Error happened while getting recent appointments list ${error}`)
    }
}

