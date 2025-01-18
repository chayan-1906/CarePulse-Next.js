'use client';

import {ColumnDef} from '@tanstack/react-table';
import {Appointment} from "@/types/appwrite.types";
import StatusBadge from "@/components/StatusBadge";
import {formatDateTime} from "@/lib/utils";
import {Doctors} from "@/constants";
import Image from "next/image";
import AppointmentModal from "@/components/AppointmentModal";

const columns: ColumnDef<Appointment>[] = [
    {
        header: 'ID',
        cell: ({row}) => {
            return (
                <p className={'text-14-medium'}>{row.index + 1}</p>
            );
        },
    },
    {
        accessorKey: 'patient',
        header: 'Patient',
        cell: ({row}) => {
            const appointment = row.original;

            return (
                <p className={'text-14-medium'}>{appointment.patient.name}</p>
            );
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({row}) => {
            const appointment = row.original;

            return (
                <div className={'min-w-[115px]'}>
                    <StatusBadge status={appointment.status}/>
                </div>
            );
        }
    },
    {
        accessorKey: 'schedule',
        header: 'Schedule',
        cell: ({row}) => {
            const appointment = row.original;

            return (
                <p className={'text-14-regular min-w-[100px]'}>
                    {formatDateTime(appointment.schedule).dateTime}
                </p>
            );
        }
    },
    {
        accessorKey: 'primaryPhysician',
        header: 'Doctor',
        cell: ({row}) => {
            const appointment = row.original;
            const doctor = Doctors.find((doctor) => doctor.name === appointment.primaryPhysician);

            return (
                <div className={'flex items-center gap-3'}>
                    <Image src={doctor?.image || ''} alt={doctor?.name || 'Doctor'} width={100} height={100} className={'size-8'}/>
                    <p className={'whitespace-nowrap'}>Dr. {doctor?.name}</p>
                </div>
            );
        },
    },
    {
        id: 'actions',
        header: () => (
            <div className={'pl-4'}>Actions</div>
        ),
        cell: ({row}) => {
            const appointment = row.original;

            return (
                <div className={'flex gap-1'}>
                    <AppointmentModal type={'schedule'} patientId={appointment.patient.$id} userId={appointment.userId} appointment={appointment} title={'Schedule Appointment'} description={'Please confirm the following details to schedule'}/>
                    <AppointmentModal type={'cancel'} patientId={appointment.patient.$id} userId={appointment.userId} appointment={appointment} title={'Cancel Appointment'} description={'Are you sure you want to cancel your appointment?'}/>
                </div>
            );
        },
    },
];

export default columns;