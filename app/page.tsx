import Image from "next/image";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import routes from "@/lib/routes";

function Home() {
    return (
        <div className={'flex h-screen max-h-screen'}>
            {/** TODO: OTP Verification | PasskeyModal */}

            <section className={'remove-scrollbar container my-auto'}>
                <div className={'sub-container max-w-[496px]'}>
                    <Image src={'/assets/icons/logo-full.svg'} alt={'logo'} height={1000} width={1000} className={'mb-12 h-10 w-fit'}/>
                    <PatientForm/>
                    <div className={'flex mt-20 justify-between text-14-regular'}>
                        <p className={'justify-items-end text-dark-600 xl:text-left'}>© 2025 CarePulse</p>
                        <Link href={routes.adminPath()} className={'text-green-500'}>Admin</Link>
                    </div>
                </div>
            </section>

            <Image src={'/assets/images/onboarding-img.png'} alt={'patient'} height={1000} width={1000} className={'side-img max-w-[50%]'}/>
        </div>
    );
}

export default Home;
