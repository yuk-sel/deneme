"use client"
import { CardProductProps } from "@/app/components/detail/DetailClient";
import { StdioNull } from "node:child_process";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
interface CartContextProps {
    productCartQty: number
    cartPrdcts: CardProductProps[] | null
    addToBasket?: (product: CardProductProps) => void
    addToBasketIncrease: (product: CardProductProps) => void
    removeFromCart?: (product: CardProductProps) => void
    addToBasketDecrease: (product: CardProductProps) => void
    removeCart?: () => void

}
const CartContext= createContext<CartContextProps | null>(null)

interface Props {
    [propName:string]: any
}

export const CartContextProvider =(props: Props)=>{
    const [productCartQty, setProductCartQty] = useState(0)
    const [cartPrdcts, setCartPrdcts] = useState<CardProductProps[] | null>(null)

    useEffect(()=>{
        let getItem: any=localStorage.getItem('cart')
        let getItemParse: CardProductProps[] | null= JSON.parse(getItem)
        setCartPrdcts(getItemParse)

    },[])

    //Sepette ürün arttırma
    const addToBasketIncrease= useCallback((product: CardProductProps)=>{
        let updatedCart
        if(product.quantity==10){
            return toast.error("Daha fazla ürün eklenemez")
        }
        if(cartPrdcts){
            updatedCart= [...cartPrdcts]
            const existingItem= cartPrdcts.findIndex(item=>item.id=== product.id)

            if(existingItem){
                updatedCart[existingItem].quantity =++updatedCart[existingItem].quantity
            }
            setCartPrdcts(updatedCart)
            localStorage.setItem('cart', JSON.stringify(updatedCart))
        }

    },[cartPrdcts])

    //Sepette ürün azaltma

    const addToBasketDecrease=useCallback((product: CardProductProps)=>{
        let updatedCart
        if(product.quantity==1){
            return toast.error("Ürün 1den az olamaz")

        }
        if(cartPrdcts){
            updatedCart=[...cartPrdcts]
            const existingItem= cartPrdcts.findIndex(item=>item.id===product.id)

            if(existingItem){
                updatedCart[existingItem].quantity =-- updatedCart[existingItem].quantity
            }
            setCartPrdcts(updatedCart)
            localStorage.setItem('cart', JSON.stringify(updatedCart))

        }

    },[cartPrdcts])


    //Tüm sepeti Silme
    const removeCart= useCallback(()=>{
        setCartPrdcts(null)
        toast.success("Sepet başarıyla silindi.")
        localStorage.setItem('cart', JSON.stringify(null))

    },[cartPrdcts])

    const addToBasket = useCallback((product: CardProductProps)=>{
        setCartPrdcts(prev=>{
            let updatedCart;
            if(prev){
                updatedCart = [...prev, product]
            }
            else
            {
                updatedCart = [product]
            }
            toast.success("Ürün başarıyla sepete eklendi.")
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            return updatedCart      
        })
    }, [cartPrdcts])

    const removeFromCart= useCallback((product: CardProductProps)=>{
        if(cartPrdcts){
            const filteredProducts= cartPrdcts.filter(cart=>cart.id!== product.id)
            setCartPrdcts(filteredProducts)
            toast.success("Ürün sepetten silindi.")
            localStorage.setItem('cart', JSON.stringify(filteredProducts))
        
        }

    }, [cartPrdcts])


    let value={
        productCartQty,
        addToBasket,
        cartPrdcts,
        removeFromCart,
        removeCart,
        addToBasketIncrease,
        addToBasketDecrease
    }
    return(
        <CartContext.Provider value={value}{...props}/>
    )
}
const UseCart = ()=>{
    const context = useContext(CartContext)
    if (context==null){
        throw new Error("hata var")
    }
    return context
}
export default UseCart