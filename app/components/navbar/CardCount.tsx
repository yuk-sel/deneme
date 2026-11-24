"use client"
import UseCart from "@/hooks/useCart";
import { MdShoppingBasket } from "react-icons/md";
import { useRouter } from 'next/navigation'

const CardCount = () => {
  const {cartPrdcts}= UseCart()
  const router= useRouter()
  return (
      <div onClick={()=> router.push('/cart')} className="hidden md:flex relative gap-5">
        <MdShoppingBasket size="30"/> 
        <div className="absolute -top-2 -right-3 text-xs bg-orange-900 w-4 h-4 flex items-center justify-center rounded-full">{cartPrdcts?.length}</div>
      </div>
  )
};

export default CardCount;
 