"use client"

import { User } from "@prisma/client";
import { useState } from "react";
import{ AiOutlineUser } from 'react-icons/ai'
import { useRouter } from "next/navigation";
import {signOut} from "next-auth/react"
import LoginClient from "../auth/LoginClient"

interface UserProps{
  currentUser: User | null | undefined
}
const User:React.FC<UserProps> = ({currentUser}) => {
  const [openMenu, setOpenMenu]= useState(false)
  console.log(currentUser, "currentUser")
  const router= useRouter()
  
  const menuFunc=(type:any)=>{
    setOpenMenu(false)
    if(type=="logout"){
      signOut()
      router.push("/Login")
    }
    if(type=="register"){
      router.push("/register")
    }
    if(type=="login"){
      router.push("/Login")
    }
    

  }
  return (
      <div className="hidden md:flex relative"> 
        <div onClick={()=>setOpenMenu(!openMenu)} className="flex items-center gap-1 cursor-pointer">
          <AiOutlineUser size="25"/>
          <div className="text-sm">{currentUser ? currentUser.name: "Kullanıcı İşlemleri"}</div>
        </div>
        <div>
          {
            openMenu &&(
              <div className="cursor-pointer absolute w-[200px] top-10 bg-white shadow-lg right-0 p-2 rounded-md">
                {
                  currentUser ?(
                    <div className="space-y-1">
                      <div onClick={()=>router.push('/admin')} className="text-slate-600">Admin</div>
                      <div onClick={()=>menuFunc("logout")} className="text-slate-600">Çıkış Yap</div>
                    </div>
                  ): (
                    <div className="space-y-1">
                      <div onClick={()=>menuFunc("register")} className="text-slate-600">Kayıt Ol</div>
                      <div onClick={()=>menuFunc("login")} className="text-slate-600">Giriş Yap</div>
                    </div>
                  )

              }

              </div>
            )
          }
        </div>
      </div>
  )
};

export default User;
 