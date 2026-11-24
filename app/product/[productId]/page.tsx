
import DetailClient from '@/app/components/detail/DetailClient';
import { products } from '@/utils/Products';

type DetailProps={
    productId?: string;
}

const Detail = async ({params}: {params: Promise<DetailProps>}) => {
    const {productId} = await params;

    const product= products.find(product => product.id == productId);
    console.log(product, "product")
    console.log(params, "params")
    return (
        <div>
            <DetailClient product={product}/>
        </div>
    )
};

export default Detail;