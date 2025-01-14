'use client';

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form} from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import {useState} from "react";
import {getAppointmentSchema} from "@/lib/validation";
import {useRouter} from "next/navigation";
import {FormFieldType} from "@/components/forms/PatientForm";
import {Doctors} from "@/constants";
import {SelectItem} from "@/components/ui/select";
import Image from "next/image";
import {Status} from "@/types";
import {createAppointment} from "@/lib/actions/appointment.actions";
import Routes from "@/lib/routes";

function AppointmentForm({type, userId, patientId}: { type: 'create' | 'cancel' | 'schedule', userId: string, patientId: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const AppointmentFormValidation = getAppointmentSchema(type);

    let buttonLabel;

    switch (type) {
        case 'cancel':
            buttonLabel = 'Cancel Appointment';
            break;
        case 'create':
            buttonLabel = 'Create Appointment';
            break;
        case 'schedule':
            buttonLabel = 'Schedule Appointment';
            break;
        default:
            break;
    }

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            primaryPhysician: '',
            schedule: new Date(),
            reason: '',
            note: '',
            cancellationReason: '',
        },
    });

    async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
        setIsLoading(true);

        let status;
        switch (type) {
            case 'schedule':
                status = 'scheduled';
                break;
            case 'cancel':
                status = 'cancelled';
                break;
            default:
                status = 'pending';
                break;
        }

        try {
            if (type === 'create' && patientId) {
                const appointmentData = {
                    userId,
                    patient: patientId,
                    primaryPhysician: values.primaryPhysician,
                    schedule: new Date(values.schedule),
                    reason: values.reason || '',
                    note: values.note,
                    status: status as Status,
                };
                console.log('appointmentData', appointmentData);

                const appointment = await createAppointment(appointmentData);
                console.log('appointment created', appointment);

                if (appointment) {
                    form.reset();
                    router.push(Routes.appointmentSuccessPath(userId, appointment.$id));
                }
            }
        } catch (error) {
            console.error('AppointmentForm onSubmit: ❌', error);
        }
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-6 flex-1'}>
                <section className={'mb-12 space-y-4'}>
                    <h1 className={'header'}>New Appointment</h1>
                    <p className={'text-dark-700'}>Request a new appointment in 10 seconds</p>
                </section>

                {type !== 'cancel' && (
                    <>
                        <CustomFormField fieldType={FormFieldType.SELECT} control={form.control} name={'primaryPhysician'} label={'Doctor'} placeholder={'Select a doctor'}>
                            {Doctors.map((doctor) => (
                                <SelectItem key={doctor.name} value={doctor.name}>
                                    <div className={'flex cursor-pointer items-center gap-2'}>
                                        <Image src={doctor.image} alt={doctor.name} width={32} height={32} className={'rounded-full border border-dark-500'}/>
                                        <p>{doctor.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        <CustomFormField fieldType={FormFieldType.DATE_PICKER} control={form.control} name={'schedule'} label={'Expected Appointment Date'} showTimeSelect
                                         dateFormat={'dd/MM/yyyy - h:mm aa'}/>

                        <div className={'flex flex-col xl:flex-row gap-6'}>
                            <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control} name={'reason'} label={'Reason for Appointment'} placeholder={'Enter reason for appointment'}/>
                            <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control} name={'note'} label={'Notes'} placeholder={'Enter notes'}/>
                        </div>
                    </>
                )}

                {type === 'cancel' && (
                    <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control} name={'cancellation'} label={'Reason for Cancellation'} placeholder={'Enter reason for cancellation'}/>
                )}

                <SubmitButton isLoading={isLoading} className={`w-full ${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'}`} loadingText={'Please wait...'}>
                    {buttonLabel}
                </SubmitButton>
            </form>
        </Form>
    );
}

export default AppointmentForm;