"use client";
import { useRouter } from "next/navigation";
const Logo = () => {
  const router= useRouter()
  return (
      <div onClick={()=>router.push("../")} className="text-2xl font-bold">Zelal <span className="text-orange-300">.celik</span></div>
  )
};

export default Logo;
 