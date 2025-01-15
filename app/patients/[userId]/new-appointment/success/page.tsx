import Link from "next/link";
import Routes from "@/lib/routes";
import Image from "next/image";
import {SearchParamProps} from "@/types";
import {getAppointment} from "@/lib/actions/appointment.actions";
import {Doctors} from "@/constants";
import {formatDateTime} from "@/lib/utils";
import {Button} from "@/components/ui/button";

// /patients/677e716a0032906a319f/new-appointment/success?appointmentId=678627ae000c832d0db6
// /patients/677e716a0032906a319f/new-appointment/success?appointmentId=67880503003822ac3bbb
async function AppointmentSuccessPage({params, searchParams}: SearchParamProps) {
    const {userId} = await params;
    const {appointmentId} = await searchParams;
    const appointment = await getAppointment(appointmentId);

    const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician);
    const {name, image} = doctor || {};

    return (
        <div className={'flex h-screen max-h-screen px-[5%]'}>
            <div className={'success-img'}>
                <Link href={Routes.homePath()}>
                    <Image src={'/assets/icons/logo-full.svg'} alt={'logo'} height={1000} width={1000} className={'h-10 w-fit'}/>
                </Link>

                <section className={'flex flex-col items-center'}>
                    <Image src={'/assets/gifs/success.gif'} alt={'success'} height={300} width={280} unoptimized/>
                    <h2 className={'header mb-6 max-w-[600px] text-center'}>
                        Your <span className={'text-green-500'}>appointment request</span> has been successfully submitted!
                    </h2>
                    <p>We will be in touch shortly to confirm</p>
                </section>

                <section className={'request-details'}>
                    <p>Requested appointment details:</p>
                    <div className={'flex items-center gap-3'}>
                        <Image src={image || ''} alt={`doctor-${name}`} width={1000} height={1000} className={'size-10'}/>
                        <p className={'whitespace-nowrap'}>Dr. {name}</p>
                    </div>
                    <div className={'flex gap-2'}>
                        <Image src={'/assets/icons/calendar.svg'} alt={'calendar'} height={24} width={24}/>
                        <p>{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>

                <Button variant={'outline'} className={'shad-primary-btn'} asChild>
                    <Link href={Routes.newAppointmentPath(userId)}>New Appointment</Link>
                </Button>

                <p className={'copyright py-12'}>© 2025 CarePulse</p>
            </div>
        </div>
    );
}

export default AppointmentSuccessPage;
