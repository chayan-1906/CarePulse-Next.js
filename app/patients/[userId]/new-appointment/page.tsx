import Image from "next/image";
import AppointmentForm from "@/components/forms/AppointmentForm";
import {SearchParamProps} from "@/types";
import {getPatient} from "@/lib/actions/patient.actions";
import Link from "next/link";
import Routes from "@/lib/routes";

// /patients/677e716a0032906a319f/new-appointment
async function NewAppointmentPage({params}: SearchParamProps) {
    const {userId} = await params;
    const patient = await getPatient(userId);

    return (
        <div className={'flex h-screen max-h-screen'}>
            <section className={'remove-scrollbar container my-auto'}>
                <div className={'flex flex-1 justify-between sub-container max-w-[860px]'}>
                    <Link href={Routes.homePath()}>
                        <Image src={'/assets/icons/logo-full.svg'} alt={'logo'} height={1000} width={1000} className={'mb-12 h-10 w-fit'}/>
                    </Link>
                    <AppointmentForm type={'create'} userId={userId} patientId={patient.$id} />
                    <p className={'copyright mt-10 py-12'}>© 2025 CarePulse</p>
                </div>
            </section>

            <Image src={'/assets/images/appointment-img.png'} alt={'patient'} height={1000} width={1000} className={'side-img max-w-[390px] bg-bottom'}/>
        </div>
    );
}

export default NewAppointmentPage;
