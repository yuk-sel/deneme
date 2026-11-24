"use client"
import Image from "next/image"
import {Rating} from "@mui/material";
import textClip from "@/utils/TextClip";
import { useRouter } from "next/navigation";
const ProductCard = ({product}: {product: any}) => {
    const router = useRouter();

    let productRating = product?.reviews ? product.reviews.reduce((acc: number, item: any) => acc + item.rating, 0) / product?.reviews?.length : 0;
    return (
        <div onClick={() => router.push(`/product/${product.id}`)} className= "w-[240px] cursor-pointer flex flex-1 shadow-lg p-2 rounded-md">
            <div className= "relative h-[200px] ">
                <Image src={product.image} fill alt={product.name} className="object-contain"/>
            </div>
            <div className= "text-center mt-2">   
                <div>   
                    {textClip(product.name)}
                </div>
                <Rating name= "read-only" value={productRating} readOnly/>
                <div className="text-orange-600 text-lg md:text-xl"> {product.price}  </div>
            </div>
        </div>
    )
};

export default ProductCard;