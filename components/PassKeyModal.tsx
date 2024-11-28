'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { decryptKey, encryptKey } from "@/lib/utils";
import Image from "next/image";
import {useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const PassKeyModal = () => {
    const router = useRouter();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [open, setOpen] = useState(false);
    const [passKey, setPassKey] = useState('')
    const [wrongOTP, setWrongOTP] = useState('');

    const localEncryptedKey = typeof window !=='undefined' ? window.localStorage.getItem('accessKey') : null;

    useEffect(() => {
        const acessKey = localEncryptedKey && decryptKey(localEncryptedKey);
        if(acessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY){

            setOpen(false);
            router.push('/admin')
        }
        

    
    }, [localEncryptedKey, router])
    
    
    const validatePasskey = () => {
        if(passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY){
            const encryptedKey = encryptKey(passKey);
            localStorage.setItem('accessKey', encryptedKey);
            setOpen(false);
            router.push('/admin')
        }
        else{
            setWrongOTP('Invalid OTP key. Please try again')
        }
    }
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            validatePasskey();
        }
    };

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
            <InputOTP maxLength={6} value={passKey} onChange={(value) => setPassKey(value)} onKeyDown={handleKeyDown}>
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
            onClick={() => validatePasskey()}
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