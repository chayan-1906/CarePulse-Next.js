import Image from "next/image";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import routes from "@/lib/routes";
import {SearchParamProps} from "@/types";
import PasskeyModal from "@/components/PasskeyModal";

async function HomePage({searchParams}: SearchParamProps) {
    const {admin: isAdmin} = await searchParams;

    return (
        <div className={'flex h-screen max-h-screen'}>
            {isAdmin && (
                <PasskeyModal/>
            )}

            <section className={'remove-scrollbar container my-auto'}>
                <div className={'sub-container max-w-[496px]'}>
                    <Image src={'/assets/icons/logo-full.svg'} alt={'logo'} height={1000} width={1000} className={'mb-12 h-10 w-fit'}/>
                    <PatientForm/>
                    <div className={'flex mt-20 justify-between text-14-regular'}>
                        <p className={'copyright py-10'}>© 2025 CarePulse</p>
                        <Link href={routes.adminPath()} className={'text-green-500'}>Admin</Link>
                    </div>
                </div>

                <Link href={routes.registerPath('677e716a0032906a319f')} className={'text-yellow-300'}>Register Path</Link>
            </section>

            <Image src={'/assets/images/onboarding-img.png'} alt={'patient'} height={1000} width={1000} className={'side-img max-w-[50%]'}/>
        </div>
    );
}

export default HomePage;
