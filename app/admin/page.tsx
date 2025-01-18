import Link from "next/link";
import Routes from "@/lib/routes";
import Image from "next/image";
import StatCard from "@/components/StatCard";
import {getRecentAppointmentList} from "@/lib/actions/appointment.actions";
import DataTable from "@/components/table/DataTable";
import columns from "@/components/table/columns";

async function AdminPage() {
    const appointments = await getRecentAppointmentList();
    const {scheduledCount, pendingCount, cancelledCount} = appointments;

    return (
        <div className={'flex flex-col mx-auto max-w-7xl space-y-14'}>
            <header className={'admin-header'}>
                <Link href={Routes.homePath()}>
                    <Image src={'/assets/icons/logo-full.svg'} alt={'logo'} height={32} width={162} className={'h-8 w-fit'}/>
                </Link>
                <p className={''}>Admin Dashboard</p>
            </header>

            <main className={'admin-main'}>
                <section className={'w-full space-y-4'}>
                    <h1 className={'header'}>Welcome 👋</h1>
                    <p className={'text-dark-700'}>Start the day with managing new appointments</p>
                </section>

                <section className={'admin-stat'}>
                    <StatCard type={'appointments'} count={scheduledCount} label={'Scheduled Appointments'} icon={'/assets/icons/appointments.svg'}/>
                    <StatCard type={'pending'} count={pendingCount} label={'Pending Appointments'} icon={'/assets/icons/pending.svg'}/>
                    <StatCard type={'cancelled'} count={cancelledCount} label={'Cancelled Appointments'} icon={'/assets/icons/cancelled.svg'}/>
                </section>

                <DataTable columns={columns} data={appointments.documents}/>
            </main>
        </div>
    );
}

export default AdminPage;
