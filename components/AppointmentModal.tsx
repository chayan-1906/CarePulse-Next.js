import {useState} from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import AppointmentForm from "@/components/forms/AppointmentForm";
import {Appointment} from "@/types/appwrite.types";

function AppointmentModal({type, patientId, userId, appointment, title, description}: {
    type: 'schedule' | 'cancel';
    patientId: string;
    userId: string;
    appointment?: Appointment;
    title: string;
    description: string;
}) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'ghost'} className={`capitalize ${type === 'schedule' && 'text-green-500'}`} onClick={() => setOpen(true)}>{type}</Button>
            </DialogTrigger>
            <DialogContent className={'shad-dialog sm:max-w-md'}>
                <DialogHeader className={'mb-4 space-y-3'}>
                    <DialogTitle className={`capitalize ${type === 'cancel' && 'text-red-500'}`}>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        Please fill in the following details to {type} an appointment
                    </DialogDescription>
                </DialogHeader>

                <AppointmentForm type={type} userId={userId} patientId={patientId} appointment={appointment} setOpen={setOpen}/>
            </DialogContent>
        </Dialog>
    );
}

export default AppointmentModal;
