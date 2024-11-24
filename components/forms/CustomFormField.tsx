import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  import { Control, FieldValues } from "react-hook-form"
  import Image, { StaticImageData } from "next/image"
  import 'react-phone-number-input/style.css'
  import PhoneInput from 'react-phone-number-input'
  import {E164Number} from 'libphonenumber-js/core'
import { FormFieldType } from "@/lib/enum"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
  
  interface CustomFormFieldProps {
      control: Control<any>,// eslint-disable-line @typescript-eslint/no-explicit-any
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
      const { fieldType, iconAlt, iconSrc, placeholder, showTimeSelect, dateFormat, renderSkeleton } = props;
  
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
              break;
              case FormFieldType.PHONE:
                return (
                    <FormControl>
                        <PhoneInput 
                            defaultCountry="IT"
                            placeholder={placeholder}
                            international
                            withCountryCallingCode
                            value={field.value as E164Number | undefined}
                            onChange={field.onChange}
                            className="input-phone"
                        />
                    </FormControl>
                )
                break;
                case FormFieldType.DATEPICKER:
                    return (
                        <div className="flex rounded-md border border-dark-500 bg-dark-400">
                            <Image
                            src='/assets/icons/calendar.svg'
                            height={24}
                            width={24}
                            alt="calendar"
                            className="ml-2"
                            />
                            <FormControl>
                                <DatePicker 
                                selected={field.value}
                                onChange={(date) => field.onChange(date)} 
                                dateFormat={dateFormat ?? 'dd/MM/yyyy'}
                                showTimeSelect={showTimeSelect ?? false}
                                timeInputLabel="Time:"
                                wrapperClassName="date-picker"
                                />
                            </FormControl>
                        </div>
                    )
                break;
                case FormFieldType.SELECT:
                    return (
                        <div className="flex rounded-md border border-dark-500 bg-dark-400">
                            <Image
                            src='/assets/icons/calendar.svg'
                            height={24}
                            width={24}
                            alt="calendar"
                            className="ml-2"
                            />
                            <FormControl>
                                <DatePicker 
                                selected={field.value}
                                onChange={(date) => field.onChange(date)} 
                                dateFormat={dateFormat ?? 'dd/MM/yyyy'}
                                showTimeSelect={showTimeSelect ?? false}
                                timeInputLabel="Time:"
                                wrapperClassName="date-picker"
                                />
                            </FormControl>
                        </div>
                    )
                break;
                case FormFieldType.SKELETON:
                    return renderSkeleton ? renderSkeleton(field) : null
                break;
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