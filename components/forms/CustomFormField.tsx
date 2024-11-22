"use client"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { FormFieldType } from "./PatientForm"

interface CustomFormFieldProps {
    control: Control<any>, // eslint-disable-line @typescript-eslint/no-explicit-any
    fieldType: FormFieldType,
    name: string, 
    label?: string,
    placeholder?:string,
    iconSrc?: string,
    iconAlt?:string,
    disabled?:boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field:any) => React.ReactNode, // eslint-disable-line @typescript-eslint/no-explicit-any
}

const RenderField = ({field, props}: {field:any, props: CustomFormFieldProps}) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    return(
        <Input
        type="text"
        placeholder="Giorgia Meloni"
        />
    )
}

const CustomFormField = (props: CustomFormFieldProps) => {
    const {control, fieldType, name, label} = props;

    return (
        <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem className="flex-1">
                {fieldType !== FormFieldType.CHECKBOX && label && (<FormLabel>{label}</FormLabel>)}
                <RenderField field={field} props={props} />
                <FormMessage className="shad-error"/>
            </FormItem>
        )}
        />
    )
}

export default CustomFormField