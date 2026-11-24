"use client"
import { Product } from '@prisma/client'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import firebaseApp from '@/libs/firebase';
import { supabase } from '@/libs/supabase';
import { deleteObject, getStorage, ref } from "firebase/storage"
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ManageClientProps{
    products: Product[]
}

const ManageClient:React.FC<ManageClientProps> =({products})=>{
    const storage=getStorage(firebaseApp) //firebase
    const bucket = supabase.storage.from("shopzell")
    const router= useRouter()
    let rows: any=[]
    if(products){
        rows=products.map((product)=>{
            return{
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                image: product.image
            }
        })

    }
    const columns: GridColDef[]=[
        {field: "id", headerName: "ID", width:200},
        {field: "name", headerName: "Name", width:150},
        {field: "price", headerName: "Price", width:100},
        {field: "category", headerName: "Category", width:100},
        {field: "brand", headerName: "BrandID", width:100},
        {field: "inStock", 
            headerName: "InStock", 
            width:100,
            renderCell:(params)=>{
                return(
                    <div>
                        {params.row.inStock==true ? "Stokta Mevcut": "Stokta Mevcut Değil"}
                    </div>
                )
            }
        },
        {field: "action", 
            headerName: "Action", 
            width:100,
            renderCell:(params)=>{
                return(
                    <button onClick={()=>handleDelete(params.row.id, params.row.image )} className='mx-4 text-red-500 cursor-pointer'>
                        Sil
                        
                        
                    </button>
                )
            }
        },
        
    ]
    const handleDelete= useCallback(async(id: string, image: any)=>{
        toast.success("Siliniyor...")
        const handleDeleteImg= async()=>{
            try{
          //  const imageRef= ref(storage, "silinmesi gereken dosya" ) firebase
           // await deleteObject(imageRef) firebase
           const {data: deletedData, error}= await supabase.storage //supabase
           .from("shopzell") //supabase
           .remove(["silinmesi gereken dosya"])

           if(error){
            console.error("Supabase silme hatası:", error);
                throw error;
           }


        }catch(error){
            toast.error('Ürün silinirken bir hata oluştu. Tekrar deneyiniz.')
        }

        }
        await handleDeleteImg()
        //sildirme işlemleri
        axios.delete(`/api/product/${id}`)
        .then(()=>{
            toast.success("Silme işlemi başarıyla gerçeklişti")
            router.refresh()
        })
        .catch((error: any)=>{
            console.log(error, "error")
        })
    },[])
    return(
        <div>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel:{page:0, pageSize:5} } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
               />

        </div>
        )
}
export default ManageClient