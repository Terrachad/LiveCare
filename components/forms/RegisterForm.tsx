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
import {PatientFormValidation} from "@/lib/validation"
import { useRouter } from "next/navigation"
import {  registerPatient } from "@/lib/actions/patient.actions"
import { FormFieldType } from "@/lib/enum"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import {  SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"
import { User } from "@/types"



 
const RegisterForm = ({ user }: { user: User }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
  
    const form = useForm<z.infer<typeof PatientFormValidation>>({
      resolver: zodResolver(PatientFormValidation),
      defaultValues: {
        ...PatientFormDefaultValues,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  
    const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
      setIsLoading(true);
  
      // Store file info in form data as
      let formData;
      if (
        values.identificationDocument &&
        values.identificationDocument?.length > 0
      ) {
        const blobFile = new Blob([values.identificationDocument[0]], {
          type: values.identificationDocument[0].type,
        });
  
        formData = new FormData();
        formData.append("blobFile", blobFile);
        formData.append("fileName", values.identificationDocument[0].name);
      }
  
      try {
        const patient = {
          userId: user.$id,
          name: values.name,
          email: values.email,
          phone: values.phone,
          birthDate: new Date(values.birthDate),
          gender: values.gender,
          address: values.address,
          occupation: values.occupation,
          emergencyContactName: values.emergencyContactName,
          emergencyContactNumber: values.emergencyContactNumber,
          primaryPhysician: values.primaryPhysician,
          insuranceProvider: values.insuranceProvider,
          insurancePolicyNumber: values.insurancePolicyNumber,
          allergies: values.allergies,
          currentMedication: values.currentMedication,
          familyMedicalHistory: values.familyMedicalHistory,
          pastMedicalHistory: values.pastMedicalHistory,
          identificationType: values.identificationType,
          identificationNumber: values.identificationNumber,
          identificationDocument: values.identificationDocument
            ? formData
            : undefined,
          privacyConsent: values.privacyConsent,
        };
  
        const newPatient = await registerPatient(patient);
  
        if (newPatient) {
          router.push(`/patients/${user.$id}/new-appointment`);
        }
      } catch (error) {
        console.log(error);
      }
  
      setIsLoading(false);
    };

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
        <div className="flex flex-col gap-6 xl:flex-row">

        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='insuranceProvider'
            label='Insurance Provider'
            placeholder="Techniker Krankenkasse"
        />
            <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='insurancePolicyNumber'
            label='Insurance Policy Number'
            placeholder="XXX123456789"
        />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">

        <CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name='allergies'
            label='Allergies '
            placeholder="Peanuts, Penicillin, Pollen (leave blank if none)"
        />
            <CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name='currentMedication'
            label='Current medication '
            placeholder="Ibuprofen 200mg (leave blank if none)"
        />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">

        <CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name='familyMedicalHistory'
            label='Family medical history'
            placeholder="Grandmother had diabetes"
        />
            <CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name='pastMedicalHistory'
            label='Past medical history'
            placeholder="Tonsillectomy"
        />
        </div>
        <section className="space-y-6">
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>

            </div>
        </section>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select an identification type"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>
        </div>
        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='identificationNumber'
            label='Identification Number'
            placeholder="123456789"
        />
        <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="identificationDocument"
              label="Identification Document"
              renderSkeleton={(field) => (
                <FormControl>
                    <FileUploader
                    files={field.value}
                    onChange={field.onChange}
                    />
                </FormControl>
              )}
        />
        <section className="space-y-6">
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and privacy</h2>
            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="treatmentConsent"
              label="I consent to treatment"
            />
            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="disclosureConsent"
              label="I consent to processing of my data"
            />
            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="privacyConsent"
              label="I consent to processing to privacy policy"
            />
            </div>
        </section>
        <SubmitButton isLoading={isLoading}>
            Get Started
        </SubmitButton>
    </form>
    </Form>
  )
}

export default RegisterForm