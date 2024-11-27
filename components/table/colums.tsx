  "use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {StatusBadge} from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import Image from "next/image"
import { Doctors } from "@/constants"
import AppointmentsModal from "../AppointmentModal"
import AppointmentModal from "../AppointmentModal"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "scheduled" | "cancelled";
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    header: 'ID',
    cell: ({row}) => <p className="text-14-medium">{row.index + 1}</p>
  },
  {
    accessorKey: 'patient',
    header: 'Patient',
    cell: ({row}) =>
       {
        const appointment = row.original

        return(
          <p className="text-14-medium">{appointment.patient.name}</p>
        )
       }

  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status}/>
      </div>
    )
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({row}) => (
      <div className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </div>
    )
  },
  {
    accessorKey: "primaryPhisician",
    header: () => 'Doctor',
    cell: ({ row }) => {
      const doctor = Doctors.find((doc) => doc.name === row.original.primaryPhysician)

      return (
        <div className="flex items-center gap-3">
          <Image src={doctor?.image}
            alt={doctor.name}
            width={100}
            height={100}
            className='size-8'
          />
          <p className="whitespace-nowrap">
            Dr. {doctor?.name}
          </p>
        </div>
      )
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const payment = row.original
      
      return (
          <div className="flex gap-1">
              <AppointmentModal/>
          </div>
      )
    },
  },
]