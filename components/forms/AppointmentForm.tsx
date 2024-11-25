"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
} from "@/components/ui/form"
import CustomFormField from "./CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { getAppointmentSchema} from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "@/lib/enum"
import Image from "next/image"
import { Doctors } from "@/constants"
import { SelectItem } from "../ui/select"
import { createAppointment } from "@/lib/actions/appointment.actions"



 
const AppointmentForm = ({
    userId, patientId, type
}: AppointmentProps) =>{
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const AppointmentFormValidation = getAppointmentSchema(type)

const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
        primaryPhysician: '',
        schedule: new Date(),
        reason: '',
        note: '',
        cancellationReason: '',
    },
})
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true)

    let status;

    switch(type){
        case 'schedule':
            status = 'scheduled';
            break;
        case 'cancel':
            status = 'cancelled';
            break;
        default:
            status = 'pending';
            break;
    }

    try {
        if(type === 'create' && patientId ){
            const appointmentData = {
                userId,
                patient:patientId,
                primaryPhysician: values.primaryPhysician,
                schedule: new Date(values.schedule),
                reason: values.reason!,
                note: values.note,
                status: status as Status,
            }
            const appoitment = await createAppointment(appointmentData)
            if(appoitment){
                form.reset();
                router.push(`/patients/${userId}/new-appoitment/sucess?appoitmentId=${appoitment.$id}`)
            }
        }
    } catch (error) {
        console.log(`Error while submitting the main form ${error}`)
    }
  }

  let buttonLabel;

  switch(type){
    case 'cancel':
        buttonLabel = 'Cancel Appointment';
        break;
    case 'create':
        buttonLabel = 'Create Appointment';
        break;
    case 'schedule':
    buttonLabel = 'Schedule Appointment'
        break;
  }

    return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">Request a new appointment in 10 seconds</p>
        </section>

        {type !== 'cancel' && (
            <>
        <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Doctor"
            placeholder="Select a doctor"
            >
            {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                    <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                </div>
                </SelectItem>
            ))}
            </CustomFormField>
            <CustomFormField
                fieldType={FormFieldType.DATEPICKER}
                control={form.control}
                name="schedule"
                label="Expected appoitment date"
                showTimeSelect
                dateFormat="dd/MM/YYYY"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="reason"
                    label="Reason for appoitment"
                    placeholder="Enter a reason for appontment"
                />
                <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="note"
                    label="Notes"
                    placeholder="Enter additional notes"
                />
            </div>
        </>
        )}

        {type === "cancel" && (
            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="cancelationReason"
                label="Reason for cancellation"
                placeholder="Enter the reason for cancellation"
            />
        )}

        <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}>
            {buttonLabel}
        </SubmitButton>
    </form>
    </Form>
    )
    }

export default AppointmentForm