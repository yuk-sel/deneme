"use client"
import { FaComputer } from "react-icons/fa6";
import { GiBallerinaShoes } from "react-icons/gi";
import { FaTabletAlt } from "react-icons/fa";
import { CiMicrophoneOn } from "react-icons/ci";
import { RiInputField } from "react-icons/ri"
import Heading from "../general/Heading"
import Input from "../general/Input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Checkbox from "../general/Checkbox"
import ChoiceInput from "../general/ChoiceInput"
import Button from "../general/Button";
import SelectImage from "../general/SelectImage";
import { useState } from "react";
import toast from "react-hot-toast";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import firebaseApp from'@/libs/firebase'
import { supabase } from "@/libs/supabase";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateForm=()=>{
    const [img, setImg]=useState<File | null>(null)
    const [uploadedImg, setUploadedImg] =useState<string | null>(null) //firebase
    const [isLoading, setIsLoading] = useState(false); //supabase
    const router= useRouter()
    const categoryList = [
      {
         name: "Bilgisayar",
         icon: FaComputer
      },
      {
         name: "Ayakkabı",
         icon: GiBallerinaShoes
      },
      {
         name: "Tablet",
         icon: FaTabletAlt
      },
      {
         name: "Mikrofon",
         icon: CiMicrophoneOn
      },
      {
         name: "Ayakkabı1",
         icon: FaComputer
      },
      {
         name: "Ayakkabı2",
         icon: FaComputer
      },
   ]

        const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
      } = useForm<FieldValues>({
        defaultValues:{
            name: "",
            description:"",
            brand: "",
            category:"",
            price: "",
            image: "",
            inStock: false
        }
        
      })
       const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log("data", data)

        let firebaseUrl: string | null = null; // [EKLENDİ] Firebase URL'sini tutmak için
        let supabaseUrl: string | null = null; // [EKLENDİ] Supabase URL'sini tutmak için
        

        const handleChange= async()=>{
            toast.success('Yükleme işlemi başarılı...')
            try{
                //FIREBASE
                /*
                const storage = getStorage(firebaseApp);
                const storageRef = ref(storage, 'images/shop.jpg');
                const uploadTask = uploadBytesResumable(storageRef, img);
                
                await new Promise<void>((resolve, reject)=>{
                    uploadTask.on('state_changed', 
                        (snapshot) => {
                            // Observe state change events such as progress, pause, and resume
                            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                            switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                            }
                        }, 
                        (error) => {
                            reject(error)
                        }, 
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            firebaseUrl= downloadURL
                            uploadeddImg= downloadURL
                            resolve()
                            setUploadedImg( downloadURL)
                            });
                            
                        }
                        );
                })
                //FIREBASE BİTTİ
                */
                 
                //SUPABASE
                if(img){
                    const fileExt = img.name.split(".").pop() || "jpg" 
                    const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`
                    const filePath = `images/${fileName}`
                    const {data: uploadData, error}= await supabase.storage
                        .from('shopzell')
                        .upload(filePath, img, {
                            cacheControl: "3600", 
                            upsert: false, 
                            contentType: img.type, 
                        })
                    if(error){
                        toast.error('Resim eklenirken bir hata oluştu!')
                        console.error("Supabase upload error:", error) // [DÜZELTİLDİ]
                        return
                    }
                    const {data: publicUrlData}= supabase.storage
                        .from('shopzell')
                        .getPublicUrl(uploadData.path)
                    supabaseUrl = publicUrlData.publicUrl;
                    setUploadedImg(publicUrlData.publicUrl)
                }
                //SUPABASEBİTTİ

            }
            catch(error){
                toast.error("Hata oluştu.")
            }

        }
        await handleChange()

        let newData= {
            ...data,
            image: supabaseUrl ?? firebaseUrl ?? uploadedImg,
            firebaseImage: firebaseUrl,
            supabaseImage: supabaseUrl,
        }

        axios.post('/api/product', newData)
        .then(()=>{
            toast.success('Ürün ekleme işlemi başarılı')
            router.refresh()
            reset()


        }).catch((error)=>{
            console.log(error, 'error')
        })


        console.log(newData, "NEWDATAA")
       }

       const category= watch('category')
       const setCustomValue= (id: string, value:any)=>{
        setValue(id, value,{
            shouldDirty:true,
            shouldTouch: true,
            shouldValidate: true
        })
        
       }
       /*const onChangeFunc=(e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files && e.target.files.length>0){
            setImg(e.target.files[0])
        }
        console.log(img, "img")

       }*/
      console.log(img, "img")
       
    return(
        <div>
            <Heading text="Ürün oluştur" center/>
            <Input 
                placeholder="Ürün Adı"
                type="text"
                id="name"
                register={register}
                errors={errors}/>

                <Input 
                placeholder="Açıklama"
                type="text"
                id="description"
                register={register}
                errors={errors}/>

                <Input 
                placeholder="Marka"
                type="text"
                id="brand"
                register={register}
                errors={errors}/>

                <Input 
                placeholder="Fiyat"
                type="Number"
                id="price"
                register={register}
                errors={errors}/>

                <Checkbox 
                id="inStock"
                label="Ürün Stokta Mevcut mu?"
                register={register}
                />

                <div className="flex flex-wrap gap-3">
                    {
                        categoryList.map((cat, i)=>(
                            <ChoiceInput 
                                key={i}
                                icon={cat.icon} 
                                text={cat.name} 
                                onClick={(category)=> setCustomValue("category", category)}
                                selected={category== cat.name}/>
                            ))
                    }
                </div>
                <SelectImage
                    onChange={(file) => setImg(file)}
                />

                
                <Button text="ürün oluştur" onClick={handleSubmit(onSubmit) }/>
                

        </div>
    )
}

export default CreateForm