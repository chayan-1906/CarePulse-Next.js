import {Control} from "react-hook-form";
import {FormFieldType} from "@/components/forms/PatientForm";
import React from "react";
import {ColumnDef} from "@tanstack/react-table";

declare type SearchParamProps = {
    params: Promise<{ [key: string]: string }>;
    searchParams: Promise<{ [key: string]: string }>;
}

declare type Gender = "Male" | "Female" | "Other";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
    name: string;
    email: string;
    phone: string;
}

declare interface User extends CreateUserParams {
    $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
    userId: string;
    birthDate: Date;
    gender: Gender;
    address: string;
    occupation: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    primaryPhysician: string;
    insuranceProvider: string;
    insurancePolicyNumber: string;
    allergies: string | undefined;
    currentMedication: string | undefined;
    familyMedicalHistory: string | undefined;
    pastMedicalHistory: string | undefined;
    identificationType: string | undefined;
    identificationNumber: string | undefined;
    identificationDocument: FormData | undefined;
    privacyConsent: boolean;
}

declare type CreateAppointmentParams = {
    userId: string;
    patient: string;
    primaryPhysician: string;
    reason: string;
    schedule: Date;
    status: Status;
    note: string | undefined;
};

declare type UpdateAppointmentParams = {
    appointmentId: string;
    userId: string;
    appointment: Appointment;
    type: string;
};


export interface CustomProps {
    fieldType: FormFieldType;
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: any) => React.ReactNode;
}

export interface ButtonProps {
    isLoading: boolean;
    loadingText?: string;
    className?: string;
    children?: React.ReactNode;
}

export interface FileUploaderProps {
    files: File[] | undefined;
    onChange: (files: File[]) => void;
}

export interface StatCardProps {
    type: 'appointments' | 'pending' | 'cancelled';
    count: number;
    label: string;
    icon: string;
}

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}
