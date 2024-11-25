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
import {UserFormValidation} from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "@/lib/enum"
import Image from "next/image"
import { Doctors } from "@/constants"
import { SelectItem } from "../ui/select"



 
 const AppointmentForm = ({
    userId, patientId, type
 }: AppointmentProps) =>{
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true)

    try {
        const userData = {name, email, phone }
        const user = await createUser(userData);
        if(user) router.push(`/patients/${user.$id}/register`)
        
    } catch (error) {
        console.log(`Error while submitting the main form ${error}`)
    }
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">Request a new appointment in 10 seconds</p>
        </section>

        {type !== 'cancelled' && (
            <>
        <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary care physician"
            placeholder="Select a physician"
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
            </>
        )}



        <SubmitButton isLoading={isLoading}>
            Get Started
        </SubmitButton>
    </form>
    </Form>
  )
}

export default AppointmentForm