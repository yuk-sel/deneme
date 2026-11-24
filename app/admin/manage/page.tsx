import { getCurrentUser } from "@/app/actions/getCurrentUser"
import getProducts from "@/app/actions/getProducts"
import ManageClient from "@/app/components/admin/ManageCllient"
import AuthContainer from "@/app/components/containers/AuthContainer"
import WarningText from "@/app/components/WarningText"

const Manage=async()=>{
    const products= await getProducts({category: null})
    const currentUser= await getCurrentUser()

    if(!currentUser || currentUser?.role!='ADMIN'){
        return(
        <WarningText text="Yetki Yok."/>
        )  
    }
    return(
           <div className="width-full m-2">
             <ManageClient products= {products}/>
           </div> 
    )
}

export default Manage