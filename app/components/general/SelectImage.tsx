import { FieldValues, UseFormRegister } from "react-hook-form"
import Input from "./Input"
import { useState } from "react"

interface SelectImageProps{
    onChange:(file: File)=> void
    multiple?: boolean
    accept?: string

}

const SelectImage:React.FC<SelectImageProps>=({onChange, multiple=false, accept="image/*"})=>{
    const onChangeFunc=(e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files && e.target.files.length>0){
            onChange(e.target.files[0])

        }

       }
     
    return(
        <div className="flex items-center gap-3 mb-4">
                <input className="mb-2 text-sm file:border-2 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-slate-200 file:text-slate-700 file:cursor-pointer hover:file:bg-slate-300" 
                onChange={onChangeFunc} type="file" accept={accept} multiple={multiple}/>
        </div>
    )
}

export default SelectImage