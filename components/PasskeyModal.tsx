'use client';

import {AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle} from "@/components/ui/alert-dialog";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import Routes from "@/lib/routes";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp";
import {decryptKey, encryptKey} from "@/lib/utils";

function PasskeyModal() {
    const router = useRouter();
    const pathName = usePathname();
    const [open, setOpen] = useState(true);
    const [passkey, setPasskey] = useState('');
    const [error, setError] = useState('');

    const closeModal = () => {
        setOpen(false);
        router.push(Routes.homePath());
    }

    const encryptedKey = typeof window !== 'undefined' ? localStorage.getItem('accessKey') : null;

    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            const encryptedPasskey = encryptKey(passkey);
            localStorage.setItem('accessKey', encryptedPasskey);
            setOpen(false);
        } else {
            setError('Invalid passkey, please try again.');
        }
    }

    useEffect(() => {
        const accessKey = encryptedKey && decryptKey(encryptedKey);

        if (pathName) {
            if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
                setOpen(false);
                router.replace(Routes.adminHomePath());
            } else {
                setOpen(true);
            }
        }
    }, [encryptedKey, passkey, pathName, router]);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className={'shad-alert-dialog'}>
                <AlertDialogHeader className={'flex'}>
                    <AlertDialogTitle className={'flex items-center justify-between'}>
                        Admin Access Verification
                        <Image src={'/assets/icons/close.svg'} alt={'close'} width={20} height={20} onClick={closeModal} className={'cursor-pointer'}/>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        To access the admin page, please enter the passkey
                    </AlertDialogDescription>

                    <div>
                        <InputOTP maxLength={6} autoFocus value={passkey} onChange={(value) => setPasskey(value)}>
                            <InputOTPGroup className={'shad-otp'}>
                                <InputOTPSlot index={0} className={'shad-otp-slot'}/>
                                <InputOTPSlot index={1} className={'shad-otp-slot'}/>
                                <InputOTPSlot index={2} className={'shad-otp-slot'}/>
                            </InputOTPGroup>
                            <InputOTPSeparator/>
                            <InputOTPGroup className={'shad-otp'}>
                                <InputOTPSlot index={3} className={'shad-otp-slot'}/>
                                <InputOTPSlot index={4} className={'shad-otp-slot'}/>
                                <InputOTPSlot index={5} className={'shad-otp-slot'}/>
                            </InputOTPGroup>
                        </InputOTP>

                        {error && (
                            <p className={'shad-error text-14-regular mt-4 flex justify-center'}>{error}</p>
                        )}
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogAction onClick={(e) => validatePasskey(e)} className={'shad-primary-btn w-full'}>
                            Validate Passkey
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default PasskeyModal;
