"use client"

import PageContainer from "../containers/PageContainer";
import {Rating } from "@mui/material";
import Image from "next/image";
import Counter from "../general/Counter";
import { useEffect, useState } from "react";
import Button from "../general/Button";
import Comment from "./Comment";
import Heading from "../general/Heading";
import useCart from "@/hooks/useCart";

export type CardProductProps = {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    inStock: boolean;
    quantity: number;
};

const DetailClient = ({ product }: { product: any }) => {
    const{productCartQty, addToBasket, cartPrdcts } = useCart()
    const[displayButton, setDisplayButton]= useState(false)
    const [cardProduct, setCardProduct] = useState<CardProductProps>({
        id: product?.id,
        name: product?.name,
        description: product?.description,
        image: product?.image,
        price: product?.price,
        inStock: product?.inStock,
        quantity: 1
    });
    console.log("productCartQty", productCartQty)
    console.log("AAAAAAAAAAAAAAAAAAAAAAcartPrdcts", cartPrdcts)

    useEffect(()=>{
        setDisplayButton(false)
        let controlDisplay:any= cartPrdcts?.findIndex(cart=>cart.id==product.id)
        if(controlDisplay>-1){
            setDisplayButton(true)
        }

    },[cartPrdcts])
    const increaseFunc = () => {
        if(cardProduct.quantity >= 10) return;
        setCardProduct((prev) => ({...prev, quantity: prev.quantity + 1 }));
    }
    const decreaseFunc = () => {
        if(cardProduct.quantity <= 1) return;
        setCardProduct((prev)=>({...prev, quantity: prev.quantity -1}))
    }
    let productRating = product?.reviews ? product.reviews.reduce((acc: number, item: any) => acc + item.rating, 0) / product?.reviews?.length : 0;

    return (
        <div className="my-10">
            <PageContainer> 
                <div className="block md:flex gap-10 justify-center">
                    <div className="relative h-[400px] w-[200px]"> 
                        <Image src={product?.image} fill alt=""/>
                    </div>
                    <div className="w-3/4 space-y-3"> 
                        <div className="text-xl md:text-2xl">{product?.name} </div>
                        <Rating name= "read-only" value={productRating} readOnly/>
                        <div className="text-slate-600">{product?.description}</div>
                        <div className="flex gap-2 items-center">   
                        <div> STOK DURMU: </div>
                            {
                            product?.inStock? <div className="text-green-500"> Stokta Var </div> : <div className="text-red-500"> Stokta Yok </div>
                            }
                        </div>
                        <div className="text-lg md:text-2xl text-orange-500">${product?.price.toFixed(2)}</div>

                        {
                            displayButton ? <>
                            <Button text="Ürün Sepete Ekli" small outline onClick={()=> {}}/>

                            </> : <>
                            <Counter increaseFunc={increaseFunc} decreaseFunc={decreaseFunc} cardProduct={cardProduct}/>
                            <Button text="Sepete Ekle" small onClick={()=> addToBasket?.(cardProduct)}/>
                            </>
                        }

                    </div>
                </div>

                <Heading text="Yorumlar" />
                <div>
                    {
                        product?.reviews?.map((prd: any) =>(
                            <Comment key={prd.id} prd={prd}/>
                        ))
                    }
                </div>
            </PageContainer>
        </div>
    )
}   

export default DetailClient;