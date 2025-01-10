'use client';

import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {CustomProps} from "@/types";
import {FormFieldType} from "@/components/forms/PatientForm";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";
import {E164Number} from "libphonenumber-js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Select, SelectContent, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {Checkbox} from "@/components/ui/checkbox";

const RenderField = ({field, props}: { field: any, props: CustomProps }) => {
    const {fieldType, control, name, label, placeholder, iconSrc, iconAlt, disabled, dateFormat, showTimeSelect, children, renderSkeleton} = props;
    const {value, onChange} = field;

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className={'flex rounded-md border border-dark-500 bg-dark-400'}>
                    {iconSrc && (
                        <Image src={iconSrc} alt={iconAlt || 'icon'} height={24} width={24} className={'ml-2'}/>
                    )}
                    <FormControl>
                        <Input placeholder={placeholder} {...field} className={'shad-input border-0'}/>
                    </FormControl>
                </div>
            );

        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        defaultCountry={'IN'}
                        placeholder={placeholder}
                        international
                        withCountryCallingCode
                        value={field.value as E164Number | undefined}
                        onChange={onChange}
                        className={'input-phone'}
                    />
                </FormControl>
            );

        case FormFieldType.DATE_PICKER:
            return (
                <div className={'flex rounded-md border border-dark-500 bg-dark-400'}>
                    <Image src={'/assets/icons/calendar.svg'} alt={'calendar'} height={24} width={24} className={'ml-2'}/>
                    <FormControl>
                        <DatePicker selected={value} onChange={(date) => onChange(date)} dateFormat={dateFormat ?? 'dd/MM/yyy'}
                                    showTimeSelect={showTimeSelect ?? false} timeInputLabel={'Time:'} wrapperClassName={'date-picker'}/>
                    </FormControl>
                </div>
            );

        case FormFieldType.SKELETON:
            return (
                renderSkeleton ? renderSkeleton(field) : null
            );

        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select defaultValue={value} onValueChange={onChange}>
                        <FormControl>
                            <SelectTrigger className={'shad-select-trigger'}>
                                <SelectValue placeholder={placeholder}/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className={'shad-select-content'}>{children}</SelectContent>
                    </Select>
                </FormControl>
            );

        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea {...field} placeholder={placeholder} disabled={disabled} className={'shad-textArea'}/>
                </FormControl>
            );

        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className={'flex items-center gap-4'}>
                        <Checkbox id={name} checked={value} onCheckedChange={onChange}/>
                        <label htmlFor={name} className={'checkbox-label'}>{label}</label>
                    </div>
                </FormControl>
            );

        default:
            break;
    }
}

function CustomFormField(props: CustomProps) {
    const {control, fieldType, name, label} = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem className={'flex-1'}>
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}
                    <RenderField field={field} props={props}/>
                    <FormMessage className={'shad-error'}/>
                </FormItem>
            )}
        />
    );
}

export default CustomFormField;
