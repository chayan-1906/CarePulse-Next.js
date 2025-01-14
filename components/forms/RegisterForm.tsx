'use client';

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form, FormControl} from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import {useState} from "react";
import {PatientFormValidation} from "@/lib/validation";
import {useRouter} from "next/navigation";
import {User} from "@/types";
import {FormFieldType} from "@/components/forms/PatientForm";
import {Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues} from "@/constants";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {SelectItem} from "@/components/ui/select";
import Image from "next/image";
import FileUploader from "@/components/FileUploader";
import Routes from "@/lib/routes";
import {registerPatient} from "@/lib/actions/patient.actions";
import {Button} from "@/components/ui/button";

function RegisterForm({user}: { user: User }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof PatientFormValidation>>({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: {
            ...PatientFormDefaultValues,
            name: '',
            email: '',
            phone: '',
        },
    });

    async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
        setIsLoading(true);

        let formData;
        if (values.identificationDocument && values.identificationDocument.length > 0) {
            const blobFile = new Blob([values.identificationDocument[0]], {
                type: values.identificationDocument[0].type,
            });

            formData = new FormData();
            formData.append('blobFile', blobFile);
            formData.append('fileName', values.identificationDocument[0].name);
        }

        try {
            const patientData = {
                ...values,
                userId: user.$id,
                birthDate: new Date(values.birthDate),
                identificationDocument: formData,
            };

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const patient = await registerPatient(patientData);
            if (patient) {
                router.push(Routes.newAppointmentPath(user.$id));
            }
        } catch (error) {
            console.error('PatientForm onSubmit: ❌', error);
        }
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col flex-1 space-y-12'}>
                <section className={'space-y-4'}>
                    <h1 className={'header'}>Welcome 👋</h1>
                    <p className={'text-dark-700'}>Let us know more about yourself</p>
                </section>
                <section className={'space-y-6'}>
                    {/** Personal Information */}
                    <section className={'space-y-6'}>
                        <div className={'mb-9 space-y-1'}>
                            <h2 className={'sub-header'}>Personal Information</h2>
                        </div>
                    </section>

                    {/** name */}
                    <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name={'name'} label={'Full Name'} placeholder={'John Doe'} iconSrc={'/assets/icons/user.svg'}
                                     iconAlt={'user'}/>

                    {/** email, phone */}
                    <div className={'flex flex-col xl:flex-row gap-6'}>
                        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name={'email'} label={'Email Address'} placeholder={'johndoe@gmail.com'}
                                         iconSrc={'/assets/icons/email.svg'} iconAlt={'email'}/>
                        <CustomFormField fieldType={FormFieldType.PHONE_INPUT} control={form.control} name={'phone'} label={'Phone'} placeholder={'(555) 123-4567'} iconSrc={'/assets/icons/phone.svg'}
                                         iconAlt={'phone'}/>
                    </div>

                    {/** date of birth, gender */}
                    <div className={'flex flex-col xl:flex-row gap-6'}>
                        <CustomFormField fieldType={FormFieldType.DATE_PICKER} control={form.control} name={'birthDate'} label={'Date of Birth'}/>
                        <CustomFormField fieldType={FormFieldType.SKELETON} control={form.control} name={'gender'} label={'Gender'} renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup className={'flex h-11 gap-6 xl:justify-between'} defaultValue={field.value} onValueChange={field.onChange}>
                                    {GenderOptions.map((option, i) => (
                                        <div key={option + i} className={'radio-group'}>
                                            <RadioGroupItem value={option} id={option}/>
                                            <Label htmlFor={option} className={'cursor-pointer'}>{option}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}/>
                    </div>

                    {/** address, occupation */}
                    <div className={'flex flex-col xl:flex-row gap-6'}>
                        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name={'address'} label={'Address'} placeholder={'14 Street, New York'}/>
                        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name={'occupation'} label={'Occupation'} placeholder={'Software Engineer'}/>
                    </div>

                    {/** emergency contact name & phone */}
                    <div className={'flex flex-col xl:flex-row gap-6'}>
                        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name={'emergencyContactName'} label={'Emergency Contact Name'} placeholder={'Guardian\'s Name'}/>
                        <CustomFormField fieldType={FormFieldType.PHONE_INPUT} control={form.control} name={'emergencyContactNumber'} label={'Emergency Contact Number'}
                                         placeholder={'(555) 123-4567'}/>
                    </div>

                    {/** Medical Information */}
                    <section className={'space-y-6'}>
                        <div className={'mb-9 space-y-1'}>
                            <h2 className={'sub-header'}>Medical Information</h2>
                        </div>
                    </section>

                    {/** primary physician */}
                    <CustomFormField fieldType={FormFieldType.SELECT} control={form.control} name={'primaryPhysician'} label={'Primary Physician'} placeholder={'Select a physician'}>
                        {Doctors.map((doctor) => (
                            <SelectItem key={doctor.name} value={doctor.name}>
                                <div className={'flex cursor-pointer items-center gap-2'}>
                                    <Image src={doctor.image} alt={doctor.name} width={32} height={32} className={'rounded-full border border-dark-500'}/>
                                    <p>{doctor.name}</p>
                                </div>
                            </SelectItem>
                        ))}
                    </CustomFormField>

                    {/** insurance provider & policy number */}
                    <div className={'flex flex-col xl:flex-row gap-6'}>
                        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name={'insuranceProvider'} label={'Insurance Provider'} placeholder={'BlueCross BlueShield'}/>
                        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name={'insurancePolicyNumber'} label={'Insurance Policy Number'} placeholder={'ABC123456789'}/>
                    </div>

                    {/** allergies */}
                    <div className={'flex flex-col xl:flex-row gap-6'}>
                        <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control} name={'allergies'} label={'Allergies (if any)'} placeholder={'Peanuts, Penicillin, Pollen'}/>
                        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name={'currentMedication'} label={'Current Medication'}
                                         placeholder={'Ibuprofen 200mg, Paracetamol 500mg'}/>
                    </div>

                    {/** medical history */}
                    <div className={'flex flex-col xl:flex-row gap-6'}>
                        <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control} name={'familyMedicalHistory'} label={'Family Medical History'} placeholder={'Mother has migraine'}/>
                        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name={'pastMedicalHistory'} label={'Past Medical History'} placeholder={'Appendectomy, Tonsillectomy'}/>
                    </div>

                    {/** Identification and Verification */}
                    <section className={'space-y-6'}>
                        <div className={'mb-9 space-y-1'}>
                            <h2 className={'sub-header'}>Identification and Verification</h2>
                        </div>
                    </section>

                    {/** identification type & number */}
                    <div className={'flex flex-col xl:flex-row gap-6'}>
                        <CustomFormField fieldType={FormFieldType.SELECT} control={form.control} name={'identificationType'} label={'Identification Type'} placeholder={'Select an identification'}>
                            {IdentificationTypes.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                        </CustomFormField>
                        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name={'identificationNumber'} label={'Identification Number'} placeholder={'1234567890'}/>
                    </div>

                    {/** file uploader */}
                    <CustomFormField fieldType={FormFieldType.SKELETON} control={form.control} name={'identificationDocument'} label={'Scanned copy of Identification Document'}
                                     renderSkeleton={(field) => (
                                         <FormControl>
                                             <FileUploader files={field.value} onChange={field.onChange}/>
                                         </FormControl>
                                     )}/>

                    {/** Consent & Privacy */}
                    <section className={'space-y-6'}>
                        <div className={'mb-9 space-y-1'}>
                            <h2 className={'sub-header'}>Consent and Privacy</h2>
                        </div>
                    </section>

                    {/** checkboxes */}
                    <CustomFormField fieldType={FormFieldType.CHECKBOX} control={form.control} name={'treatmentConsent'} label={'I consent to treatment'}/>
                    <CustomFormField fieldType={FormFieldType.CHECKBOX} control={form.control} name={'disclosureConsent'} label={'I consent to disclosure of information'}/>
                    <CustomFormField fieldType={FormFieldType.CHECKBOX} control={form.control} name={'privacyConsent'} label={'I consent to privacy policy'}/>
                </section>

                <SubmitButton isLoading={isLoading} loadingText={'Please wait...'}>Get Started</SubmitButton>
                <Button onClick={() => router.push(Routes.newAppointmentPath(user.$id))}>Test</Button>
            </form>
        </Form>
    );
}

export default RegisterForm;
