import { useContext, useState, useEffect } from "react";
// import { contextData } from "../Context/AppContext.jsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
function ProductCategory() {
  // const { allGroceryProduct } = useContext(contextData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  // const [filteredProducts, setFilteredProducts] = useState([]);

  // useEffect(() => {

  //   if (selectedCategory === "All") {
  //     setFilteredProducts(allGroceryProduct);
  //   } else {
  //     const filtered = allGroceryProduct.filter(
  //       (item) => item.category === selectedCategory
  //     );
  //     setFilteredProducts(filtered);
  //   }
  // }, [selectedCategory, allGroceryProduct]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = [
    {
      categoriesImg: '/fruitsVegetablesImg.png',
      categoriesName: 'Fruits & vegetables',
    },
    {
      categoriesImg: '/AttaRiceOilDals.png',
      categoriesName: 'Atta, Rice, Oil & Dals',
    }, ,
    {
      categoriesImg: '/dairyBreadEggsImg.png',
      categoriesName: 'Dairy, Bread & Eggs',
    },
    {
      categoriesImg: '/coldDrinksJuicesImg.png',
      categoriesName: 'Cold Drinks & Juices',
    },
    {
      categoriesImg: '/coffeeImg.png',
      categoriesName: 'Tea, Coffee & More',
    },
    {
      categoriesImg: '/biscuitsImg.png',
      categoriesName: 'Biscuits',
    },
    {
      categoriesImg: '/healthBabyCareImg.png',
      categoriesName: 'Health & Baby Care',
    },
  ]

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="bg-white w-full">
      {/* <div className="md:flex justify-between items-center w-full">
        <p className="text-custom-darkGray md:text-[32px] text-2xl font-semibold w-full">Explore by Categories</p>
        <div className="flex md:gap-5 gap-3 w-full md:items-end items-center md:justify-end justify-start md:pt-0 pt-2">
          <p className="text-custom-purple text-base font-bold">All</p>
          <p className="text-custom-red text-base font-medium">Vegetables</p>
          <p className="text-custom-red text-base font-medium">Fruits</p>
          <p className="text-custom-red text-base font-medium">Coffe & teas</p>
          <p className="text-custom-red text-base font-medium">Meat</p>
        </div>
      </div> */}

      <Carousel className="h-full w-full gap-5"
        responsive={responsive}
        autoPlay={true}
        infinite={true}
        arrows={false}
      >

        {filteredProducts?.map((item, i) => (
          <div key={i} className="bg-custom-lightGrayColor md:h-[204px] cursor-pointer shadow-sm overflow-hidden hover:scale-105 hover:shadow-lg transition-all duration-200 ease-in-out p-5 flex flex-col justify-center items-center rounded-[3px] md:mr-5 md:mt-10 mt-5">
            <img className="w-[117px] h-[68px] rounded-[12px] object-contain" src={item.categoriesImg} />
            <p className="text-custom-darkGray text-lg	font-semibold	text-center md:pt-10 pt-5">{item?.categoriesName}</p>
          </div>
        ))}


      </Carousel>
    </div>
  );
}

export default ProductCategory;
