"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
} from "@/components/ui/form"
import CustomFormField from "./CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import {userFormValidation} from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "@/lib/enum"
import { RadioGroup } from "../ui/radio-group"
import { GenderOptions } from "@/constants"
import { RadioGroupItem } from "@radix-ui/react-radio-group"
import { Label } from "../ui/label"



 
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
    <form onSubmit={form.handleSubmit(onSubmit)} className=" flex-1 space-y-12">
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
        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
            fieldType={FormFieldType.DATEPICKER}
            control={form.control}
            name='birthdate'
            label='Date of birth'
            placeholder="xxxx@vlady.website"
            iconSrc="/assets/icons/calendar.svg"
            iconAlt='birthdate'
        />
                <CustomFormField 
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name='Gender'
            label='Gender'
            renderSkeleton={(field) =>{
                <FormControl>
                    <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onVolumeChange={field.onChange}
                    defaultValue={field.value}
                    >
                        {GenderOptions.map((gender:string)=>(
                            <div key={gender} className="radio-group">
                                <RadioGroupItem value={gender} id={gender}/>
                                <Label htmlFor={gender} className="cursor-pointer">
                                    {gender}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </FormControl>
            }}
        />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            
        </div>
        <SubmitButton isLoading={isLoading}>
            Get Started
        </SubmitButton>
    </form>
    </Form>
  )
}

export default RegisterForm