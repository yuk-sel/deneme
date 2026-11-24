import { FieldValues, UseFormRegister } from "react-hook-form"
import Input from "./Input"

interface ChecboxProps{
    id: string
    register: UseFormRegister<FieldValues>
    label: string
}

const Checkbox:React.FC<ChecboxProps>=({id, register, label})=>{
    return(
        <div className="flex items-center gap-1">
            <input type="checkbox" {...register(id)}/>
            <label className="text-sm text-slate-500 my-2 gap-2" htmlFor={id}>{label}</label>
        </div>
    )
}

export default Checkbox