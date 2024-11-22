import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  import { Control, FieldValues } from "react-hook-form"
  import { FormFieldType } from "./PatientForm"
  import Image, { StaticImageData } from "next/image"
  
  interface CustomFormFieldProps {
      control: Control<FieldValues>,
      fieldType: FormFieldType,
      name: string, 
      label?: string,
      placeholder?: string,
      iconSrc?: string | StaticImageData,
      iconAlt?: string,
      disabled?: boolean,
      dateFormat?: string,
      showTimeSelect?: boolean,
      children?: React.ReactNode,
      renderSkeleton?: (field: any) => React.ReactNode, // eslint-disable-line @typescript-eslint/no-explicit-any
  }
  
  interface RenderFieldProps {
      field: FieldValues;
      props: CustomFormFieldProps;
  }
  
  const RenderField = ({ field, props }: RenderFieldProps) => {
      const { fieldType, iconAlt, iconSrc, placeholder } = props;
  
      switch (fieldType) {
          case FormFieldType.INPUT:
              return (
                  <div className="flex rounded-md border border-dark-500 bg-dark-400">
                      {iconSrc && (
                          <Image
                              src={iconSrc}
                              alt={iconAlt || ""}
                              width={24}
                              height={24}
                              className="ml-2"
                          />
                      )}
                      <Input {...field} placeholder={placeholder} className="shad-input border-0" />
                  </div>
              )
          default:
              return null;
      }
  }
  
  const CustomFormField = (props: CustomFormFieldProps) => {
      const { control, fieldType, name, label } = props;
  
      return (
          <FormField
              control={control}
              name={name}
              render={({ field }) => (
                  <FormItem className="flex-1">
                      {fieldType !== FormFieldType.CHECKBOX && label && (
                          <FormLabel>{label}</FormLabel>
                      )}
                      <FormControl>
                          <RenderField field={field} props={props} />
                      </FormControl>
                      <FormMessage className="shad-error"/>
                  </FormItem>
              )}
          />
      )
  }
  
  export default CustomFormField