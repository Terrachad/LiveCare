"use client"

import { convertFileToUrl } from '@/lib/utils'
import { FileUploaderProps } from '@/types'
import Image from 'next/image'
import React from 'react'
import {useDropzone} from 'react-dropzone'

const FileUploader = ({files, onChange} : FileUploaderProps) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => {
          onChange(acceptedFiles)
        },
        accept: {
          'image/*': ['.svg', '.png', '.jpeg', '.jpg', '.gif', '.heic']
        },
        maxSize: 5 * 1024 * 1024, // 5MB
        multiple: false
      })
  
    return (
      <div {...getRootProps()} className='file-upload'>
        <input {...getInputProps()} />
        {files && files?.length > 0 ? (
            <Image
            src={convertFileToUrl(files[0])}
            width={1000}
            height={1000}
            alt='uploaded-img'
            className='max-h-[400px] overflow-hidden object-cover'
            />
        ) : (
            <>
            <Image
                src='/assets/icons/upload.svg'
                width={40}
                height={40}
                alt='upload'
                className='max-h-[400px] overflow-hidden object-cover'
                />
                <div className='file-upload_label'>
                    <p className='text-14-regular'>
                        <span className='text-green-500'>Click to upload</span> or drag and drop
                    </p>
                    <p>
                        .SVG .PNG .JPEG .JPG .GIF .HEIC (max 5MB)
                    </p>
                </div>
            </>
        )}
        {
          isDragActive ?
            <p>Drop the files here ...</p> : <p></p>
        }
      </div>
    )
  }

  export default FileUploader