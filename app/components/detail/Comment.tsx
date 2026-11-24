"use client"

import { Rating } from "@mui/material";
import Avatar from "../general/Avatar";
import {RxAvatar} from "react-icons/rx"
const Comment = ({ prd }: { prd: any }) => {
    return (
        <div className="border w-full md:w-1/2 p-2 rounded-lg my-3"> 
            {/* <Avatar image={prd?.user?.image} /> */}
            <div className="flex gap-2 items-center">
                <RxAvatar size={45} />
                <div>
                    <div>  {prd?.user?.name} </div>
                    <Rating name= "read-only" value={prd?.user?.rating} readOnly/>
                </div>
            </div>
            <div className="text-slate-600">{prd.comment}</div>
        </div>
    )
}

export default Comment;