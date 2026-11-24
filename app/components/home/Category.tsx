"use client";
const Category = () => {
    const categoryList = [
        { name: "Electronics", image: "/images/electronics.jpg" },
        { name: "Fashion", image: "/images/fashion.jpg" },
        { name: "Electronics", image: "/images/electronics.jpg" },
        { name: "Fashion", image: "/images/fashion.jpg" },
        { name: "Electronics", image: "/images/electronics.jpg" },
        { name: "Fashion", image: "/images/fashion.jpg" },
        { name: "Electronics", image: "/images/electronics.jpg" },
        { name: "Fashion", image: "/images/fashion.jpg" },
        { name: "Electronics", image: "/images/electronics.jpg" },
        { name: "Fashion", image: "/images/fashion.jpg" },
        { name: "Electronics", image: "/images/electronics.jpg" },
        { name: "Fashion", image: "/images/fashion.jpg" },
        
    ];
    return (
        <div className="flex items-center justify-center gap-3 px-3 md:px-10 gap-3 md:gap-10 py-5 md:py-10 overflow-x-auto">
            {categoryList.map((category, index) => (
                <div className= "border text-slate-500 rounded-full min-w-[100px] flex flex-1 items-center justify-center cursor-pointer flex px-2 py-1 text-center" key={index}>{category.name}</div>
                ))
            }
        </div>
    )
};

export default Category;
 