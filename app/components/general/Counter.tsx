
import {CardProductProps} from '../detail/DetailClient';
interface CounterProps{
    cardProduct: CardProductProps,
    increaseFunc: ()=> void,
    decreaseFunc: ()=> void
}
const Counter:React.FC<CounterProps> = ({cardProduct, increaseFunc, decreaseFunc }: CounterProps) => {
    const buttonStyle = "border flex w-7 h-8 items-center justify-center rounded-md text-lg hover:bg-gray-100"
    return (
        <div className="flex gap-2 items-center border w-fit rounded-md">   
            <div className={buttonStyle} onClick={decreaseFunc}>-</div>
            <div className="text-lg md:text-xl">{cardProduct.quantity}</div>
            <div className={buttonStyle} onClick={increaseFunc}>+</div>
        </div>
    )
}

export default Counter;