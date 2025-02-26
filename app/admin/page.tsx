import {DataTable} from '@/components/DataTable'
import StatCard from '@/components/StatCard'
import { columns } from '@/components/table/colums'
import { getRecentAppointmentsList } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



const Admin = async() => {
    const appointments = await getRecentAppointmentsList()
    return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
        <header className='admin-header'>
            <Link href='/' className='cursor-pointer'>
                <Image
                src='/assets/images/logo-full-livecare.png'
                alt='logo'
                width={162}
                height={32}
                className='h-8 w-fit'
                />
            </Link>
            <p className='text-16-semibold'>Admin Dashboard</p>
        </header>
        <main className='admin-main'>
            <section className='w-full space-y-4'>
                <h1 className='header'>Welcome 👋</h1>
                <p className='text-dark-700'>Start managing your appointments.</p>
            </section>
            <section className='admin-stat'>
                <StatCard
                    type='appointments'
                    count={appointments.scheduledCount}
                    label='Scheduled appointments'
                    icon='/assets/icons/appointments.svg'
                />
                <StatCard
                    type='pending'
                    count={appointments.pendingCount}
                    label='Pending appointments'
                    icon='/assets/icons/pending.svg'
                />
                <StatCard
                    type='cancelled'
                    count={appointments.cancelledCount}
                    label='Cancelled appointments'
                    icon='/assets/icons/cancelled.svg'
                />
            </section>
            <DataTable columns={columns} data={appointments.documents} />
        </main>
    </div>
    )
}

export default Admin