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
import {PatientFormValidation, UserFormValidation, userFormValidation} from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "@/lib/enum"
import { PatientFormDefaultValues } from "@/constants"



 
 const PatientForm = () =>{
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email:"",
      phone:"",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true)
    let formData;
    if(values.identificationDocument && values.identificationDocument.length > 0){
      const blobFile = new Blob([values.identificationDocument[0]],{
        type: values.identificationDocument[0].type
      })
      formData = new FormData();
      formData.append('blobFile', blobFile);
      formData.append('fileName', values.identificationDocument[0].name)
    }
    try {

    } catch (error) {
        console.log(`Error while submitting the main form ${error}`)
    }
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">Schedule your first appointment</p>
        </section>
        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='name'
            label='Full name'
            placeholder="Giorgia Meloni"
            iconSrc="/assets/icons/user.svg"
            iconAlt='user'
        />
        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='email'
            label='Email'
            placeholder="xxxx@vlady.website"
            iconSrc="/assets/icons/email.svg"
            iconAlt='email'
        />
                <CustomFormField 
            fieldType={FormFieldType.PHONE}
            control={form.control}
            name='phone'
            label='Phone'
            placeholder="+39 *** *** **"
            iconSrc="/assets/icons/phone.svg"
            iconAlt='phone'
        />
        <SubmitButton isLoading={isLoading}>
            Get Started
        </SubmitButton>
    </form>
    </Form>
  )
}

export default PatientForm