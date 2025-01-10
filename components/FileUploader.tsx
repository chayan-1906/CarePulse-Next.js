'use client';

import {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {FileUploaderProps} from "@/types";
import Image from "next/image";
import {convertFileToUrl} from "@/lib/utils";

function FileUploader({files, onChange}: FileUploaderProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles);
    }, [onChange]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()} className={'file-upload'}>
            <input {...getInputProps()} />
            {(files && files.length > 0) ? (
                <Image src={convertFileToUrl(files[0])} alt={'uploaded-image'} height={1000} width={1000} className={'max-h-[400px] overflow-hidden object-cover'}/>
            ) : (
                <Image src={'/assets/icons/upload.svg'} alt={'upload'} height={40} width={40}/>
            )}
            <div className={'file-upload_label'}>
                <p className={'text-14-regular'}>
                    <span className={'text-green-500'}>Click to upload</span> or drag and drop
                </p>
                <p>SVG, PNG, JPG or GIF (max 800x400)</p>
            </div>
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag & drop some files here or click to select files</p>
            }
        </div>
    );
}

export default FileUploader;
