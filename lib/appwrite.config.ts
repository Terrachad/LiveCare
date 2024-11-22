import * as sdk from 'node-appwrite'

const {
    PROJECT_ID, API, DOCTOR_COLLECTION_ID,LIVECARE_DB_ID, PATIENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID: BUCKET,
    NEXT_PUBLIC_ENDPOINT:ENDPOINT
} = process.env;


const client = new sdk.Client();