import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { notFound } from 'next/navigation'
import { SearchParamProps } from '@/types';


const SuccessPage = async ({ params, searchParams }: SearchParamProps) => {
    const { userId } = params; // params is always synchronous
    const appointmentId = Array.isArray(searchParams?.appointmentId) 
    ? searchParams.appointmentId[0] 
    : searchParams?.appointmentId || '';// searchParams is also synchronous

    const appointment = await getAppointment(appointmentId);
    if (!appointment) {
        notFound();
    }
    return (
    <div className='flex h-screen max-h-screen px-[5%]'>
        <div className='success-img'>
            <Link href='/'>
                <Image
                src='/assets/icons/logo-full.svg'
                width={1000}
                height={1000}
                alt='logo'
                className='h-10 w-fit'
                />
            </Link>
            <section className='flex flex-col items-center '>
                <Image
                                src='/assets/gifs/success.gif'
                                width={300 }
                                height={280}
                                alt='success'
                />
                <h2 className='header mb-6 max-w-[600px] text-center'>
                    Your <span className='text-green-500'>apponitment request</span> has been successfully submitted!
                </h2>
                <p>We will be in touch shortly to confirm.</p>
            </section>
            <section className='request-details'>
                <p>Requested appointment details</p>
                <div className='flex items-center gap-3'>
                        {doctor &&                     <Image
                        src={doctor.image!}
                        alt='doctor'
                        width={100}
                        height={100}
                        className='size-6'
                    />}
                    <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
                </div>
                <div className='flex gap-2'>
                    <Image 
                        src='/assets/icons/calendar.svg'
                        alt='calendar'
                        width={24}
                        height={24}

                    />
                    <p>{formatDateTime(appointment?.schedule).dateTime}</p>
                </div>
            </section>
            <Button variant='outline' className='shad-primary-btn' asChild>
                <Link href={`/patients/${userId}/new-appointment`}>
                    New Appointment
                </Link>
            
            </Button>
            <p className="copyright mt-1 py-5">
                © 2024 NETFINITY
            </p>
        </div>
    </div>
    )
}

export default SuccessPage