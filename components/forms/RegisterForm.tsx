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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions } from "@/constants"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem } from "../ui/select"
import Image from "next/image"



 
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

            {/* BirthDate & Gender */}
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
                fieldType={FormFieldType.DATEPICKER}
                control={form.control}
                name='birthdate'
                label='Date of birth'
                placeholder="Select date"
                iconSrc="/assets/icons/calendar.svg"
                iconAlt='birthdate'
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='address'
            label='Address'
            placeholder="Via Riviera 6, Italia"
        />
            <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='occupation'
            label='Occupation'
            placeholder="Software Engineer"
        />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='emergencyContactName'
            label='Emergency contact name'
            placeholder="Guardian's name"
        />
        <CustomFormField 
            fieldType={FormFieldType.PHONE}
            control={form.control}
            name='emergencyContactNumber'
            label='Emergency contact number'
            placeholder="+39 *** *** **"
            iconSrc="/assets/icons/phone.svg"
            iconAlt='phone'
        />
        </div>
        <section className="space-y-6">
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical information</h2>

            </div>
        </section>
        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        <SubmitButton isLoading={isLoading}>
            Get Started
        </SubmitButton>
    </form>
    </Form>
  )
}

export default RegisterForm