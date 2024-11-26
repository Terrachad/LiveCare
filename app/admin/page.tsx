import {DataTable} from '@/components/DataTable'
import StatCard from '@/components/StatCard'
import { columns, Payment } from '@/components/table/colums'
import { getRecentAppointmentsList } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      // ...
    ]
  }


const Admin = async() => {
    const data = await getData()
    const appointments = await getRecentAppointmentsList()
    return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
        <header className='admin-header'>
            <Link href='/' className='cursor-pointer'>
                <Image
                src='/assets/icons/logo-full.svg'
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
            <DataTable columns={columns} data={data} />
        </main>
    </div>
    )
}

export default Admin