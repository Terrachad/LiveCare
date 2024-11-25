'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { encryptKey } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const PassKeyModal = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const path = usePathname();
    const [passKey, setPassKey] = useState('')
    const [wrongOTP, setWrongOTP] = useState('');

    const localEncryptedKey = typeof window !=='undefined' ? window.localStorage.getItem('accessKey') : null;

    useEffect(() => {
    if(path){
        if(passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY){
            setOpen(false);
            router.push('/admin')
        }
        else{
            setOpen(true)
        }
    }
    }, [localEncryptedKey])
    

    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault();
        if(passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY){
            const encryptedKey = encryptKey(passKey);
            localStorage.setItem('accessKey',encryptedKey);
            setOpen(false);
        }
        else{
            setWrongOTP('Invalid OTP key. Please try again')
        }
    }

    const closeModal = () => {{
        setOpen(true);
        router.push('/')
    }}
    return (
        <AlertDialog open={true} onOpenChange={setOpen}>
        <AlertDialogContent className="shad-alert-dialog">
            <AlertDialogHeader>
            <AlertDialogTitle className="flex items-start justify-between">
                Admin Acess Verification
                <Image
                    src='/assets/icons/close.svg'
                    alt="close"
                    width={20}
                    height={20}
                    onClick={()=>closeModal()}
                    className="cursor-pointer"
                />
                </AlertDialogTitle>
            <AlertDialogDescription>
                To acess the admin page, please enter the passkey.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <div>
            <InputOTP maxLength={6} value={passKey} onChange={(value) => setPassKey(value)}>
                <InputOTPGroup className="shad-otp">
                    <InputOTPSlot className="shad-otp-slot" index={0} />
                    <InputOTPSlot className="shad-otp-slot" index={1} />
                    <InputOTPSlot className="shad-otp-slot" index={2} />
                    <InputOTPSlot className="shad-otp-slot" index={3} />
                    <InputOTPSlot className="shad-otp-slot" index={4} />
                    <InputOTPSlot className="shad-otp-slot" index={5} />
                </InputOTPGroup>
                </InputOTP>
                {wrongOTP && <p className="shad-error text-14-regular mt-4 flex justify-center">{wrongOTP}</p>}
            </div>
            <AlertDialogFooter>
            <AlertDialogAction 
            onClick={(e) => validatePasskey(e)}
            className="shad-primary-btn w-full"
            
            >
                Enter Admin Passkey
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>


    )
}

export default PassKeyModal