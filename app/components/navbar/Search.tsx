import { IoSearchOutline } from "react-icons/io5";
const Search = () => {
  return (
      <div className= "gap-3 flex flex-1 hidden md:flex">
        <input className="border py-2 px-3 flex flex-1 " type="text" placeholder="Ürün ara..."/>
        <button className="border-transparent py-2 px-3 bg-orange-600">Ara</button> <IoSearchOutline size={10}/>
      </div>
  )
};

export default Search;
 