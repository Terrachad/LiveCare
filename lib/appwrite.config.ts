import * as sdk from 'node-appwrite'

export const {
    PROJECT_ID, API, DOCTOR_COLLECTION_ID,LIVECARE_DB_ID, PATIENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID: BUCKET,
    NEXT_PUBLIC_ENDPOINT:ENDPOINT
} = process.env;


const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API!)


export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client)
export const messaging = new sdk.Messaging(client)
export const users = new sdk.Users(client);