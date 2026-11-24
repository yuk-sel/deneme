"use client"

import Input from "../general/Input"
import AuthContainer from "../containers/AuthContainer"
import Heading from "../general/Heading"
import Button from "../general/Button"
import { FieldValues, useForm, type SubmitHandler } from "react-hook-form"
import { FaGoogle } from "react-icons/fa";
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { User } from "@prisma/client"
import { useEffect } from "react"

interface LoginClientProps{
  currentUser: User | null | undefined
}

const LoginClient:React.FC<LoginClientProps>=({currentUser})=>{
    const router= useRouter()
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "" },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    signIn('credentials',{
        ...data,
        redirect: false
    }).then((callback)=>{
            if(callback?.ok){
                router.push('/..')
                router.refresh()
                toast.success("Giriş Başarılı")
            }

            if(callback?.error){
                toast.error(callback.error)
            }

        })

    }

    useEffect(()=>{
        if(currentUser){
            router.push('/..')
            router.refresh()

        }
    },[])

    return(
        <AuthContainer>
            <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md">
                <Heading text="Giriş" center/>
                <Input placeholder="Email" type="text" id="email" register={register} errors={errors} required />
                <Input placeholder="Şifre" type="text" id="password" register={register} errors={errors} required />
                <Button text="Giriş Yap"  onClick={handleSubmit(onSubmit)}/>
                <div className="text-center my-2 text-sm"> Bir hesabın yok mu? <Link className="underline" href="/register">Kayıt ol</Link></div>
                <div className="text-center my-2 font-bold tex-lg">YA DA</div>
                <Button text="Google İle Giriş Yap" icon= {FaGoogle} outline onClick={()=>signIn('google')}  />
                
            </div>
        </AuthContainer>
    )
}
export default LoginClient