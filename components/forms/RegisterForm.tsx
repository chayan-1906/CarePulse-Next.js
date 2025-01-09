'use client';

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form, FormControl} from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import {useState} from "react";
import {PatientFormValidation, UserFormValidation} from "@/lib/validation";
import {useRouter} from "next/navigation";
import routes from "@/lib/routes";
import {createUser} from "@/lib/actions/patient.actions";
import {User} from "@/types";
import {FormFieldType} from "@/components/forms/PatientForm";
import {GenderOptions, PatientFormDefaultValues} from "@/constants";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";

function RegisterForm({user}: { user: User }) {
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

    async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
        setIsLoading(true);

        try {
            const userData = {name, email, phone};
            const user = await createUser(userData);
            if (user) {
                setIsLoading(false);
                router.push(routes.registerPath(user.$id));
            }
        } catch (error) {
            console.error('PatientForm onSubmit: ❌', error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col flex-1 space-y-12'}>
                <section className={'space-y-4'}>
                    <h1 className={'header'}>Welcome 👋</h1>
                    <p className={'text-dark-700'}>Let us know more about yourself</p>
                </section>
                <section className={'space-y-6'}>
                    <div className={'mb-9 space-y-1'}>
                        <h2 className={'sub-header'}>Personal Information</h2>
                    </div>

                    {/** name */}
                    <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name={'name'} label={'Full Name'} placeholder={'John Doe'} iconSrc={'/assets/icons/user.svg'}
                                     iconAlt={'user'}/>

                    {/*( email, phone */}
                    <div className={'flex flex-col xl:flex-row gap-6'}>
                        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name={'email'} label={'Email Address'} placeholder={'johndoe@gmail.com'}
                                         iconSrc={'/assets/icons/email.svg'}
                                         iconAlt={'email'}/>
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
                </section>

                <SubmitButton isLoading={isLoading} loadingText={'Please wait...'}>Get Started</SubmitButton>
            </form>
        </Form>
    );
}

export default RegisterForm;
