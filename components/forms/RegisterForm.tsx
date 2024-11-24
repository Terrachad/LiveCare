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
import {userFormValidation} from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "@/lib/enum"



 
 const RegisterForm = ({user} : {user : User}) =>{
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({name, email, phone}: z.infer<typeof userFormValidation>) {
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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
            <h1 className="header">Welcome 👋</h1>
            <p className="text-dark-700">Let us know more about yourself</p>
        </section>
        <section className="space-y-6">
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal information</h2>

            </div>
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
        <SubmitButton isLoading={isLoading}>
            Get Started
        </SubmitButton>
    </form>
    </Form>
  )
}

export default RegisterForm