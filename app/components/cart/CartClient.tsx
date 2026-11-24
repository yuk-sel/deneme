"use client"

import UseCart from "@/hooks/useCart"
import PageContainer from "../containers/PageContainer"
import Image from "next/image"
import Button from "../general/Button"
import { CardProductProps } from "../detail/DetailClient"
import Counter from "../general/Counter"


const CartClient= () =>{
    const {cartPrdcts, removeFromCart, removeCart,addToBasketIncrease, addToBasketDecrease}= UseCart()
    console.log(cartPrdcts, 'cartPrdcts')
    
    if(!cartPrdcts || cartPrdcts.length==0){

        return <div>Sepet boş...</div>
    }

    let cartPrdctsTotal= cartPrdcts.reduce((acc: any, item: CardProductProps)=>acc+ item.quantity* item.price, 0)
    return(
        <div className="my-3 md:my-10 ">
            <PageContainer>
                <div className="flex items-center gap-3 text-center border-b py-3">
                    <div className="w-1/5">Ürün Resmi</div>
                    <div className="w-1/5">Ürün Adı</div>
                    <div className="w-1/5">Ürün Miktarı</div>
                    <div className="w-1/5">Ürün Fiyatı</div>
                    <div className="w-1/5">Ürün Sil</div>
                </div>
                <div>
                    {
                        cartPrdcts.map(cart=>(
                            <div key={cart.id} className="flex items-center text-center my-3">
                                <div className="w-1/5 justify-center items-center">
                                    <Image src={cart?.image} width={40} height={40} alt=""/>
                                </div>
                                <div className="w-1/5">{cart.name}</div>
                                <div className="w-1/5 flex justify-center">
                                    <Counter cardProduct={cart} increaseFunc={()=>addToBasketIncrease(cart)} decreaseFunc={()=>addToBasketDecrease(cart)}/>
                                
                                </div>
                                <div className="w-1/5 text-orange-600 text-lg md:text-2xl">{cart.price}</div>
                                <div className="w-1/5">
                                    <Button text="Ürünü Sil" small onClick={() => removeFromCart?.(cart)}/>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="flex items-center justify-between my-5 py-5 border-t">
                    <button onClick={()=>removeCart?.()} className="w-1/5 underline text-sm bg-red-600 h-8"> Sepeti Sil</button>
                    <div className="text-lg md:2xl">{cartPrdctsTotal}</div>
                </div>
                
            </PageContainer>
        </div>
    )
}

export default CartClient