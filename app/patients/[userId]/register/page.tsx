import Image from "next/image";
import RegisterForm from "@/components/forms/RegisterForm";
import {getUser} from "@/lib/actions/patient.actions";
import {SearchParamProps} from "@/types";

async function RegistrationPage({params, searchParams}: SearchParamProps) {
    const {userId} = await params;
    const user = await getUser(userId);

    return (
        <div className={'flex h-screen max-h-screen'}>
            {/** TODO: OTP Verification | PasskeyModal */}

            <section className={'remove-scrollbar container'}>
                <div className={'flex flex-col flex-1 py-10 sub-container max-w-[860px]'}>
                    <Image src={'/assets/icons/logo-full.svg'} alt={'logo'} height={1000} width={1000} className={'mb-12 h-10 w-fit'}/>
                    <RegisterForm user={user}/>
                    <p className={'copyright py-12'}>© 2025 CarePulse</p>
                </div>
            </section>

            <Image src={'/assets/images/register-img.png'} alt={'patient'} height={1000} width={1000} className={'side-img max-w-[390px]'}/>
        </div>
    );
}

export default RegistrationPage;
